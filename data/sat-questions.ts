import { SATQuestion } from '@/types/sat';

/**
 * SAT Math Questions
 *
 * Each question is linked to a skill via skillId.
 * The collegeBoardId is the 8-character ID from College Board (if available).
 *
 * Add questions here as you import them.
 */
export const satQuestions: SATQuestion[] = [
  // ============================================
  // Linear Equations in Two Variables - Easy
  // ============================================

  // Interpretation questions
  {
    id: 'q-ee846db7',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: 'A store sells two different-sized containers of a certain Greek yogurt. The store\'s sales of this Greek yogurt totaled $1{,}277.94$ dollars last month. The equation $5.48x + 7.30y = 1{,}277.94$ represents this situation, where $x$ is the number of smaller containers sold and $y$ is the number of larger containers sold. According to the equation, which of the following represents the price, in dollars, of each smaller container?',
    choices: [
      { label: 'A', text: '$5.48$' },
      { label: 'B', text: '$7.30y$' },
      { label: 'C', text: '$7.30$' },
      { label: 'D', text: '$5.48x$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'ee846db7',
  },
  {
    id: 'q-87322577',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: '$x + y = 75$\n\nThe equation above relates the number of minutes, $x$, Maria spends running each day and the number of minutes, $y$, she spends biking each day. In the equation, what does the number 75 represent?',
    choices: [
      { label: 'A', text: 'The number of minutes spent running each day' },
      { label: 'B', text: 'The number of minutes spent biking each day' },
      { label: 'C', text: 'The total number of minutes spent running and biking each day' },
      { label: 'D', text: 'The number of minutes spent biking for each minute spent running' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '87322577',
  },
  {
    id: 'q-c6b151d4',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: 'A total of $364$ paper straws of equal length were used to construct two types of polygons: triangles and rectangles. The triangles and rectangles were constructed so that no two polygons had a common side. The equation $3x + 4y = 364$ represents this situation, where $x$ is the number of triangles constructed and $y$ is the number of rectangles constructed. What is the best interpretation of $(x, y) = (24, 73)$ in this context?',
    choices: [
      { label: 'A', text: 'If $24$ triangles were constructed, then $73$ rectangles were constructed.' },
      { label: 'B', text: 'If $24$ triangles were constructed, then $73$ paper straws were used.' },
      { label: 'C', text: 'If $73$ triangles were constructed, then $24$ rectangles were constructed.' },
      { label: 'D', text: 'If $73$ triangles were constructed, then $24$ paper straws were used.' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'c6b151d4',
  },
  {
    id: 'q-dd797fe2',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: '$4x + 3y = 24$\n\nMario purchased 4 binders that cost $x$ dollars each and 3 notebooks that cost $y$ dollars each. If the given equation represents this situation, which of the following is the best interpretation of 24 in this context?',
    choices: [
      { label: 'A', text: 'The total cost, in dollars, for all binders purchased' },
      { label: 'B', text: 'The total cost, in dollars, for all notebooks purchased' },
      { label: 'C', text: 'The total cost, in dollars, for all binders and notebooks purchased' },
      { label: 'D', text: 'The difference in the total cost, in dollars, between the number of binders and notebooks purchased' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'dd797fe2',
  },
  {
    id: 'q-b9839f9e',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: '$F = 2.50x + 7.00y$\n\nIn the equation above, $F$ represents the total amount of money, in dollars, a food truck charges for $x$ drinks and $y$ salads. The price, in dollars, of each drink is the same, and the price, in dollars, of each salad is the same. Which of the following is the best interpretation for the number 7.00 in this context?',
    choices: [
      { label: 'A', text: 'The price, in dollars, of one drink' },
      { label: 'B', text: 'The price, in dollars, of one salad' },
      { label: 'C', text: 'The number of drinks bought during the day' },
      { label: 'D', text: 'The number of salads bought during the day' },
    ],
    correctAnswer: 'B',
    collegeBoardId: 'b9839f9e',
  },
  {
    id: 'q-768b2425',
    skillId: 'linear-eq-interp-coeff-easy',
    questionText: 'Last week, an interior designer earned a total of $\\$1{,}258$ from consulting for $x$ hours and drawing up plans for $y$ hours. The equation $68x + 85y = 1{,}258$ represents this situation. Which of the following is the best interpretation of $68$ in this context?',
    choices: [
      { label: 'A', text: 'The interior designer earned $\\$68$ per hour consulting last week.' },
      { label: 'B', text: 'The interior designer worked $68$ hours drawing up plans last week.' },
      { label: 'C', text: 'The interior designer earned $\\$68$ per hour drawing up plans last week.' },
      { label: 'D', text: 'The interior designer worked $68$ hours consulting last week.' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '768b2425',
  },

  // Perpendicular Lines
  {
    id: 'q-5b8a8475',
    skillId: 'linear-eq-perp-slope-easy',
    questionText: 'Line $k$ is defined by $y = 3x + 15$. Line $j$ is perpendicular to line $k$ in the xy-plane. What is the slope of line $j$?',
    choices: [
      { label: 'A', text: '$-\\frac{1}{3}$' },
      { label: 'B', text: '$-\\frac{1}{12}$' },
      { label: 'C', text: '$-\\frac{1}{18}$' },
      { label: 'D', text: '$-\\frac{1}{45}$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '5b8a8475',
  },

  // Table Verification questions
  {
    id: 'q-83f2c3bf',
    skillId: 'linear-eq-table-verify-easy',
    questionText: '$y = x + 4$\n\nWhich table gives three values of $x$ and their corresponding values of $y$ for the given equation?',
    choices: [
      { label: 'A', text: '$x$: 0, 1, 2; $y$: 4, 5, 6' },
      { label: 'B', text: '$x$: 0, 1, 2; $y$: 6, 5, 4' },
      { label: 'C', text: '$x$: 0, 1, 2; $y$: 2, 1, 0' },
      { label: 'D', text: '$x$: 0, 1, 2; $y$: 0, 1, 2' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '83f2c3bf',
  },
  {
    id: 'q-e7343559',
    skillId: 'linear-eq-table-verify-easy',
    questionText: '$y = -4x + 40$\n\nWhich table gives three values of $x$ and their corresponding values of $y$ for the given equation?',
    choices: [
      { label: 'A', text: '$x$: 0, 1, 2; $y$: 0, $-4$, $-8$' },
      { label: 'B', text: '$x$: 0, 1, 2; $y$: 40, 44, 48' },
      { label: 'C', text: '$x$: 0, 1, 2; $y$: 40, 36, 32' },
      { label: 'D', text: '$x$: 0, 1, 2; $y$: 0, 4, 8' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'e7343559',
  },
  {
    id: 'q-cea27ab2',
    skillId: 'linear-eq-table-verify-easy',
    questionText: '$7x - 4y = -84$\n\nFor the given equation, which table gives three values of $x$ and their corresponding values of $y$?',
    choices: [
      { label: 'A', text: '$x$: 0, 4, 8; $y$: 21, 28, 35' },
      { label: 'B', text: '$x$: 0, 4, 8; $y$: 35, 28, 21' },
      { label: 'C', text: '$x$: 21, 28, 35; $y$: 0, 4, 8' },
      { label: 'D', text: '$x$: 21, 28, 35; $y$: 8, 4, 0' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'cea27ab2',
  },
  {
    id: 'q-1efd8202',
    skillId: 'linear-eq-table-verify-easy',
    questionText: '$y = 70x + 8$\n\nWhich table gives three values of $x$ and their corresponding values of $y$ for the given equation?',
    choices: [
      { label: 'A', text: '$x$: 0, 2, 4; $y$: 8, 148, 288' },
      { label: 'B', text: '$x$: 0, 2, 4; $y$: 70, 78, 86' },
      { label: 'C', text: '$x$: 0, 2, 4; $y$: 70, 140, 280' },
      { label: 'D', text: '$x$: 0, 2, 4; $y$: 8, 132, 272' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '1efd8202',
  },

  // Model Setup questions
  {
    id: 'q-b52e5b6f',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'A mixture consisting of only vitamin D and calcium has a total mass of $150$ grams. The mass of vitamin D in the mixture is $50$ grams. What is the mass, in grams, of calcium in the mixture?',
    choices: [
      { label: 'A', text: '$200$' },
      { label: 'B', text: '$150$' },
      { label: 'C', text: '$100$' },
      { label: 'D', text: '$50$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'b52e5b6f',
  },
  {
    id: 'q-4d8ccb96',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A chemist studying the impact of salt on a process mixes $x$ kilograms of a low-salt mixture, which is $2\\%$ salt by weight, with $y$ kilograms of a high-salt mixture, which is $96\\%$ salt by weight, to create $24$ kilograms of a mixture that is $4\\%$ salt by weight. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$0.96x + 0.02y = (0.04)(24)$' },
      { label: 'B', text: '$0.02x + 0.96y = (0.04)(24)$' },
      { label: 'C', text: '$0.96x + 0.02y = 24$' },
      { label: 'D', text: '$0.02x + 0.96y = 24$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '4d8ccb96',
  },
  {
    id: 'q-ebf8d2b7',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A machine makes large boxes or small boxes, one at a time, for a total of $700$ minutes each day. It takes the machine $10$ minutes to make a large box or $5$ minutes to make a small box. Which equation represents the possible number of large boxes, $x$, and small boxes, $y$, the machine can make each day?',
    choices: [
      { label: 'A', text: '$5x + 10y = 700$' },
      { label: 'B', text: '$10x + 5y = 700$' },
      { label: 'C', text: '$(x + y)(10 + 5) = 700$' },
      { label: 'D', text: '$(10 + x)(5 + y) = 700$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: 'ebf8d2b7',
  },
  {
    id: 'q-b450ab03',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'An employee at a restaurant prepares sandwiches and salads. It takes the employee $1.5$ minutes to prepare a sandwich and $1.9$ minutes to prepare a salad. The employee spends a total of $46.1$ minutes preparing $x$ sandwiches and $y$ salads. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$1.9x + 1.5y = 46.1$' },
      { label: 'B', text: '$1.5x + 1.9y = 46.1$' },
      { label: 'C', text: '$x + y = 46.1$' },
      { label: 'D', text: '$30.7x + 24.3y = 46.1$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: 'b450ab03',
  },
  {
    id: 'q-8adf1335',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A city\'s total expense budget for one year was $x$ million dollars. The city budgeted $y$ million dollars for departmental expenses and 201 million dollars for all other expenses. Which of the following represents the relationship between $x$ and $y$ in this context?',
    choices: [
      { label: 'A', text: '$x + y = 201$' },
      { label: 'B', text: '$x - y = 201$' },
      { label: 'C', text: '$2x - y = 201$' },
      { label: 'D', text: '$y - x = 201$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '8adf1335',
  },
  {
    id: 'q-d1042cf8',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A food truck buys forks for $\\$0.04$ each and plates for $\\$0.48$ each. The total cost of $x$ forks and $y$ plates is $\\$661.76$. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$0.48x - 0.04y = 661.76$' },
      { label: 'B', text: '$0.04x - 0.48y = 661.76$' },
      { label: 'C', text: '$0.48x + 0.04y = 661.76$' },
      { label: 'D', text: '$0.04x + 0.48y = 661.76$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'd1042cf8',
  },
  {
    id: 'q-80ae6851',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A producer is creating a video with a length of $70$ minutes. The video will consist of segments that are $1$ minute long and segments that are $3$ minutes long. Which equation represents this situation, where $x$ represents the number of $1$-minute segments and $y$ represents the number of $3$-minute segments?',
    choices: [
      { label: 'A', text: '$4xy = 70$' },
      { label: 'B', text: '$4(x + y) = 70$' },
      { label: 'C', text: '$3x + y = 70$' },
      { label: 'D', text: '$x + 3y = 70$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '80ae6851',
  },
  {
    id: 'q-789975b7',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A gardener buys two kinds of fertilizer. Fertilizer A contains 60% filler materials by weight and Fertilizer B contains 40% filler materials by weight. Together, the fertilizers bought by the gardener contain a total of 240 pounds of filler materials. Which equation models this relationship, where $x$ is the number of pounds of Fertilizer A and $y$ is the number of pounds of Fertilizer B?',
    choices: [
      { label: 'A', text: '$0.4x + 0.6y = 240$' },
      { label: 'B', text: '$0.6x + 0.4y = 240$' },
      { label: 'C', text: '$40x + 60y = 240$' },
      { label: 'D', text: '$60x + 40y = 240$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '789975b7',
  },
  {
    id: 'q-dfa45424',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'Tony spends $80 per month on public transportation. A 10-ride pass costs $12.50, and a single-ride pass costs $1.50. If $g$ represents the number of 10-ride passes Tony buys in a month and $t$ represents the number of single-ride passes Tony buys in a month, which of the following equations best represents the relationship between $g$ and $t$?',
    choices: [
      { label: 'A', text: '$g + t = 80$' },
      { label: 'B', text: '$g + t = 1.50 + 12.50$' },
      { label: 'C', text: '$1.50g + 12.50t = 80$' },
      { label: 'D', text: '$12.50g + 1.50t = 80$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'dfa45424',
  },
  {
    id: 'q-c8e0f511',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'For a camping trip a group bought $x$ one-liter bottles of water and $y$ three-liter bottles of water, for a total of $240$ liters of water. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$x + 3y = 240$' },
      { label: 'B', text: '$x + y = 240$' },
      { label: 'C', text: '$3x + 3y = 240$' },
      { label: 'D', text: '$3x + y = 240$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'c8e0f511',
  },
  {
    id: 'q-029c2dc2',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'A teacher is creating an assignment worth $70$ points. The assignment will consist of questions worth $1$ point and questions worth $3$ points. Which equation represents this situation, where $x$ represents the number of $1$-point questions and $y$ represents the number of $3$-point questions?',
    choices: [
      { label: 'A', text: '$4xy = 70$' },
      { label: 'B', text: '$4(x + y) = 70$' },
      { label: 'C', text: '$3x + y = 70$' },
      { label: 'D', text: '$x + 3y = 70$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '029c2dc2',
  },
  {
    id: 'q-174885f8',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'Jay walks at a speed of $3$ miles per hour and runs at a speed of $5$ miles per hour. He walks for $w$ hours and runs for $r$ hours for a combined total of $14$ miles. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$3w + 5r = 14$' },
      { label: 'B', text: '$\\frac{1}{3}w + \\frac{1}{5}r = 14$' },
      { label: 'C', text: '$\\frac{1}{3}w + \\frac{1}{5}r = 112$' },
      { label: 'D', text: '$3w + 5r = 112$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '174885f8',
  },
  {
    id: 'q-8da536c6',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'In $2010$, a swim club had a total of $35$ swimmers, each classified as either advanced or intermediate. From $2010$ to $2020$, the number of advanced swimmers in the club increased by approximately $53\\%$, and the number of intermediate swimmers in the club increased by approximately $44\\%$. The total number of swimmers in the club increased by approximately $49\\%$. Which equation best represents this situation, where $a$ represents the number of advanced swimmers in the club in $2010$ and $b$ represents the number of intermediate swimmers in the club in $2010$?',
    choices: [
      { label: 'A', text: '$1.53a + 1.49b = 35(1.44)$' },
      { label: 'B', text: '$1.49a + 0.53b = 35(1.44)$' },
      { label: 'C', text: '$1.53a + 1.44b = 35(1.49)$' },
      { label: 'D', text: '$1.44a + 1.53b = 35(1.49)$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '8da536c6',
  },
  {
    id: 'q-535fa6e6',
    skillId: 'linear-eq-model-setup-easy',
    questionText: 'Davio bought some potatoes and celery. The potatoes cost $\\$0.69$ per pound, and the celery cost $\\$0.99$ per pound. If Davio spent $\\$5.34$ in total and bought twice as many pounds of celery as pounds of potatoes, how many pounds of celery did Davio buy?',
    choices: [
      { label: 'A', text: '$2$' },
      { label: 'B', text: '$2.5$' },
      { label: 'C', text: '$2.67$' },
      { label: 'D', text: '$4$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '535fa6e6',
  },

  // Parallel Lines
  {
    id: 'q-24854644',
    skillId: 'linear-eq-parallel-easy',
    questionText: 'What is the equation of the line that passes through the point $(0, 5)$ and is parallel to the graph of $y = 7x + 4$ in the xy-plane?',
    choices: [
      { label: 'A', text: '$y = 5x$' },
      { label: 'B', text: '$y = 7x + 5$' },
      { label: 'C', text: '$y = 7x$' },
      { label: 'D', text: '$y = 5x + 7$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '24854644',
  },
  {
    id: 'q-2d0e13a6',
    skillId: 'linear-eq-parallel-easy',
    questionText: 'Line $k$ is defined by $y = \\frac{1}{4}x + 1$. Line $j$ is parallel to line $k$ in the xy-plane. What is the slope of $j$?',
    choices: [],
    correctAnswer: '1/4',
    collegeBoardId: '2d0e13a6',
  },

  // Slope & Point
  {
    id: 'q-6fa1dc0f',
    skillId: 'linear-eq-slope-point-easy',
    questionText: 'Line $r$ in the xy-plane has a slope of $4$ and passes through the point $(0, 6)$. Which equation defines line $r$?',
    choices: [
      { label: 'A', text: '$y = -6x + 4$' },
      { label: 'B', text: '$y = 6x + 4$' },
      { label: 'C', text: '$y = 4x - 6$' },
      { label: 'D', text: '$y = 4x + 6$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '6fa1dc0f',
  },
  {
    id: 'q-2554b413',
    skillId: 'linear-eq-slope-point-easy',
    questionText: 'In the xy-plane, a line has a slope of 6 and passes through the point $(0, 8)$. Which of the following is an equation of this line?',
    choices: [
      { label: 'A', text: '$y = 6x + 8$' },
      { label: 'B', text: '$y = 6x + 48$' },
      { label: 'C', text: '$y = 8x + 6$' },
      { label: 'D', text: '$y = 8x + 48$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '2554b413',
  },
  {
    id: 'q-10c448d6',
    skillId: 'linear-eq-slope-point-easy',
    questionText: 'A line in the xy-plane has a slope of $\\frac{1}{9}$ and passes through the point $(0, 14)$. Which equation represents this line?',
    choices: [
      { label: 'A', text: '$y = -\\frac{1}{9}x - 14$' },
      { label: 'B', text: '$y = -\\frac{1}{9}x + 14$' },
      { label: 'C', text: '$y = \\frac{1}{9}x - 14$' },
      { label: 'D', text: '$y = \\frac{1}{9}x + 14$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '10c448d6',
  },
  {
    id: 'q-1fe778dc',
    skillId: 'linear-eq-slope-point-easy',
    questionText: 'A line in the xy-plane has a slope of $-\\frac{1}{2}$ and passes through the point $(0, 3)$. Which equation represents this line?',
    choices: [
      { label: 'A', text: '$y = -\\frac{1}{2}x - 3$' },
      { label: 'B', text: '$y = -\\frac{1}{2}x + 3$' },
      { label: 'C', text: '$y = \\frac{1}{2}x - 3$' },
      { label: 'D', text: '$y = \\frac{1}{2}x + 3$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '1fe778dc',
  },

  // Graph Reading
  {
    id: 'q-b2845d88',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line passing through approximately (-4, 0) and (0, -1)]\n\nWhich of the following is an equation of the graph shown in the xy-plane above?',
    choices: [
      { label: 'A', text: '$y = -\\frac{1}{4}x - 1$' },
      { label: 'B', text: '$y = -x - 4$' },
      { label: 'C', text: '$y = -x - \\frac{1}{4}$' },
      { label: 'D', text: '$y = -4x - 1$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'b2845d88',
  },
  {
    id: 'q-b8fa27db',
    skillId: 'linear-eq-parallel-easy',
    questionText: '[Graph showing line j passing through (-2, 4) and (0, 10)]\n\nLine $j$ is shown in the xy-plane. Line $k$ (not shown) is parallel to line $j$. What is the slope of line $k$?',
    choices: [],
    correctAnswer: '3',
    collegeBoardId: 'b8fa27db',
  },
  {
    id: 'q-8368afd1',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line representing combinations of tangerines and lemons that cost $18]\n\nThe graph shows the possible combinations of the number of pounds of tangerines and lemons that could be purchased for $\\$18$ at a certain store. If Melvin purchased lemons and $4$ pounds of tangerines for a total of $\\$18$, how many pounds of lemons did he purchase?',
    choices: [
      { label: 'A', text: '$7$' },
      { label: 'B', text: '$10$' },
      { label: 'C', text: '$14$' },
      { label: 'D', text: '$16$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '8368afd1',
  },
  {
    id: 'q-4acd05cd',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line passing through (1, -3) and (2, -5)]\n\nThe graph shows the linear relationship between $x$ and $y$. Which table gives three values of $x$ and their corresponding values of $y$ for this relationship?',
    choices: [
      { label: 'A', text: '$x$: 0, 1, 2; $y$: 0, $-7$, $-9$' },
      { label: 'B', text: '$x$: 0, 1, 2; $y$: 0, $-3$, $-1$' },
      { label: 'C', text: '$x$: 0, 1, 2; $y$: $-5$, $-7$, $-9$' },
      { label: 'D', text: '$x$: 0, 1, 2; $y$: $-5$, $-3$, $-1$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '4acd05cd',
  },
  {
    id: 'q-eeebe166',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line passing through (-5, 0) and (0, 5)]\n\nWhat is the y-intercept of the line graphed?',
    choices: [
      { label: 'A', text: '$(-5, 0)$' },
      { label: 'B', text: '$(0, 0)$' },
      { label: 'C', text: '$(0, 5)$' },
      { label: 'D', text: '$(0, 9)$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'eeebe166',
  },
  {
    id: 'q-f40552a9',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line passing through approximately (0, 8) and (10, 9)]\n\nWhat is the y-intercept of the line graphed?',
    choices: [
      { label: 'A', text: '$(0, -8)$' },
      { label: 'B', text: '$(0, -\\frac{1}{8})$' },
      { label: 'C', text: '$(0, 0)$' },
      { label: 'D', text: '$(0, 8)$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'f40552a9',
  },
  {
    id: 'q-8a1544f1',
    skillId: 'linear-eq-graph-read-easy',
    questionText: '[Graph showing a line passing through (0, -3) and (1, 0)]\n\nWhat is the equation of the line shown in the xy-plane above?',
    choices: [
      { label: 'A', text: '$y = 3x - 3$' },
      { label: 'B', text: '$y = -3x + 3$' },
      { label: 'C', text: '$y = \\frac{1}{3}x - 3$' },
      { label: 'D', text: '$y = -\\frac{1}{3}x + 3$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '8a1544f1',
  },

  // Intercepts
  {
    id: 'q-db0107df',
    skillId: 'linear-eq-intercepts-easy',
    questionText: 'The y-intercept of the graph of $12x + 2y = 18$ in the xy-plane is $(0, y)$. What is the value of $y$?',
    choices: [],
    correctAnswer: '9',
    collegeBoardId: 'db0107df',
  },
  {
    id: 'q-ed856e9c',
    skillId: 'linear-eq-intercepts-easy',
    questionText: 'What is the y-intercept of the graph of $y = 34x + 81$ in the xy-plane?',
    choices: [
      { label: 'A', text: '$(0, 81)$' },
      { label: 'B', text: '$(0, 34)$' },
      { label: 'C', text: '$(0, -34)$' },
      { label: 'D', text: '$(0, -81)$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'ed856e9c',
  },
  {
    id: 'q-8b2a2a63',
    skillId: 'linear-eq-intercepts-easy',
    questionText: 'The y-intercept of the graph of $y = -6x - 32$ in the xy-plane is $(0, y)$. What is the value of $y$?',
    choices: [],
    correctAnswer: '-32',
    collegeBoardId: '8b2a2a63',
  },

  // Table to Equation
  {
    id: 'q-ba79f10f',
    skillId: 'linear-eq-table-to-eq-easy',
    questionText: 'The table shows three values of $x$ and their corresponding values of $y$: when $x = 0$, $y = 18$; when $x = 1$, $y = 13$; when $x = 2$, $y = 8$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?',
    choices: [
      { label: 'A', text: '$y = 18x + 13$' },
      { label: 'B', text: '$y = 18x + 18$' },
      { label: 'C', text: '$y = -5x + 13$' },
      { label: 'D', text: '$y = -5x + 18$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'ba79f10f',
  },
  {
    id: 'q-b2de69bd',
    skillId: 'linear-eq-table-to-eq-easy',
    questionText: 'The table above shows some pairs of $x$ values and $y$ values: when $x = 1$, $y = 5$; when $x = 2$, $y = 7$; when $x = 3$, $y = 9$; when $x = 4$, $y = 11$. Which of the following equations could represent the relationship between $x$ and $y$?',
    choices: [
      { label: 'A', text: '$y = 2x + 3$' },
      { label: 'B', text: '$y = 3x - 2$' },
      { label: 'C', text: '$y = 4x - 1$' },
      { label: 'D', text: '$y = 5x$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'b2de69bd',
  },

  // Substitution questions
  {
    id: 'q-b23bba4c',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: '$3a + 4b = 25$\n\nA shipping company charged a customer $25 to ship some small boxes and some large boxes. The equation above represents the relationship between $a$, the number of small boxes, and $b$, the number of large boxes, the customer had shipped. If the customer had 3 small boxes shipped, how many large boxes were shipped?',
    choices: [
      { label: 'A', text: '3' },
      { label: 'B', text: '4' },
      { label: 'C', text: '5' },
      { label: 'D', text: '6' },
    ],
    correctAnswer: 'B',
    collegeBoardId: 'b23bba4c',
  },
  {
    id: 'q-8c98c834',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'The equation $y = 0.1x$ models the relationship between the number of different pieces of music a certain pianist practices, $y$, during an $x$-minute practice session. How many pieces did the pianist practice if the session lasted 30 minutes?',
    choices: [
      { label: 'A', text: '1' },
      { label: 'B', text: '3' },
      { label: 'C', text: '10' },
      { label: 'D', text: '30' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '8c98c834',
  },
  {
    id: 'q-52a8ef85',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'The equation $40x + 20y = 160$ represents the number of sweaters, $x$, and number of shirts, $y$, that Yesenia purchased for $\\$160$. If Yesenia purchased $2$ sweaters, how many shirts did she purchase?',
    choices: [
      { label: 'A', text: '$3$' },
      { label: 'B', text: '$4$' },
      { label: 'C', text: '$8$' },
      { label: 'D', text: '$40$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '52a8ef85',
  },
  {
    id: 'q-6a12efbb',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'The equation $46 = 2x + 2y$ gives the perimeter of a rectangular rug that has length $x$, in feet, and width $y$, in feet. The width of the rug is $8$ feet. What is the length, in feet, of the rug?',
    choices: [],
    correctAnswer: '15',
    collegeBoardId: '6a12efbb',
  },
  {
    id: 'q-7038b587',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'Vivian bought party hats and cupcakes for $\\$71$. Each package of party hats cost $\\$3$, and each cupcake cost $\\$1$. If Vivian bought $10$ packages of party hats, how many cupcakes did she buy?',
    choices: [],
    correctAnswer: '41',
    collegeBoardId: '7038b587',
  },
  {
    id: 'q-5518885d',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'The equation $x + y = 1{,}440$ represents the number of minutes of daylight (between sunrise and sunset), $x$, and the number of minutes of non-daylight, $y$, on a particular day in Oak Park, Illinois. If this day has $670$ minutes of daylight, how many minutes of non-daylight does it have?',
    choices: [
      { label: 'A', text: '$670$' },
      { label: 'B', text: '$770$' },
      { label: 'C', text: '$1{,}373$' },
      { label: 'D', text: '$1{,}440$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '5518885d',
  },
  {
    id: 'q-c5479c1a',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'A shipment consists of $5$-pound boxes and $10$-pound boxes with a total weight of $220$ pounds. There are $13$ $10$-pound boxes in the shipment. How many $5$-pound boxes are in the shipment?',
    choices: [
      { label: 'A', text: '$5$' },
      { label: 'B', text: '$10$' },
      { label: 'C', text: '$13$' },
      { label: 'D', text: '$18$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'c5479c1a',
  },
  {
    id: 'q-39617468',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: '$x + y = 350$\n\nThe given equation relates the total number of maple trees, $x$, and the total number of birch trees, $y$, planted in a $14$-acre forest preserve. If $245$ maple trees were planted in the forest preserve, how many birch trees were planted in the forest preserve?',
    choices: [
      { label: 'A', text: '$14$' },
      { label: 'B', text: '$25$' },
      { label: 'C', text: '$105$' },
      { label: 'D', text: '$245$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '39617468',
  },
  {
    id: 'q-12ae3452',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'The equation $46 = 2a + 2b$ gives the relationship between the side lengths $a$ and $b$ of a certain parallelogram. If $a = 9$, what is the value of $b$?',
    choices: [],
    correctAnswer: '14',
    collegeBoardId: '12ae3452',
  },
  {
    id: 'q-39571c77',
    skillId: 'linear-eq-subst-solve-easy',
    questionText: 'Naomi bought both rabbit snails and nerite snails for a total of $\\$52$. Each rabbit snail costs $\\$8$ and each nerite snail costs $\\$6$. If Naomi bought $2$ nerite snails, how many rabbit snails did she buy?',
    choices: [
      { label: 'A', text: '$5$' },
      { label: 'B', text: '$12$' },
      { label: 'C', text: '$14$' },
      { label: 'D', text: '$50$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '39571c77',
  },
];

/**
 * Get questions by skill ID
 */
export function getQuestionsBySkill(skillId: string): SATQuestion[] {
  return satQuestions.filter(q => q.skillId === skillId);
}

/**
 * Get a question by ID
 */
export function getQuestionById(id: string): SATQuestion | undefined {
  return satQuestions.find(q => q.id === id);
}

/**
 * Get a random subset of questions
 */
export function getRandomQuestions(count: number): SATQuestion[] {
  const shuffled = [...satQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get questions by College Board ID
 */
export function getQuestionByCollegeBoardId(cbId: string): SATQuestion | undefined {
  return satQuestions.find(q => q.collegeBoardId === cbId);
}
