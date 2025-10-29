// Step-Selection Questions for Algebra 1 Diagnostic
// These questions present all possible steps and ask students to check all that apply

import { AlgebraItem, ItemFormat, StepOption } from '@/types/algebra1-diagnostic';

export const stepSelectionQuestions: AlgebraItem[] = [
  // =====================================
  // LINEAR EQUATIONS - STEP SELECTION
  // =====================================

  {
    id: "ALG1_STEP_001",
    code: "ALG1_STEP_001",
    stem: "To solve $2x + 6 = 14$, which steps should you perform? Check all that apply.",
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
    irtC: 0.1,
    stepOptions: [
      {
        id: "step1",
        text: "Subtract 6 from both sides to get $2x = 8$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step2",
        text: "Add 6 to both sides to get $2x = 20$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS",
        feedback: "To isolate 2x, you need to subtract 6 (the opposite of +6)"
      },
      {
        id: "step3",
        text: "Divide both sides by 2 to get $x = 4$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.INV_OPS"
      },
      {
        id: "step4",
        text: "Multiply both sides by 2 to get $x = 16$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS",
        feedback: "To isolate x from 2x, you divide by 2, not multiply"
      },
      {
        id: "step5",
        text: "Check your answer by substituting back: $2(4) + 6 = 14$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step6",
        text: "Subtract 2x from both sides",
        isCorrect: false,
        misconceptionCode: "ALG1-ISOLATE-VAR",
        feedback: "This would eliminate the variable term, not isolate it"
      }
    ],
    correctAnswer: ["step1", "step3", "step5"],
    solution: "First subtract 6 from both sides: $2x = 8$. Then divide by 2: $x = 4$. Check: $2(4) + 6 = 14$ ✓",
    timeLimit: 180,
    avgTimeMs: 120000
  },

  {
    id: "ALG1_STEP_002",
    code: "ALG1_STEP_002",
    stem: "To solve $-3(x - 4) = 18$, which steps should you perform? Check all that apply.",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: [
      "ALG1.FOUND.DIST_PROP",
      "ALG1.EQ.MULTI_STEP",
      "ALG1.FOUND.NEG_NUM"
    ],
    primarySkillCode: "ALG1.EQ.MULTI_STEP",
    irtA: 1.4,
    irtB: 0.5,
    irtC: 0.15,
    stepOptions: [
      {
        id: "step1",
        text: "Distribute: $-3x + 12 = 18$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.DIST_PROP"
      },
      {
        id: "step2",
        text: "Distribute: $-3x - 12 = 18$",
        isCorrect: false,
        misconceptionCode: "ALG1-DIST-NEG",
        feedback: "Remember: $-3 × (-4) = +12$, not $-12$"
      },
      {
        id: "step3",
        text: "Divide both sides by -3 first to get $x - 4 = -6$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.EQ.ISOLATE",
        feedback: "This is an alternative first step"
      },
      {
        id: "step4",
        text: "Subtract 12 from both sides: $-3x = 6$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step5",
        text: "Add 12 to both sides: $-3x = 30$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS",
        feedback: "If you distributed correctly to get $-3x + 12 = 18$, subtract 12"
      },
      {
        id: "step6",
        text: "Divide by -3 and remember to keep the negative: $x = -2$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.FOUND.NEG_NUM"
      },
      {
        id: "step7",
        text: "Divide by -3 and drop the negative: $x = 2$",
        isCorrect: false,
        misconceptionCode: "ALG1-NEG-DIV",
        feedback: "When dividing by a negative, the sign matters: $6 ÷ (-3) = -2$"
      }
    ],
    correctAnswer: ["step1", "step4", "step6"],  // or ["step3", "step6"]
    solution: "Either distribute first: $-3x + 12 = 18$, then $-3x = 6$, so $x = -2$. Or divide first: $x - 4 = -6$, so $x = -2$",
    timeLimit: 180,
    avgTimeMs: 130000
  },

  {
    id: "ALG1_STEP_003",
    code: "ALG1_STEP_003",
    stem: "To solve the inequality $-2x + 3 > 7$, which steps should you perform? Check all that apply.",
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
        text: "Subtract 3 from both sides: $-2x > 4$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.INEQ.MULTI_STEP"
      },
      {
        id: "step2",
        text: "Add 3 to both sides: $-2x > 10$",
        isCorrect: false,
        misconceptionCode: "ALG1-INVERSE-OPS"
      },
      {
        id: "step3",
        text: "Divide by -2 and keep the inequality sign: $x > -2$",
        isCorrect: false,
        misconceptionCode: "ALG1-INEQ-FLIP",
        feedback: "When dividing by a negative in an inequality, flip the sign!"
      },
      {
        id: "step4",
        text: "Divide by -2 and flip the inequality sign: $x < -2$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.INEQ.FLIP"
      },
      {
        id: "step5",
        text: "Test a value like $x = -3$: $-2(-3) + 3 = 9 > 7$ ✓",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK"
      },
      {
        id: "step6",
        text: "Test a value like $x = 0$: $-2(0) + 3 = 3 > 7$ ✗",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.EQ.CHECK",
        feedback: "Good check! This confirms $x = 0$ is not in the solution set"
      }
    ],
    correctAnswer: ["step1", "step4", "step5"],
    solution: "Subtract 3: $-2x > 4$. Divide by -2 and flip sign: $x < -2$",
    timeLimit: 180,
    avgTimeMs: 140000
  },

  // =====================================
  // QUADRATIC EQUATIONS - STEP SELECTION
  // =====================================

  {
    id: "ALG1_STEP_004",
    code: "ALG1_STEP_004",
    stem: "To solve $x^2 - 5x + 6 = 0$ by factoring, which steps should you perform? Check all that apply.",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.QUAD.FACTOR",
      "ALG1.QUAD.ZERO_PROD",
      "ALG1.FOUND.FACTORS"
    ],
    primarySkillCode: "ALG1.QUAD.FACTOR",
    irtA: 1.6,
    irtB: 1.0,
    irtC: 0.25,
    stepOptions: [
      {
        id: "step1",
        text: "Find two numbers that multiply to 6 and add to -5",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.FOUND.FACTORS"
      },
      {
        id: "step2",
        text: "Find two numbers that multiply to -5 and add to 6",
        isCorrect: false,
        misconceptionCode: "ALG1-FACTOR-MIX",
        feedback: "In $x^2 + bx + c$, find numbers that multiply to c and add to b"
      },
      {
        id: "step3",
        text: "The numbers are -2 and -3",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.FOUND.FACTORS"
      },
      {
        id: "step4",
        text: "The numbers are 2 and 3",
        isCorrect: false,
        misconceptionCode: "ALG1-SIGN-ERROR",
        feedback: "Check: 2 + 3 = 5, not -5"
      },
      {
        id: "step5",
        text: "Factor as $(x - 2)(x - 3) = 0$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.QUAD.FACTOR"
      },
      {
        id: "step6",
        text: "Factor as $(x + 2)(x + 3) = 0$",
        isCorrect: false,
        misconceptionCode: "ALG1-SIGN-ERROR"
      },
      {
        id: "step7",
        text: "Apply zero product property: $x - 2 = 0$ or $x - 3 = 0$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.QUAD.ZERO_PROD"
      },
      {
        id: "step8",
        text: "Solutions are $x = 2$ and $x = 3$",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.ISOLATE"
      },
      {
        id: "step9",
        text: "Add 2 and 3 to get the solution: $x = 5$",
        isCorrect: false,
        misconceptionCode: "ALG1-ZERO-PROD",
        feedback: "Each factor gives a separate solution"
      }
    ],
    correctAnswer: ["step1", "step3", "step5", "step7", "step8"],
    solution: "Factor: $(x - 2)(x - 3) = 0$. Apply zero product: $x = 2$ or $x = 3$",
    timeLimit: 240,
    avgTimeMs: 180000
  },

  // =====================================
  // SYSTEMS OF EQUATIONS - STEP SELECTION
  // =====================================

  {
    id: "ALG1_STEP_005",
    code: "ALG1_STEP_005",
    stem: "To solve the system $\\begin{cases} 2x + y = 10 \\\\ x - y = 2 \\end{cases}$ by elimination, which steps should you perform?",
    format: "STEP_SELECTION" as ItemFormat,
    difficulty: "HIGH",
    skillCodes: [
      "ALG1.SYSTEMS.ELIM",
      "ALG1.SYSTEMS.SUBST_BACK",
      "ALG1.EQ.MULTI_STEP"
    ],
    primarySkillCode: "ALG1.SYSTEMS.ELIM",
    irtA: 1.7,
    irtB: 1.2,
    irtC: 0.2,
    stepOptions: [
      {
        id: "step1",
        text: "Add the equations to eliminate y: $3x = 12$",
        isCorrect: true,
        order: 1,
        skillCode: "ALG1.SYSTEMS.ELIM"
      },
      {
        id: "step2",
        text: "Subtract the equations to eliminate y: $x = 8$",
        isCorrect: false,
        misconceptionCode: "ALG1-ELIM-SIGN",
        feedback: "Check: $(2x + y) - (x - y) = x + 2y$, doesn't eliminate y"
      },
      {
        id: "step3",
        text: "Multiply first equation by -1, then add",
        isCorrect: false,
        misconceptionCode: "ALG1-ELIM-UNNECESSARY",
        feedback: "The y terms already have opposite signs, just add"
      },
      {
        id: "step4",
        text: "Solve for x: $x = 4$",
        isCorrect: true,
        order: 2,
        skillCode: "ALG1.EQ.ONE_STEP"
      },
      {
        id: "step5",
        text: "Substitute $x = 4$ into first equation: $8 + y = 10$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.SYSTEMS.SUBST_BACK"
      },
      {
        id: "step6",
        text: "Substitute $x = 4$ into second equation: $4 - y = 2$",
        isCorrect: true,
        order: 3,
        skillCode: "ALG1.SYSTEMS.SUBST_BACK",
        feedback: "Either equation works for finding y"
      },
      {
        id: "step7",
        text: "Solve for y: $y = 2$",
        isCorrect: true,
        order: 4,
        skillCode: "ALG1.EQ.ONE_STEP"
      },
      {
        id: "step8",
        text: "Check in both equations: $(4, 2)$ satisfies both",
        isCorrect: true,
        order: 5,
        skillCode: "ALG1.EQ.CHECK"
      }
    ],
    correctAnswer: ["step1", "step4", "step5", "step7", "step8"],
    solution: "Add equations: $3x = 12$, so $x = 4$. Substitute: $y = 2$. Solution: $(4, 2)$",
    timeLimit: 240,
    avgTimeMs: 200000
  }
];

// Add these questions to the main question bank
export function addStepSelectionQuestions(questionBank: AlgebraItem[]): AlgebraItem[] {
  return [...questionBank, ...stepSelectionQuestions];
}