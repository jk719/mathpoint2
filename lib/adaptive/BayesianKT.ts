// Bayesian Knowledge Tracing (BKT) Implementation
// Tracks skill mastery probabilities and updates based on student responses

export interface BKTParameters {
  pInit: number;  // Initial probability of mastery
  pLearn: number; // Probability of learning from an attempt
  pSlip: number;  // Probability of error despite mastery
  pGuess: number; // Probability of correct guess without mastery
}

export interface SkillMastery {
  skillCode: string;
  pMastery: number;        // Current probability of mastery
  evidenceCount: number;   // Number of attempts
  correctCount: number;    // Number of correct attempts
  incorrectCount: number;  // Number of incorrect attempts
  lastUpdated: Date;
  parameters: BKTParameters;
}

export interface MasteryUpdate {
  skillCode: string;
  previousMastery: number;
  newMastery: number;
  isCorrect: boolean;
  confidence: number;
}

export class BayesianKT {
  private defaultParams: BKTParameters = {
    pInit: 0.3,   // Students typically start with 30% mastery
    pLearn: 0.15, // 15% chance of learning from each attempt
    pSlip: 0.1,   // 10% chance of error despite knowing
    pGuess: 0.2   // 20% chance of guessing correctly
  };

  // Skill-specific parameter overrides (for known difficult/easy skills)
  private skillParamOverrides: Map<string, Partial<BKTParameters>> = new Map([
    // Harder skills have lower initial mastery and learning rates
    ["ALG1.QUAD.COMPLETE_SQUARE", { pInit: 0.15, pLearn: 0.1 }],
    ["ALG1.RAT.COMPLEX", { pInit: 0.2, pLearn: 0.12 }],
    ["ALG1.INEQ.ABS_GREATER", { pInit: 0.2, pLearn: 0.12 }],

    // Easier skills have higher initial mastery
    ["ALG1.FOUND.NAT_NUM", { pInit: 0.8, pLearn: 0.2 }],
    ["ALG1.EQ.ONE_STEP", { pInit: 0.5, pLearn: 0.25 }],
    ["ALG1.STAT.MEAN", { pInit: 0.6, pLearn: 0.2 }]
  ]);

  constructor(customParams?: Partial<BKTParameters>) {
    if (customParams) {
      this.defaultParams = { ...this.defaultParams, ...customParams };
    }
  }

  /**
   * Initialize mastery state for a skill
   */
  initializeSkillMastery(skillCode: string): SkillMastery {
    const overrides = this.skillParamOverrides.get(skillCode) || {};
    const parameters = { ...this.defaultParams, ...overrides };

    return {
      skillCode,
      pMastery: parameters.pInit,
      evidenceCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      lastUpdated: new Date(),
      parameters
    };
  }

  /**
   * Update mastery probability based on student response
   * Using standard BKT update equations
   */
  updateMastery(
    mastery: SkillMastery,
    isCorrect: boolean,
    confidence: number = 0.75,
    timeSpentMs?: number
  ): MasteryUpdate {
    const { pLearn, pSlip, pGuess } = mastery.parameters;
    const prevMastery = mastery.pMastery;

    // Adjust parameters based on confidence and time
    const adjustedSlip = this.adjustSlipRate(pSlip, confidence);
    const adjustedGuess = this.adjustGuessRate(pGuess, confidence);
    const adjustedLearn = this.adjustLearnRate(pLearn, timeSpentMs);

    // Calculate probability of correct given current mastery
    const pCorrectGivenMastery = 1 - adjustedSlip;
    const pCorrectGivenNoMastery = adjustedGuess;

    // Probability of observing this response
    const pObservation = isCorrect
      ? prevMastery * pCorrectGivenMastery + (1 - prevMastery) * pCorrectGivenNoMastery
      : prevMastery * adjustedSlip + (1 - prevMastery) * (1 - adjustedGuess);

    // Update mastery using Bayes' rule
    let newMastery: number;

    if (isCorrect) {
      // P(mastery | correct) = P(correct | mastery) * P(mastery) / P(correct)
      const pMasteryGivenCorrect =
        (prevMastery * pCorrectGivenMastery) / pObservation;

      // Account for learning
      newMastery = pMasteryGivenCorrect + (1 - pMasteryGivenCorrect) * adjustedLearn;
    } else {
      // P(mastery | incorrect) = P(incorrect | mastery) * P(mastery) / P(incorrect)
      const pMasteryGivenIncorrect =
        (prevMastery * adjustedSlip) / pObservation;

      // Still possibility of learning even from mistakes
      newMastery = pMasteryGivenIncorrect + (1 - pMasteryGivenIncorrect) * (adjustedLearn * 0.5);
    }

    // Ensure probability bounds
    newMastery = Math.max(0.01, Math.min(0.99, newMastery));

    // Update the mastery object
    mastery.pMastery = newMastery;
    mastery.evidenceCount++;
    if (isCorrect) {
      mastery.correctCount++;
    } else {
      mastery.incorrectCount++;
    }
    mastery.lastUpdated = new Date();

    return {
      skillCode: mastery.skillCode,
      previousMastery: prevMastery,
      newMastery,
      isCorrect,
      confidence
    };
  }

