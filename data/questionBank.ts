import { DiagnosticQuestion } from '@/types';
import { concepts } from './concepts';

const getConceptById = (id: string) => concepts.find(c => c.id === id)!;

export const questionBank: DiagnosticQuestion[] = [
  {
    id: 'q1',
    content: 'Solve the equation x² - 3x - 10 = 0 and verify one of your solutions.',
    type: 'open-ended',
    branch: 'main',
    difficulty: 'medium',
    conceptsTested: [
      getConceptById('factoring-basics'),
      getConceptById('quadratic-formula-application'),
      getConceptById('solution-verification'),
    ],
    correctAnswer: 'x = 5 and x = -2',
    hint: 'Try factoring or using the quadratic formula',
    explanation: 'The equation factors as (x - 5)(x + 2) = 0, giving solutions x = 5 and x = -2',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q2-advanced',
      },
      {
        condition: { type: 'specific-error', errorType: 'factor-pair-error' },
        nextQuestionId: 'q2-branch-a',
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('factor-pairs')],
          errorPatterns: ['factor-pair-error'],
          confidence: 0.7,
        },
      },
      {
        condition: { type: 'specific-error', errorType: 'formula-application' },
        nextQuestionId: 'q2-branch-b',
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('quadratic-formula-application')],
          errorPatterns: ['formula-application'],
          confidence: 0.7,
        },
      },
      {
        condition: { type: 'partial' },
        nextQuestionId: 'q2-branch-c',
      },
      {
        condition: { type: 'no-attempt' },
        nextQuestionId: 'q2-branch-d',
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q2-general',
      },
    ],
  },

  // Branch A - Factoring errors
  {
    id: 'q2-branch-a',
    content: 'What two numbers multiply to give -10 and add to give -3?',
    type: 'open-ended',
    branch: 'A',
    difficulty: 'easy',
    conceptsTested: [
      getConceptById('factor-pairs'),
      getConceptById('integer-operations'),
    ],
    correctAnswer: '-5 and 2',
    hint: 'List factor pairs of -10: (1, -10), (-1, 10), (2, -5), (-2, 5)',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q3-branch-a-foil',
        diagnosis: {
          strengths: [getConceptById('factor-pairs')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.8,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-branch-a-arithmetic',
      },
    ],
  },

  {
    id: 'q3-branch-a-foil',
    content: 'Expand (x - 5)(x + 2) using the FOIL method. Show your work.',
    type: 'open-ended',
    branch: 'A',
    difficulty: 'easy',
    conceptsTested: [
      getConceptById('foil-method'),
      getConceptById('integer-operations'),
    ],
    correctAnswer: 'x² - 3x - 10',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-verify-factoring',
        diagnosis: {
          strengths: [getConceptById('foil-method')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.85,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q4-basic-multiplication',
      },
    ],
  },

  {
    id: 'q3-branch-a-arithmetic',
    content: 'Calculate: (-5) × 2 = ? and (-5) + 2 = ?',
    type: 'multiple-choice',
    branch: 'A',
    difficulty: 'easy',
    conceptsTested: [
      getConceptById('integer-operations'),
      getConceptById('sign-rules'),
    ],
    options: ['-10 and -3', '10 and 3', '-10 and 3', '10 and -3'],
    correctAnswer: '-10 and -3',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-apply-factors',
        diagnosis: {
          strengths: [getConceptById('integer-operations')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.7,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('sign-rules'), getConceptById('integer-operations')],
          errorPatterns: ['arithmetic-error', 'sign-error'],
          confidence: 0.8,
        },
      },
    ],
  },

  // Branch B - Quadratic formula errors
  {
    id: 'q2-branch-b',
    content: 'For the equation x² - 3x - 10 = 0, identify: a = ___, b = ___, c = ___',
    type: 'open-ended',
    branch: 'B',
    difficulty: 'easy',
    conceptsTested: [getConceptById('coefficient-identification')],
    correctAnswer: 'a = 1, b = -3, c = -10',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q3-branch-b-discriminant',
        diagnosis: {
          strengths: [getConceptById('coefficient-identification')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.8,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-branch-b-standard-form',
      },
    ],
  },

  {
    id: 'q3-branch-b-discriminant',
    content: 'Calculate the discriminant (b² - 4ac) for x² - 3x - 10 = 0',
    type: 'multiple-choice',
    branch: 'B',
    difficulty: 'medium',
    conceptsTested: [
      getConceptById('discriminant'),
      getConceptById('integer-operations'),
    ],
    options: ['49', '-31', '31', '-49'],
    correctAnswer: '49',
    hint: 'b² - 4ac = (-3)² - 4(1)(-10)',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-branch-b-formula',
        diagnosis: {
          strengths: [getConceptById('discriminant')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.85,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q4-branch-b-arithmetic',
      },
    ],
  },

  {
    id: 'q3-branch-b-standard-form',
    content: 'Which of these is the standard form of a quadratic equation?',
    type: 'multiple-choice',
    branch: 'B',
    difficulty: 'easy',
    conceptsTested: [getConceptById('coefficient-identification')],
    options: [
      'ax² + bx + c = 0',
      'y = mx + b',
      'x² = c',
      'ax + b = 0',
    ],
    correctAnswer: 'ax² + bx + c = 0',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-branch-b-identify-retry',
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('coefficient-identification'), getConceptById('equation-solving')],
          errorPatterns: ['coefficient-identification'],
          confidence: 0.9,
        },
      },
    ],
  },

  // Branch C - Method correct but execution errors
  {
    id: 'q2-branch-c',
    content: 'If (x - 5)(x + 2) = 0, what are all possible values of x?',
    type: 'open-ended',
    branch: 'C',
    difficulty: 'easy',
    conceptsTested: [getConceptById('zero-product-property')],
    correctAnswer: 'x = 5 or x = -2',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q3-branch-c-verify',
        diagnosis: {
          strengths: [getConceptById('zero-product-property')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.85,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-branch-c-zero-product',
      },
    ],
  },

  {
    id: 'q3-branch-c-verify',
    content: 'Substitute x = 5 into x² - 3x - 10. What do you get?',
    type: 'multiple-choice',
    branch: 'C',
    difficulty: 'easy',
    conceptsTested: [
      getConceptById('solution-verification'),
      getConceptById('substitution'),
    ],
    options: ['0', '10', '-10', '5'],
    correctAnswer: '0',
    hint: '(5)² - 3(5) - 10 = ?',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [getConceptById('solution-verification'), getConceptById('substitution')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.9,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q4-branch-c-arithmetic-check',
      },
    ],
  },

  {
    id: 'q3-branch-c-zero-product',
    content: 'True or False: If A × B = 0, then either A = 0 or B = 0 (or both)',
    type: 'multiple-choice',
    branch: 'C',
    difficulty: 'easy',
    conceptsTested: [getConceptById('zero-product-property')],
    options: ['True', 'False'],
    correctAnswer: 'True',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-branch-c-apply',
        diagnosis: {
          strengths: [getConceptById('zero-product-property')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.75,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('zero-product-property')],
          errorPatterns: ['zero-product-property'],
          confidence: 0.9,
        },
      },
    ],
  },

  // Branch D - No attempt / Low confidence
  {
    id: 'q2-branch-d',
    content: 'Which method would you prefer to solve x² - 3x - 10 = 0?',
    type: 'multiple-choice',
    branch: 'D',
    difficulty: 'easy',
    conceptsTested: [getConceptById('equation-solving')],
    options: [
      'Factoring',
      'Quadratic Formula',
      'Graphing',
      "I'm not sure",
    ],
    correctAnswer: 'Factoring',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q3-branch-d-guided-factor',
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-branch-d-basic-equation',
      },
    ],
  },

  {
    id: 'q3-branch-d-guided-factor',
    content: 'To factor x² - 3x - 10, we need two numbers that multiply to -10. Which pair works?',
    type: 'multiple-choice',
    branch: 'D',
    difficulty: 'easy',
    conceptsTested: [getConceptById('factor-pairs')],
    options: [
      '2 and -5',
      '10 and -1',
      '5 and -2',
      '-10 and 1',
    ],
    correctAnswer: '2 and -5',
    hint: 'Check: Does 2 × (-5) = -10? Does 2 + (-5) = -3?',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-branch-d-complete',
        diagnosis: {
          strengths: [getConceptById('factor-pairs')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.6,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('factor-pairs'), getConceptById('factoring-basics')],
          errorPatterns: ['factor-pair-error'],
          confidence: 0.7,
        },
      },
    ],
  },

  {
    id: 'q3-branch-d-basic-equation',
    content: 'Solve the simpler equation: (x - 5) = 0',
    type: 'multiple-choice',
    branch: 'D',
    difficulty: 'easy',
    conceptsTested: [getConceptById('equation-solving')],
    options: ['x = 5', 'x = -5', 'x = 0', 'x = 1'],
    correctAnswer: 'x = 5',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q4-branch-d-build-up',
        diagnosis: {
          strengths: [getConceptById('equation-solving')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.5,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('equation-solving'), getConceptById('algebra-basics')],
          errorPatterns: [],
          confidence: 0.8,
        },
      },
    ],
  },

  // Additional follow-up questions
  {
    id: 'q2-advanced',
    content: 'For x² - 3x - 10 = 0, how many real solutions exist and why?',
    type: 'open-ended',
    branch: 'main',
    difficulty: 'hard',
    conceptsTested: [
      getConceptById('discriminant'),
      getConceptById('quadratic-formula-application'),
    ],
    correctAnswer: 'Two real solutions because the discriminant is positive (49 > 0)',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [
            getConceptById('discriminant'),
            getConceptById('quadratic-formula-application'),
          ],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.95,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-discriminant-review',
      },
    ],
  },

  {
    id: 'q2-general',
    content: 'Which of these is a solution to x² - 3x - 10 = 0?',
    type: 'multiple-choice',
    branch: 'main',
    difficulty: 'easy',
    conceptsTested: [getConceptById('solution-verification')],
    options: ['x = 5', 'x = 3', 'x = 10', 'x = -10'],
    correctAnswer: 'x = 5',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: 'q3-find-other-solution',
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: 'q3-verify-basics',
      },
    ],
  },

  // Additional questions for comprehensive coverage
  {
    id: 'q4-verify-factoring',
    content: 'Factor x² + 5x + 6',
    type: 'multiple-choice',
    branch: 'A',
    difficulty: 'medium',
    conceptsTested: [getConceptById('factoring-basics'), getConceptById('factor-pairs')],
    options: [
      '(x + 2)(x + 3)',
      '(x + 1)(x + 6)',
      '(x - 2)(x - 3)',
      '(x + 5)(x + 1)',
    ],
    correctAnswer: '(x + 2)(x + 3)',
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [getConceptById('factoring-basics')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.9,
        },
      },
      {
        condition: { type: 'incorrect' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [],
          weaknesses: [getConceptById('factoring-basics')],
          errorPatterns: ['factor-pair-error'],
          confidence: 0.85,
        },
      },
    ],
  },

  {
    id: 'q4-branch-b-formula',
    content: 'Using the quadratic formula, what is x when x² - 3x - 10 = 0? (Select all that apply)',
    type: 'multi-select',
    branch: 'B',
    difficulty: 'medium',
    conceptsTested: [getConceptById('quadratic-formula-application')],
    options: ['5', '-2', '3', '-5'],
    correctAnswer: ['5', '-2'],
    nextQuestionRules: [
      {
        condition: { type: 'correct' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [getConceptById('quadratic-formula-application')],
          weaknesses: [],
          errorPatterns: [],
          confidence: 0.95,
        },
      },
      {
        condition: { type: 'partial' },
        nextQuestionId: null,
        diagnosis: {
          strengths: [getConceptById('quadratic-formula-application')],
          weaknesses: [],
          errorPatterns: ['formula-application'],
          confidence: 0.7,
        },
      },
    ],
  },
];