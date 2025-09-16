import { DiagnosticQuestion } from '@/types';

export const comprehensiveQuestionBank: DiagnosticQuestion[] = [
  // ============================================
  // ALGEBRA 1 QUESTIONS (Grades 6-8)
  // ============================================

  // A1-1: Linear Equations
  {
    id: 'alg1-linear-1',
    type: 'multiple-choice',
    difficulty: 'easy',
    branch: 'main',
    content: 'Solve for $x$: $3x + 7 = 22$',
    options: ['$x = 5$', '$x = 7$', '$x = 15$', '$x = 9$'],
    correctAnswer: '$x = 5$',
    hint: 'Subtract 7 from both sides, then divide by 3',
    explanation: 'Subtract 7: $3x = 15$, then divide by 3: $x = 5$',
    conceptsTested: [
      { id: 'linear-equations', name: 'Linear Equations', category: 'algebra-basics', description: 'Solving one-variable linear equations' }
    ],
    nextQuestionRules: [],
  },

  // A1-2: Systems of Equations
  {
    id: 'alg1-systems-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'main',
    content: 'Solve the system: $$\\begin{align} y &= 2x + 3 \\\\ y &= -x + 9 \\end{align}$$',
    options: ['$(2, 7)$', '$(3, 6)$', '$(4, 11)$', '$(1, 5)$'],
    correctAnswer: '$(2, 7)$',
    hint: 'Set the equations equal to each other since both equal y',
    explanation: '$2x + 3 = -x + 9$, so $3x = 6$, thus $x = 2$ and $y = 7$',
    conceptsTested: [
      { id: 'systems-of-equations', name: 'Systems of Equations', category: 'algebra-basics', description: 'Solving systems of linear equations' }
    ],
    nextQuestionRules: [],
  },

  // A1-3: Inequalities
  {
    id: 'alg1-inequality-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'main',
    content: 'Solve the inequality: $-2x + 8 > 14$',
    options: ['$x < -3$', '$x > -3$', '$x < 3$', '$x > 3$'],
    correctAnswer: '$x < -3$',
    hint: 'Remember to flip the inequality sign when dividing by a negative',
    explanation: 'Subtract 8: $-2x > 6$. Divide by -2 and flip sign: $x < -3$',
    conceptsTested: [
      { id: 'inequalities', name: 'Inequalities', category: 'algebra-basics', description: 'Solving linear inequalities' }
    ],
    nextQuestionRules: [],
  },

  // A1-4: Slope and Linear Functions
  {
    id: 'alg1-slope-1',
    type: 'multiple-choice',
    difficulty: 'easy',
    branch: 'main',
    content: 'Find the slope of the line passing through points $(2, 5)$ and $(6, 13)$',
    options: ['$m = 2$', '$m = 3$', '$m = 4$', '$m = \\frac{1}{2}$'],
    correctAnswer: '$m = 2$',
    hint: 'Use the slope formula: $m = \\frac{y_2 - y_1}{x_2 - x_1}$',
    explanation: '$m = \\frac{13 - 5}{6 - 2} = \\frac{8}{4} = 2$',
    conceptsTested: [
      { id: 'slope', name: 'Slope', category: 'algebra-basics', description: 'Finding slope between two points' }
    ],
    nextQuestionRules: [],
  },

  // A1-5: Factoring
  {
    id: 'alg1-factor-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'main',
    content: 'Factor completely: $x^2 + 7x + 12$',
    options: ['$(x + 3)(x + 4)$', '$(x + 2)(x + 6)$', '$(x + 1)(x + 12)$', '$(x - 3)(x - 4)$'],
    correctAnswer: '$(x + 3)(x + 4)$',
    hint: 'Find two numbers that multiply to 12 and add to 7',
    explanation: '$3 × 4 = 12$ and $3 + 4 = 7$, so the answer is $(x + 3)(x + 4)$',
    conceptsTested: [
      { id: 'factoring', name: 'Factoring', category: 'factoring', description: 'Factoring quadratic expressions' }
    ],
    nextQuestionRules: [],
  },

  // A1-6: Exponents and Radicals
  {
    id: 'alg1-exponents-1',
    type: 'multiple-choice',
    difficulty: 'easy',
    branch: 'main',
    content: 'Simplify: $(x^3)^2 \\cdot x^{-4}$',
    options: ['$x^2$', '$x^{10}$', '$x^5$', '$x^{-2}$'],
    correctAnswer: '$x^2$',
    hint: 'Use the power rule and product rule for exponents',
    explanation: '$(x^3)^2 = x^6$, then $x^6 \\cdot x^{-4} = x^{6-4} = x^2$',
    conceptsTested: [
      { id: 'exponents', name: 'Exponents', category: 'algebra-basics', description: 'Simplifying expressions with exponents' }
    ],
    nextQuestionRules: [],
  },

  // ============================================
  // ALGEBRA 2 QUESTIONS (Grades 9-11)
  // ============================================

  // A2-1: Quadratic Equations
  {
    id: 'alg2-quadratic-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'A',
    content: 'Solve using the quadratic formula: $2x^2 - 5x - 3 = 0$',
    options: ['$x = 3, -\\frac{1}{2}$', '$x = -3, \\frac{1}{2}$', '$x = 1, -\\frac{3}{2}$', '$x = -1, \\frac{3}{2}$'],
    correctAnswer: 'x = 3, -\\frac{1}{2}',
    hint: 'Use $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ where $a=2$, $b=-5$, $c=-3$',
    explanation: '$x = \\frac{5 \\pm \\sqrt{25 + 24}}{4} = \\frac{5 \\pm 7}{4}$, giving $x = 3$ or $x = -\\frac{1}{2}$',
  },

  // A2-2: Polynomial Functions
  {
    id: 'alg2-polynomial-1',
    type: 'multiple-choice',
    difficulty: 'hard',
    branch: 'A',
    content: 'Find all zeros of $f(x) = x^3 - 6x^2 + 11x - 6$',
    options: ['$x = 1, 2, 3$', '$x = -1, -2, -3$', '$x = 2, 3, 4$', '$x = 0, 2, 3$'],
    correctAnswer: 'x = 1, 2, 3',
    hint: 'Try factoring or use synthetic division. Check if x = 1 is a root',
    explanation: 'Factor as $(x-1)(x-2)(x-3) = 0$, so zeros are $x = 1, 2, 3$',
  },

  // A2-3: Exponential Functions
  {
    id: 'alg2-exponential-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'A',
    content: 'Solve for $x$: $2^{x+1} = 32$',
    options: ['$x = 4$', '$x = 5$', '$x = 3$', '$x = 6$'],
    correctAnswer: 'x = 4',
    hint: 'Express 32 as a power of 2',
    explanation: '$32 = 2^5$, so $2^{x+1} = 2^5$, thus $x + 1 = 5$ and $x = 4$',
  },

  // A2-4: Logarithms
  {
    id: 'alg2-log-1',
    type: 'multiple-choice',
    difficulty: 'hard',
    branch: 'A',
    content: 'Solve: $\\log_2(x) + \\log_2(x-2) = 3$',
    options: ['$x = 4$', '$x = 3$', '$x = 5$', '$x = 6$'],
    correctAnswer: 'x = 4',
    hint: 'Use the product rule for logarithms: $\\log_a(m) + \\log_a(n) = \\log_a(mn)$',
    explanation: '$\\log_2(x(x-2)) = 3$, so $x(x-2) = 8$, giving $x^2 - 2x - 8 = 0$. Solving: $x = 4$ (x = -2 is extraneous)',
  },

  // A2-5: Rational Functions
  {
    id: 'alg2-rational-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'A',
    content: 'Find the vertical asymptote(s) of $f(x) = \\frac{x+3}{x^2-4}$',
    options: ['$x = 2, -2$', '$x = 2$', '$x = -2$', '$x = 4, -4$'],
    correctAnswer: 'x = 2, -2',
    hint: 'Vertical asymptotes occur where the denominator equals zero',
    explanation: 'Set $x^2 - 4 = 0$, so $(x-2)(x+2) = 0$, giving $x = 2$ and $x = -2$',
  },

  // A2-6: Sequences and Series
  {
    id: 'alg2-sequence-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'A',
    content: 'Find the sum of the first 10 terms of the arithmetic sequence: $3, 7, 11, 15, ...$',
    options: ['$210$', '$220$', '$200$', '$230$'],
    correctAnswer: '210',
    hint: 'Use $S_n = \\frac{n}{2}(a_1 + a_n)$ or $S_n = \\frac{n}{2}(2a_1 + (n-1)d)$',
    explanation: 'First term $a_1 = 3$, common difference $d = 4$. $S_{10} = \\frac{10}{2}(2(3) + 9(4)) = 5(42) = 210$',
  },

  // ============================================
  // GEOMETRY QUESTIONS (Grades 8-10)
  // ============================================

  // G-1: Angles and Lines
  {
    id: 'geom-angles-1',
    type: 'multiple-choice',
    difficulty: 'easy',
    branch: 'B',
    content: 'Two angles are complementary. If one angle measures $35°$, what is the measure of the other angle?',
    options: ['$55°$', '$145°$', '$45°$', '$65°$'],
    correctAnswer: '55°',
    hint: 'Complementary angles sum to 90°',
    explanation: 'Complementary angles add to $90°$, so the other angle is $90° - 35° = 55°$',
  },

  // G-2: Triangles
  {
    id: 'geom-triangles-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'B',
    content: 'In a right triangle, if one leg is 8 units and the hypotenuse is 10 units, what is the length of the other leg?',
    options: ['6 units', '7 units', '5 units', '4 units'],
    correctAnswer: '6 units',
    hint: 'Use the Pythagorean theorem: $a^2 + b^2 = c^2$',
    explanation: 'By Pythagorean theorem: $8^2 + b^2 = 10^2$, so $64 + b^2 = 100$, thus $b^2 = 36$ and $b = 6$',
  },

  // G-3: Circles
  {
    id: 'geom-circles-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'B',
    content: 'Find the area of a circle with diameter 14 cm. (Use $\\pi \\approx 3.14$)',
    options: ['$153.86$ cm²', '$43.96$ cm²', '$615.44$ cm²', '$87.92$ cm²'],
    correctAnswer: '153.86 cm²',
    hint: 'Area = $\\pi r^2$ and radius is half the diameter',
    explanation: 'Radius = $14 ÷ 2 = 7$ cm. Area = $\\pi(7)^2 = 49\\pi \\approx 153.86$ cm²',
  },

  // G-4: Polygons
  {
    id: 'geom-polygons-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'B',
    content: 'What is the sum of interior angles in a regular hexagon?',
    options: ['$720°$', '$540°$', '$1080°$', '$360°$'],
    correctAnswer: '720°',
    hint: 'Use the formula $(n-2) × 180°$ where n is the number of sides',
    explanation: 'For a hexagon, $n = 6$. Sum = $(6-2) × 180° = 4 × 180° = 720°$',
  },

  // G-5: Coordinate Geometry
  {
    id: 'geom-coordinate-1',
    type: 'multiple-choice',
    difficulty: 'hard',
    branch: 'B',
    content: 'Find the equation of a line perpendicular to $y = 2x - 3$ passing through $(4, 1)$',
    options: ['$y = -\\frac{1}{2}x + 3$', '$y = -\\frac{1}{2}x - 1$', '$y = 2x - 7$', '$y = -2x + 9$'],
    correctAnswer: 'y = -\\frac{1}{2}x + 3',
    hint: 'Perpendicular lines have slopes that are negative reciprocals',
    explanation: 'Perpendicular slope = $-\\frac{1}{2}$. Using point-slope form: $y - 1 = -\\frac{1}{2}(x - 4)$, simplifying to $y = -\\frac{1}{2}x + 3$',
  },

  // G-6: Solid Geometry
  {
    id: 'geom-solid-1',
    type: 'multiple-choice',
    difficulty: 'hard',
    branch: 'B',
    content: 'Find the volume of a cone with radius 6 cm and height 8 cm. (Use $\\pi \\approx 3.14$)',
    options: ['$301.44$ cm³', '$150.72$ cm³', '$904.32$ cm³', '$100.48$ cm³'],
    correctAnswer: '301.44 cm³',
    hint: 'Volume of cone = $\\frac{1}{3}\\pi r^2 h$',
    explanation: 'Volume = $\\frac{1}{3} × \\pi × 6^2 × 8 = \\frac{1}{3} × \\pi × 36 × 8 = 96\\pi \\approx 301.44$ cm³',
  },

  // ============================================
  // ADDITIONAL MIXED DIFFICULTY QUESTIONS
  // ============================================

  // Algebra 1 - Advanced
  {
    id: 'alg1-advanced-1',
    type: 'open-ended',
    difficulty: 'hard',
    branch: 'main',
    content: 'A boat travels 30 miles upstream in the same time it takes to travel 50 miles downstream. If the current speed is 5 mph, what is the speed of the boat in still water?',
    correctAnswer: '20',
    hint: 'Let boat speed = b. Time upstream = Time downstream',
    explanation: 'If boat speed = b, then upstream speed = b-5, downstream = b+5. Since time is equal: 30/(b-5) = 50/(b+5)',
  },

  // Algebra 2 - Complex Numbers
  {
    id: 'alg2-complex-1',
    type: 'multiple-choice',
    difficulty: 'hard',
    branch: 'A',
    content: 'Simplify: $(2 + 3i)(1 - 2i)$',
    options: ['$8 - i$', '$8 + i$', '$-4 - i$', '$-4 + 7i$'],
    correctAnswer: '8 - i',
    hint: 'Use FOIL and remember that $i^2 = -1$',
    explanation: '$(2 + 3i)(1 - 2i) = 2 - 4i + 3i - 6i^2 = 2 - i + 6 = 8 - i$',
  },

  // Geometry - Transformations
  {
    id: 'geom-transform-1',
    type: 'multiple-choice',
    difficulty: 'medium',
    branch: 'B',
    content: 'Point $A(3, -2)$ is reflected across the y-axis, then translated 2 units up. What are the final coordinates?',
    options: ['$(-3, 0)$', '$(3, 0)$', '$(-3, -4)$', '$(3, -4)$'],
    correctAnswer: '(-3, 0)',
    hint: 'Reflection across y-axis changes sign of x-coordinate',
    explanation: 'Reflection across y-axis: $(3, -2) → (-3, -2)$. Translation up 2: $(-3, -2) → (-3, 0)$',
  },
];

