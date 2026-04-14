import type { SkillEdge } from '@/types/adaptive';
import type { SATSkill } from '@/types/sat';

/**
 * Auto-generate difficulty progression edges from skill data.
 *
 * Groups skills by topic + pattern, then creates edges:
 * - Easy → Medium (weight 0.9)
 * - Medium → Hard (weight 0.9)
 * - Easy → Hard when no Medium exists (weight 0.85)
 *
 * Within the same difficulty, if there are multiple variants for a pattern,
 * they get lateral edges (weight 0.4).
 */
export function generateDifficultyEdges(skills: SATSkill[]): SkillEdge[] {
  const edges: SkillEdge[] = [];

  // Group by topic + pattern
  const groups = new Map<string, Map<string, SATSkill[]>>();
  for (const skill of skills) {
    const key = `${skill.topic}::${skill.pattern}`;
    if (!groups.has(key)) groups.set(key, new Map());
    const diffMap = groups.get(key)!;
    if (!diffMap.has(skill.difficulty)) diffMap.set(skill.difficulty, []);
    diffMap.get(skill.difficulty)!.push(skill);
  }

  for (const [, diffMap] of groups) {
    const easy = diffMap.get('Easy') || [];
    const medium = diffMap.get('Medium') || [];
    const hard = diffMap.get('Hard') || [];

    // Easy → Medium progression
    for (const e of easy) {
      for (const m of medium) {
        edges.push({
          from: e.id,
          to: m.id,
          type: 'difficulty_progression',
          weight: 0.9,
        });
      }
    }

    // Medium → Hard progression
    for (const m of medium) {
      for (const h of hard) {
        edges.push({
          from: m.id,
          to: h.id,
          type: 'difficulty_progression',
          weight: 0.9,
        });
      }
    }

    // Easy → Hard when no Medium exists
    if (medium.length === 0) {
      for (const e of easy) {
        for (const h of hard) {
          edges.push({
            from: e.id,
            to: h.id,
            type: 'difficulty_progression',
            weight: 0.85,
          });
        }
      }
    }

    // Lateral edges between variants at same difficulty
    for (const group of [easy, medium, hard]) {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          edges.push({
            from: group[i].id,
            to: group[j].id,
            type: 'lateral',
            weight: 0.4,
          });
        }
      }
    }
  }

  return edges;
}

/**
 * Cross-pattern prerequisite edges — DOMAIN EXPERT ADDS THESE
 *
 * These represent conceptual dependencies between patterns within a topic.
 * Example: "Slope Calculation" is a prerequisite for "Perpendicular Lines"
 * because you need to understand slope to identify perpendicular relationships.
 *
 * Edge type should be 'prerequisite' with weight 0.6-0.8 depending on
 * how strong the dependency is.
 *
 * Format:
 * { from: 'skill-id-of-prerequisite', to: 'skill-id-of-dependent', type: 'prerequisite', weight: 0.7 }
 */
export const expertEdges: SkillEdge[] = [
  // ── Percents: Cross-pattern prerequisites ──

  // Finding a Percent is foundational for everything
  { from: 'pct-find-pct-easy', to: 'pct-increase-easy', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-find-pct-easy', to: 'pct-decrease-easy', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-find-pct-easy', to: 'pct-tip-tax-easy', type: 'prerequisite', weight: 0.7 },
  { from: 'pct-find-pct-easy', to: 'pct-discount-easy', type: 'prerequisite', weight: 0.7 },

  // Conversions feed into multi-step and reverse problems
  { from: 'pct-convert-frac-easy', to: 'pct-convert-dec-medium', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-convert-dec-medium', to: 'pct-multi-convert-hard', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-convert-frac-easy', to: 'pct-reverse-pct-hard', type: 'prerequisite', weight: 0.6 },

  // Percent increase/decrease basics feed into word problems
  { from: 'pct-increase-easy', to: 'pct-increase-word-medium', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-decrease-easy', to: 'pct-decrease-word-medium', type: 'prerequisite', weight: 0.8 },

  // Word problems feed into successive changes
  { from: 'pct-increase-word-medium', to: 'pct-successive-change-hard', type: 'prerequisite', weight: 0.7 },
  { from: 'pct-decrease-word-medium', to: 'pct-successive-change-hard', type: 'prerequisite', weight: 0.7 },

  // Finding Original Value is a "working backwards" skill under Finding a Percent
  // Requires both finding-the-whole (reverse arithmetic) and percent change understanding
  { from: 'pct-find-whole-medium', to: 'pct-original-value-hard', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-decrease-word-medium', to: 'pct-original-value-hard', type: 'prerequisite', weight: 0.6 },
  { from: 'pct-increase-word-medium', to: 'pct-original-value-hard', type: 'prerequisite', weight: 0.6 },

  // Discounts and Tax build on each other
  { from: 'pct-discount-easy', to: 'pct-stacked-discount-medium', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-tip-tax-easy', to: 'pct-tip-tax-total-medium', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-stacked-discount-medium', to: 'pct-compound-discount-hard', type: 'prerequisite', weight: 0.8 },
  { from: 'pct-tip-tax-total-medium', to: 'pct-compound-discount-hard', type: 'prerequisite', weight: 0.7 },
  { from: 'pct-tip-tax-total-medium', to: 'pct-markup-margin-hard', type: 'prerequisite', weight: 0.6 },

  // Finding the whole feeds into reverse percent problems
  { from: 'pct-find-whole-medium', to: 'pct-reverse-pct-hard', type: 'prerequisite', weight: 0.7 },
];

/**
 * Get all edges: auto-generated + expert-authored
 */
export function getAllEdges(skills: SATSkill[]): SkillEdge[] {
  return [...generateDifficultyEdges(skills), ...expertEdges];
}
