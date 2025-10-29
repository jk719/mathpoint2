// Comprehensive Algebra 1 Misconception Library
// Organized by domain with detailed remediation strategies

export interface AlgebraMisconception {
  code: string;
  name: string;
  description: string;
  category: string;
  domain: string;
  affectedSkills: string[]; // Skill codes from algebra1-skills.ts
  indicators: string[]; // Common error patterns that indicate this misconception
  remediation: string;
  examples: {
    incorrect: string;
    correct: string;
    explanation: string;
  }[];
}

export const algebra1Misconceptions: AlgebraMisconception[] = [
  // =====================================
  // FOUNDATIONS OF ALGEBRA
  // =====================================

  {
    code: "ALG1-DIST-NEG",
    name: "Dropping Negative When Distributing",
    description: "Student loses the negative sign when distributing a negative number",
    category: "Distributive Property",
    domain: "Foundations of Algebra",
    affectedSkills: ["ALG1.FOUND.DIST_PROP", "ALG1.FOUND.DIST_EXPR"],
    indicators: [
      "-2(x + 3) = -2x + 6",
      "-(3x - 4) = -3x - 4",
      "-5(2x - 1) = -10x - 5"
    ],
    remediation: "Emphasize that the negative sign applies to EVERY term inside parentheses. Use visual aids like arrows showing distribution to each term.",
    examples: [{
      incorrect: "-2(x + 3) = -2x + 6",
      correct: "-2(x + 3) = -2x - 6",
      explanation: "When distributing -2, multiply -2 by both x AND +3: (-2)×(+3) = -6"
    }]
  },

  {
    code: "ALG1-PEMDAS-EXP",
    name: "Exponents Before Parentheses",
    description: "Student incorrectly applies exponents before evaluating parentheses",
    category: "Order of Operations",
    domain: "Foundations of Algebra",
    affectedSkills: ["ALG1.FOUND.PEMDAS"],
    indicators: [
      "(2 + 3)² = 2² + 3²",
      "(4 - 1)² = 4² - 1²",
      "2(3 + 4)² = 6 + 8²"
    ],
    remediation: "Review PEMDAS hierarchy: Parentheses ALWAYS come first. Show step-by-step evaluation.",
    examples: [{
      incorrect: "(2 + 3)² = 2² + 3² = 4 + 9 = 13",
      correct: "(2 + 3)² = 5² = 25",
      explanation: "Evaluate inside parentheses first: 2+3=5, then square the result"
    }]
  },

  {
    code: "ALG1-EXP-NEG-RECIP",
    name: "Negative Exponent as Negative Number",
    description: "Student thinks x^(-n) = -x^n instead of 1/x^n",
    category: "Exponents",
    domain: "Foundations of Algebra",
    affectedSkills: ["ALG1.FOUND.NEG_EXP"],
    indicators: [
      "2^(-3) = -8",
      "x^(-2) = -x²",
      "5^(-1) = -5"
    ],
    remediation: "Negative exponent means reciprocal, not negative value. Use pattern recognition: x³, x², x¹, x⁰, x⁻¹ shows division pattern.",
    examples: [{
      incorrect: "2^(-3) = -8",
      correct: "2^(-3) = 1/2³ = 1/8",
      explanation: "Negative exponent means 'reciprocal of', not 'negative of'"
    }]
  },

  {
    code: "ALG1-RAD-ADD-UNLIKE",
    name: "Adding Unlike Radicals",
    description: "Student adds radicals with different radicands as if they were like terms",
    category: "Radicals",
    domain: "Foundations of Algebra",
    affectedSkills: ["ALG1.FOUND.ADD_RAD"],
    indicators: [
      "√2 + √3 = √5",
      "2√5 + 3√2 = 5√7",
      "√8 + √2 = √10"
    ],
    remediation: "Only like radicals can be combined. Compare to variable terms: you can't combine 2x + 3y.",
    examples: [{
      incorrect: "√2 + √3 = √5",
      correct: "√2 + √3 cannot be simplified further",
      explanation: "Different radicands cannot be combined, just like 2x + 3y ≠ 5xy"
    }]
  },

  // =====================================
  // EQUATIONS & INEQUALITIES
  // =====================================

  {
    code: "ALG1-INEQ-FLIP",
    name: "Not Flipping Inequality",
    description: "Student doesn't flip inequality sign when multiplying/dividing by negative",
    category: "Inequalities",
    domain: "Equations & Inequalities",
    affectedSkills: ["ALG1.INEQ.FLIP", "ALG1.INEQ.MULTI_STEP"],
    indicators: [
      "-2x > 6 → x > -3",
      "-x < 5 → x < -5",
      "x/-3 ≥ 2 → x ≥ -6"
    ],
    remediation: "When multiplying or dividing by a negative, the inequality REVERSES. Test with numbers: if -2 < -1, then 2 > 1.",
    examples: [{
      incorrect: "-2x > 6 → x > -3",
      correct: "-2x > 6 → x < -3",
      explanation: "Dividing both sides by -2 flips the inequality sign"
    }]
  },

  {
    code: "ALG1-ABS-ONE-SOLUTION",
    name: "Absolute Value Single Solution",
    description: "Student only finds one solution for absolute value equations",
    category: "Absolute Value",
    domain: "Equations & Inequalities",
    affectedSkills: ["ALG1.EQ.ABS_SPLIT"],
    indicators: [
      "|x| = 5 → x = 5 only",
      "|x - 3| = 2 → x = 5 only",
      "|2x + 1| = 7 → x = 3 only"
    ],
    remediation: "Absolute value represents distance, which can be in two directions. Always consider both positive and negative cases.",
    examples: [{
      incorrect: "|x| = 5 → x = 5",
      correct: "|x| = 5 → x = 5 or x = -5",
      explanation: "Both 5 and -5 are 5 units from zero"
    }]
  },

  {
    code: "ALG1-EQ-BALANCE",
    name: "Not Balancing Equation",
    description: "Student performs operation on only one side of equation",
    category: "Linear Equations",
    domain: "Equations & Inequalities",
    affectedSkills: ["ALG1.EQ.ONE_STEP", "ALG1.EQ.TWO_STEP"],
    indicators: [
      "x + 3 = 7 → x = 7 - 3 (only subtracting from right)",
      "2x = 10 → x = 10/2 (not showing division on left)",
      "x/3 + 2 = 5 → x/3 = 5 (forgetting to subtract from right)"
    ],
    remediation: "Equations are like balanced scales. Whatever you do to one side, you MUST do to the other.",
    examples: [{
      incorrect: "x + 3 = 7 → x = 7 (forgot to subtract 3)",
      correct: "x + 3 = 7 → x + 3 - 3 = 7 - 3 → x = 4",
      explanation: "Subtract 3 from BOTH sides to maintain balance"
    }]
  },

  // =====================================
  // LINEAR FUNCTIONS
  // =====================================

  {
    code: "ALG1-SLOPE-RUN-RISE",
    name: "Rise Over Run Reversal",
    description: "Student calculates slope as run/rise instead of rise/run",
    category: "Linear Functions",
    domain: "Linear Functions",
    affectedSkills: ["ALG1.LINEAR.SLOPE"],
    indicators: [
      "Points (1,2) and (3,6) → slope = 2/4",
      "Rise of 3, run of 2 → slope = 2/3",
      "Vertical change 4, horizontal change 2 → slope = 1/2"
    ],
    remediation: "Slope is rise/run or (y₂-y₁)/(x₂-x₁). Remember: 'rise' is vertical (y), 'run' is horizontal (x).",
    examples: [{
      incorrect: "Points (1,2) and (3,6) → slope = (3-1)/(6-2) = 2/4 = 1/2",
      correct: "Points (1,2) and (3,6) → slope = (6-2)/(3-1) = 4/2 = 2",
      explanation: "Slope = change in y / change in x, not change in x / change in y"
    }]
  },

  {
    code: "ALG1-YINT-XVALUE",
    name: "Y-intercept as X-value",
    description: "Student confuses y-intercept with x-intercept or uses x-value",
    category: "Linear Functions",
    domain: "Linear Functions",
    affectedSkills: ["ALG1.LINEAR.INTERCEPTS", "ALG1.LINEAR.SLOPE_INT"],
    indicators: [
      "y = 2x + 3 has y-intercept at x = 3",
      "To find y-intercept, set y = 0",
      "y-intercept is where line crosses x-axis"
    ],
    remediation: "Y-intercept occurs when x = 0 (on the y-axis). X-intercept occurs when y = 0 (on the x-axis).",
    examples: [{
      incorrect: "y = 2x + 3 → y-intercept is at x = 3",
      correct: "y = 2x + 3 → y-intercept is at y = 3 (point (0,3))",
      explanation: "Y-intercept is the y-value when x = 0"
    }]
  },

  {
    code: "ALG1-PARALLEL-RECIPROCAL",
    name: "Parallel Lines Have Reciprocal Slopes",
    description: "Student confuses parallel and perpendicular slope relationships",
    category: "Linear Functions",
    domain: "Linear Functions",
    affectedSkills: ["ALG1.LINEAR.PARALLEL", "ALG1.LINEAR.PERPENDICULAR"],
    indicators: [
      "Line with slope 2 is parallel to line with slope 1/2",
      "Parallel lines have negative reciprocal slopes",
      "Perpendicular lines have same slope"
    ],
    remediation: "Parallel lines have SAME slope. Perpendicular lines have NEGATIVE RECIPROCAL slopes.",
    examples: [{
      incorrect: "Line y = 2x + 1 is parallel to y = -1/2x + 3",
      correct: "Line y = 2x + 1 is parallel to y = 2x + 3 (same slope)",
      explanation: "Parallel lines have identical slopes but different y-intercepts"
    }]
  },

  // =====================================
  // SYSTEMS OF EQUATIONS
  // =====================================

  {
    code: "ALG1-SYSTEMS-ADD-ALWAYS",
    name: "Always Adding in Elimination",
    description: "Student always adds equations instead of considering subtraction",
    category: "Systems",
    domain: "Systems of Equations & Inequalities",
    affectedSkills: ["ALG1.SYSTEMS.ELIMINATION"],
    indicators: [
      "2x + y = 5 and 2x - y = 3 → adding gives 4x = 8",
      "Not recognizing when subtraction eliminates variable",
      "Making equations more complex by always adding"
    ],
    remediation: "Look for opposite coefficients (like +2x and -2x) to add, or same coefficients to subtract.",
    examples: [{
      incorrect: "3x + y = 7 and 2x + y = 5 → add to get 5x + 2y = 12",
      correct: "3x + y = 7 and 2x + y = 5 → subtract to get x = 2",
      explanation: "When coefficients are the same, subtract to eliminate that variable"
    }]
  },

  // =====================================
  // POLYNOMIALS & QUADRATICS
  // =====================================

  {
    code: "ALG1-FOIL-SIGN",
    name: "FOIL Sign Errors",
    description: "Student makes sign errors when using FOIL method",
    category: "Polynomials",
    domain: "Polynomials",
    affectedSkills: ["ALG1.POLY.MULTIPLY"],
    indicators: [
      "(x - 3)(x + 2) = x² - x - 6",
      "(x + 4)(x - 1) = x² + 3x + 4",
      "(2x - 1)(x - 3) = 2x² - 7x - 3"
    ],
    remediation: "Carefully track signs in each multiplication. Outer and Inner terms often cause errors.",
    examples: [{
      incorrect: "(x - 3)(x + 2) = x² + 2x - 3x - 6 = x² - x - 6",
      correct: "(x - 3)(x + 2) = x² + 2x - 3x - 6 = x² - x - 6",
      explanation: "First: x·x = x², Outer: x·2 = 2x, Inner: -3·x = -3x, Last: -3·2 = -6"
    }]
  },

  {
    code: "ALG1-FACTOR-WRONG-PAIRS",
    name: "Incorrect Factor Pairs",
    description: "Student uses factor pairs that don't multiply to constant term",
    category: "Factoring",
    domain: "Polynomials",
    affectedSkills: ["ALG1.POLY.FACTOR_TRINOMIAL"],
    indicators: [
      "x² + 5x + 6 = (x + 1)(x + 5)",
      "x² - 7x + 12 = (x - 2)(x - 5)",
      "x² + x - 12 = (x + 2)(x - 5)"
    ],
    remediation: "Factor pairs must multiply to c AND add to b in x² + bx + c. List all factor pairs systematically.",
    examples: [{
      incorrect: "x² + 5x + 6 = (x + 1)(x + 5)",
      correct: "x² + 5x + 6 = (x + 2)(x + 3)",
      explanation: "Need factors of 6 that add to 5: 2×3=6 and 2+3=5"
    }]
  },

  {
    code: "ALG1-QUAD-FORMULA-B",
    name: "Quadratic Formula b-value Error",
    description: "Student uses wrong sign for b in quadratic formula",
    category: "Quadratic Functions",
    domain: "Quadratic Functions",
    affectedSkills: ["ALG1.QUAD.FORMULA"],
    indicators: [
      "For x² - 5x + 6 = 0, using b = 5 instead of b = -5",
      "Forgetting negative in -b ± √...",
      "Double negative errors with -b when b is negative"
    ],
    remediation: "In ax² + bx + c, b includes its sign. The formula has -b, creating opposite sign.",
    examples: [{
      incorrect: "x² - 5x + 6 = 0 → x = (5 ± √(25-24))/2",
      correct: "x² - 5x + 6 = 0 → x = (-(-5) ± √(25-24))/2 = (5 ± 1)/2",
      explanation: "Here b = -5, so -b = -(-5) = 5"
    }]
  },

  {
    code: "ALG1-QUAD-DISCRIMINANT",
    name: "Discriminant Interpretation Error",
    description: "Student misinterprets discriminant meaning for number of solutions",
    category: "Quadratic Functions",
    domain: "Quadratic Functions",
    affectedSkills: ["ALG1.QUAD.DISCRIMINANT"],
    indicators: [
      "Positive discriminant means no real solutions",
      "Zero discriminant means two solutions",
      "Negative discriminant means one solution"
    ],
    remediation: "Discriminant b²-4ac: Positive = 2 real solutions, Zero = 1 real solution, Negative = no real solutions.",
    examples: [{
      incorrect: "b²-4ac = -4 means one real solution",
      correct: "b²-4ac = -4 means no real solutions (complex only)",
      explanation: "Negative discriminant means √(negative), which isn't real"
    }]
  },

  {
    code: "ALG1-ZERO-PRODUCT",
    name: "Zero Product Misapplication",
    description: "Student applies zero product property when product isn't zero",
    category: "Quadratic Functions",
    domain: "Quadratic Functions",
    affectedSkills: ["ALG1.QUAD.ZERO_PRODUCT"],
    indicators: [
      "(x - 2)(x + 3) = 6 → x = 2 or x = -3",
      "Setting each factor to non-zero value",
      "Not moving everything to one side first"
    ],
    remediation: "Zero product property ONLY works when product equals ZERO. First rearrange to = 0.",
    examples: [{
      incorrect: "(x - 2)(x + 3) = 6 → x = 2 or x = -3",
      correct: "(x - 2)(x + 3) = 6 → x² + x - 6 = 6 → x² + x - 12 = 0 → factor and solve",
      explanation: "Must have product = 0 before applying zero product property"
    }]
  },

  // =====================================
  // RATIONAL & RADICAL EXPRESSIONS
  // =====================================

  {
    code: "ALG1-RAT-CANCEL-TERMS",
    name: "Canceling Terms Instead of Factors",
    description: "Student cancels addition terms instead of multiplication factors",
    category: "Rational Expressions",
    domain: "Radical & Rational Expressions",
    affectedSkills: ["ALG1.RAT.SIMPLIFY"],
    indicators: [
      "(x + 3)/(x + 5) = 3/5",
      "(2x + 4)/(x + 4) = 2x/x = 2",
      "(x² + x)/(x + 1) = x²/1 = x²"
    ],
    remediation: "Can only cancel FACTORS (multiplication), not TERMS (addition). Factor first, then cancel.",
    examples: [{
      incorrect: "(x + 3)/(x + 5) = 3/5 (canceled x)",
      correct: "(x + 3)/(x + 5) cannot be simplified",
      explanation: "x is added, not multiplied, so cannot be canceled"
    }]
  },

  {
    code: "ALG1-RAT-DOMAIN-FORGET",
    name: "Ignoring Domain Restrictions",
    description: "Student doesn't identify values that make denominator zero",
    category: "Rational Expressions",
    domain: "Radical & Rational Expressions",
    affectedSkills: ["ALG1.RAT.DOMAIN"],
    indicators: [
      "Not stating x ≠ values",
      "Including excluded values in solution",
      "Not checking if solutions are extraneous"
    ],
    remediation: "Always find values that make denominator = 0. These are excluded from domain.",
    examples: [{
      incorrect: "f(x) = 1/(x-3) has domain: all real numbers",
      correct: "f(x) = 1/(x-3) has domain: all real numbers except x = 3",
      explanation: "When x = 3, denominator = 0, which is undefined"
    }]
  },

  // =====================================
  // EXPONENTIAL FUNCTIONS
  // =====================================

  {
    code: "ALG1-EXP-BASE-VARIABLE",
    name: "Variable Base Confusion",
    description: "Student confuses exponential functions with power functions",
    category: "Exponential Functions",
    domain: "Exponential Functions",
    affectedSkills: ["ALG1.EXP.DEFINITION"],
    indicators: [
      "f(x) = x² is exponential",
      "f(x) = 2^x is quadratic",
      "Confusing y = x^n with y = a^x"
    ],
    remediation: "Exponential has variable in EXPONENT (2^x). Power function has variable in BASE (x^2).",
    examples: [{
      incorrect: "f(x) = x³ is an exponential function",
      correct: "f(x) = 3^x is an exponential function",
      explanation: "Exponential: variable in exponent. Power: variable in base"
    }]
  },

  {
    code: "ALG1-EXP-GROWTH-DECAY",
    name: "Growth vs Decay Confusion",
    description: "Student misidentifies whether function represents growth or decay",
    category: "Exponential Functions",
    domain: "Exponential Functions",
    affectedSkills: ["ALG1.EXP.GROWTH", "ALG1.EXP.DECAY"],
    indicators: [
      "f(x) = 0.5^x represents growth",
      "f(x) = 2^(-x) represents growth",
      "Base > 1 means decay"
    ],
    remediation: "Base > 1: growth. 0 < base < 1: decay. Check by evaluating: does f(x) increase as x increases?",
    examples: [{
      incorrect: "f(x) = (1/2)^x represents growth",
      correct: "f(x) = (1/2)^x represents decay (base < 1)",
      explanation: "Base = 1/2 < 1, so function decreases as x increases"
    }]
  },

  // =====================================
  // STATISTICS & PROBABILITY
  // =====================================

  {
    code: "ALG1-STAT-MEAN-MEDIAN",
    name: "Mean Median Confusion",
    description: "Student confuses mean (average) with median (middle value)",
    category: "Statistics",
    domain: "Statistics & Probability",
    affectedSkills: ["ALG1.STAT.MEAN", "ALG1.STAT.MEDIAN"],
    indicators: [
      "Finding middle value when asked for average",
      "Adding and dividing when asked for median",
      "Not ordering data before finding median"
    ],
    remediation: "Mean = sum/count (average). Median = middle value when ordered. Mode = most frequent.",
    examples: [{
      incorrect: "Data: 2, 8, 3, 10, 5 → Mean = 5 (middle value)",
      correct: "Data: 2, 8, 3, 10, 5 → Mean = (2+8+3+10+5)/5 = 28/5 = 5.6",
      explanation: "Mean is the sum divided by count, not the middle value"
    }]
  },

  {
    code: "ALG1-PROB-ADD-GREATER-ONE",
    name: "Probability Greater Than 1",
    description: "Student calculates probability values greater than 1",
    category: "Probability",
    domain: "Statistics & Probability",
    affectedSkills: ["ALG1.PROB.THEORETICAL"],
    indicators: [
      "P(event) = 5/3",
      "Adding probabilities incorrectly",
      "Using count instead of probability"
    ],
    remediation: "Probability is always between 0 and 1 inclusive. Check: favorable ≤ total outcomes.",
    examples: [{
      incorrect: "5 red balls, 3 blue balls → P(red) = 5/3",
      correct: "5 red balls, 3 blue balls → P(red) = 5/8",
      explanation: "Probability = favorable/total = 5/(5+3) = 5/8"
    }]
  },

  // =====================================
  // SEQUENCES
  // =====================================

  {
    code: "ALG1-SEQ-ARITH-MULT",
    name: "Arithmetic Sequence Multiplication",
    description: "Student multiplies by common difference instead of adding",
    category: "Sequences",
    domain: "Sequences",
    affectedSkills: ["ALG1.SEQ.ARITH_DEF", "ALG1.SEQ.ARITH_EXPLICIT"],
    indicators: [
      "a_n = a_1 × n × d",
      "Each term multiplied by d",
      "Confusing with geometric sequence"
    ],
    remediation: "Arithmetic: ADD common difference. Geometric: MULTIPLY by common ratio.",
    examples: [{
      incorrect: "First term 3, d = 2 → a_5 = 3 × 2^4 = 48",
      correct: "First term 3, d = 2 → a_5 = 3 + 4(2) = 11",
      explanation: "Arithmetic sequences add d each time: 3, 5, 7, 9, 11"
    }]
  },

  {
    code: "ALG1-SEQ-INDEX-ERROR",
    name: "Sequence Index Off-by-One",
    description: "Student miscounts term position in sequence formulas",
    category: "Sequences",
    domain: "Sequences",
    affectedSkills: ["ALG1.SEQ.ARITH_EXPLICIT", "ALG1.SEQ.GEOM_EXPLICIT"],
    indicators: [
      "Using n instead of (n-1) in formulas",
      "a_n = a_1 + nd instead of a_1 + (n-1)d",
      "Starting count from 0 instead of 1"
    ],
    remediation: "From a_1 to a_n, there are (n-1) steps, not n steps. Draw out first few terms to verify.",
    examples: [{
      incorrect: "a_1 = 5, d = 3 → a_4 = 5 + 4(3) = 17",
      correct: "a_1 = 5, d = 3 → a_4 = 5 + (4-1)(3) = 5 + 9 = 14",
      explanation: "From term 1 to term 4 is 3 steps, not 4"
    }]
  }
];

