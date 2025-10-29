// Linear Equations & Inequalities - Step Selection Questions
// Comprehensive coverage of one-step, two-step, multi-step equations and inequalities

import { AlgebraItem, ItemFormat } from '@/types/algebra1-diagnostic';

export const linearStepQuestions: AlgebraItem[] = [
  // =====================================
  // ONE-STEP EQUATIONS
  // =====================================

  {
    id: "ALG1_LINEAR_S001",
    code: "ALG1_LINEAR_S001",
    stem: "To solve $x + 7 = 15$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "LOW",
    skillCodes: [
      "ALG1.EQ.ONE_STEP",
      "ALG1.FOUND.INV_OPS",
      "ALG1.EQ.CHECK"
    ],
    primarySkillCode: "ALG1.EQ.ONE_STEP",
    irtA: 1.0,
    irtB: -1.0,
    irtC: 0.1,
    stepOptions: [
      {
        id: "step1",
        text: "Subtract 7 from both sides to get $x = 8$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step2",
        text: "Add 7 to both sides to get $x = 22$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS",
        feedback: "To isolate x, use the opposite operation of +7"
      },
      {
        id: "step3",
        text: "Divide both sides by 7 to get $x = 15/7$",
        isCorrect: false,
        misconceptionCode: "ALG1-OP-CONFUSION",
        feedback: "The 7 is being added, not multiplied"
      },
      {
        id: "step4",
        text: "Check: Substitute $x = 8$ back: $8 + 7 = 15$ ✓",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step5",
        text: "Multiply both sides by 7",
        isCorrect: false,
        misconceptionCode: "ALG1-OP-CONFUSION"
      }
    ],
    correctAnswer: ["step1", "step4"],
    solution: "Subtract 7 from both sides: $x = 15 - 7 = 8$. Check: $8 + 7 = 15$ ✓",
    timeLimit: 120,
    avgTimeMs: 60000
  },

  {
    id: "ALG1_LINEAR_S002",
    code: "ALG1_LINEAR_S002",
    stem: "To solve $-5x = 30$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "LOW",
    skillCodes: [
      "ALG1.EQ.ONE_STEP",
      "ALG1.FOUND.NEG_NUM",
      "ALG1.EQ.CHECK"
    ],
    primarySkillCode: "ALG1.EQ.ONE_STEP",
    irtA: 1.2,
    irtB: -0.5,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Divide both sides by -5 to get $x = -6$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.NEG_NUM"
      },
      {
        id: "step2",
        text: "Divide both sides by 5 to get $x = 6$",
        isCorrect: false,
        misconceptionCode: "ALG1-NEG-IGNORE",
        feedback: "Don't forget the negative sign in -5"
      },
      {
        id: "step3",
        text: "Multiply both sides by -5 to get $x = -150$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step4",
        text: "Add 5 to both sides",
        isCorrect: false,
        misconceptionCode: "ALG1-OP-CONFUSION"
      },
      {
        id: "step5",
        text: "Check: $-5(-6) = 30$ ✓",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step6",
        text: "Divide both sides by -5 to get $x = 6$",
        isCorrect: false,
        misconceptionCode: "ALG1-NEG-DIV",
        feedback: "Remember: positive ÷ negative = negative"
      }
    ],
    correctAnswer: ["step1", "step5"],
    solution: "Divide by -5: $x = 30 ÷ (-5) = -6$. Check: $-5(-6) = 30$ ✓",
    timeLimit: 120,
    avgTimeMs: 70000
  },

  // =====================================
  // TWO-STEP EQUATIONS
  // =====================================

  {
    id: "ALG1_LINEAR_S003",
    code: "ALG1_LINEAR_S003",
    stem: "To solve $3x - 8 = 13$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.EQ.TWO_STEP",
      "ALG1.EQ.ISOLATE",
      "ALG1.FOUND.INV_OPS"
    ],
    primarySkillCode: "ALG1.EQ.TWO_STEP",
    irtA: 1.3,
    irtB: 0.0,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Add 8 to both sides to get $3x = 21$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step2",
        text: "Subtract 8 from both sides to get $3x = 5$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step3",
        text: "Divide both sides by 3 first to get $x - 8/3 = 13/3$",
        isCorrect: false,
        misconceptionCode: "ALG1-ORDER-OPS",
        feedback: "Isolate the variable term first, then divide"
      },
      {
        id: "step4",
        text: "Divide both sides by 3 to get $x = 7$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step5",
        text: "Multiply both sides by 3 to get $x = 63$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step6",
        text: "Check: $3(7) - 8 = 21 - 8 = 13$ ✓",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step4", "step6"],
    solution: "Add 8: $3x = 21$. Divide by 3: $x = 7$. Check: $3(7) - 8 = 13$ ✓",
    timeLimit: 150,
    avgTimeMs: 90000
  },

  {
    id: "ALG1_LINEAR_S004",
    code: "ALG1_LINEAR_S004",
    stem: "To solve $\\frac{x}{4} + 3 = 7$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.EQ.TWO_STEP",
      "ALG1.RAT.EQUATIONS",
      "ALG1.FOUND.INV_OPS"
    ],
    primarySkillCode: "ALG1.EQ.TWO_STEP",
    irtA: 1.3,
    irtB: 0.2,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Subtract 3 from both sides to get $\\frac{x}{4} = 4$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step2",
        text: "Multiply both sides by 4 first to get $x + 12 = 28$",
        isCorrect: false,
        misconceptionCode: "ALG1-ORDER-OPS",
        feedback: "Isolate the fraction first, then clear it"
      },
      {
        id: "step3",
        text: "Add 3 to both sides to get $\\frac{x}{4} = 10$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step4",
        text: "Multiply both sides by 4 to get $x = 16$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.RAT.EQUATIONS"
      },
      {
        id: "step5",
        text: "Divide both sides by 4 to get $x = 1$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS",
        feedback: "x is already divided by 4, so multiply to undo"
      },
      {
        id: "step6",
        text: "Check: $\\frac{16}{4} + 3 = 4 + 3 = 7$ ✓",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step4", "step6"],
    solution: "Subtract 3: $\\frac{x}{4} = 4$. Multiply by 4: $x = 16$",
    timeLimit: 150,
    avgTimeMs: 95000
  },

  // =====================================
  // MULTI-STEP EQUATIONS WITH DISTRIBUTION
  // =====================================

  {
    id: "ALG1_LINEAR_S005",
    code: "ALG1_LINEAR_S005",
    stem: "To solve $2(x - 3) + 5 = 11$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.FOUND.DIST_PROP",
      "ALG1.EQ.MULTI_STEP",
      "ALG1.FOUND.LIKE_TERMS"
    ],
    primarySkillCode: "ALG1.EQ.MULTI_STEP",
    irtA: 1.4,
    irtB: 0.5,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Distribute 2: $2x - 6 + 5 = 11$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.DIST_PROP"
      },
      {
        id: "step2",
        text: "Distribute 2: $2x - 3 + 5 = 11$",
        isCorrect: false,
        misconceptionCode: "ALG1-DIST-ERROR",
        feedback: "Remember to multiply 2 by both terms: $2(x) = 2x$ and $2(-3) = -6$"
      },
      {
        id: "step3",
        text: "Combine like terms: $2x - 1 = 11$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.LIKE_TERMS"
      },
      {
        id: "step4",
        text: "Add 1 to both sides: $2x = 12$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step5",
        text: "Subtract 5 from both sides first: $2(x - 3) = 6$",
        isCorrect: false,
        misconceptionCode: "ALG1-ORDER-VALID",
        feedback: "This approach works but requires different next steps"
      },
      {
        id: "step6",
        text: "Divide by 2: $x = 6$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step7",
        text: "Check: $2(6 - 3) + 5 = 2(3) + 5 = 11$ ✓",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step3", "step4", "step6", "step7"],
    solution: "Distribute: $2x - 6 + 5 = 11$. Combine: $2x - 1 = 11$. Add 1: $2x = 12$. Divide: $x = 6$",
    timeLimit: 180,
    avgTimeMs: 120000
  },

  // =====================================
  // INEQUALITIES
  // =====================================

  {
    id: "ALG1_LINEAR_S006",
    code: "ALG1_LINEAR_S006",
    stem: "To solve $-3x + 5 < 14$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.INEQ.MULTI_STEP",
      "ALG1.INEQ.FLIP",
      "ALG1.FOUND.NEG_NUM"
    ],
    primarySkillCode: "ALG1.INEQ.FLIP",
    irtA: 1.5,
    irtB: 0.8,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Subtract 5 from both sides: $-3x < 9$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.INEQ.MULTI_STEP"
      },
      {
        id: "step2",
        text: "Add 5 to both sides: $-3x < 19$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step3",
        text: "Divide by -3 and keep the sign: $x < -3$",
        isCorrect: false,
        misconceptionCode: "ALG1-INEQ-FLIP",
        feedback: "When dividing by negative, flip the inequality!"
      },
      {
        id: "step4",
        text: "Divide by -3 and flip the sign: $x > -3$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.INEQ.FLIP"
      },
      {
        id: "step5",
        text: "Divide by 3: $x < 3$",
        isCorrect: false,
        misconceptionCode: "ALG1-NEG-IGNORE"
      },
      {
        id: "step6",
        text: "Check with $x = 0$: $-3(0) + 5 = 5 < 14$ ✓",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step7",
        text: "Check with $x = -4$: $-3(-4) + 5 = 17 < 14$ ✗",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.EQ.CHECK",
        feedback: "This confirms $x = -4$ is not in the solution"
      }
    ],
    correctAnswer: ["step1", "step4", "step6", "step7"],
    solution: "Subtract 5: $-3x < 9$. Divide by -3 and flip: $x > -3$",
    timeLimit: 180,
    avgTimeMs: 130000
  },

  // =====================================
  // VARIABLES ON BOTH SIDES
  // =====================================

  {
    id: "ALG1_LINEAR_S007",
    code: "ALG1_LINEAR_S007",
    stem: "To solve $5x - 3 = 2x + 9$, which steps should you perform in order?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.EQ.VAR_BOTH",
      "ALG1.FOUND.LIKE_TERMS",
      "ALG1.EQ.ISOLATE"
    ],
    primarySkillCode: "ALG1.EQ.VAR_BOTH",
    irtA: 1.4,
    irtB: 0.3,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Subtract 2x from both sides: $3x - 3 = 9$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.VAR_BOTH"
      },
      {
        id: "step2",
        text: "Add 2x to both sides: $7x - 3 = 9$",
        isCorrect: false,
        misconceptionCode: "ALG1-VAR-COMBINE",
        feedback: "To get variables on one side, subtract from both sides"
      },
      {
        id: "step3",
        text: "Subtract 5x from both sides: $-3 = -3x + 9$",
        isCorrect: false,
        misconceptionCode: "ALG1-VAR-SIDE",
        feedback: "This works but makes the solution more complex"
      },
      {
        id: "step4",
        text: "Add 3 to both sides: $3x = 12$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step5",
        text: "Divide by 3: $x = 4$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step6",
        text: "Combine all terms first: $3x = 12$",
        isCorrect: false,
        misconceptionCode: "ALG1-STEP-SKIP",
        feedback: "Show the intermediate steps"
      },
      {
        id: "step7",
        text: "Check: $5(4) - 3 = 17$ and $2(4) + 9 = 17$ ✓",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step4", "step5", "step7"],
    solution: "Subtract 2x: $3x - 3 = 9$. Add 3: $3x = 12$. Divide: $x = 4$",
    timeLimit: 180,
    avgTimeMs: 110000
  },

  // =====================================
  // WORD PROBLEMS TO EQUATIONS
  // =====================================

  {
    id: "ALG1_LINEAR_S008",
    code: "ALG1_LINEAR_S008",
    stem: "A rental car costs \\$35 per day plus \\$0.20 per mile. If the total cost for one day is \\$51, which steps find the number of miles driven?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.WORD.TRANSLATE",
      "ALG1.EQ.TWO_STEP",
      "ALG1.WORD.INTERPRET"
    ],
    primarySkillCode: "ALG1.WORD.TRANSLATE",
    irtA: 1.5,
    irtB: 1.0,
    irtC: 0.25,
    stepOptions: [
      {
        id: "step1",
        text: "Let m = number of miles driven",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.WORD.TRANSLATE"
      },
      {
        id: "step2",
        text: "Write equation: $35 + 0.20m = 51$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.WORD.TRANSLATE"
      },
      {
        id: "step3",
        text: "Write equation: $35m + 0.20 = 51$",
        isCorrect: false,
        misconceptionCode: "ALG1-WORD-SETUP",
        feedback: "\\$35 is the fixed cost, \\$0.20 is per mile"
      },
      {
        id: "step4",
        text: "Subtract 35 from both sides: $0.20m = 16$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step5",
        text: "Divide by 0.20: $m = 80$ miles",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step6",
        text: "Multiply by 0.20: $m = 3.2$ miles",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step7",
        text: "Check: $35 + 0.20(80) = 35 + 16 = 51$ ✓",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step8",
        text: "Interpret: The car was driven 80 miles",
        isCorrect: true,
        order: 6,
        skillCode: "ALG1.WORD.INTERPRET"
      }
    ],
    correctAnswer: ["step1", "step2", "step4", "step5", "step7", "step8"],
    solution: "Set up: $35 + 0.20m = 51$. Solve: $0.20m = 16$, so $m = 80$ miles",
    timeLimit: 240,
    avgTimeMs: 150000
  }
];