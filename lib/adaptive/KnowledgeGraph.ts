/**
 * Bayesian Knowledge Graph
 *
 * Models prerequisite relationships between skills and propagates
 * mastery beliefs across connected skills after each BKT update.
 *
 * Key behaviors:
 * - Downward propagation: Hard mastered → strongly infer Easy/Medium mastery
 * - Upward propagation: Easy failed → penalize Hard; Easy mastered → mild boost to Hard
 * - Lateral propagation: same-difficulty correlation, weak pull
 * - Max 2-hop propagation with exponential decay
 * - Single BFS pass per update (no oscillation risk)
 */

import type { SkillEdge, SkillNode, PropagationResult } from '@/types/adaptive';
import type { SkillMastery } from './BayesianKT';

const MAX_HOPS = 2;
const HOP_DECAY = 0.6;
const MIN_DELTA = 0.01;

// Propagation strength multipliers by direction
const DOWNWARD_STRENGTH = 0.7;   // Hard mastered → infer Easy
const UPWARD_BOOST = 0.3;        // Easy mastered → mild boost to Hard
const UPWARD_PENALTY = 0.4;      // Easy failed → penalize Hard
const LATERAL_STRENGTH = 0.15;   // Same-difficulty correlation

interface AdjacencyEntry {
  neighborId: string;
  edge: SkillEdge;
  direction: 'forward' | 'reverse';  // forward = from→to, reverse = to→from
}

export class KnowledgeGraph {
  private nodes: Map<string, SkillNode> = new Map();
  private adjacency: Map<string, AdjacencyEntry[]> = new Map();

