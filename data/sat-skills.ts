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

  // ============================================
  // Linear Equations in Two Variables - Medium
  // ============================================
  {
    id: 'linear-eq-slope-calc-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Slope Calculation',
    variant: 'From two points or standard form',
    difficulty: 'Medium',
    displayName: 'Calculating Slope',
  },
  {
    id: 'linear-eq-perp-standard-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'From standard form Ax + By = C',
    difficulty: 'Medium',
    displayName: 'Perpendicular from Standard Form',
  },
  {
    id: 'linear-eq-parallel-standard-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parallel Lines',
    variant: 'From standard form',
    difficulty: 'Medium',
    displayName: 'Parallel from Standard Form',
  },
  {
    id: 'linear-eq-interp-variable-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Interpretation',
    variant: 'Variable or term meaning',
    difficulty: 'Medium',
    displayName: 'Interpreting Variables and Terms',
  },
  {
    id: 'linear-eq-equation-build-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Equation Building',
    variant: 'From points or table',
    difficulty: 'Medium',
    displayName: 'Building Equations',
  },
  {
    id: 'linear-eq-subst-multi-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Substitution',
    variant: 'Multi-step substitution',
    difficulty: 'Medium',
    displayName: 'Multi-step Substitution',
  },
  {
    id: 'linear-eq-table-to-eq-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Table to Equation',
    variant: 'Build equation from table',
    difficulty: 'Medium',
    displayName: 'Table to Equation',
  },
  {
    id: 'linear-eq-graph-standard-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Graph to Equation',
    variant: 'Write in standard form',
    difficulty: 'Medium',
    displayName: 'Graph to Standard Form',
  },
  {
    id: 'linear-eq-word-problem-medium',
    topic: 'Linear Equations Two Variables',
    pattern: 'Word Problem',
    variant: 'Setup and solve',
    difficulty: 'Medium',
    displayName: 'Word Problems',
  },

  // ============================================
  // Linear Equations in Two Variables - Hard
  // ============================================
  {
    id: 'linear-eq-perp-nonstandard-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'From non-standard form Ay + Bx = C',
    difficulty: 'Hard',
    displayName: 'Perpendicular Lines — Advanced',
  },
  {
    id: 'linear-eq-perp-graph-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'From graph reading',
    difficulty: 'Hard',
    displayName: 'Perpendicular from Graphs',
  },
  {
    id: 'linear-eq-perp-vertical-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'Vertical or horizontal lines',
    difficulty: 'Hard',
    displayName: 'Perpendicular — Special Cases',
  },
  {
    id: 'linear-eq-perp-abstract-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Perpendicular Lines',
    variant: 'Abstract relationship',
    difficulty: 'Hard',
    displayName: 'Perpendicular — Abstract',
  },
  {
    id: 'linear-eq-param-single-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parameter Determination',
    variant: 'Single parameter from constraints',
    difficulty: 'Hard',
    displayName: 'Finding Parameters',
  },
  {
    id: 'linear-eq-param-dual-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parameter Determination',
    variant: 'Two parameters sequentially',
    difficulty: 'Hard',
    displayName: 'Finding Multiple Parameters',
  },
  {
    id: 'linear-eq-graph-param-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Graph to Parameter',
    variant: 'Extract parameter from graph',
    difficulty: 'Hard',
    displayName: 'Parameters from Graphs',
  },
  {
    id: 'linear-eq-interp-diff-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Interpretation',
    variant: 'Coefficient difference meaning',
    difficulty: 'Hard',
    displayName: 'Interpreting Differences',
  },
  {
    id: 'linear-eq-interp-product-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Interpretation',
    variant: 'Product or term interpretation',
    difficulty: 'Hard',
    displayName: 'Interpreting Products',
  },
  {
    id: 'linear-eq-intercept-frac-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Intercept Finding',
    variant: 'With fractional coefficients',
    difficulty: 'Hard',
    displayName: 'Intercepts — Advanced',
  },
  {
    id: 'linear-eq-intercept-ratio-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Intercept Finding',
    variant: 'Intercept ratio shortcut',
    difficulty: 'Hard',
    displayName: 'Intercept Ratios',
  },
  {
    id: 'linear-eq-transform-translate-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Transformation',
    variant: 'Translation up or down',
    difficulty: 'Hard',
    displayName: 'Translating Lines',
  },
  {
    id: 'linear-eq-transform-function-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Transformation',
    variant: 'Function notation y = f(x) + k',
    difficulty: 'Hard',
    displayName: 'Function Transformations',
  },
  {
    id: 'linear-eq-table-chain-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Table to Equation',
    variant: 'Table to equation to intercept',
    difficulty: 'Hard',
    displayName: 'Tables to Intercepts',
  },
  {
    id: 'linear-eq-parallel-constraint-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parallel Lines',
    variant: 'Parallel with additional constraint',
    difficulty: 'Hard',
    displayName: 'Parallel Lines — Advanced',
  },
  {
    id: 'linear-eq-mixture-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Mixture Problem',
    variant: 'Weighted average with percentages',
    difficulty: 'Hard',
    displayName: 'Mixture Problems',
  },
  {
    id: 'linear-eq-param-constraint-hard',
    topic: 'Linear Equations Two Variables',
    pattern: 'Parameter Constraints',
    variant: 'Match constraints to graph',
    difficulty: 'Hard',
    displayName: 'Constraints to Graphs',
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