// Helper function to get misconceptions by domain
export function getMisconceptionsByDomain(domain: string): AlgebraMisconception[] {
  return algebra1Misconceptions.filter(m => m.domain === domain);
}

// Helper function to get misconceptions affecting a specific skill
export function getMisconceptionsBySkill(skillCode: string): AlgebraMisconception[] {
  return algebra1Misconceptions.filter(m =>
    m.affectedSkills.includes(skillCode)
  );
}

// Helper function to identify likely misconceptions from student response
export function identifyMisconceptions(
  studentAnswer: string,
  correctAnswer: string,
  skillCodes: string[]
): AlgebraMisconception[] {
  // This is a simplified version - in production, would use more sophisticated matching
  return algebra1Misconceptions.filter(m => {
    // Check if misconception affects any of the tested skills
    const affectsSkill = m.affectedSkills.some(s => skillCodes.includes(s));

    // Check if any indicator pattern matches the student's answer
    const hasIndicator = m.indicators.some(pattern =>
      studentAnswer.includes(pattern.split('→')[0].trim())
    );

    return affectsSkill && hasIndicator;
  });
}

// Get all unique categories
export function getAllCategories(): string[] {
  return [...new Set(algebra1Misconceptions.map(m => m.category))];
}

// Get remediation strategies for multiple misconceptions
export function getRemediationPlan(misconceptionCodes: string[]): string[] {
  return misconceptionCodes
    .map(code => algebra1Misconceptions.find(m => m.code === code))
    .filter(Boolean)
    .map(m => m!.remediation);
}