  constructor(edges: SkillEdge[], skills: { id: string; topic: string; pattern: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[]) {
    this.buildGraph(edges, skills);
  }

  private buildGraph(
    edges: SkillEdge[],
    skills: { id: string; topic: string; pattern: string; difficulty: 'Easy' | 'Medium' | 'Hard' }[]
  ): void {
    // Create nodes
    for (const skill of skills) {
      this.nodes.set(skill.id, {
        skillId: skill.id,
        topic: skill.topic,
        pattern: skill.pattern,
        difficulty: skill.difficulty,
        prerequisites: [],
        dependents: [],
        laterals: [],
      });
      this.adjacency.set(skill.id, []);
    }

    // Add edges
    for (const edge of edges) {
      const fromNode = this.nodes.get(edge.from);
      const toNode = this.nodes.get(edge.to);
      if (!fromNode || !toNode) continue;

      // Build node relationship lists
      if (edge.type === 'lateral') {
        fromNode.laterals.push(edge.to);
        toNode.laterals.push(edge.from);
      } else {
        // prerequisite or difficulty_progression: from is prerequisite, to is dependent
        fromNode.dependents.push(edge.to);
        toNode.prerequisites.push(edge.from);
      }

      // Build adjacency list (bidirectional for traversal)
      this.adjacency.get(edge.from)!.push({
        neighborId: edge.to,
        edge,
        direction: 'forward',
      });
      this.adjacency.get(edge.to)!.push({
        neighborId: edge.from,
        edge,
        direction: 'reverse',
      });
    }
  }

  /**
   * Get the node for a skill
   */
  getNode(skillId: string): SkillNode | undefined {
    return this.nodes.get(skillId);
  }

  /**
   * Get all prerequisite skill IDs for a given skill (direct only)
   */
  getPrerequisites(skillId: string): string[] {
    return this.nodes.get(skillId)?.prerequisites || [];
  }

  /**
   * Get all dependent skill IDs for a given skill (direct only)
   */
  getDependents(skillId: string): string[] {
    return this.nodes.get(skillId)?.dependents || [];
  }

  /**
   * Check if graph has any edges (for graceful degradation with demo data)
   */
  hasEdges(): boolean {
    for (const entries of this.adjacency.values()) {
      if (entries.length > 0) return true;
    }
    return false;
  }

  /**
   * Propagate mastery belief after a BKT update.
   *
   * Runs BFS from the updated skill, adjusting connected skills'
   * mastery values based on edge type and observed performance.
   *
   * @param updatedSkillId - The skill that was directly observed
   * @param masteries - Map of all skill masteries (mutated in place)
   * @param newMastery - The post-BKT mastery value of the observed skill
   * @returns Array of propagation results for tracking/debugging
   */
  propagate(
    updatedSkillId: string,
    masteries: Map<string, SkillMastery>,
    newMastery: number
  ): PropagationResult[] {
    if (!this.hasEdges()) return [];

    const results: PropagationResult[] = [];
    const visited = new Set<string>();
    const queue: { skillId: string; hops: number }[] = [];

    // Start from the observed skill
    visited.add(updatedSkillId);

    // Enqueue direct neighbors
    const neighbors = this.adjacency.get(updatedSkillId);
    if (!neighbors) return [];

    for (const entry of neighbors) {
      queue.push({ skillId: entry.neighborId, hops: 1 });
    }

    while (queue.length > 0) {
      const { skillId: currentId, hops } = queue.shift()!;
      if (visited.has(currentId) || hops > MAX_HOPS) continue;
      visited.add(currentId);

      const currentMastery = masteries.get(currentId);
      if (!currentMastery) continue;

      const previousMastery = currentMastery.pMastery;

      // Find the edge connecting to the source of propagation
      // We need to determine the relationship direction
      const connectingEntries = this.adjacency.get(currentId)!.filter(
        (e) => visited.has(e.neighborId)
      );

      let totalDelta = 0;
      let source: PropagationResult['source'] = 'lateral';

      for (const entry of connectingEntries) {
        const sourceMastery = masteries.get(entry.neighborId)?.pMastery;
        if (sourceMastery === undefined) continue;

        const decayFactor = entry.edge.weight * Math.pow(HOP_DECAY, hops - 1);
        const delta = this.computeDelta(entry, sourceMastery, previousMastery, decayFactor);

        if (Math.abs(delta) > Math.abs(totalDelta)) {
          // Track the strongest signal's source type
          source = this.getSourceType(entry);
        }

        totalDelta += delta;
      }

      // Apply delta if significant
      if (Math.abs(totalDelta) >= MIN_DELTA) {
        const propagatedMastery = Math.max(0.01, Math.min(0.99, previousMastery + totalDelta));
        currentMastery.pMastery = propagatedMastery;

        results.push({
          skillId: currentId,
          previousMastery,
          propagatedMastery,
          source,
          confidence: Math.pow(HOP_DECAY, hops - 1),
        });

        // Continue propagation to next hop
        if (hops < MAX_HOPS) {
          const nextNeighbors = this.adjacency.get(currentId);
          if (nextNeighbors) {
            for (const next of nextNeighbors) {
              if (!visited.has(next.neighborId)) {
                queue.push({ skillId: next.neighborId, hops: hops + 1 });
              }
            }
          }
        }
      }
    }

    return results;
  }

  /**
   * Compute the mastery delta for a neighbor based on edge type and direction.
   */
  private computeDelta(
    entry: AdjacencyEntry,
    sourceMastery: number,
    targetMastery: number,
    decayFactor: number
  ): number {
    const { edge, direction } = entry;

    if (edge.type === 'lateral') {
      // Moderate pull toward observed value
      return (sourceMastery - targetMastery) * LATERAL_STRENGTH * decayFactor;
    }

    // For prerequisite / difficulty_progression edges:
    // forward direction means from=easier, to=harder
    // If we're the "to" node (harder skill) looking at the "from" node (easier skill):
    //   → this is UPWARD propagation (prerequisite informs dependent)
    // If we're the "from" node (easier skill) looking at the "to" node (harder skill):
    //   → this is DOWNWARD propagation (dependent informs prerequisite)

    if (direction === 'reverse') {
      // Current node is the "from" (easier/prerequisite) looking at "to" (harder/dependent)
      // The dependent was observed → propagate DOWN to this prerequisite
      return this.computeDownwardDelta(sourceMastery, targetMastery, decayFactor);
    } else {
      // Current node is the "to" (harder/dependent) looking at "from" (easier/prerequisite)
      // The prerequisite was observed → propagate UP to this dependent
      return this.computeUpwardDelta(sourceMastery, targetMastery, decayFactor);
    }
  }

  /**
   * Downward propagation: dependent mastered → strongly infer prerequisite mastery
   * If a student can do the Hard version, they almost certainly know the Easy version.
   */
  private computeDownwardDelta(
    dependentMastery: number,
    prerequisiteMastery: number,
    decayFactor: number
  ): number {
    if (dependentMastery > 0.85) {
      // Dependent is mastered → pull prerequisite toward 0.90
      const gap = 0.90 - prerequisiteMastery;
      return gap * DOWNWARD_STRENGTH * decayFactor;
    }
    if (dependentMastery < 0.3) {
      // Dependent is weak → mild downward pressure on prerequisite if it's uncertain
      // (but don't penalize much — you can know basics but fail advanced)
      if (prerequisiteMastery > 0.5 && prerequisiteMastery < 0.85) {
        return -0.05 * decayFactor;
      }
    }
    return 0;
  }

  /**
   * Upward propagation: prerequisite performance → inform dependent
   * Asymmetric: failure penalizes more than mastery boosts.
   */
  private computeUpwardDelta(
    prerequisiteMastery: number,
    dependentMastery: number,
    decayFactor: number
  ): number {
    if (prerequisiteMastery > 0.85) {
      // Prerequisite mastered → mild boost to dependent (toward 0.5 neutral)
      const boost = (0.5 - dependentMastery) * UPWARD_BOOST * decayFactor;
      return Math.max(0, boost); // only boost, never penalize
    }
    if (prerequisiteMastery < 0.3) {
      // Prerequisite failed → penalize dependent
      const penalty = (dependentMastery - 0.2) * UPWARD_PENALTY * decayFactor;
      return -Math.max(0, penalty); // pull down, but never below ~0.2
    }
    return 0;
  }

  /**
   * Determine the source type for a propagation result
   */
  private getSourceType(entry: AdjacencyEntry): PropagationResult['source'] {
    if (entry.edge.type === 'lateral') return 'lateral';
    // reverse = we're the prerequisite being informed by the dependent = downward
    return entry.direction === 'reverse' ? 'downward_propagation' : 'upward_propagation';
  }
}
