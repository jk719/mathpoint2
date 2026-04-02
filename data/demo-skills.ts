import { SATSkill } from '@/types/sat';

/**
 * Sushi Roll Making Skills — Demo Data
 *
 * 18 skills across 3 topics × 3 difficulties.
 * Mirrors the SAT skill taxonomy: topic → pattern → variant → difficulty
 */
export const demoSkills: SATSkill[] = [
  // ============================================
  // Maki Rolls — Easy
  // ============================================
  {
    id: 'maki-rice-spread-easy',
    topic: 'Maki Rolls',
    pattern: 'Rice Preparation',
    variant: 'Basic spreading technique',
    difficulty: 'Easy',
    displayName: 'Rice Spreading Basics',
  },
  {
    id: 'maki-nori-orient-easy',
    topic: 'Maki Rolls',
    pattern: 'Nori Handling',
    variant: 'Sheet orientation',
    difficulty: 'Easy',
    displayName: 'Nori Orientation',
  },
  // ============================================
  // Maki Rolls — Medium
  // ============================================
  {
    id: 'maki-filling-place-medium',
    topic: 'Maki Rolls',
    pattern: 'Filling Placement',
    variant: 'Ingredient positioning',
    difficulty: 'Medium',
    displayName: 'Filling Placement',
  },
  {
    id: 'maki-rolling-tech-medium',
    topic: 'Maki Rolls',
    pattern: 'Rolling Technique',
    variant: 'Bamboo mat rolling',
    difficulty: 'Medium',
    displayName: 'Rolling Technique',
  },
  // ============================================
  // Maki Rolls — Hard
  // ============================================
  {
    id: 'maki-cutting-hard',
    topic: 'Maki Rolls',
    pattern: 'Knife Skills',
    variant: 'Clean cut technique',
    difficulty: 'Hard',
    displayName: 'Precision Cutting',
  },
  {
    id: 'maki-troubleshoot-hard',
    topic: 'Maki Rolls',
    pattern: 'Troubleshooting',
    variant: 'Diagnosing roll failures',
    difficulty: 'Hard',
    displayName: 'Roll Troubleshooting',
  },

  // ============================================
  // Uramaki (Inside-Out Rolls) — Easy
  // ============================================
  {
    id: 'ura-rice-outside-easy',
    topic: 'Uramaki Rolls',
    pattern: 'Rice-Outside Technique',
    variant: 'Flipping basics',
    difficulty: 'Easy',
    displayName: 'Rice-Outside Basics',
  },
  {
    id: 'ura-wrap-easy',
    topic: 'Uramaki Rolls',
    pattern: 'Plastic Wrap Method',
    variant: 'Mat protection',
    difficulty: 'Easy',
    displayName: 'Plastic Wrap Setup',
  },
  // ============================================
  // Uramaki (Inside-Out Rolls) — Medium
  // ============================================
  {
    id: 'ura-topping-medium',
    topic: 'Uramaki Rolls',
    pattern: 'Topping Adhesion',
    variant: 'Sesame and tobiko application',
    difficulty: 'Medium',
    displayName: 'Topping Application',
  },
  {
    id: 'ura-filling-balance-medium',
    topic: 'Uramaki Rolls',
    pattern: 'Filling Balance',
    variant: 'Texture and flavor pairing',
    difficulty: 'Medium',
    displayName: 'Filling Balance',
  },
  // ============================================
  // Uramaki (Inside-Out Rolls) — Hard
  // ============================================
  {
    id: 'ura-structure-hard',
    topic: 'Uramaki Rolls',
    pattern: 'Structural Integrity',
    variant: 'Preventing collapse with wet fillings',
    difficulty: 'Hard',
    displayName: 'Structural Engineering',
  },
  {
    id: 'ura-presentation-hard',
    topic: 'Uramaki Rolls',
    pattern: 'Presentation',
    variant: 'Plating and garnish design',
    difficulty: 'Hard',
    displayName: 'Advanced Presentation',
  },

  // ============================================
  // Temaki (Hand Rolls) — Easy
  // ============================================
  {
    id: 'temaki-cone-easy',
    topic: 'Temaki Hand Rolls',
    pattern: 'Cone Shaping',
    variant: 'Basic cone formation',
    difficulty: 'Easy',
    displayName: 'Cone Shaping Basics',
  },
  {
    id: 'temaki-nori-easy',
    topic: 'Temaki Hand Rolls',
    pattern: 'Nori Prep',
    variant: 'Sheet sizing and freshness',
    difficulty: 'Easy',
    displayName: 'Nori Preparation',
  },
  // ============================================
  // Temaki (Hand Rolls) — Medium
  // ============================================
  {
    id: 'temaki-filling-medium',
    topic: 'Temaki Hand Rolls',
    pattern: 'Filling Proportion',
    variant: 'Rice-to-filling ratio',
    difficulty: 'Medium',
    displayName: 'Filling Proportions',
  },
  {
    id: 'temaki-seal-medium',
    topic: 'Temaki Hand Rolls',
    pattern: 'Sealing Technique',
    variant: 'Rice grain adhesion',
    difficulty: 'Medium',
    displayName: 'Sealing Technique',
  },
  // ============================================
  // Temaki (Hand Rolls) — Hard
  // ============================================
  {
    id: 'temaki-timing-hard',
    topic: 'Temaki Hand Rolls',
    pattern: 'Timing & Freshness',
    variant: 'Nori crispness window',
    difficulty: 'Hard',
    displayName: 'Timing & Freshness',
  },
  {
    id: 'temaki-adapt-hard',
    topic: 'Temaki Hand Rolls',
    pattern: 'Adaptation',
    variant: 'Adjusting for non-standard ingredients',
    difficulty: 'Hard',
    displayName: 'Creative Adaptation',
  },
];

export function getDemoSkillsByTopic(topic: string): SATSkill[] {
  return demoSkills.filter((s) => s.topic === topic);
}

export function getDemoSkillById(id: string): SATSkill | undefined {
  return demoSkills.find((s) => s.id === id);
}