  /**
   * Update mastery for multiple skills at once (for questions testing multiple skills)
   */
  updateMultipleSkills(
    masteries: SkillMastery[],
    isCorrect: boolean,
    confidence: number = 0.75,
    skillContributions?: Map<string, number> // Weight of each skill's contribution
  ): MasteryUpdate[] {
    const updates: MasteryUpdate[] = [];

    for (const mastery of masteries) {
      // Adjust confidence based on skill contribution if provided
      const skillWeight = skillContributions?.get(mastery.skillCode) || 1.0;
      const adjustedConfidence = confidence * skillWeight;

      const update = this.updateMastery(mastery, isCorrect, adjustedConfidence);
      updates.push(update);
    }

    return updates;
  }

  /**
   * Calculate expected probability of correct response given current mastery
   */
  calculateResponseProbability(mastery: SkillMastery): number {
    const { pSlip, pGuess } = mastery.parameters;
    const pMastery = mastery.pMastery;

    return pMastery * (1 - pSlip) + (1 - pMastery) * pGuess;
  }

  /**
   * Calculate information gain for a potential question
   * Higher value = more information gained from this question
   */
  calculateInformationGain(masteries: SkillMastery[]): number {
    if (masteries.length === 0) return 0;

    // Average uncertainty across skills
    const uncertainties = masteries.map(m => {
      const p = m.pMastery;
      // Maximum uncertainty at p = 0.5
      return -p * Math.log2(p + 0.001) - (1 - p) * Math.log2(1 - p + 0.001);
    });

    return uncertainties.reduce((a, b) => a + b, 0) / uncertainties.length;
  }

  /**
   * Determine mastery level category
   */
  getMasteryLevel(pMastery: number): 'WEAK' | 'DEVELOPING' | 'MASTERED' {
    if (pMastery < 0.6) return 'WEAK';
    if (pMastery < 0.85) return 'DEVELOPING';
    return 'MASTERED';
  }

  /**
   * Check if skill mastery is stable (low uncertainty)
   */
  isMasteryStable(mastery: SkillMastery, threshold: number = 0.1): boolean {
    // Stable if very low or very high mastery
    return mastery.pMastery < threshold || mastery.pMastery > (1 - threshold);
  }

  /**
   * Adjust slip rate based on student confidence
   */
  private adjustSlipRate(baseSlip: number, confidence: number): number {
    // Higher confidence = lower slip rate
    const confidenceFactor = 1 - (confidence / 100) * 0.5;
    return Math.max(0.05, baseSlip * confidenceFactor);
  }

  /**
   * Adjust guess rate based on student confidence
   */
  private adjustGuessRate(baseGuess: number, confidence: number): number {
    // Lower confidence might indicate guessing
    const confidenceFactor = confidence < 50 ? 1.5 : 1.0;
    return Math.min(0.5, baseGuess * confidenceFactor);
  }

  /**
   * Adjust learning rate based on time spent
   */
  private adjustLearnRate(baseLearn: number, timeSpentMs?: number): number {
    if (!timeSpentMs) return baseLearn;

    // Too fast might indicate no learning, too slow might indicate struggle
    const timeSeconds = timeSpentMs / 1000;

    if (timeSeconds < 10) {
      return baseLearn * 0.5; // Very fast, less learning
    } else if (timeSeconds > 180) {
      return baseLearn * 0.8; // Very slow, might be struggling
    } else if (timeSeconds > 30 && timeSeconds < 120) {
      return baseLearn * 1.1; // Optimal time range
    }

    return baseLearn;
  }

  /**
   * Predict number of attempts needed to reach mastery
   */
  predictAttemptsToMastery(
    currentMastery: number,
    targetMastery: number = 0.85,
    parameters?: BKTParameters
  ): number {
    const params = parameters || this.defaultParams;
    let mastery = currentMastery;
    let attempts = 0;
    const maxAttempts = 50;

    while (mastery < targetMastery && attempts < maxAttempts) {
      // Simulate correct response probability
      const pCorrect = mastery * (1 - params.pSlip) + (1 - mastery) * params.pGuess;

      // Update mastery assuming correct response
      if (Math.random() < pCorrect) {
        const pMasteryGivenCorrect = (mastery * (1 - params.pSlip)) / pCorrect;
        mastery = pMasteryGivenCorrect + (1 - pMasteryGivenCorrect) * params.pLearn;
      } else {
        const pIncorrect = 1 - pCorrect;
        const pMasteryGivenIncorrect = (mastery * params.pSlip) / pIncorrect;
        mastery = pMasteryGivenIncorrect + (1 - pMasteryGivenIncorrect) * params.pLearn * 0.5;
      }

      attempts++;
    }

    return attempts;
  }

  /**
   * Generate learning curve data for visualization
   */
  generateLearningCurve(
    attempts: { isCorrect: boolean; confidence?: number }[],
    initialMastery: number = 0.3,
    parameters?: BKTParameters
  ): number[] {
    const params = parameters || this.defaultParams;
    const mastery = this.initializeSkillMastery('temp');
    mastery.pMastery = initialMastery;
    mastery.parameters = params;

    const curve: number[] = [initialMastery];

    for (const attempt of attempts) {
      this.updateMastery(mastery, attempt.isCorrect, attempt.confidence || 75);
      curve.push(mastery.pMastery);
    }

    return curve;
  }
}

// Export singleton instance for consistent parameter usage
export const bkt = new BayesianKT();