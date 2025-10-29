// Grade 6 Math Question Bank
// Comprehensive set of 10 questions across all domains and formats

export type Grade6ItemFormat =
  | 'MCQ'           // Multiple choice
  | 'NUM'           // Numerical input
  | 'FR'            // Free response
  | 'TWO_TIER'      // Answer + reasoning
  | 'ERROR_ANALYSIS' // Find and fix errors
  | 'MULTI_STEP'    // Step-by-step solution
  | 'STEP_SELECTION' // Check all steps that apply
  | 'HYBRID_VERIFY'; // Answer + process verification

export type Grade6ItemDifficulty = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Grade6Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  misconceptionCodes?: string[];
  feedback?: string;
}

export interface Grade6Rubric {
  pattern: string | RegExp;
  points: number;
  misconceptionCodes?: string[];
  feedback?: string;
}

export interface Grade6Hint {
  level: number;
  content: string;
  deductPoints?: number;
}

export interface Grade6QuestionStep {
  id: string;
  instruction: string;
  expectedAnswer: any;
  rubric?: Grade6Rubric[];
  skillCode?: string;
}

export interface Grade6StepOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order?: number;
  misconceptionCode?: string;
  skillCode?: string;
  feedback?: string;
}

export interface Grade6VerificationOption {
  id: string;
  text: string;
  isRequired?: boolean;
  isCorrect?: boolean;
  category?: 'setup' | 'solve' | 'check';
  points?: number;
  misconceptionCode?: string;
  skillCode?: string;
}

export interface Grade6Item {
  id: string;
  code: string;
  stem: string;
  format: Grade6ItemFormat;
  difficulty: Grade6ItemDifficulty;
  skillCodes: string[];
  primarySkillCode: string;
  irtA: number;
  irtB: number;
  irtC: number;
  choices?: Grade6Choice[];
  correctAnswer?: any;
  rubric?: Grade6Rubric[];
  reasoningPrompt?: string;
  reasoningRubric?: Grade6Rubric[];
  errorProblem?: string;
  errorLocation?: string;
  errorType?: string;
  steps?: Grade6QuestionStep[];
  stepOptions?: Grade6StepOption[];
  verificationPrompt?: string;
  verificationOptions?: Grade6VerificationOption[];
  requiredVerifications?: string[];
  solution?: string;
  hints?: Grade6Hint[];
  context?: string;
  timeLimit: number;
  avgTimeMs?: number;
  tags?: string[];
}

