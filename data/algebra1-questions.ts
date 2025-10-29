// Initial Algebra 1 Question Bank
// Comprehensive set of questions across all domains and formats

import { AlgebraItem, ItemFormat } from '@/types/algebra1-diagnostic';
import { stepSelectionQuestions } from './algebra1-step-questions';
import { hybridQuestions } from './algebra1-hybrid-questions';

// Combine regular questions with step-selection questions and hybrid questions
const regularQuestions: AlgebraItem[] = [
  // =====================================
  // FOUNDATIONS OF ALGEBRA
  // =====================================

  // Distributive Property - MCQ
  {
    id: "ALG1_FOUND_001",
    code: "ALG1_FOUND_001",
    stem: "Simplify: $-3(2x - 4)$",
    format: "MCQ" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.FOUND.DIST_PROP", "ALG1.FOUND.DIST_EXPR"],
    primarySkillCode: "ALG1.FOUND.DIST_PROP",
    irtA: 1.2,
    irtB: 0.0,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$-6x + 12$", isCorrect: true },
      { id: "B", text: "$-6x - 12$", isCorrect: false, misconceptionCodes: ["ALG1-DIST-NEG"] },
      { id: "C", text: "$6x - 12$", isCorrect: false },
      { id: "D", text: "$-6x - 4$", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "Distribute -3 to each term: $-3(2x) + (-3)(-4) = -6x + 12$",
    hints: [
      { level: 1, content: "Remember to multiply -3 by each term inside the parentheses" },
      { level: 2, content: "What is $(-3) × (-4)$?" },
      { level: 3, content: "$(-3) × (2x) = -6x$ and $(-3) × (-4) = +12$" }
    ],
    timeLimit: 90
  },

  // Negative Exponents - TWO_TIER
  {
    id: "ALG1_FOUND_002",
    code: "ALG1_FOUND_002",
    stem: "Simplify: $2^{-3}$",
    format: "TWO_TIER" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.FOUND.NEG_EXP"],
    primarySkillCode: "ALG1.FOUND.NEG_EXP",
    irtA: 1.4,
    irtB: 0.5,
    irtC: 0.2,
    choices: [
      { id: "A", text: "$\\frac{1}{8}$", isCorrect: true },
      { id: "B", text: "$-8$", isCorrect: false, misconceptionCodes: ["ALG1-EXP-NEG-RECIP"] },
      { id: "C", text: "$\\frac{1}{6}$", isCorrect: false },
      { id: "D", text: "$-\\frac{1}{8}$", isCorrect: false, misconceptionCodes: ["ALG1-EXP-NEG-RECIP"] }
    ],
    correctAnswer: "A",
    reasoningPrompt: "Explain why negative exponents work this way.",
    reasoningRubric: [
      { pattern: "reciprocal", points: 2 },
      { pattern: "divide", points: 2 },
      { pattern: "flip", points: 1 },
      { pattern: "negative means negative", points: 0, misconceptionCodes: ["ALG1-EXP-NEG-RECIP"] }
    ],
    solution: "$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$",
    timeLimit: 120
  },

  // Order of Operations - NUM
  {
    id: "ALG1_FOUND_003",
    code: "ALG1_FOUND_003",
    stem: "Evaluate: $3 + 2 × (4^2 - 10)$",
    format: "NUM" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.FOUND.PEMDAS"],
    primarySkillCode: "ALG1.FOUND.PEMDAS",
    irtA: 1.0,
    irtB: -0.3,
    irtC: 0.15,
    correctAnswer: 15,
    rubric: [
      { pattern: "15", points: 1 },
      { pattern: "23", points: 0, misconceptionCodes: ["ALG1-PEMDAS-EXP"] },
      { pattern: "19", points: 0 }
    ],
    solution: "First: $4^2 = 16$, then $16 - 10 = 6$, then $2 × 6 = 12$, finally $3 + 12 = 15$",
    hints: [
      { level: 1, content: "Follow PEMDAS: Parentheses first, including the exponent inside" },
      { level: 2, content: "Calculate $4^2 - 10$ first" }
    ],
    timeLimit: 90
  },

  // =====================================
  // EQUATIONS & INEQUALITIES
  // =====================================

  // Linear Inequality - MCQ
  {
    id: "ALG1_EQ_001",
    code: "ALG1_EQ_001",
    stem: "Solve for x: $-2x + 5 > 9$",
    format: "MCQ" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.INEQ.MULTI_STEP", "ALG1.INEQ.FLIP"],
    primarySkillCode: "ALG1.INEQ.FLIP",
    irtA: 1.5,
    irtB: 0.3,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$x < -2$", isCorrect: true },
      { id: "B", text: "$x > -2$", isCorrect: false, misconceptionCodes: ["ALG1-INEQ-FLIP"] },
      { id: "C", text: "$x < 2$", isCorrect: false },
      { id: "D", text: "$x > 2$", isCorrect: false, misconceptionCodes: ["ALG1-INEQ-FLIP"] }
    ],
    correctAnswer: "A",
    solution: "$-2x + 5 > 9 → -2x > 4 → x < -2$ (flip sign when dividing by negative)",
    timeLimit: 120
  },

  // Absolute Value Equation - MULTI_STEP
  {
    id: "ALG1_EQ_002",
    code: "ALG1_EQ_002",
    stem: "Solve: $|2x - 3| = 7$",
    format: "MULTI_STEP" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: ["ALG1.EQ.ABS_SPLIT", "ALG1.EQ.TWO_STEP"],
    primarySkillCode: "ALG1.EQ.ABS_SPLIT",
    irtA: 1.3,
    irtB: 1.0,
    irtC: 0.2,
    steps: [
      {
        id: "step1",
        instruction: "Set up the two cases for the absolute value equation",
        expectedAnswer: "2x - 3 = 7 or 2x - 3 = -7",
        skillCode: "ALG1.EQ.ABS_SPLIT"
      },
      {
        id: "step2",
        instruction: "Solve the first equation: 2x - 3 = 7",
        expectedAnswer: "x = 5",
        skillCode: "ALG1.EQ.TWO_STEP"
      },
      {
        id: "step3",
        instruction: "Solve the second equation: 2x - 3 = -7",
        expectedAnswer: "x = -2",
        skillCode: "ALG1.EQ.TWO_STEP"
      }
    ],
    correctAnswer: "x = 5 or x = -2",
    solution: "Split into cases: 2x - 3 = 7 gives x = 5, and 2x - 3 = -7 gives x = -2",
    timeLimit: 180
  },

  // =====================================
  // LINEAR FUNCTIONS
  // =====================================

  // Slope Calculation - NUM
  {
    id: "ALG1_LINEAR_001",
    code: "ALG1_LINEAR_001",
    stem: "Find the slope of the line passing through points $(2, 3)$ and $(6, 11)$",
    format: "NUM" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.LINEAR.SLOPE"],
    primarySkillCode: "ALG1.LINEAR.SLOPE",
    irtA: 1.0,
    irtB: -0.5,
    irtC: 0.2,
    correctAnswer: 2,
    rubric: [
      { pattern: "2", points: 1 },
      { pattern: "0.5", points: 0, misconceptionCodes: ["ALG1-SLOPE-RUN-RISE"] },
      { pattern: "1/2", points: 0, misconceptionCodes: ["ALG1-SLOPE-RUN-RISE"] }
    ],
    solution: "Slope = $\\frac{y_2 - y_1}{x_2 - x_1} = \\frac{11 - 3}{6 - 2} = \\frac{8}{4} = 2$",
    timeLimit: 90
  },

  // Parallel Lines - TWO_TIER
  {
    id: "ALG1_LINEAR_002",
    code: "ALG1_LINEAR_002",
    stem: "Which line is parallel to $y = 3x - 5$?",
    format: "TWO_TIER" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.LINEAR.PARALLEL"],
    primarySkillCode: "ALG1.LINEAR.PARALLEL",
    irtA: 1.1,
    irtB: 0.2,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$y = 3x + 2$", isCorrect: true },
      { id: "B", text: "$y = -\\frac{1}{3}x + 2$", isCorrect: false, misconceptionCodes: ["ALG1-PARALLEL-RECIPROCAL"] },
      { id: "C", text: "$y = -3x + 5$", isCorrect: false },
      { id: "D", text: "$y = \\frac{1}{3}x - 5$", isCorrect: false }
    ],
    correctAnswer: "A",
    reasoningPrompt: "Explain how you know these lines are parallel.",
    reasoningRubric: [
      { pattern: "same slope", points: 2 },
      { pattern: "slope.*3", points: 1 },
      { pattern: "never intersect", points: 1 }
    ],
    solution: "Parallel lines have the same slope. Both have slope = 3",
    timeLimit: 120
  },

  // =====================================
  // SYSTEMS OF EQUATIONS
  // =====================================

  // System by Elimination - FR
  {
    id: "ALG1_SYSTEMS_001",
    code: "ALG1_SYSTEMS_001",
    stem: "Solve the system using elimination:\\n$2x + 3y = 13$\\n$2x - y = 5$",
    format: "FR" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.SYSTEMS.ELIMINATION"],
    primarySkillCode: "ALG1.SYSTEMS.ELIMINATION",
    irtA: 1.2,
    irtB: 0.4,
    irtC: 0.15,
    correctAnswer: "(3, 2)",
    rubric: [
      { pattern: "x.*3.*y.*2", points: 1 },
      { pattern: "\\(3.*2\\)", points: 1 },
      { pattern: "subtract", points: 0.5 },
      { pattern: "add", points: 0, misconceptionCodes: ["ALG1-SYSTEMS-ADD-ALWAYS"] }
    ],
    solution: "Subtract equations: $(2x + 3y) - (2x - y) = 13 - 5$, giving $4y = 8$, so $y = 2$. Then $x = 3$",
    timeLimit: 180
  },

  // =====================================
  // POLYNOMIALS & QUADRATICS
  // =====================================

  // FOIL Method - MCQ
  {
    id: "ALG1_POLY_001",
    code: "ALG1_POLY_001",
    stem: "Expand: $(x - 3)(x + 5)$",
    format: "MCQ" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.POLY.MULTIPLY"],
    primarySkillCode: "ALG1.POLY.MULTIPLY",
    irtA: 1.1,
    irtB: 0.0,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$x^2 + 2x - 15$", isCorrect: true },
      { id: "B", text: "$x^2 - 2x - 15$", isCorrect: false, misconceptionCodes: ["ALG1-FOIL-SIGN"] },
      { id: "C", text: "$x^2 + 8x - 15$", isCorrect: false },
      { id: "D", text: "$x^2 + 2x + 15$", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "FOIL: $x·x + x·5 + (-3)·x + (-3)·5 = x^2 + 5x - 3x - 15 = x^2 + 2x - 15$",
    timeLimit: 120
  },

  // Factoring Trinomial - ERROR_ANALYSIS
  {
    id: "ALG1_POLY_002",
    code: "ALG1_POLY_002",
    stem: "A student factored $x^2 + 7x + 12$ as $(x + 3)(x + 5)$. Find and fix the error.",
    format: "ERROR_ANALYSIS" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: ["ALG1.POLY.FACTOR_TRINOMIAL"],
    primarySkillCode: "ALG1.POLY.FACTOR_TRINOMIAL",
    irtA: 1.4,
    irtB: 0.8,
    irtC: 0.2,
    errorProblem: "$x^2 + 7x + 12 = (x + 3)(x + 5)$",
    errorLocation: "factor pair",
    errorType: "wrong factors of 12",
    correctAnswer: "(x + 3)(x + 4)",
    rubric: [
      { pattern: "3.*4", points: 0.5 },
      { pattern: "\\(x.*3\\).*\\(x.*4\\)", points: 1 },
      { pattern: "3.*5.*15", points: 0.3, misconceptionCodes: ["ALG1-FACTOR-WRONG-PAIRS"] }
    ],
    solution: "Need factors of 12 that add to 7: 3×4=12 and 3+4=7, so $(x+3)(x+4)$",
    timeLimit: 150
  },

  // Quadratic Formula - MULTI_STEP
  {
    id: "ALG1_QUAD_001",
    code: "ALG1_QUAD_001",
    stem: "Solve using the quadratic formula: $2x^2 - 5x + 2 = 0$",
    format: "MULTI_STEP" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: ["ALG1.QUAD.FORMULA", "ALG1.QUAD.DISCRIMINANT"],
    primarySkillCode: "ALG1.QUAD.FORMULA",
    irtA: 1.5,
    irtB: 1.2,
    irtC: 0.15,
    steps: [
      {
        id: "step1",
        instruction: "Identify a, b, and c",
        expectedAnswer: "a = 2, b = -5, c = 2",
        skillCode: "ALG1.QUAD.FORMULA"
      },
      {
        id: "step2",
        instruction: "Calculate the discriminant: $b^2 - 4ac$",
        expectedAnswer: "9",
        skillCode: "ALG1.QUAD.DISCRIMINANT"
      },
      {
        id: "step3",
        instruction: "Apply the quadratic formula",
        expectedAnswer: "x = 2 or x = 0.5",
        skillCode: "ALG1.QUAD.FORMULA"
      }
    ],
    correctAnswer: "x = 2 or x = 1/2",
    solution: "$x = \\frac{5 ± \\sqrt{25-16}}{4} = \\frac{5 ± 3}{4}$, giving x = 2 or x = 1/2",
    timeLimit: 240
  },

  // =====================================
  // RATIONAL EXPRESSIONS
  // =====================================

  // Simplifying Rationals - MCQ
  {
    id: "ALG1_RAT_001",
    code: "ALG1_RAT_001",
    stem: "Simplify: $\\frac{x^2 - 4}{x - 2}$",
    format: "MCQ" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.RAT.SIMPLIFY", "ALG1.POLY.DIFF_SQUARES"],
    primarySkillCode: "ALG1.RAT.SIMPLIFY",
    irtA: 1.3,
    irtB: 0.6,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$x + 2$", isCorrect: true },
      { id: "B", text: "$x - 2$", isCorrect: false },
      { id: "C", text: "$\\frac{x^2}{x} - \\frac{4}{2} = x - 2$", isCorrect: false, misconceptionCodes: ["ALG1-RAT-CANCEL-TERMS"] },
      { id: "D", text: "Cannot be simplified", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "$\\frac{x^2 - 4}{x - 2} = \\frac{(x+2)(x-2)}{x-2} = x + 2$ (for $x ≠ 2$)",
    hints: [
      { level: 1, content: "Factor the numerator first" },
      { level: 2, content: "$x^2 - 4$ is a difference of squares" }
    ],
    timeLimit: 120
  },

  // =====================================
  // EXPONENTIAL FUNCTIONS
  // =====================================

  // Exponential Growth - TWO_TIER
  {
    id: "ALG1_EXP_001",
    code: "ALG1_EXP_001",
    stem: "A bacteria population doubles every 3 hours. Starting with 100 bacteria, which function models the population after t hours?",
    format: "TWO_TIER" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: ["ALG1.EXP.GROWTH", "ALG1.EXP.DEFINITION"],
    primarySkillCode: "ALG1.EXP.GROWTH",
    irtA: 1.4,
    irtB: 1.0,
    irtC: 0.25,
    choices: [
      { id: "A", text: "$P(t) = 100 · 2^{t/3}$", isCorrect: true },
      { id: "B", text: "$P(t) = 100 · 2^{3t}$", isCorrect: false },
      { id: "C", text: "$P(t) = 100 · (1/2)^{t/3}$", isCorrect: false, misconceptionCodes: ["ALG1-EXP-GROWTH-DECAY"] },
      { id: "D", text: "$P(t) = 100 + 2t$", isCorrect: false, misconceptionCodes: ["ALG1-EXP-BASE-VARIABLE"] }
    ],
    correctAnswer: "A",
    reasoningPrompt: "Explain why this represents exponential growth.",
    reasoningRubric: [
      { pattern: "doubl", points: 1 },
      { pattern: "base.*2", points: 1 },
      { pattern: "t/3", points: 1 }
    ],
    solution: "Doubles every 3 hours means multiply by 2 every 3 hours: $2^{t/3}$",
    timeLimit: 150
  },

  // =====================================
  // STATISTICS & PROBABILITY
  // =====================================

  // Mean vs Median - NUM
  {
    id: "ALG1_STAT_001",
    code: "ALG1_STAT_001",
    stem: "Find the mean of the data set: 2, 8, 5, 10, 3, 7, 5",
    format: "NUM" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.STAT.MEAN"],
    primarySkillCode: "ALG1.STAT.MEAN",
    irtA: 0.8,
    irtB: -1.0,
    irtC: 0.2,
    correctAnswer: 5.71,
    rubric: [
      { pattern: "5\\.7", points: 1 },
      { pattern: "40/7", points: 1 },
      { pattern: "5", points: 0, misconceptionCodes: ["ALG1-STAT-MEAN-MEDIAN"] }
    ],
    solution: "Mean = $(2+8+5+10+3+7+5)/7 = 40/7 ≈ 5.71$",
    timeLimit: 90
  },

  // Probability - FR
  {
    id: "ALG1_STAT_002",
    code: "ALG1_STAT_002",
    stem: "A bag has 5 red balls and 3 blue balls. What is the probability of drawing a red ball?",
    format: "FR" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.PROB.THEORETICAL"],
    primarySkillCode: "ALG1.PROB.THEORETICAL",
    irtA: 0.9,
    irtB: -0.8,
    irtC: 0.15,
    correctAnswer: "5/8",
    rubric: [
      { pattern: "5/8", points: 1 },
      { pattern: "0\\.625", points: 1 },
      { pattern: "5/3", points: 0, misconceptionCodes: ["ALG1-PROB-ADD-GREATER-ONE"] }
    ],
    solution: "P(red) = favorable/total = 5/(5+3) = 5/8",
    timeLimit: 60
  },

  // =====================================
  // SEQUENCES
  // =====================================

  // Arithmetic Sequence - MULTI_STEP
  {
    id: "ALG1_SEQ_001",
    code: "ALG1_SEQ_001",
    stem: "Find the 10th term of the arithmetic sequence: 3, 7, 11, 15, ...",
    format: "MULTI_STEP" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.SEQ.ARITH_DEF", "ALG1.SEQ.ARITH_EXPLICIT"],
    primarySkillCode: "ALG1.SEQ.ARITH_EXPLICIT",
    irtA: 1.1,
    irtB: 0.3,
    irtC: 0.2,
    steps: [
      {
        id: "step1",
        instruction: "Find the common difference",
        expectedAnswer: "4",
        skillCode: "ALG1.SEQ.ARITH_DIFF"
      },
      {
        id: "step2",
        instruction: "Write the explicit formula",
        expectedAnswer: "a_n = 3 + (n-1)·4",
        skillCode: "ALG1.SEQ.ARITH_EXPLICIT"
      },
      {
        id: "step3",
        instruction: "Calculate the 10th term",
        expectedAnswer: "39",
        skillCode: "ALG1.SEQ.ARITH_TERMS"
      }
    ],
    correctAnswer: "39",
    solution: "$a_{10} = 3 + (10-1)·4 = 3 + 36 = 39$",
    timeLimit: 150
  },

  // Geometric Sequence - MCQ
  {
    id: "ALG1_SEQ_002",
    code: "ALG1_SEQ_002",
    stem: "Find the next term in the geometric sequence: 2, 6, 18, 54, ...",
    format: "MCQ" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.SEQ.GEOM_DEF", "ALG1.SEQ.GEOM_RATIO"],
    primarySkillCode: "ALG1.SEQ.GEOM_RATIO",
    irtA: 0.9,
    irtB: -0.5,
    irtC: 0.25,
    choices: [
      { id: "A", text: "162", isCorrect: true },
      { id: "B", text: "108", isCorrect: false },
      { id: "C", text: "72", isCorrect: false, misconceptionCodes: ["ALG1-SEQ-ARITH-MULT"] },
      { id: "D", text: "216", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "Common ratio = 3, so next term = 54 × 3 = 162",
    timeLimit: 60
  }
];

// Export the combined question bank including step-selection and hybrid questions
export const algebra1QuestionBank: AlgebraItem[] = [
  ...regularQuestions,
  ...stepSelectionQuestions,
  ...hybridQuestions
];

// Helper functions for question bank management

export function getQuestionsBySkill(skillCode: string): AlgebraItem[] {
  return algebra1QuestionBank.filter(q => q.skillCodes.includes(skillCode));
}

export function getQuestionsByFormat(format: ItemFormat): AlgebraItem[] {
  return algebra1QuestionBank.filter(q => q.format === format);
}

export function getQuestionsByDifficulty(difficulty: string): AlgebraItem[] {
  return algebra1QuestionBank.filter(q => q.difficulty === difficulty);
}

export function getQuestionsByDomain(domain: string): AlgebraItem[] {
  // This would require mapping skills to domains
  // For now, return based on question ID patterns
  const domainPrefixes: Record<string, string> = {
    "Foundations": "ALG1_FOUND",
    "Equations": "ALG1_EQ",
    "Linear": "ALG1_LINEAR",
    "Systems": "ALG1_SYSTEMS",
    "Polynomials": "ALG1_POLY",
    "Quadratic": "ALG1_QUAD",
    "Rational": "ALG1_RAT",
    "Exponential": "ALG1_EXP",
    "Statistics": "ALG1_STAT",
    "Sequences": "ALG1_SEQ"
  };

  const prefix = domainPrefixes[domain];
  if (!prefix) return [];

  return algebra1QuestionBank.filter(q => q.id.startsWith(prefix));
}

// Export question bank size for tracking
export const questionBankStats = {
  total: algebra1QuestionBank.length,
  byFormat: {
    MCQ: algebra1QuestionBank.filter(q => q.format === "MCQ").length,
    NUM: algebra1QuestionBank.filter(q => q.format === "NUM").length,
    FR: algebra1QuestionBank.filter(q => q.format === "FR").length,
    TWO_TIER: algebra1QuestionBank.filter(q => q.format === "TWO_TIER").length,
    ERROR_ANALYSIS: algebra1QuestionBank.filter(q => q.format === "ERROR_ANALYSIS").length,
    MULTI_STEP: algebra1QuestionBank.filter(q => q.format === "MULTI_STEP").length,
    STEP_SELECTION: algebra1QuestionBank.filter(q => q.format === "STEP_SELECTION").length,
    HYBRID_VERIFY: algebra1QuestionBank.filter(q => q.format === "HYBRID_VERIFY").length
  },
  byDifficulty: {
    LOW: algebra1QuestionBank.filter(q => q.difficulty === "LOW").length,
    MEDIUM: algebra1QuestionBank.filter(q => q.difficulty === "MEDIUM").length,
    HIGH: algebra1QuestionBank.filter(q => q.difficulty === "HIGH").length
  }
};