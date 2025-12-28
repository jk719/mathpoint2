import { SATSkill } from '@/types/sat';

/**
 * SAT Math Skills
 *
 * Skills are organized by:
 * - topic: The main content area (e.g., "Linear Equations Two Variables")
 * - pattern: The specific pattern/type within that topic (e.g., "Perpendicular Lines")
 * - variant: The specific variation (e.g., "From non-standard form")
 * - difficulty: Easy, Medium, or Hard
 * - displayName: What students see in the UI
 *
 * Add skills here as you import questions.
 */
export const satSkills: SATSkill[] = [
  // ============================================
  // Linear Equations in Two Variables - Easy
  // ============================================
  {
    id: 'linear-eq-interp-coeff-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Interpretation',
    variant: 'Coefficient meaning',
    difficulty: 'Easy',
    displayName: 'Interpreting Coefficients',
  },
  {
    id: 'linear-eq-perp-slope-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'Find perpendicular slope',
    difficulty: 'Easy',
    displayName: 'Perpendicular Line Slope',
  },
  {
    id: 'linear-eq-table-verify-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Table Verification',
    variant: 'Check table values',
    difficulty: 'Easy',
    displayName: 'Verify Table Values',
  },
  {
    id: 'linear-eq-model-setup-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Model Setup',
    variant: 'Build equation from scenario',
    difficulty: 'Easy',
    displayName: 'Setting Up Linear Models',
  },
  {
    id: 'linear-eq-parallel-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parallel Lines',
    variant: 'Same slope',
    difficulty: 'Easy',
    displayName: 'Parallel Line Equations',
  },
  {
    id: 'linear-eq-slope-point-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Slope & Point',
    variant: 'From slope-intercept form',
    difficulty: 'Easy',
    displayName: 'Line from Slope and Point',
  },
  {
    id: 'linear-eq-graph-read-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Graph Reading',
    variant: 'Identify from graph',
    difficulty: 'Easy',
    displayName: 'Reading Linear Graphs',
  },
  {
    id: 'linear-eq-intercepts-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Intercepts',
    variant: 'Find y-intercept',
    difficulty: 'Easy',
    displayName: 'Finding Intercepts',
  },
  {
    id: 'linear-eq-table-to-eq-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Table to Equation',
    variant: 'Build equation from table',
    difficulty: 'Easy',
    displayName: 'Equation from Table',
  },
  {
    id: 'linear-eq-subst-solve-easy',
    topic: 'Linear Equations Two Variables',
    pattern: 'Substitution',
    variant: 'Substitute and solve',
    difficulty: 'Easy',
    displayName: 'Substitution in Linear Equations',
  },
];

/**
 * Get all unique topics from the skills list
 */
export function getSATTopics(): string[] {
  return [...new Set(satSkills.map(skill => skill.topic))];
}

/**
 * Get skills by topic
 */
export function getSkillsByTopic(topic: string): SATSkill[] {
  return satSkills.filter(skill => skill.topic === topic);
}

/**
 * Get skills by difficulty
 */
export function getSkillsByDifficulty(difficulty: SATSkill['difficulty']): SATSkill[] {
  return satSkills.filter(skill => skill.difficulty === difficulty);
}

/**
 * Get a skill by ID
 */
export function getSkillById(id: string): SATSkill | undefined {
  return satSkills.find(skill => skill.id === id);
}