export const grade6Questions: Grade6Item[] = [
  // =====================================
  // 1. MCQ - Ratios (LOW)
  // =====================================
  {
    id: "GR6_RP_001",
    code: "GR6_RP_001",
    stem: "A recipe uses 2 cups of flour for every 3 cups of sugar. What is the ratio of flour to sugar?",
    format: "MCQ",
    difficulty: "LOW",
    skillCodes: ["GR6.RP.RATIO_CONCEPT", "GR6.RP.RATIO_LANGUAGE"],
    primarySkillCode: "GR6.RP.RATIO_CONCEPT",
    irtA: 0.9,
    irtB: -0.8,
    irtC: 0.25,
    choices: [
      { id: "A", text: "2:3", isCorrect: true },
      { id: "B", text: "3:2", isCorrect: false, misconceptionCodes: ["GR6-RATIO-REVERSE"] },
      { id: "C", text: "2:5", isCorrect: false },
      { id: "D", text: "5:3", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "The ratio of flour to sugar is 2:3 because there are 2 cups of flour for every 3 cups of sugar. The first number represents the first quantity mentioned (flour).",
    hints: [
      { level: 1, content: "The order matters! Look at what's mentioned first." },
      { level: 2, content: "Flour is mentioned first, so its amount comes first in the ratio." },
      { level: 3, content: "2 cups flour : 3 cups sugar = 2:3" }
    ],
    timeLimit: 60,
    tags: ["ratios", "basic"]
  },

  // =====================================
  // 2. NUM - Unit Rate (MEDIUM)
  // =====================================
  {
    id: "GR6_RP_002",
    code: "GR6_RP_002",
    stem: "A car travels 240 miles in 4 hours. What is the car's speed in miles per hour?",
    format: "NUM",
    difficulty: "MEDIUM",
    skillCodes: ["GR6.RP.UNIT_RATE"],
    primarySkillCode: "GR6.RP.UNIT_RATE",
    irtA: 1.1,
    irtB: -0.2,
    irtC: 0.15,
    correctAnswer: 60,
    rubric: [
      { pattern: "60", points: 1 },
      { pattern: "960", points: 0, misconceptionCodes: ["GR6-UNIT-RATE-MULTIPLY"], feedback: "Divide, don't multiply, to find per hour" },
      { pattern: "0.0167", points: 0, feedback: "Make sure you divided in the right order" }
    ],
    solution: "To find miles per hour, divide total miles by total hours: $240 \\div 4 = 60$ miles per hour",
    hints: [
      { level: 1, content: "'Per hour' means for every 1 hour" },
      { level: 2, content: "Divide the total distance by the total time" },
      { level: 3, content: "Calculate: 240 ÷ 4" }
    ],
    timeLimit: 90,
    tags: ["unit-rate", "division"]
  },

  // =====================================
  // 3. MCQ - Absolute Value (MEDIUM)
  // =====================================
  {
    id: "GR6_NS_001",
    code: "GR6_NS_001",
    stem: "What is the value of $|-8|$?",
    format: "MCQ",
    difficulty: "MEDIUM",
    skillCodes: ["GR6.NS.ABSOLUTE_VALUE", "GR6.NS.INTEGERS"],
    primarySkillCode: "GR6.NS.ABSOLUTE_VALUE",
    irtA: 1.0,
    irtB: 0.1,
    irtC: 0.25,
    choices: [
      { id: "A", text: "8", isCorrect: true },
      { id: "B", text: "-8", isCorrect: false, misconceptionCodes: ["GR6-ABS-VAL-NEGATIVE"] },
      { id: "C", text: "0", isCorrect: false },
      { id: "D", text: "16", isCorrect: false }
    ],
    correctAnswer: "A",
    solution: "The absolute value of -8 is 8 because absolute value represents the distance from zero on the number line, which is always positive.",
    hints: [
      { level: 1, content: "Absolute value is the distance from zero" },
      { level: 2, content: "Distance is always positive or zero" },
      { level: 3, content: "-8 is 8 units away from 0" }
    ],
    timeLimit: 60,
    tags: ["absolute-value", "integers"]
  },

  // =====================================
  // 4. NUM - Fraction Division (HIGH)
  // =====================================
  {
    id: "GR6_NS_002",
    code: "GR6_NS_002",
    stem: "Calculate: $\\frac{3}{4} \\div \\frac{2}{5}$\\n\\nExpress your answer as a fraction in simplest form (e.g., 3/4).",
    format: "NUM",
    difficulty: "HIGH",
    skillCodes: ["GR6.NS.DIV_FRACTIONS"],
    primarySkillCode: "GR6.NS.DIV_FRACTIONS",
    irtA: 1.4,
    irtB: 0.7,
    irtC: 0.15,
    correctAnswer: "15/8",
    rubric: [
      { pattern: /^15\/8$/, points: 1 },
      { pattern: /^1\.875$/, points: 1, feedback: "Correct! You can also express this as 15/8" },
      { pattern: /^1\s*7\/8$/, points: 1, feedback: "Correct! You can also express this as 15/8" },
      { pattern: /^20\/6$/, points: 0.3, misconceptionCodes: ["GR6-DIV-FRAC-FLIP-BOTH"], feedback: "Don't flip both fractions - only flip the divisor" },
      { pattern: /^6\/20$/, points: 0, feedback: "Remember to multiply, not divide, after flipping" }
    ],
    solution: "Keep-Change-Flip: $\\frac{3}{4} \\div \\frac{2}{5} = \\frac{3}{4} \\times \\frac{5}{2} = \\frac{15}{8}$",
    hints: [
      { level: 1, content: "Use Keep-Change-Flip method" },
      { level: 2, content: "Keep 3/4, change ÷ to ×, flip 2/5 to 5/2" },
      { level: 3, content: "Calculate: (3 × 5) / (4 × 2)" }
    ],
    timeLimit: 120,
    tags: ["fractions", "division"]
  },

  // =====================================
  // 5. TWO_TIER - Exponents (MEDIUM)
  // =====================================
  {
    id: "GR6_EE_001",
    code: "GR6_EE_001",
    stem: "What is the value of $4^3$?",
    format: "TWO_TIER",
    difficulty: "MEDIUM",
    skillCodes: ["GR6.EE.EXPONENTS"],
    primarySkillCode: "GR6.EE.EXPONENTS",
    irtA: 1.2,
    irtB: 0.2,
    irtC: 0.2,
    choices: [
      { id: "A", text: "64", isCorrect: true },
      { id: "B", text: "12", isCorrect: false, misconceptionCodes: ["GR6-EXPONENT-MULTIPLY"] },
      { id: "C", text: "16", isCorrect: false },
      { id: "D", text: "81", isCorrect: false }
    ],
    correctAnswer: "A",
    reasoningPrompt: "Explain what the exponent 3 means in this expression.",
    reasoningRubric: [
      { pattern: /multiply.*three times/i, points: 2 },
      { pattern: /4.*4.*4/i, points: 2 },
      { pattern: /repeated multiplication/i, points: 2 },
      { pattern: /multiply.*2/i, points: 0, misconceptionCodes: ["GR6-EXPONENT-MULTIPLY"] }
    ],
    solution: "$4^3 = 4 \\times 4 \\times 4 = 64$. The exponent tells us how many times to multiply the base by itself.",
    hints: [
      { level: 1, content: "The exponent tells you how many times to use the base in multiplication" },
      { level: 2, content: "4³ means 4 × 4 × 4" }
    ],
    timeLimit: 120,
    tags: ["exponents", "reasoning"]
  },

  // =====================================
  // 6. FR - Coordinate Plane (MEDIUM)
  // =====================================
  {
    id: "GR6_NS_003",
    code: "GR6_NS_003",
    stem: "A point is located 4 units to the right of the origin and 5 units up. What are the coordinates of this point?\\n\\nWrite your answer in the form (x, y).",
    format: "FR",
    difficulty: "MEDIUM",
    skillCodes: ["GR6.NS.COORD_PLANE"],
    primarySkillCode: "GR6.NS.COORD_PLANE",
    irtA: 1.1,
    irtB: 0.0,
    irtC: 0.15,
    correctAnswer: "(4, 5)",
    rubric: [
      { pattern: /^\(4,\s*5\)$/, points: 1 },
      { pattern: /^4,\s*5$/, points: 0.9, feedback: "Correct values! Remember to use parentheses: (4, 5)" },
      { pattern: /^\(5,\s*4\)$/, points: 0, misconceptionCodes: ["GR6-COORD-PLANE-ORDER"], feedback: "Check the order - x-coordinate comes first" },
      { pattern: /^5,\s*4$/, points: 0, misconceptionCodes: ["GR6-COORD-PLANE-ORDER"] }
    ],
    solution: "Right means positive x-direction (4), up means positive y-direction (5). Coordinates are written as (x, y) = (4, 5).",
    hints: [
      { level: 1, content: "Remember: coordinates are (x, y)" },
      { level: 2, content: "Right/left is x, up/down is y" },
      { level: 3, content: "4 right means x = 4, 5 up means y = 5" }
    ],
    timeLimit: 90,
    tags: ["coordinate-plane", "graphing"]
  },

  // =====================================
  // 7. ERROR_ANALYSIS - Distributive Property (HIGH)
  // =====================================
  {
    id: "GR6_EE_002",
    code: "GR6_EE_002",
    stem: "A student simplified the expression $3(x + 4)$ and got $3x + 4$.\\n\\nFind the error and write the correct simplified expression.",
    format: "ERROR_ANALYSIS",
    difficulty: "HIGH",
    skillCodes: ["GR6.EE.DIST_PROP", "GR6.EE.EQUIV_EXPR"],
    primarySkillCode: "GR6.EE.DIST_PROP",
    irtA: 1.3,
    irtB: 0.8,
    irtC: 0.15,
    errorProblem: "$3(x + 4) = 3x + 4$",
    errorLocation: "The 4 should be multiplied by 3",
    errorType: "Distributive Property - Only distributed to first term",
    correctAnswer: "3x + 12",
    rubric: [
      { pattern: /^3x\s*\+\s*12$/, points: 1 },
      { pattern: /distribute|multiply.*both/i, points: 0.5, feedback: "Good explanation! What's the correct answer?" },
      { pattern: /^3x\s*\+\s*4$/, points: 0, misconceptionCodes: ["GR6-DIST-PROP-ADD-ONLY"] }
    ],
    solution: "The error is that 3 was only distributed to x, not to 4. The correct simplification is: $3(x + 4) = 3 \\cdot x + 3 \\cdot 4 = 3x + 12$",
    hints: [
      { level: 1, content: "The distributive property says to multiply the outside number by EVERY term inside" },
      { level: 2, content: "What is 3 × 4?" },
      { level: 3, content: "3(x) + 3(4) = 3x + 12" }
    ],
    timeLimit: 150,
    tags: ["error-analysis", "distributive-property"]
  },

  // =====================================
  // 8. MULTI_STEP - Percent Problem (HIGH)
  // =====================================
  {
    id: "GR6_RP_003",
    code: "GR6_RP_003",
    stem: "A shirt originally costs $40. It is on sale for 25% off. What is the sale price?",
    format: "MULTI_STEP",
    difficulty: "HIGH",
    skillCodes: ["GR6.RP.PERCENT_PROBLEMS", "GR6.RP.PERCENT_CONCEPT"],
    primarySkillCode: "GR6.RP.PERCENT_PROBLEMS",
    irtA: 1.4,
    irtB: 0.9,
    irtC: 0.15,
    steps: [
      {
        id: "step1",
        instruction: "Calculate the discount amount (25% of $40)",
        expectedAnswer: "10",
        skillCode: "GR6.RP.PERCENT_CONCEPT",
        rubric: [
          { pattern: "10", points: 1 },
          { pattern: "0.25", points: 0.3, feedback: "That's the decimal form of 25%, but not the dollar amount" }
        ]
      },
      {
        id: "step2",
        instruction: "Calculate the sale price by subtracting the discount from the original price",
        expectedAnswer: "30",
        skillCode: "GR6.RP.PERCENT_PROBLEMS",
        rubric: [
          { pattern: "30", points: 1 },
          { pattern: "50", points: 0, feedback: "Remember to subtract the discount, not add it" }
        ]
      }
    ],
    solution: "Step 1: Find 25% of $40: $0.25 \\times 40 = \\$10$\\nStep 2: Subtract discount from original price: $\\$40 - \\$10 = \\$30$",
    hints: [
      { level: 1, content: "First find 25% of 40 to get the discount amount" },
      { level: 2, content: "25% = 0.25, so multiply 0.25 × 40" }
    ],
    timeLimit: 180,
    tags: ["percent", "multi-step", "real-world"]
  },

  // =====================================
  // 9. STEP_SELECTION - Area of Triangle (LOW)
  // =====================================
  {
    id: "GR6_G_001",
    code: "GR6_G_001",
    stem: "To find the area of a triangle with base 8 cm and height 5 cm, which steps should you follow?\\n\\n**Check ALL correct steps in order:**",
    format: "STEP_SELECTION",
    difficulty: "LOW",
    skillCodes: ["GR6.G.AREA_TRIANGLE"],
    primarySkillCode: "GR6.G.AREA_TRIANGLE",
    irtA: 0.9,
    irtB: -0.5,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Identify the base and height: base = 8 cm, height = 5 cm",
        isCorrect: true,
        order: 1,
        skillCode: "GR6.G.AREA_TRIANGLE"
      },
      {
        id: "step2",
        text: "Add the base and height: 8 + 5",
        isCorrect: false,
        misconceptionCode: "GR6-AREA-PERIMETER",
        feedback: "We multiply base and height for area, not add them"
      },
      {
        id: "step3",
        text: "Multiply base times height: 8 × 5 = 40",
        isCorrect: true,
        order: 2,
        skillCode: "GR6.G.AREA_TRIANGLE"
      },
      {
        id: "step4",
        text: "Divide by 2: 40 ÷ 2 = 20",
        isCorrect: true,
        order: 3,
        skillCode: "GR6.G.AREA_TRIANGLE"
      },
      {
        id: "step5",
        text: "Multiply by 2: 40 × 2 = 80",
        isCorrect: false,
        feedback: "Triangle area formula divides by 2, not multiplies"
      },
      {
        id: "step6",
        text: "The area is 20 square cm",
        isCorrect: true,
        order: 4,
        skillCode: "GR6.G.AREA_TRIANGLE"
      }
    ],
    correctAnswer: ["step1", "step3", "step4", "step6"],
    solution: "To find the area of a triangle: (1) Identify base and height, (2) Multiply them together, (3) Divide by 2. Formula: $A = \\frac{1}{2}bh = \\frac{1}{2}(8)(5) = 20$ square cm",
    hints: [
      { level: 1, content: "The formula for triangle area is A = (1/2) × base × height" },
      { level: 2, content: "You need to multiply base and height, then divide by 2" }
    ],
    timeLimit: 120,
    tags: ["geometry", "area", "step-selection"]
  },

  // =====================================
  // 10. HYBRID_VERIFY - Mean Calculation (MEDIUM)
  // =====================================
  {
    id: "GR6_SP_001",
    code: "GR6_SP_001",
    stem: "Find the mean (average) of these test scores: 85, 90, 78, 92, 85\\n\\nWhat is the mean score?",
    format: "HYBRID_VERIFY",
    difficulty: "MEDIUM",
    skillCodes: ["GR6.SP.MEAN"],
    primarySkillCode: "GR6.SP.MEAN",
    irtA: 1.2,
    irtB: 0.1,
    irtC: 0.15,
    correctAnswer: 86,
    rubric: [
      { pattern: "86", points: 1 },
      { pattern: "85", points: 0, misconceptionCodes: ["GR6-MEAN-MODE"], feedback: "That's the mode (most frequent), not the mean" },
      { pattern: "430", points: 0.2, feedback: "That's the sum - remember to divide by the count" }
    ],
    verificationPrompt: "Select ALL the steps you used to find the mean:",
    verificationOptions: [
      {
        id: "v1",
        text: "Added all the scores together",
        isRequired: true,
        isCorrect: true,
        category: "setup",
        points: 0.3,
        skillCode: "GR6.SP.MEAN"
      },
      {
        id: "v2",
        text: "Counted how many scores there are",
        isRequired: true,
        isCorrect: true,
        category: "setup",
        points: 0.3,
        skillCode: "GR6.SP.MEAN"
      },
      {
        id: "v3",
        text: "Divided the sum by the count",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 0.4,
        skillCode: "GR6.SP.MEAN"
      },
      {
        id: "v4",
        text: "Found the middle value when ordered",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "GR6-MEAN-MODE",
        feedback: "That's how to find the median, not the mean"
      },
      {
        id: "v5",
        text: "Found the most frequent value",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "GR6-MEAN-MODE",
        feedback: "That's how to find the mode, not the mean"
      }
    ],
    requiredVerifications: ["v1", "v2", "v3"],
    solution: "To find the mean: (1) Add all scores: $85 + 90 + 78 + 92 + 85 = 430$, (2) Count the scores: 5, (3) Divide: $430 \\div 5 = 86$",
    hints: [
      { level: 1, content: "Mean = sum of all values ÷ number of values" },
      { level: 2, content: "First add all five test scores" },
      { level: 3, content: "Then divide your sum by 5" }
    ],
    timeLimit: 120,
    tags: ["statistics", "mean", "hybrid"]
  }
];

// Helper functions
export function getGrade6QuestionsByDifficulty(difficulty: Grade6ItemDifficulty): Grade6Item[] {
  return grade6Questions.filter(q => q.difficulty === difficulty);
}

export function getGrade6QuestionsByFormat(format: Grade6ItemFormat): Grade6Item[] {
  return grade6Questions.filter(q => q.format === format);
}

export function getGrade6QuestionsBySkill(skillCode: string): Grade6Item[] {
  return grade6Questions.filter(q => q.skillCodes.includes(skillCode));
}
