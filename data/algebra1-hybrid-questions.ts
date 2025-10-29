// Hybrid format questions - combining answers with process verification
import { AlgebraItem, ItemFormat } from '@/types/algebra1-diagnostic';

export const hybridQuestions: AlgebraItem[] = [
  // Linear equation with verification
  {
    id: "ALG1_HYBRID_001",
    code: "ALG1_HYBRID_001",
    stem: "Solve for x: $3x - 7 = 14$",
    format: "HYBRID_VERIFY" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.EQ.LINEAR_ONE", "ALG1.EQ.LINEAR_SOLVE"],
    primarySkillCode: "ALG1.EQ.LINEAR_ONE",
    irtA: 1.0,
    irtB: -0.5,
    irtC: 0.15,
    correctAnswer: 7,
    verificationPrompt: "Select ALL the steps you used to solve this equation:",
    verificationOptions: [
      {
        id: "v1",
        text: "Added 7 to both sides",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1,
        skillCode: "ALG1.EQ.LINEAR_SOLVE"
      },
      {
        id: "v2",
        text: "Divided both sides by 3",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1,
        skillCode: "ALG1.EQ.LINEAR_SOLVE"
      },
      {
        id: "v3",
        text: "Checked answer by substituting back",
        isRequired: false,
        isCorrect: true,
        category: "check",
        points: 0.5
      },
      {
        id: "v4",
        text: "Subtracted 7 from both sides",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "ALG1-LINEAR-INVERSE"
      },
      {
        id: "v5",
        text: "Multiplied both sides by 3",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "ALG1-LINEAR-INVERSE"
      },
      {
        id: "v6",
        text: "Used the quadratic formula",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "ALG1-METHOD-CONFUSION"
      }
    ],
    requiredVerifications: ["v1", "v2"],
    solution: "Add 7 to both sides: $3x = 21$, then divide by 3: $x = 7$",
    timeLimit: 120
  },

  // Quadratic factoring with verification
  {
    id: "ALG1_HYBRID_002",
    code: "ALG1_HYBRID_002",
    stem: "Factor completely: $x^2 + 5x + 6$",
    format: "HYBRID_VERIFY" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.QUAD.FACTOR_SIMPLE", "ALG1.QUAD.FACTOR"],
    primarySkillCode: "ALG1.QUAD.FACTOR_SIMPLE",
    irtA: 1.3,
    irtB: 0.3,
    irtC: 0.2,
    correctAnswer: "(x + 2)(x + 3)",
    verificationPrompt: "Which methods or checks did you use? Select all that apply:",
    verificationOptions: [
      {
        id: "v1",
        text: "Found two numbers that multiply to 6 and add to 5",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 2,
        skillCode: "ALG1.QUAD.FACTOR_SIMPLE"
      },
      {
        id: "v2",
        text: "Used FOIL to verify the answer",
        isRequired: false,
        isCorrect: true,
        category: "check",
        points: 1
      },
      {
        id: "v3",
        text: "Recognized it as a perfect square trinomial",
        isCorrect: false,
        category: "setup",
        misconceptionCode: "ALG1-FACTOR-PATTERN"
      },
      {
        id: "v4",
        text: "Used the AC method",
        isCorrect: true,
        category: "solve",
        points: 1,
        skillCode: "ALG1.QUAD.FACTOR"
      },
      {
        id: "v5",
        text: "Tried (x + 1)(x + 6) first",
        isCorrect: false,
        category: "solve",
        points: -0.5,
        misconceptionCode: "ALG1-FACTOR-GUESS"
      },
      {
        id: "v6",
        text: "Checked that the middle term is correct",
        isCorrect: true,
        category: "check",
        points: 0.5
      }
    ],
    requiredVerifications: ["v1"],
    solution: "Factors of 6: 1×6, 2×3. Since 2+3=5, answer is $(x+2)(x+3)$",
    hints: [
      { level: 1, content: "What two numbers multiply to give 6?" },
      { level: 2, content: "Which of those pairs add to give 5?" }
    ],
    timeLimit: 150
  },

  // System of equations with method verification
  {
    id: "ALG1_HYBRID_003",
    code: "ALG1_HYBRID_003",
    stem: "Solve the system:\\n$2x + y = 7$\\n$x - y = 2$",
    format: "HYBRID_VERIFY" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.SYS.LINEAR_TWO", "ALG1.SYS.SOLVE"],
    primarySkillCode: "ALG1.SYS.LINEAR_TWO",
    irtA: 1.2,
    irtB: 0.5,
    irtC: 0.15,
    correctAnswer: { x: 3, y: 1 },
    verificationPrompt: "How did you solve this system? Select all steps/methods used:",
    verificationOptions: [
      {
        id: "v1",
        text: "Added the two equations to eliminate y",
        isCorrect: true,
        category: "solve",
        points: 2,
        skillCode: "ALG1.SYS.ELIMINATION"
      },
      {
        id: "v2",
        text: "Used substitution method",
        isCorrect: true,
        category: "solve",
        points: 2,
        skillCode: "ALG1.SYS.SUBSTITUTION"
      },
      {
        id: "v3",
        text: "Graphed both lines to find intersection",
        isCorrect: true,
        category: "solve",
        points: 1,
        skillCode: "ALG1.SYS.GRAPHICAL"
      },
      {
        id: "v4",
        text: "Found x first, then substituted back for y",
        isCorrect: true,
        category: "solve",
        points: 1
      },
      {
        id: "v5",
        text: "Verified solution in both original equations",
        isCorrect: true,
        category: "check",
        points: 1
      },
      {
        id: "v6",
        text: "Multiplied first equation by -1",
        isCorrect: false,
        category: "setup",
        misconceptionCode: "ALG1-SYS-UNNECESSARY"
      }
    ],
    solution: "Add equations: $3x = 9$, so $x = 3$. Substitute: $3 - y = 2$, so $y = 1$",
    timeLimit: 180
  },

  // Exponent rules with verification
  {
    id: "ALG1_HYBRID_004",
    code: "ALG1_HYBRID_004",
    stem: "Simplify: $(x^3)^2 \\cdot x^{-4}$",
    format: "HYBRID_VERIFY" as ItemFormat,
    difficulty: "MEDIUM",
    skillCodes: ["ALG1.EXP.RULES", "ALG1.EXP.PRODUCT"],
    primarySkillCode: "ALG1.EXP.RULES",
    irtA: 1.4,
    irtB: 0.8,
    irtC: 0.2,
    correctAnswer: "$x^2$",
    verificationPrompt: "Which exponent rules did you apply? Select all that apply:",
    verificationOptions: [
      {
        id: "v1",
        text: "Power rule: $(x^m)^n = x^{mn}$",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1.5,
        skillCode: "ALG1.EXP.POWER"
      },
      {
        id: "v2",
        text: "Product rule: $x^m \\cdot x^n = x^{m+n}$",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1.5,
        skillCode: "ALG1.EXP.PRODUCT"
      },
      {
        id: "v3",
        text: "Quotient rule: $x^m / x^n = x^{m-n}$",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "ALG1-EXP-WRONG-RULE"
      },
      {
        id: "v4",
        text: "Converted negative exponent to fraction",
        isCorrect: false,
        category: "setup",
        misconceptionCode: "ALG1-EXP-UNNECESSARY"
      },
      {
        id: "v5",
        text: "Calculated: $x^6 \\cdot x^{-4} = x^2$",
        isCorrect: true,
        category: "solve",
        points: 1
      }
    ],
    requiredVerifications: ["v1", "v2"],
    solution: "$(x^3)^2 = x^6$, then $x^6 \\cdot x^{-4} = x^{6+(-4)} = x^2$",
    timeLimit: 120
  },

  // Function evaluation with understanding check
  {
    id: "ALG1_HYBRID_005",
    code: "ALG1_HYBRID_005",
    stem: "If $f(x) = 2x^2 - 3x + 1$, find $f(-2)$",
    format: "HYBRID_VERIFY" as ItemFormat,
    difficulty: "LOW",
    skillCodes: ["ALG1.FUNC.EVALUATE", "ALG1.FOUND.PEMDAS"],
    primarySkillCode: "ALG1.FUNC.EVALUATE",
    irtA: 0.9,
    irtB: -0.3,
    irtC: 0.2,
    correctAnswer: 15,
    verificationPrompt: "What steps did you take to evaluate $f(-2)$?",
    verificationOptions: [
      {
        id: "v1",
        text: "Substituted -2 for every x in the expression",
        isRequired: true,
        isCorrect: true,
        category: "setup",
        points: 1,
        skillCode: "ALG1.FUNC.EVALUATE"
      },
      {
        id: "v2",
        text: "Calculated $(-2)^2 = 4$",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1
      },
      {
        id: "v3",
        text: "Calculated $-3(-2) = 6$",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 1
      },
      {
        id: "v4",
        text: "Calculated $(-2)^2 = -4$",
        isCorrect: false,
        category: "solve",
        misconceptionCode: "ALG1-SQUARE-NEG"
      },
      {
        id: "v5",
        text: "Added: $8 + 6 + 1 = 15$",
        isRequired: true,
        isCorrect: true,
        category: "solve",
        points: 0.5
      },
      {
        id: "v6",
        text: "Used order of operations correctly",
        isCorrect: true,
        category: "solve",
        points: 0.5,
        skillCode: "ALG1.FOUND.PEMDAS"
      }
    ],
    requiredVerifications: ["v1", "v2", "v3", "v5"],
    solution: "$f(-2) = 2(-2)^2 - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15$",
    timeLimit: 120
  }
];