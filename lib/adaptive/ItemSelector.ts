// Adaptive Item Selection Algorithm
// Selects optimal questions based on Expected Information Gain (EIG) and other criteria

import { BayesianKT, SkillMastery } from './BayesianKT';
import { AlgebraSkill } from '@/data/algebra1-skills';

export interface ItemCandidate {
  id: string;
  code: string;
  skillCodes: string[];
  difficulty: 'LOW' | 'MEDIUM' | 'HIGH';
  format: string;
  irtA: number; // Discrimination
  irtB: number; // Difficulty
  irtC: number; // Guessing
  avgTimeMs?: number;
  presentedCount: number; // How many times shown in this session
}

export interface SelectionCriteria {
  targetSkills?: string[];        // Focus on specific skills
  avoidSkills?: string[];         // Skills to avoid (already mastered)
  difficultyRange?: [number, number]; // IRT difficulty range
  formatPreference?: string[];    // Preferred question formats
  maxRepeats?: number;            // Max times to show same question
  diversityWeight?: number;       // Weight for topic diversity (0-1)
}

export interface ItemScore {
  item: ItemCandidate;
  totalScore: number;
  eigScore: number;
  difficultyScore: number;
  diversityScore: number;
  recencyScore: number;
}

export class ItemSelector {
  private bkt: BayesianKT;
  private recentSkills: string[] = []; // Track recently tested skills
  private recentItems: string[] = [];  // Track recently presented items

  constructor(bkt?: BayesianKT) {
    this.bkt = bkt || new BayesianKT();
  }

  /**
   * Select the next optimal item based on EIG and other criteria
   */
  selectNextItem(
    candidates: ItemCandidate[],
    masteries: Map<string, SkillMastery>,
    criteria: SelectionCriteria = {},
    itemsPresented: string[] = []
  ): ItemCandidate | null {
    if (candidates.length === 0) return null;

    // Filter candidates based on criteria
    let filtered = this.filterCandidates(candidates, criteria, itemsPresented);
    if (filtered.length === 0) {
      // Relax criteria if no candidates match
      filtered = candidates.filter(c =>
        !itemsPresented.includes(c.id) || c.presentedCount < (criteria.maxRepeats || 1)
      );
    }

    // Score each candidate
    const scores = filtered.map(item => this.scoreItem(item, masteries, criteria));

    // Sort by total score (highest first)
    scores.sort((a, b) => b.totalScore - a.totalScore);

    // Select the best item
    const selected = scores[0]?.item || null;

    if (selected) {
      this.updateRecentHistory(selected);
    }

    return selected;
  }

  /**
   * Select multiple items for a batch (useful for pre-loading)
   */
  selectBatch(
    candidates: ItemCandidate[],
    masteries: Map<string, SkillMastery>,
    batchSize: number,
    criteria: SelectionCriteria = {}
  ): ItemCandidate[] {
    const selected: ItemCandidate[] = [];
    const presented: string[] = [];
    const tempMasteries = new Map(masteries); // Clone for simulation

    for (let i = 0; i < batchSize; i++) {
      const item = this.selectNextItem(
        candidates,
        tempMasteries,
        criteria,
        presented
      );

      if (!item) break;

      selected.push(item);
      presented.push(item.id);

      // Simulate mastery update (assume average performance)
      this.simulateMasteryUpdate(tempMasteries, item, 0.7);
    }

    return selected;
  }

  /**
   * Calculate Expected Information Gain for an item
   */
  private calculateEIG(
    item: ItemCandidate,
    masteries: Map<string, SkillMastery>
  ): number {
    const relevantMasteries = item.skillCodes
      .map(code => masteries.get(code))
      .filter(Boolean) as SkillMastery[];

    if (relevantMasteries.length === 0) return 0;

    // Calculate current entropy (uncertainty)
    const currentEntropy = this.calculateEntropy(relevantMasteries);

    // Calculate expected entropy after response
    const pCorrect = this.calculateResponseProbability(item, relevantMasteries);

    // Simulate entropy after correct response
    const masteriesIfCorrect = this.simulateResponse(relevantMasteries, true);
    const entropyIfCorrect = this.calculateEntropy(masteriesIfCorrect);

    // Simulate entropy after incorrect response
    const masteriesIfIncorrect = this.simulateResponse(relevantMasteries, false);
    const entropyIfIncorrect = this.calculateEntropy(masteriesIfIncorrect);

    // Expected entropy
    const expectedEntropy = pCorrect * entropyIfCorrect + (1 - pCorrect) * entropyIfIncorrect;

    // Information gain = reduction in entropy
    return currentEntropy - expectedEntropy;
  }