// Export branching rules for adaptive testing
export const branchingRules = {
  'algebra-1': {
    easy: ['alg1-linear-1', 'alg1-slope-1', 'alg1-exponents-1'],
    medium: ['alg1-systems-1', 'alg1-inequality-1', 'alg1-factor-1'],
    hard: ['alg1-advanced-1']
  },
  'algebra-2': {
    easy: [],
    medium: ['alg2-quadratic-1', 'alg2-exponential-1', 'alg2-rational-1', 'alg2-sequence-1'],
    hard: ['alg2-polynomial-1', 'alg2-log-1', 'alg2-complex-1']
  },
  'geometry': {
    easy: ['geom-angles-1'],
    medium: ['geom-triangles-1', 'geom-circles-1', 'geom-polygons-1', 'geom-transform-1'],
    hard: ['geom-coordinate-1', 'geom-solid-1']
  }
};

// Grade level mapping
export const gradeLevelMapping = {
  6: ['algebra-1-easy'],
  7: ['algebra-1-easy', 'algebra-1-medium'],
  8: ['algebra-1-medium', 'algebra-1-hard', 'geometry-easy'],
  9: ['algebra-2-medium', 'geometry-medium'],
  10: ['algebra-2-hard', 'geometry-hard'],
  11: ['algebra-2-hard'],
  12: ['algebra-2-hard']
};