// MVP Question Bank for Algebra 1 Diagnostic
// Curated set of 15 questions for school presentations and demos
// Covers core domains with all 8 question formats

import { AlgebraItem } from '@/types/algebra1-diagnostic';

// This is a carefully selected subset from the full algebra1QuestionBank
// Selected to demonstrate the full capability of the adaptive diagnostic system
// while keeping the assessment time to 10-15 minutes

export const algebra1MvpQuestions: AlgebraItem[] = [
  // Import IDs of selected questions for MVP
  // These will be filtered from the full question bank
];

// Question IDs selected for MVP (in recommended order)
export const mvpQuestionIds = [
  // FOUNDATIONS (2 questions)
  "ALG1_FOUND_001",  // Distributive property - MCQ, MEDIUM
  "ALG1_FOUND_003",  // Order of operations - NUM, MEDIUM

  // EQUATIONS & INEQUALITIES (3 questions)
  "ALG1_STEP_001",   // Two-step equation - STEP_SELECTION, MEDIUM
  "ALG1_HYBRID_001", // Linear equation - HYBRID_VERIFY, LOW
  "ALG1_STEP_003",   // Inequality with flip - STEP_SELECTION, HIGH

  // LINEAR FUNCTIONS (2 questions)
  "ALG1_LINEAR_001", // Slope calculation - NUM, LOW
  "ALG1_LINEAR_002", // Parallel lines - TWO_TIER, MEDIUM

  // SYSTEMS (1 question)
  "ALG1_SYSTEMS_001", // Elimination method - FR, MEDIUM

  // POLYNOMIALS (2 questions)
  "ALG1_POLY_001",   // FOIL method - MCQ, MEDIUM
  "ALG1_POLY_002",   // Factoring error - ERROR_ANALYSIS, HIGH

  // QUADRATICS (2 questions)
  "ALG1_STEP_004",   // Factoring - STEP_SELECTION, HIGH
  "ALG1_QUAD_001",   // Quadratic formula - MULTI_STEP, HIGH

  // EXPONENTIAL (1 question)
  "ALG1_EXP_001",    // Exponential growth - TWO_TIER, HIGH

  // SEQUENCES (1 question)
  "ALG1_SEQ_001",    // Arithmetic sequence - MULTI_STEP, MEDIUM

  // STATISTICS (1 question)
  "ALG1_STAT_001"    // Mean calculation - NUM, LOW
];

// Filter function to get MVP questions from full bank
export function getMvpQuestions(fullQuestionBank: AlgebraItem[]): AlgebraItem[] {
  return mvpQuestionIds
    .map(id => fullQuestionBank.find(q => q.id === id))
    .filter((q): q is AlgebraItem => q !== undefined);
}

// MVP Statistics
export const mvpStats = {
  totalQuestions: 15,
  estimatedTime: "10-15 minutes",

  byFormat: {
    MCQ: 2,              // Multiple choice
    NUM: 3,              // Numeric answer
    FR: 1,               // Free response
    TWO_TIER: 2,         // Answer + reasoning
    ERROR_ANALYSIS: 1,   // Find and fix error
    MULTI_STEP: 2,       // Multi-step guided
    STEP_SELECTION: 3,   // Check all steps
    HYBRID_VERIFY: 1     // Answer + verification
  },

  byDifficulty: {
    LOW: 3,     // 20%
    MEDIUM: 6,  // 40%
    HIGH: 6     // 40%
  },

  domainCoverage: [
    "Foundations of Algebra",
    "Equations & Inequalities",
    "Linear Functions",
    "Systems of Equations",
    "Polynomials",
    "Quadratic Functions",
    "Exponential Functions",
    "Sequences",
    "Statistics"
  ],

  skillsCovered: 38, // Approximate number of atomic skills tested

  features: [
    "Advanced adaptive algorithm for skill mastery estimation",
    "Smart item selection for optimal assessment",
    "8 different question formats to assess understanding depth",
    "Misconception detection and targeted feedback",
    "Detailed diagnostic report with mastery levels",
    "Real-time adaptive difficulty adjustment"
  ]
};

// Helper to check if MVP mode should be used
export function shouldUseMvpMode(params?: { mvp?: boolean; demo?: boolean }): boolean {
  return params?.mvp === true || params?.demo === true;
}

// Export default
export default algebra1MvpQuestions;
