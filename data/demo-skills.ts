import { SATSkill } from '@/types/sat';

/**
 * Percents — Demo Skills
 *
 * 18 skills across 3 patterns × 3 difficulties.
 * Mirrors the SAT skill taxonomy: topic → pattern → variant → difficulty
 */
export const demoSkills: SATSkill[] = [
  // ============================================
  // Basic Percent Calculations — Easy
  // ============================================
  {
    id: 'pct-find-pct-easy',
    topic: 'Percents',
    pattern: 'Finding a Percent',
    variant: 'Find percent of a whole number',
    difficulty: 'Easy',
    displayName: 'Finding a Percent of a Number',
  },
  {
    id: 'pct-convert-frac-easy',
    topic: 'Percents',
    pattern: 'Conversions',
    variant: 'Fraction to percent',
    difficulty: 'Easy',
    displayName: 'Fraction to Percent',
  },
  // ============================================
  // Basic Percent Calculations — Medium
  // ============================================
  {
    id: 'pct-find-whole-medium',
    topic: 'Percents',
    pattern: 'Finding a Percent',
    variant: 'Find the whole given part and percent',
    difficulty: 'Medium',
    displayName: 'Finding the Whole',
  },
  {
    id: 'pct-convert-dec-medium',
    topic: 'Percents',
    pattern: 'Conversions',
    variant: 'Decimal to percent with context',
    difficulty: 'Medium',
    displayName: 'Decimal-Percent Conversions',
  },
  // ============================================
  // Basic Percent Calculations — Hard
  // ============================================
  {
    id: 'pct-reverse-pct-hard',
    topic: 'Percents',
    pattern: 'Finding a Percent',
    variant: 'Find the percent given part and whole',
    difficulty: 'Hard',
    displayName: 'Reverse Percent Problems',
  },
  {
    id: 'pct-multi-convert-hard',
    topic: 'Percents',
    pattern: 'Conversions',
    variant: 'Multi-step fraction-decimal-percent',
    difficulty: 'Hard',
    displayName: 'Multi-Step Conversions',
  },

  // ============================================
  // Percent Change — Easy
  // ============================================
  {
    id: 'pct-increase-easy',
    topic: 'Percents',
    pattern: 'Percent Change',
    variant: 'Simple increase',
    difficulty: 'Easy',
    displayName: 'Simple Percent Increase',
  },
  {
    id: 'pct-decrease-easy',
    topic: 'Percents',
    pattern: 'Percent Change',
    variant: 'Simple decrease',
    difficulty: 'Easy',
    displayName: 'Simple Percent Decrease',
  },
  // ============================================
  // Percent Change — Medium
  // ============================================
  {
    id: 'pct-increase-word-medium',
    topic: 'Percents',
    pattern: 'Percent Change',
    variant: 'Word problem with increase',
    difficulty: 'Medium',
    displayName: 'Percent Increase Word Problems',
  },
  {
    id: 'pct-decrease-word-medium',
    topic: 'Percents',
    pattern: 'Percent Change',
    variant: 'Word problem with decrease',
    difficulty: 'Medium',
    displayName: 'Percent Decrease Word Problems',
  },
  // ============================================
  // Percent Change — Hard
  // ============================================
  {
    id: 'pct-successive-change-hard',
    topic: 'Percents',
    pattern: 'Percent Change',
    variant: 'Successive percent changes',
    difficulty: 'Hard',
    displayName: 'Successive Percent Changes',
  },
  {
    id: 'pct-original-value-hard',
    topic: 'Percents',
    pattern: 'Finding a Percent',
    variant: 'Find original value given result and percent',
    difficulty: 'Hard',
    displayName: 'Finding Original Value',
  },

  // ============================================
  // Applied Percents — Easy
  // ============================================
  {
    id: 'pct-tip-tax-easy',
    topic: 'Percents',
    pattern: 'Tax & Tip',
    variant: 'Calculate simple tax or tip',
    difficulty: 'Easy',
    displayName: 'Tax and Tip Basics',
  },
  {
    id: 'pct-discount-easy',
    topic: 'Percents',
    pattern: 'Discounts',
    variant: 'Single discount',
    difficulty: 'Easy',
    displayName: 'Simple Discounts',
  },
  // ============================================
  // Applied Percents — Medium
  // ============================================
  {
    id: 'pct-tip-tax-total-medium',
    topic: 'Percents',
    pattern: 'Tax & Tip',
    variant: 'Calculate total with tax and tip',
    difficulty: 'Medium',
    displayName: 'Total with Tax and Tip',
  },
  {
    id: 'pct-stacked-discount-medium',
    topic: 'Percents',
    pattern: 'Discounts',
    variant: 'Stacked discounts',
    difficulty: 'Medium',
    displayName: 'Stacked Discounts',
  },
  // ============================================
  // Applied Percents — Hard
  // ============================================
  {
    id: 'pct-markup-margin-hard',
    topic: 'Percents',
    pattern: 'Tax & Tip',
    variant: 'Markup vs margin distinction',
    difficulty: 'Hard',
    displayName: 'Markup vs Margin',
  },
  {
    id: 'pct-compound-discount-hard',
    topic: 'Percents',
    pattern: 'Discounts',
    variant: 'Compound discount with tax',
    difficulty: 'Hard',
    displayName: 'Compound Discounts with Tax',
  },
];

export function getDemoSkillsByTopic(topic: string): SATSkill[] {
  return demoSkills.filter((s) => s.topic === topic);
}

export function getDemoSkillById(id: string): SATSkill | undefined {
  return demoSkills.find((s) => s.id === id);
}