  /**
   * Calculate entropy (uncertainty) of mastery states
   */
  private calculateEntropy(masteries: SkillMastery[]): number {
    if (masteries.length === 0) return 0;

    const entropies = masteries.map(m => {
      const p = m.pMastery;
      if (p <= 0 || p >= 1) return 0;
      return -p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
    });

    return entropies.reduce((a, b) => a + b, 0) / entropies.length;
  }

  /**
   * Calculate probability of correct response using IRT
   */
  private calculateResponseProbability(
    item: ItemCandidate,
    masteries: SkillMastery[]
  ): number {
    if (masteries.length === 0) return item.irtC; // Just guessing parameter

    // Average ability across relevant skills
    const avgMastery = masteries.reduce((sum, m) => sum + m.pMastery, 0) / masteries.length;

    // Convert mastery to IRT ability scale (typically -3 to 3)
    const ability = (avgMastery - 0.5) * 6;

    // 3-parameter IRT model: P(correct) = c + (1-c) / (1 + exp(-a(θ-b)))
    const { irtA, irtB, irtC } = item;
    const expTerm = Math.exp(-irtA * (ability - irtB));
    return irtC + (1 - irtC) / (1 + expTerm);
  }

  /**
   * Score an item based on multiple criteria
   */
  private scoreItem(
    item: ItemCandidate,
    masteries: Map<string, SkillMastery>,
    criteria: SelectionCriteria
  ): ItemScore {
    // EIG Score (0-1)
    const eigScore = Math.min(1, this.calculateEIG(item, masteries) * 2);

    // Difficulty Match Score (0-1)
    const difficultyScore = this.calculateDifficultyScore(item, masteries);

    // Diversity Score (0-1) - prefer items testing different skills
    const diversityScore = this.calculateDiversityScore(item);

    // Recency Score (0-1) - avoid recently shown items
    const recencyScore = this.calculateRecencyScore(item);

    // Weighted combination
    const weights = {
      eig: 0.4,
      difficulty: 0.3,
      diversity: criteria.diversityWeight || 0.2,
      recency: 0.1
    };

    const totalScore =
      weights.eig * eigScore +
      weights.difficulty * difficultyScore +
      weights.diversity * diversityScore +
      weights.recency * recencyScore;

    return {
      item,
      totalScore,
      eigScore,
      difficultyScore,
      diversityScore,
      recencyScore
    };
  }

  /**
   * Calculate difficulty match score (prefer appropriate difficulty)
   */
  private calculateDifficultyScore(
    item: ItemCandidate,
    masteries: Map<string, SkillMastery>
  ): number {
    const relevantMasteries = item.skillCodes
      .map(code => masteries.get(code))
      .filter(Boolean) as SkillMastery[];

    if (relevantMasteries.length === 0) return 0.5;

    const avgMastery = relevantMasteries.reduce((sum, m) => sum + m.pMastery, 0) /
                      relevantMasteries.length;

    // Convert to ability scale
    const ability = (avgMastery - 0.5) * 6;

    // Optimal difficulty is slightly above current ability
    const optimalDifficulty = ability + 0.5;
    const difficultyGap = Math.abs(item.irtB - optimalDifficulty);

    // Score decreases with gap
    return Math.exp(-difficultyGap / 2);
  }

  /**
   * Calculate diversity score (prefer testing different skills)
   */
  private calculateDiversityScore(item: ItemCandidate): number {
    const recentOverlap = item.skillCodes.filter(skill =>
      this.recentSkills.includes(skill)
    ).length;

    const totalSkills = item.skillCodes.length;
    if (totalSkills === 0) return 1;

    return 1 - (recentOverlap / totalSkills);
  }

  /**
   * Calculate recency score (avoid recently shown items)
   */
  private calculateRecencyScore(item: ItemCandidate): number {
    const index = this.recentItems.indexOf(item.id);
    if (index === -1) return 1; // Not recently shown

    // Score decreases for more recent items
    return index / Math.max(1, this.recentItems.length);
  }

