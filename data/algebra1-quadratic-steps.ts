// Quadratic Equations - Step Selection Questions
// Comprehensive coverage of factoring, quadratic formula, completing the square

import { AlgebraItem, ItemFormat } from '@/types/algebra1-diagnostic';

export const quadraticStepQuestions: AlgebraItem[] = [
  // =====================================
  // FACTORING QUADRATICS
  // =====================================

  {
    id: "ALG1_QUAD_S001",
    code: "ALG1_QUAD_S001",
    stem: "To solve $x^2 - 7x + 12 = 0$ by factoring, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.QUAD.FACTOR",
      "ALG1.QUAD.ZERO_PROD",
      "ALG1.FOUND.FACTORS"
    ],
    primarySkillCode: "ALG1.QUAD.FACTOR",
    irtA: 1.5,
    irtB: 0.5,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Find two numbers that multiply to 12 and add to -7",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.FACTORS"
      },
      {
        id: "step2",
        text: "Find two numbers that multiply to -7 and add to 12",
        isCorrect: false,
        misconceptionCode: "ALG1-FACTOR-MIX",
        feedback: "In $x^2 + bx + c$, find numbers that multiply to c and add to b"
      },
      {
        id: "step3",
        text: "The numbers are -3 and -4",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.FACTORS"
      },
      {
        id: "step4",
        text: "The numbers are 3 and 4",
        isCorrect: false,
        misconceptionCode: "ALG1-SIGN-ERROR",
        feedback: "Check: 3 + 4 = 7, not -7"
      },
      {
        id: "step5",
        text: "Factor as $(x - 3)(x - 4) = 0$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.FACTOR"
      },
      {
        id: "step6",
        text: "Apply zero product property: $x - 3 = 0$ or $x - 4 = 0$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.ZERO_PROD"
      },
      {
        id: "step7",
        text: "Solutions are $x = 3$ and $x = 4$",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step8",
        text: "Check: $3^2 - 7(3) + 12 = 9 - 21 + 12 = 0$ ✓",
        isCorrect: true,
        order: 6,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step3", "step5", "step6", "step7", "step8"],
    solution: "Factor: $(x - 3)(x - 4) = 0$. Apply zero product: $x = 3$ or $x = 4$",
    timeLimit: 180,
    avgTimeMs: 140000
  },

  {
    id: "ALG1_QUAD_S002",
    code: "ALG1_QUAD_S002",
    stem: "To solve $x^2 - 9 = 0$ (difference of squares), which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.QUAD.SPECIAL",
      "ALG1.QUAD.ZERO_PROD",
      "ALG1.FOUND.PATTERNS"
    ],
    primarySkillCode: "ALG1.QUAD.SPECIAL",
    irtA: 1.4,
    irtB: 0.3,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Recognize as difference of squares: $a^2 - b^2 = (a+b)(a-b)$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.PATTERNS"
      },
      {
        id: "step2",
        text: "Identify $a = x$ and $b = 3$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.PATTERNS"
      },
      {
        id: "step3",
        text: "Factor as $(x + 3)(x - 3) = 0$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.SPECIAL"
      },
      {
        id: "step4",
        text: "Factor as $(x - 3)(x - 3) = 0$",
        isCorrect: false,
        misconceptionCode: "ALG1-DIFF-SQUARES",
        feedback: "Difference of squares has opposite signs: $(x+3)(x-3)$"
      },
      {
        id: "step5",
        text: "Add 9 to both sides first: $x^2 = 9$",
        isCorrect: false,
        misconceptionCode: "ALG1-FACTOR-AVOID",
        feedback: "This leads to square root method, but factoring is more direct"
      },
      {
        id: "step6",
        text: "Apply zero product: $x = -3$ or $x = 3$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.ZERO_PROD"
      },
      {
        id: "step7",
        text: "Solution is only $x = 3$",
        isCorrect: false,
        misconceptionCode: "ALG1-SOLUTION-MISS",
        feedback: "Don't forget the negative solution"
      }
    ],
    correctAnswer: ["step1", "step2", "step3", "step6"],
    solution: "Factor as difference of squares: $(x + 3)(x - 3) = 0$, so $x = ±3$",
    timeLimit: 150,
    avgTimeMs: 100000
  },

  // =====================================
  // QUADRATIC FORMULA
  // =====================================

  {
    id: "ALG1_QUAD_S003",
    code: "ALG1_QUAD_S003",
    stem: "To solve $2x^2 + 5x - 3 = 0$ using the quadratic formula, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.QUAD.FORMULA",
      "ALG1.QUAD.DISCRIMINANT",
      "ALG1.FOUND.ORDER_OPS"
    ],
    primarySkillCode: "ALG1.QUAD.FORMULA",
    irtA: 1.6,
    irtB: 0.8,
    irtC: 0.25,
    stepOptions: [
      {
        id: "step1",
        text: "Identify $a = 2$, $b = 5$, $c = -3$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.QUAD.FORMULA"
      },
      {
        id: "step2",
        text: "Identify $a = 2$, $b = 5$, $c = 3$",
        isCorrect: false,
        misconceptionCode: "ALG1-COEF-SIGN",
        feedback: "The constant term is -3, not 3"
      },
      {
        id: "step3",
        text: "Calculate discriminant: $b^2 - 4ac = 25 - 4(2)(-3) = 25 + 24 = 49$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.QUAD.DISCRIMINANT"
      },
      {
        id: "step4",
        text: "Calculate discriminant: $b^2 - 4ac = 25 - 24 = 1$",
        isCorrect: false,
        misconceptionCode: "ALG1-SIGN-ERROR",
        feedback: "Remember: $-4(2)(-3) = +24$"
      },
      {
        id: "step5",
        text: "Since discriminant > 0, there are two real solutions",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.DISCRIMINANT"
      },
      {
        id: "step6",
        text: "Apply formula: $x = \\frac{-5 ± \\sqrt{49}}{2(2)} = \\frac{-5 ± 7}{4}$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.FORMULA"
      },
      {
        id: "step7",
        text: "Apply formula: $x = \\frac{-5 ± \\sqrt{49}}{2}$",
        isCorrect: false,
        misconceptionCode: "ALG1-FORMULA-DENOM",
        feedback: "Denominator is 2a = 2(2) = 4, not just 2"
      },
      {
        id: "step8",
        text: "Solutions: $x = \\frac{-5 + 7}{4} = \\frac{1}{2}$ and $x = \\frac{-5 - 7}{4} = -3$",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.FOUND.ORDER_OPS"
      }
    ],
    correctAnswer: ["step1", "step3", "step5", "step6", "step8"],
    solution: "Using quadratic formula with $a=2, b=5, c=-3$: $x = \\frac{1}{2}$ or $x = -3$",
    timeLimit: 240,
    avgTimeMs: 180000
  },

  {
    id: "ALG1_QUAD_S004",
    code: "ALG1_QUAD_S004",
    stem: "To determine the nature of solutions for $x^2 - 4x + 5 = 0$, which steps should you perform?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.QUAD.DISCRIMINANT",
      "ALG1.QUAD.COMPLEX",
      "ALG1.FOUND.REAL_NUM"
    ],
    primarySkillCode: "ALG1.QUAD.DISCRIMINANT",
    irtA: 1.6,
    irtB: 1.0,
    irtC: 0.3,
    stepOptions: [
      {
        id: "step1",
        text: "Identify $a = 1$, $b = -4$, $c = 5$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.QUAD.FORMULA"
      },
      {
        id: "step2",
        text: "Calculate discriminant: $b^2 - 4ac = 16 - 20 = -4$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.QUAD.DISCRIMINANT"
      },
      {
        id: "step3",
        text: "Calculate discriminant: $b^2 - 4ac = 16 + 20 = 36$",
        isCorrect: false,
        misconceptionCode: "ALG1-SIGN-ERROR",
        feedback: "$-4(1)(5) = -20$, not +20"
      },
      {
        id: "step4",
        text: "Since discriminant < 0, there are no real solutions",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.COMPLEX"
      },
      {
        id: "step5",
        text: "Since discriminant < 0, there is one repeated real solution",
        isCorrect: false,
        misconceptionCode: "ALG1-DISCRIM-INTERPRET",
        feedback: "Discriminant = 0 gives repeated root; < 0 means no real solutions"
      },
      {
        id: "step6",
        text: "The equation has two complex conjugate solutions",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.COMPLEX"
      },
      {
        id: "step7",
        text: "Graph would be a parabola that doesn't cross the x-axis",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.QUAD.GRAPH"
      }
    ],
    correctAnswer: ["step1", "step2", "step4", "step6", "step7"],
    solution: "Discriminant = -4 < 0, so no real solutions (two complex conjugates)",
    timeLimit: 180,
    avgTimeMs: 140000
  },

  // =====================================
  // COMPLETING THE SQUARE
  // =====================================

  {
    id: "ALG1_QUAD_S005",
    code: "ALG1_QUAD_S005",
    stem: "To solve $x^2 + 6x + 2 = 0$ by completing the square, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.QUAD.COMPLETE_SQ",
      "ALG1.FOUND.PERFECT_SQ",
      "ALG1.RAD.SIMPLIFY"
    ],
    primarySkillCode: "ALG1.QUAD.COMPLETE_SQ",
    irtA: 1.7,
    irtB: 1.2,
    irtC: 0.3,
    stepOptions: [
      {
        id: "step1",
        text: "Move constant to right side: $x^2 + 6x = -2$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step2",
        text: "Take half of 6 and square it: $(6/2)^2 = 9$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.QUAD.COMPLETE_SQ"
      },
      {
        id: "step3",
        text: "Take half of 6 and square it: $(6/2)^2 = 3$",
        isCorrect: false,
        misconceptionCode: "ALG1-COMPLETE-SQ",
        feedback: "$(6/2)^2 = 3^2 = 9$, not 3"
      },
      {
        id: "step4",
        text: "Add 9 to both sides: $x^2 + 6x + 9 = 7$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.COMPLETE_SQ"
      },
      {
        id: "step5",
        text: "Factor left side: $(x + 3)^2 = 7$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.FOUND.PERFECT_SQ"
      },
      {
        id: "step6",
        text: "Take square root: $x + 3 = ±\\sqrt{7}$",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.RAD.SIMPLIFY"
      },
      {
        id: "step7",
        text: "Take square root: $x + 3 = \\sqrt{7}$ only",
        isCorrect: false,
        misconceptionCode: "ALG1-SQRT-BOTH",
        feedback: "Remember both positive and negative square roots"
      },
      {
        id: "step8",
        text: "Solve: $x = -3 ± \\sqrt{7}$",
        isCorrect: true,
        order: 6,
        skillCode: "ALG1.EQ.ISOLATE"
      }
    ],
    correctAnswer: ["step1", "step2", "step4", "step5", "step6", "step8"],
    solution: "Complete the square: $(x + 3)^2 = 7$, so $x = -3 ± \\sqrt{7}$",
    timeLimit: 240,
    avgTimeMs: 180000
  },

  // =====================================
  // SOLVING BY SQUARE ROOTS
  // =====================================

  {
    id: "ALG1_QUAD_S006",
    code: "ALG1_QUAD_S006",
    stem: "To solve $(x - 2)^2 = 16$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "LOW",
    skillCodes: [
      "ALG1.QUAD.SQRT_METHOD",
      "ALG1.RAD.SIMPLIFY",
      "ALG1.EQ.ISOLATE"
    ],
    primarySkillCode: "ALG1.QUAD.SQRT_METHOD",
    irtA: 1.2,
    irtB: -0.5,
    irtC: 0.1,
    stepOptions: [
      {
        id: "step1",
        text: "Take square root of both sides: $x - 2 = ±4$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.QUAD.SQRT_METHOD"
      },
      {
        id: "step2",
        text: "Take square root of both sides: $x - 2 = 4$",
        isCorrect: false,
        misconceptionCode: "ALG1-SQRT-BOTH",
        feedback: "Don't forget the ± when taking square roots"
      },
      {
        id: "step3",
        text: "Expand first: $x^2 - 4x + 4 = 16$",
        isCorrect: false,
        misconceptionCode: "ALG1-METHOD-COMPLEX",
        feedback: "Direct square root method is simpler here"
      },
      {
        id: "step4",
        text: "Case 1: $x - 2 = 4$, so $x = 6$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step5",
        text: "Case 2: $x - 2 = -4$, so $x = -2$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step6",
        text: "Check: $(6 - 2)^2 = 16$ and $(-2 - 2)^2 = 16$ ✓",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step7",
        text: "Solutions are $x = 6$ and $x = 2$",
        isCorrect: false,
        misconceptionCode: "ALG1-CALC-ERROR",
        feedback: "Check: $x - 2 = -4$ gives $x = -2$, not 2"
      }
    ],
    correctAnswer: ["step1", "step4", "step5", "step6"],
    solution: "Take square root: $x - 2 = ±4$, so $x = 6$ or $x = -2$",
    timeLimit: 120,
    avgTimeMs: 80000
  },

  // =====================================
  // FACTORING SPECIAL FORMS
  // =====================================

  {
    id: "ALG1_QUAD_S007",
    code: "ALG1_QUAD_S007",
    stem: "To solve $x^2 + 10x + 25 = 0$ (perfect square trinomial), which steps should you perform?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.QUAD.SPECIAL",
      "ALG1.FOUND.PERFECT_SQ",
      "ALG1.QUAD.ZERO_PROD"
    ],
    primarySkillCode: "ALG1.QUAD.SPECIAL",
    irtA: 1.4,
    irtB: 0.4,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Recognize as perfect square: $a^2 + 2ab + b^2 = (a + b)^2$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.PERFECT_SQ"
      },
      {
        id: "step2",
        text: "Identify: $a = x$, $b = 5$ (since $2 · x · 5 = 10x$)",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.PATTERNS"
      },
      {
        id: "step3",
        text: "Factor as $(x + 5)^2 = 0$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.SPECIAL"
      },
      {
        id: "step4",
        text: "Factor as $(x + 5)(x - 5) = 0$",
        isCorrect: false,
        misconceptionCode: "ALG1-PERFECT-SQ",
        feedback: "Perfect square has repeated factor: $(x + 5)(x + 5)$"
      },
      {
        id: "step5",
        text: "Solution is $x = -5$ (double root)",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.ZERO_PROD"
      },
      {
        id: "step6",
        text: "Solutions are $x = -5$ and $x = 5$",
        isCorrect: false,
        misconceptionCode: "ALG1-DOUBLE-ROOT",
        feedback: "Perfect square gives one repeated solution"
      },
      {
        id: "step7",
        text: "Check: $(-5)^2 + 10(-5) + 25 = 25 - 50 + 25 = 0$ ✓",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step2", "step3", "step5", "step7"],
    solution: "Perfect square: $(x + 5)^2 = 0$, so $x = -5$ (double root)",
    timeLimit: 150,
    avgTimeMs: 110000
  },

  // =====================================
  // WORD PROBLEMS WITH QUADRATICS
  // =====================================

  {
    id: "ALG1_QUAD_S008",
    code: "ALG1_QUAD_S008",
    stem: "A ball is thrown upward with equation $h = -16t^2 + 32t + 48$. To find when it hits the ground, which steps should you perform?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.WORD.QUADRATIC",
      "ALG1.QUAD.FORMULA",
      "ALG1.WORD.INTERPRET"
    ],
    primarySkillCode: "ALG1.WORD.QUADRATIC",
    irtA: 1.7,
    irtB: 1.2,
    irtC: 0.3,
    stepOptions: [
      {
        id: "step1",
        text: "Set height equal to zero: $-16t^2 + 32t + 48 = 0$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.WORD.TRANSLATE"
      },
      {
        id: "step2",
        text: "Divide everything by -16: $t^2 - 2t - 3 = 0$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.SIMPLIFY"
      },
      {
        id: "step3",
        text: "Factor: $(t - 3)(t + 1) = 0$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.FACTOR"
      },
      {
        id: "step4",
        text: "Solutions: $t = 3$ and $t = -1$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.ZERO_PROD"
      },
      {
        id: "step5",
        text: "Both solutions are valid for time",
        isCorrect: false,
        misconceptionCode: "ALG1-CONTEXT-CHECK",
        feedback: "Time cannot be negative in this context"
      },
      {
        id: "step6",
        text: "Reject $t = -1$ since time cannot be negative",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.WORD.INTERPRET"
      },
      {
        id: "step7",
        text: "The ball hits the ground at $t = 3$ seconds",
        isCorrect: true,
        order: 6,
        skillCode: "ALG1.WORD.INTERPRET"
      },
      {
        id: "step8",
        text: "Check: $h(3) = -16(9) + 32(3) + 48 = -144 + 96 + 48 = 0$ ✓",
        isCorrect: true,
        order: 7,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step2", "step3", "step4", "step6", "step7", "step8"],
    solution: "Set $h = 0$, factor to get $t = 3$ or $t = -1$. Since time ≥ 0, answer is 3 seconds",
    timeLimit: 240,
    avgTimeMs: 180000
  }
];