  /**
   * Filter candidates based on criteria
   */
  private filterCandidates(
    candidates: ItemCandidate[],
    criteria: SelectionCriteria,
    itemsPresented: string[]
  ): ItemCandidate[] {
    return candidates.filter(item => {
      // Check if already presented too many times
      if (itemsPresented.filter(id => id === item.id).length >= (criteria.maxRepeats || 1)) {
        return false;
      }

      // Check target skills
      if (criteria.targetSkills && criteria.targetSkills.length > 0) {
        const hasTargetSkill = item.skillCodes.some(skill =>
          criteria.targetSkills!.includes(skill)
        );
        if (!hasTargetSkill) return false;
      }

      // Check avoided skills
      if (criteria.avoidSkills && criteria.avoidSkills.length > 0) {
        const hasAvoidSkill = item.skillCodes.some(skill =>
          criteria.avoidSkills!.includes(skill)
        );
        if (hasAvoidSkill) return false;
      }

      // Check difficulty range
      if (criteria.difficultyRange) {
        const [min, max] = criteria.difficultyRange;
        if (item.irtB < min || item.irtB > max) return false;
      }

      // Check format preference
      if (criteria.formatPreference && criteria.formatPreference.length > 0) {
        if (!criteria.formatPreference.includes(item.format)) return false;
      }

      return true;
    });
  }

  /**
   * Simulate mastery update for planning
   */
  private simulateMasteryUpdate(
    masteries: Map<string, SkillMastery>,
    item: ItemCandidate,
    pCorrect: number
  ): void {
    const isCorrect = Math.random() < pCorrect;

    item.skillCodes.forEach(skillCode => {
      const mastery = masteries.get(skillCode);
      if (mastery) {
        const updated = { ...mastery };
        this.bkt.updateMastery(updated, isCorrect, 75);
        masteries.set(skillCode, updated);
      }
    });
  }

  /**
   * Simulate response for entropy calculation
   */
  private simulateResponse(
    masteries: SkillMastery[],
    isCorrect: boolean
  ): SkillMastery[] {
    return masteries.map(m => {
      const copy = { ...m };
      this.bkt.updateMastery(copy, isCorrect, 75);
      return copy;
    });
  }

  /**
   * Update recent history for diversity tracking
   */
  private updateRecentHistory(item: ItemCandidate): void {
    // Update recent items (keep last 10)
    this.recentItems = [item.id, ...this.recentItems.slice(0, 9)];

    // Update recent skills (keep last 15)
    const newSkills = item.skillCodes.filter(s => !this.recentSkills.includes(s));
    this.recentSkills = [...newSkills, ...this.recentSkills].slice(0, 15);
  }

  /**
   * Determine if testing should stop
   */
  shouldStop(
    masteries: Map<string, SkillMastery>,
    questionsAsked: number,
    minQuestions: number = 10,
    maxQuestions: number = 25
  ): { shouldStop: boolean; reason: string } {
    // Must ask minimum questions
    if (questionsAsked < minQuestions) {
      return { shouldStop: false, reason: 'Below minimum questions' };
    }

    // Stop at maximum
    if (questionsAsked >= maxQuestions) {
      return { shouldStop: true, reason: 'Maximum questions reached' };
    }

    // Check if all masteries are stable
    const masteryValues = Array.from(masteries.values());
    const unstableCount = masteryValues.filter(m =>
      !this.bkt.isMasteryStable(m, 0.15)
    ).length;

    if (unstableCount === 0) {
      return { shouldStop: true, reason: 'All skills have stable mastery estimates' };
    }

    // Check if we have enough evidence for most skills
    const lowEvidenceCount = masteryValues.filter(m =>
      m.evidenceCount < 2
    ).length;

    if (lowEvidenceCount > masteryValues.length * 0.3) {
      return { shouldStop: false, reason: 'Need more evidence for skills' };
    }

    // Check information gain potential
    const avgEntropy = masteryValues.reduce((sum, m) => {
      const p = m.pMastery;
      if (p <= 0 || p >= 1) return sum;
      return sum - p * Math.log2(p) - (1 - p) * Math.log2(1 - p);
    }, 0) / masteryValues.length;

    if (avgEntropy < 0.2) {
      return { shouldStop: true, reason: 'Low uncertainty remaining' };
    }

    return { shouldStop: false, reason: 'Continue testing' };
  }
}

// Export singleton instance
export const itemSelector = new ItemSelector();