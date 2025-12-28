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

  // ============================================
  // Linear Equations in Two Variables - Medium
  // ============================================

  // Perpendicular Lines (from standard form)
  {
    id: 'q-01682aa5',
    skillId: 'linear-eq-perp-standard-medium',
    questionText: 'Line $p$ is defined by $2y + 18x = 9$. Line $r$ is perpendicular to line $p$ in the xy-plane. What is the slope of line $r$?',
    choices: [
      { label: 'A', text: '$-9$' },
      { label: 'B', text: '$-\\frac{1}{9}$' },
      { label: 'C', text: '$\\frac{1}{9}$' },
      { label: 'D', text: '$9$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '01682aa5',
  },
  {
    id: 'q-92aa3a94',
    skillId: 'linear-eq-perp-standard-medium',
    questionText: 'Line $k$ is defined by $y = 7x + \\frac{1}{8}$. Line $j$ is perpendicular to line $k$ in the xy-plane. What is the slope of line $j$?',
    choices: [
      { label: 'A', text: '$-8$' },
      { label: 'B', text: '$-\\frac{1}{7}$' },
      { label: 'C', text: '$\\frac{1}{8}$' },
      { label: 'D', text: '$7$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '92aa3a94',
  },

  // Interpretation (variable/term meaning)
  {
    id: 'q-9b0a4eae',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'The graph in the xy-plane models the possible combinations of length $x$, in meters (m), and width $y$, in meters, for a rectangle with a perimeter of $36$ m. Which statement is the best interpretation of the point $(8, 10)$ in this context?',
    choices: [
      { label: 'A', text: 'The length is $10$ m less than the perimeter, and the width is $8$ m less than the perimeter.' },
      { label: 'B', text: 'The length is $10$ m, and the width is $8$ m.' },
      { label: 'C', text: 'The length is $8$ m, and the width is $10$ m.' },
      { label: 'D', text: 'The length is $8$ m less than the perimeter, and the width is $10$ m less than the perimeter.' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '9b0a4eae',
  },
  {
    id: 'q-3c03cbd8',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'A certain township consists of a $5$-hectare industrial park and a $24$-hectare neighborhood. The total number of trees in the township is $4{,}529$. The equation $5x + 24y = 4{,}529$ represents this situation. Which of the following is the best interpretation of $x$ in this context?',
    choices: [
      { label: 'A', text: 'The average number of trees per hectare in the industrial park' },
      { label: 'B', text: 'The average number of trees per hectare in the neighborhood' },
      { label: 'C', text: 'The total number of trees in the industrial park' },
      { label: 'D', text: 'The total number of trees in the neighborhood' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '3c03cbd8',
  },
  {
    id: 'q-df78b361',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'Lily made $36$ cups of jam. Lily then filled $x$ small containers and $y$ large containers with all the jam she made. The equation $4x + 6y = 36$ represents this situation. Which is the best interpretation of $6y$ in this context?',
    choices: [
      { label: 'A', text: 'The number of large containers Lily filled' },
      { label: 'B', text: 'The number of small containers Lily filled' },
      { label: 'C', text: 'The total number of cups of jam in the large containers' },
      { label: 'D', text: 'The total number of cups of jam in the small containers' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'df78b361',
  },
  {
    id: 'q-483d208d',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'At a state fair, attendees can win tokens that are worth a different number of points depending on the shape. One attendee won $S$ square tokens and $C$ circle tokens worth a total of $1{,}120$ points. The equation $80S + 90C = 1{,}120$ represents this situation. How many more points is a circle token worth than a square token?',
    choices: [
      { label: 'A', text: '$950$' },
      { label: 'B', text: '$90$' },
      { label: 'C', text: '$80$' },
      { label: 'D', text: '$10$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '483d208d',
  },
  {
    id: 'q-2e1a7f66',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'Figure A and figure B are both regular polygons. The sum of the perimeter of figure A and the perimeter of figure B is $63$ inches. The equation $3x + 6y = 63$ represents this situation, where $x$ is the number of sides of figure A and $y$ is the number of sides of figure B. Which statement is the best interpretation of $6$ in this context?',
    choices: [
      { label: 'A', text: 'Each side of figure B has a length of $6$ inches.' },
      { label: 'B', text: 'The number of sides of figure B is $6$.' },
      { label: 'C', text: 'Each side of figure A has a length of $6$ inches.' },
      { label: 'D', text: 'The number of sides of figure A is $6$.' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '2e1a7f66',
  },
  {
    id: 'q-038d87d7',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'A neighborhood consists of a $2$-hectare park and a $35$-hectare residential area. The total number of trees in the neighborhood is $3{,}934$. The equation $2x + 35y = 3{,}934$ represents this situation. Which of the following is the best interpretation of $x$ in this context?',
    choices: [
      { label: 'A', text: 'The average number of trees per hectare in the park' },
      { label: 'B', text: 'The average number of trees per hectare in the residential area' },
      { label: 'C', text: 'The total number of trees in the park' },
      { label: 'D', text: 'The total number of trees in the residential area' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '038d87d7',
  },
  {
    id: 'q-400798d6',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'In triangle $QRS$, sides $\\overline{QR}$ and $\\overline{RS}$ each have a length of $x$ centimeters and side $\\overline{SQ}$ has a length of $y$ centimeters. The given equation $2x + y = 37$ represents this situation. Which of the following is the best interpretation of $37$ in this context?',
    choices: [
      { label: 'A', text: 'The difference, in centimeters, between the lengths of sides $\\overline{QR}$ and $\\overline{SQ}$' },
      { label: 'B', text: 'The difference, in centimeters, between the lengths of sides $\\overline{QR}$ and $\\overline{RS}$' },
      { label: 'C', text: 'The sum of the lengths, in centimeters, of the three sides of the triangle' },
      { label: 'D', text: 'The length, in centimeters, of one of the two sides of equal length' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '400798d6',
  },

  // Parallel Lines (from standard/slope-intercept form)
  {
    id: 'q-0451d754',
    skillId: 'linear-eq-parallel-standard-medium',
    questionText: 'Line $k$ is defined by $y = \\frac{17}{7}x + 4$. Line $j$ is parallel to line $k$ in the xy-plane. What is the slope of line $j$?',
    choices: [
      { label: 'A', text: '$\\frac{7}{17}$' },
      { label: 'B', text: '$\\frac{17}{7}$' },
      { label: 'C', text: '$4$' },
      { label: 'D', text: '$17$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '0451d754',
  },
  {
    id: 'q-c39dbbdf',
    skillId: 'linear-eq-parallel-standard-medium',
    questionText: 'Line $r$ is defined by the equation $4x - 9y = 3$. Line $s$ is parallel to line $r$ in the xy-plane. What is the slope of line $s$?',
    choices: [
      { label: 'A', text: '$\\frac{9}{4}$' },
      { label: 'B', text: '$\\frac{4}{9}$' },
      { label: 'C', text: '$-4$' },
      { label: 'D', text: '$-9$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: 'c39dbbdf',
  },
  {
    id: 'q-63be6c9a',
    skillId: 'linear-eq-parallel-standard-medium',
    questionText: 'In the xy-plane, line $s$ passes through the point $(0, 0)$ and is parallel to the line represented by the equation $y = 18x + 2$. If line $s$ also passes through the point $(4, d)$, what is the value of $d$?',
    choices: [
      { label: 'A', text: '$2$' },
      { label: 'B', text: '$18$' },
      { label: 'C', text: '$72$' },
      { label: 'D', text: '$74$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '63be6c9a',
  },

  // Slope Calculation
  {
    id: 'q-51568fb9',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'What is the slope of the graph of $10x - 5y = -12$ in the xy-plane?',
    choices: [
      { label: 'A', text: '$-2$' },
      { label: 'B', text: '$-\\frac{5}{6}$' },
      { label: 'C', text: '$\\frac{5}{6}$' },
      { label: 'D', text: '$2$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '51568fb9',
  },
  {
    id: 'q-265f2a53',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'When line $n$ is graphed in the xy-plane, it has an x-intercept of $(-4, 0)$ and a y-intercept of $(0, \\frac{86}{3})$. What is the slope of line $n$?',
    choices: [
      { label: 'A', text: '$\\frac{3}{344}$' },
      { label: 'B', text: '$\\frac{6}{43}$' },
      { label: 'C', text: '$\\frac{43}{6}$' },
      { label: 'D', text: '$\\frac{344}{3}$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '265f2a53',
  },
  {
    id: 'q-6f6dfe3e',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'The table shows three values of $x$ and their corresponding values of $y$, where $n$ is a constant, for the linear relationship between $x$ and $y$: when $x = -6$, $y = n + 184$; when $x = -3$, $y = n + 92$; when $x = 0$, $y = n$. What is the slope of the line that represents this relationship in the xy-plane?',
    choices: [
      { label: 'A', text: '$-\\frac{92}{3}$' },
      { label: 'B', text: '$-\\frac{3}{92}$' },
      { label: 'C', text: '$\\frac{n + 92}{-3}$' },
      { label: 'D', text: '$\\frac{2n - 92}{3}$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '6f6dfe3e',
  },

  // Equation Building (from points or slope+point)
  {
    id: 'q-9f3cb472',
    skillId: 'linear-eq-equation-build-medium',
    questionText: 'Line $t$ in the xy-plane has a slope of $-\\frac{1}{3}$ and passes through the point $(9, 10)$. Which equation defines line $t$?',
    choices: [
      { label: 'A', text: '$y = 13x - \\frac{1}{3}$' },
      { label: 'B', text: '$y = 9x + 10$' },
      { label: 'C', text: '$y = -\\frac{x}{3} + 10$' },
      { label: 'D', text: '$y = -\\frac{x}{3} + 13$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '9f3cb472',
  },
  {
    id: 'q-d7c8ba0b',
    skillId: 'linear-eq-equation-build-medium',
    questionText: 'In the xy-plane, line $t$ passes through the points $(0, 9)$ and $(1, 17)$. Which equation defines line $t$?',
    choices: [
      { label: 'A', text: '$y = \\frac{1}{8}x + 9$' },
      { label: 'B', text: '$y = x + \\frac{1}{8}$' },
      { label: 'C', text: '$y = x + 8$' },
      { label: 'D', text: '$y = 8x + 9$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'd7c8ba0b',
  },
  {
    id: 'q-f81a0503',
    skillId: 'linear-eq-equation-build-medium',
    questionText: 'In the xy-plane, line $k$ passes through the points $(0, -5)$ and $(1, -1)$. Which equation defines line $k$?',
    choices: [
      { label: 'A', text: '$y = -x + \\frac{1}{4}$' },
      { label: 'B', text: '$y = \\frac{1}{4}x - 5$' },
      { label: 'C', text: '$y = -x + 4$' },
      { label: 'D', text: '$y = 4x - 5$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'f81a0503',
  },

  // Substitution (multi-step)
  {
    id: 'q-7625073d',
    skillId: 'linear-eq-subst-multi-medium',
    questionText: 'The equation $7g + 7b = 840$ represents the number of blue tiles, $b$, and the number of green tiles, $g$, an artist needs for an $840$-square-inch tile project. The artist needs $71$ blue tiles for the project. How many green tiles does he need?',
    choices: [],
    correctAnswer: '49',
    collegeBoardId: '7625073d',
  },
  {
    id: 'q-c5e38487',
    skillId: 'linear-eq-subst-multi-medium',
    questionText: 'A chemist combines water and acetic acid to make a mixture with a volume of $56$ milliliters (mL). The volume of acetic acid in the mixture is $10$ mL. What is the volume of water, in mL, in the mixture? (Assume that the volume of the mixture is the sum of the volumes of water and acetic acid before they were mixed.)',
    choices: [],
    correctAnswer: '46',
    collegeBoardId: 'c5e38487',
  },
  {
    id: 'q-637022d2',
    skillId: 'linear-eq-subst-multi-medium',
    questionText: 'The given equation $2.5b + 5r = 80$ describes the relationship between the number of birds, $b$, and the number of reptiles, $r$, that can be cared for at a pet care business on a given day. If the business cares for $16$ reptiles on a given day, how many birds can it care for on this day?',
    choices: [
      { label: 'A', text: '$0$' },
      { label: 'B', text: '$5$' },
      { label: 'C', text: '$40$' },
      { label: 'D', text: '$80$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '637022d2',
  },
  {
    id: 'q-99ea3715',
    skillId: 'linear-eq-subst-multi-medium',
    questionText: 'If the graph of $27x + 33y = 297$ is shifted down $5$ units in the xy-plane, what is the y-intercept of the resulting graph?',
    choices: [
      { label: 'A', text: '$(0, 4)$' },
      { label: 'B', text: '$(0, 6)$' },
      { label: 'C', text: '$(0, 14)$' },
      { label: 'D', text: '$(0, 28)$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '99ea3715',
  },

  // Table to Equation
  {
    id: 'q-bbb0359a',
    skillId: 'linear-eq-table-to-eq-medium',
    questionText: 'The table shows three values of $x$ and their corresponding values of $y$: when $x = 1$, $y = 11$; when $x = 2$, $y = 16$; when $x = 3$, $y = 21$. Which equation represents the linear relationship between $x$ and $y$?',
    choices: [
      { label: 'A', text: '$y = 5x + 6$' },
      { label: 'B', text: '$y = 5x + 11$' },
      { label: 'C', text: '$y = 6x + 5$' },
      { label: 'D', text: '$y = 6x + 11$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: 'bbb0359a',
  },
  {
    id: 'q-606cdce7',
    skillId: 'linear-eq-table-to-eq-medium',
    questionText: 'The table shows four values of $x$ and their corresponding values of $y$: when $x = -6$, $y = 65$; when $x = -3$, $y = 56$; when $x = 3$, $y = 38$; when $x = 6$, $y = 29$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?',
    choices: [
      { label: 'A', text: '$9x + 3y = 141$' },
      { label: 'B', text: '$9x + 3y = 3$' },
      { label: 'C', text: '$3x + 9y = 141$' },
      { label: 'D', text: '$3x + 9y = 3$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '606cdce7',
  },
  {
    id: 'q-d62ad380',
    skillId: 'linear-eq-table-to-eq-medium',
    questionText: 'An artist paints and sells square tiles. The selling price $P$, in dollars, of a painted tile is a linear function of the side length of the tile $s$, in inches, as shown in the table: when $s = 3$, $P = 8.00$; when $s = 6$, $P = 18.00$; when $s = 9$, $P = 28.00$. Which of the following could define the relationship between $s$ and $P$?',
    choices: [
      { label: 'A', text: '$P = 3s + 10$' },
      { label: 'B', text: '$P = \\frac{10}{3}s + 8$' },
      { label: 'C', text: '$P = \\frac{10}{3}s - 2$' },
      { label: 'D', text: '$P = \\frac{3}{10}s - \\frac{1}{10}$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'd62ad380',
  },

  // Graph to Equation
  {
    id: 'q-c307283c',
    skillId: 'linear-eq-graph-standard-medium',
    questionText: '[Graph showing a line passing through $(-8, 0)$ and $(0, -8)$]\n\nWhat is an equation of the graph shown?',
    choices: [
      { label: 'A', text: '$y = -2x - 8$' },
      { label: 'B', text: '$y = x - 8$' },
      { label: 'C', text: '$y = -x - 8$' },
      { label: 'D', text: '$y = 2x - 8$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'c307283c',
  },
  {
    id: 'q-2e0290c3',
    skillId: 'linear-eq-graph-standard-medium',
    questionText: '[Graph showing stocks relationship with y-intercept at 40 and x-intercept at 60]\n\nThe graph shows the relationship between the number of shares of stock from Company A, $x$, and the number of shares of stock from Company B, $y$, that Simone can purchase. Which equation could represent this relationship?',
    choices: [
      { label: 'A', text: '$y = 8x + 12$' },
      { label: 'B', text: '$8x + 12y = 480$' },
      { label: 'C', text: '$y = 12x + 8$' },
      { label: 'D', text: '$12x + 8y = 480$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '2e0290c3',
  },
  {
    id: 'q-00b9bd37',
    skillId: 'linear-eq-graph-standard-medium',
    questionText: '[Graph showing relationship between T-shirts and sweatshirts with y-intercept ~35 and x-intercept ~90]\n\nThe graph models the relationship between the number of T-shirts, $x$, and the number of sweatshirts, $y$, that Kira can purchase for a school fundraiser. Which equation could represent this relationship?',
    choices: [
      { label: 'A', text: '$y = 7x + 18$' },
      { label: 'B', text: '$7x + 18y = 630$' },
      { label: 'C', text: '$y = 18x + 7$' },
      { label: 'D', text: '$18x + 7y = 630$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '00b9bd37',
  },

  // Word Problems
  {
    id: 'q-1087f6c4',
    skillId: 'linear-eq-word-problem-medium',
    questionText: '$24.5x + 24.75y = 641$\n\nIsabel ordered topsoil and crushed stone, which cost a total of $\\$641$, for her garden. The given equation represents the relationship between the number of cubic yards of topsoil, $x$, and the number of tons of crushed stone, $y$, Isabel ordered. How much more, in dollars, did a ton of crushed stone cost Isabel than a cubic yard of topsoil?',
    choices: [],
    correctAnswer: '0.25',
    collegeBoardId: '1087f6c4',
  },
  {
    id: 'q-9c7741c6',
    skillId: 'linear-eq-word-problem-medium',
    questionText: 'On a $210$-mile trip, Cameron drove at an average speed of $60$ miles per hour for the first $x$ hours. He then completed the trip, driving at an average speed of $50$ miles per hour for the remaining $y$ hours. If $x = 1$, what is the value of $y$?',
    choices: [],
    correctAnswer: '3',
    collegeBoardId: '9c7741c6',
  },
  {
    id: 'q-0d1b1e35',
    skillId: 'linear-eq-word-problem-medium',
    questionText: 'A batch of banana milkshakes consists of $4$ cups of ice cream and $2$ bananas and has $1{,}114$ milligrams (mg) of calcium. There is $276$ mg of calcium in $1$ cup of the ice cream used to make this batch of milkshakes. How much calcium, in mg, is in $1$ banana?',
    choices: [
      { label: 'A', text: '$5$' },
      { label: 'B', text: '$10$' },
      { label: 'C', text: '$419$' },
      { label: 'D', text: '$1{,}104$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '0d1b1e35',
  },
  {
    id: 'q-431c3038',
    skillId: 'linear-eq-word-problem-medium',
    questionText: 'In an article about exercise, it is estimated that a $160$-pound adult uses $200$ calories for every $30$ minutes of hiking and $150$ calories for every $30$ minutes of bicycling. An adult who weighs $160$ pounds has completed $1$ hour of bicycling. Based on the article, how many hours should the adult hike to use a total of $1{,}900$ calories from bicycling and hiking?',
    choices: [
      { label: 'A', text: '$9.5$' },
      { label: 'B', text: '$8.75$' },
      { label: 'C', text: '$6$' },
      { label: 'D', text: '$4$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '431c3038',
  },
  {
    id: 'q-62ef6f73',
    skillId: 'linear-eq-word-problem-medium',
    questionText: 'A total of $2$ squares each have side length $r$. A total of $6$ equilateral triangles each have side length $t$. None of these squares and triangles shares a side. The sum of the perimeters of all these squares and triangles is $210$. Which equation represents this situation?',
    choices: [
      { label: 'A', text: '$6r + 24t = 210$' },
      { label: 'B', text: '$2r + 6t = 210$' },
      { label: 'C', text: '$8r + 18t = 210$' },
      { label: 'D', text: '$6r + 2t = 210$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '62ef6f73',
  },

  // Free response - Slope Calculation
  {
    id: 'q-e0f59119',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'What is the slope of the graph of $y = \\frac{1}{3}(29x + 10) + 5x$ in the xy-plane?',
    choices: [],
    correctAnswer: '44/3',
    collegeBoardId: 'e0f59119',
  },
  {
    id: 'q-ca452900',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'What is the slope of the graph of $y = \\frac{5x}{13} - 23$ in the xy-plane?',
    choices: [],
    correctAnswer: '5/13',
    collegeBoardId: 'ca452900',
  },
  {
    id: 'q-9ed4c1a2',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'What is the slope of the graph of $y = \\frac{1}{4}(27x + 15) + 7x$ in the xy-plane?',
    choices: [],
    correctAnswer: '55/4',
    collegeBoardId: '9ed4c1a2',
  },
  {
    id: 'q-fb43b85f',
    skillId: 'linear-eq-slope-calc-medium',
    questionText: 'A line passes through the points $(4, 6)$ and $(15, 24)$ in the xy-plane. What is the slope of the line?',
    choices: [],
    correctAnswer: '18/11',
    collegeBoardId: 'fb43b85f',
  },

  // Free response - Equation Building
  {
    id: 'q-a4989860',
    skillId: 'linear-eq-equation-build-medium',
    questionText: 'A line in the xy-plane has a slope of $9$ and passes through the point $(0, -5)$. The equation $y = px + r$ defines the line, where $p$ and $r$ are constants. What is the value of $p$?',
    choices: [],
    correctAnswer: '9',
    collegeBoardId: 'a4989860',
  },

  // Free response - Interpretation
  {
    id: 'q-a04190b7',
    skillId: 'linear-eq-interp-variable-medium',
    questionText: 'A store sells two different-sized containers of blueberries. The store\'s sales of these blueberries totaled $896.86$ dollars last month. The equation $4.51x + 6.07y = 896.86$ represents this situation, where $x$ is the number of smaller containers sold and $y$ is the number of larger containers sold. According to the equation, what is the price, in dollars, of each smaller container?',
    choices: [],
    correctAnswer: '4.51',
    collegeBoardId: 'a04190b7',
  },

  // ============================================
  // Linear Equations in Two Variables - Hard
  // ============================================

  // Perpendicular Lines (from non-standard form)
  {
    id: 'q-002dba45',
    skillId: 'linear-eq-perp-nonstandard-hard',
    questionText: 'Line $k$ is defined by $y = -\\frac{17}{3}x + 5$. Line $j$ is perpendicular to line $k$ in the xy-plane. What is the slope of line $j$?',
    choices: [],
    correctAnswer: '3/17',
    collegeBoardId: '002dba45',
  },
  {
    id: 'q-00723d16',
    skillId: 'linear-eq-perp-nonstandard-hard',
    questionText: 'Line $\\ell$ is defined by $3y + 12x = 5$. Line $n$ is perpendicular to line $\\ell$ in the xy-plane. What is the slope of line $n$?',
    choices: [],
    correctAnswer: '1/4',
    collegeBoardId: '00723d16',
  },
  {
    id: 'q-db422e7f',
    skillId: 'linear-eq-perp-nonstandard-hard',
    questionText: 'Line $p$ is defined by $4y + 8x = 6$. Line $r$ is perpendicular to line $p$ in the xy-plane. What is the slope of line $r$?',
    choices: [],
    correctAnswer: '1/2',
    collegeBoardId: 'db422e7f',
  },
  {
    id: 'q-184ce5aa',
    skillId: 'linear-eq-perp-nonstandard-hard',
    questionText: 'Line $h$ is defined by $\\frac{1}{5}x + \\frac{1}{7}y - 70 = 0$. Line $j$ is perpendicular to line $h$ in the xy-plane. What is the slope of line $j$?',
    choices: [
      { label: 'A', text: '$-\\frac{7}{5}$' },
      { label: 'B', text: '$-\\frac{5}{7}$' },
      { label: 'C', text: '$\\frac{7}{5}$' },
      { label: 'D', text: '$\\frac{5}{7}$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '184ce5aa',
  },

  // Perpendicular Lines (from graph)
  {
    id: 'q-6d8ad460',
    skillId: 'linear-eq-perp-graph-hard',
    questionText: '[Graph showing line $k$ passing through $(-5, 0)$ and $(0, -5)$ with negative slope]\n\nLine $k$ is shown in the xy-plane. Line $j$ (not shown) is perpendicular to line $k$. What is the slope of line $j$?',
    choices: [],
    correctAnswer: '-1',
    collegeBoardId: '6d8ad460',
  },

  // Perpendicular Lines (vertical/horizontal)
  {
    id: 'q-98d3393a',
    skillId: 'linear-eq-perp-vertical-hard',
    questionText: 'Line $\\ell$ in the xy-plane is perpendicular to the line with equation $x = 2$. What is the slope of line $\\ell$?',
    choices: [
      { label: 'A', text: '$0$' },
      { label: 'B', text: '$-\\frac{1}{2}$' },
      { label: 'C', text: '$-2$' },
      { label: 'D', text: 'The slope of line $\\ell$ is undefined.' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '98d3393a',
  },

  // Perpendicular Lines (abstract relationship)
  {
    id: 'q-a35c7164',
    skillId: 'linear-eq-perp-abstract-hard',
    questionText: '$5x + 7y = 1$\n$ax + by = 1$\n\nIn the given pair of equations, $a$ and $b$ are constants. The graph of this pair of equations in the xy-plane is a pair of perpendicular lines. Which of the following pairs of equations also represents a pair of perpendicular lines?',
    choices: [
      { label: 'A', text: '$10x + 7y = 1$\n$ax - 2by = 1$' },
      { label: 'B', text: '$10x + 7y = 1$\n$ax + 2by = 1$' },
      { label: 'C', text: '$10x + 7y = 1$\n$2ax + by = 1$' },
      { label: 'D', text: '$5x - 7y = 1$\n$ax + by = 1$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'a35c7164',
  },
  {
    id: 'q-a7a14e87',
    skillId: 'linear-eq-perp-abstract-hard',
    questionText: 'In the xy-plane, line $k$ is defined by $x + y = 0$. Line $j$ is perpendicular to line $k$, and the y-intercept of line $j$ is $(0, 3)$. Which of the following is an equation of line $j$?',
    choices: [
      { label: 'A', text: '$x + y = 3$' },
      { label: 'B', text: '$x + y = -3$' },
      { label: 'C', text: '$x - y = 3$' },
      { label: 'D', text: '$x - y = -3$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'a7a14e87',
  },

  // Parameter Determination (single parameter)
  {
    id: 'q-3cdbf026',
    skillId: 'linear-eq-param-single-hard',
    questionText: 'The graph of the equation $ax + ky = 6$ is a line in the xy-plane, where $a$ and $k$ are constants. If the line contains the points $(-2, -6)$ and $(0, -3)$, what is the value of $k$?',
    choices: [
      { label: 'A', text: '$-2$' },
      { label: 'B', text: '$-1$' },
      { label: 'C', text: '$2$' },
      { label: 'D', text: '$3$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '3cdbf026',
  },
  {
    id: 'q-fdee0fbf',
    skillId: 'linear-eq-param-single-hard',
    questionText: 'In the xy-plane, line $k$ intersects the y-axis at the point $(0, -6)$ and passes through the point $(2, 2)$. If the point $(20, w)$ lies on line $k$, what is the value of $w$?',
    choices: [],
    correctAnswer: '74',
    collegeBoardId: 'fdee0fbf',
  },
  {
    id: 'q-b9835972',
    skillId: 'linear-eq-param-single-hard',
    questionText: 'In the xy-plane, line $\\ell$ passes through the point $(0, 0)$ and is parallel to the line represented by the equation $y = 8x + 2$. If line $\\ell$ also passes through the point $(3, d)$, what is the value of $d$?',
    choices: [],
    correctAnswer: '24',
    collegeBoardId: 'b9835972',
  },

  // Parameter Determination (two parameters)
  {
    id: 'q-3008cfc3',
    skillId: 'linear-eq-param-dual-hard',
    questionText: 'The table gives the coordinates of two points on a line in the xy-plane: $(k, 13)$ and $(k + 7, -15)$. The y-intercept of the line is $(k - 5, b)$, where $k$ and $b$ are constants. What is the value of $b$?',
    choices: [],
    correctAnswer: '33',
    collegeBoardId: '3008cfc3',
  },
  {
    id: 'q-0366d965',
    skillId: 'linear-eq-param-dual-hard',
    questionText: 'The table shows the coordinates of three points on a line in the xy-plane: $(3, 7)$, $(k, 11)$, $(12, n)$, where $k$ and $n$ are constants. If the slope of the line is $2$, what is the value of $k + n$?',
    choices: [],
    correctAnswer: '30',
    collegeBoardId: '0366d965',
  },

  // Graph to Parameter
  {
    id: 'q-c4ea43ef',
    skillId: 'linear-eq-graph-param-hard',
    questionText: '[Graph showing line with points approximately at $(0, 10)$ and $(20, 0)$]\n\nTo earn money for college, Avery works two part-time jobs: A and B. She earns $\\$10$ per hour working at job A and $\\$20$ per hour working at job B. In one week, Avery earned a total of $s$ dollars for working at the two part-time jobs. The graph above represents all possible combinations of numbers of hours Avery could have worked at the two jobs to earn $s$ dollars. What is the value of $s$?',
    choices: [
      { label: 'A', text: '$128$' },
      { label: 'B', text: '$160$' },
      { label: 'C', text: '$200$' },
      { label: 'D', text: '$320$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'c4ea43ef',
  },
  {
    id: 'q-c362c210',
    skillId: 'linear-eq-graph-param-hard',
    questionText: '[Graph showing points representing combinations of cornflowers and wallflowers that cost $\\$24$]\n\nThe points plotted in the coordinate plane above represent the possible numbers of wallflowers and cornflowers that someone can buy at the Garden Store in order to spend exactly $\\$24.00$ total on the two types of flowers. The price of each wallflower is the same and the price of each cornflower is the same. What is the price, in dollars, of $1$ cornflower?',
    choices: [],
    correctAnswer: '1.50',
    collegeBoardId: 'c362c210',
  },
  {
    id: 'q-9d0396d4',
    skillId: 'linear-eq-graph-param-hard',
    questionText: '[Graph showing a line passing through $(0, 7)$ and $(14, 0)$ approximately]\n\nThe point with coordinates $(d, 4)$ lies on the line shown. What is the value of $d$?',
    choices: [
      { label: 'A', text: '$\\frac{7}{2}$' },
      { label: 'B', text: '$\\frac{26}{7}$' },
      { label: 'C', text: '$\\frac{24}{7}$' },
      { label: 'D', text: '$\\frac{27}{8}$' },
    ],
    correctAnswer: 'B',
    collegeBoardId: '9d0396d4',
  },
  {
    id: 'q-5b7599a6',
    skillId: 'linear-eq-graph-param-hard',
    questionText: '[Graph showing a line with negative slope passing through approximately $(-2, 10)$ and $(2, -10)$]\n\nThe graph shows a linear relationship between $x$ and $y$. Which equation represents this relationship, where $R$ is a positive constant?',
    choices: [
      { label: 'A', text: '$Rx + 18y = 36$' },
      { label: 'B', text: '$Rx - 18y = -36$' },
      { label: 'C', text: '$18x + Ry = 36$' },
      { label: 'D', text: '$18x - Ry = -36$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '5b7599a6',
  },

  // Interpretation (coefficient difference)
  {
    id: 'q-686b7244',
    skillId: 'linear-eq-interp-diff-hard',
    questionText: 'A certain apprentice has enrolled in $85$ hours of training courses. The equation $10x + 15y = 85$ represents this situation, where $x$ is the number of on-site training courses and $y$ is the number of online training courses this apprentice has enrolled in. How many more hours does each online training course take than each on-site training course?',
    choices: [],
    correctAnswer: '5',
    collegeBoardId: '686b7244',
  },
  {
    id: 'q-2d54c272',
    skillId: 'linear-eq-interp-diff-hard',
    questionText: '$5G + 45R = 380$\n\nAt a school fair, students can win colored tokens that are worth a different number of points depending on the color. One student won $G$ green tokens and $R$ red tokens worth a total of $380$ points. The given equation represents this situation. How many more points is a red token worth than a green token?',
    choices: [],
    correctAnswer: '40',
    collegeBoardId: '2d54c272',
  },

  // Interpretation (product meaning)
  {
    id: 'q-cc7ffe02',
    skillId: 'linear-eq-interp-product-hard',
    questionText: 'Keenan made $32$ cups of vegetable broth. Keenan then filled $x$ small jars and $y$ large jars with all the vegetable broth he made. The equation $3x + 5y = 32$ represents this situation. Which is the best interpretation of $5y$ in this context?',
    choices: [
      { label: 'A', text: 'The number of large jars Keenan filled' },
      { label: 'B', text: 'The number of small jars Keenan filled' },
      { label: 'C', text: 'The total number of cups of vegetable broth in the large jars' },
      { label: 'D', text: 'The total number of cups of vegetable broth in the small jars' },
    ],
    correctAnswer: 'C',
    collegeBoardId: 'cc7ffe02',
  },

  // Intercept Finding (with fractional coefficients)
  {
    id: 'q-cb58833c',
    skillId: 'linear-eq-intercept-frac-hard',
    questionText: 'The line with the equation $\\frac{4}{5}x + \\frac{1}{3}y = 1$ is graphed in the xy-plane. What is the x-coordinate of the x-intercept of the line?',
    choices: [],
    correctAnswer: '5/4',
    collegeBoardId: 'cb58833c',
  },
  {
    id: 'q-9aaf7786',
    skillId: 'linear-eq-intercept-frac-hard',
    questionText: 'In the xy-plane, line $p$ has a slope of $-\\frac{5}{3}$ and an x-intercept of $(-6, 0)$. What is the y-coordinate of the y-intercept of line $p$?',
    choices: [],
    correctAnswer: '-10',
    collegeBoardId: '9aaf7786',
  },
  {
    id: 'q-9f70fd47',
    skillId: 'linear-eq-intercept-frac-hard',
    questionText: 'What is the y-coordinate of the y-intercept of the graph of $\\frac{3x}{7} = -\\frac{5y}{9} + 21$ in the xy-plane?',
    choices: [],
    correctAnswer: '189/5',
    collegeBoardId: '9f70fd47',
  },

  // Intercept Ratio
  {
    id: 'q-94b48cbf',
    skillId: 'linear-eq-intercept-ratio-hard',
    questionText: 'The graph of $7x + 2y = -31$ in the xy-plane has an x-intercept at $(a, 0)$ and a y-intercept at $(0, b)$, where $a$ and $b$ are constants. What is the value of $\\frac{b}{a}$?',
    choices: [
      { label: 'A', text: '$-\\frac{7}{2}$' },
      { label: 'B', text: '$-\\frac{2}{7}$' },
      { label: 'C', text: '$\\frac{2}{7}$' },
      { label: 'D', text: '$\\frac{7}{2}$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '94b48cbf',
  },

  // Transformation (translation)
  {
    id: 'q-9bbce683',
    skillId: 'linear-eq-transform-translate-hard',
    questionText: 'For line $h$, the table shows three values of $x$ and their corresponding values of $y$: $(18, 130)$, $(23, 160)$, $(26, 178)$. Line $k$ is the result of translating line $h$ down $5$ units in the xy-plane. What is the x-intercept of line $k$?',
    choices: [
      { label: 'A', text: '$\\left(-\\frac{26}{3}, 0\\right)$' },
      { label: 'B', text: '$\\left(-\\frac{9}{2}, 0\\right)$' },
      { label: 'C', text: '$\\left(-\\frac{11}{3}, 0\\right)$' },
      { label: 'D', text: '$\\left(-\\frac{17}{6}, 0\\right)$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: '9bbce683',
  },
  {
    id: 'q-cc3e9528',
    skillId: 'linear-eq-transform-translate-hard',
    questionText: 'The graph of $9x - 10y = 19$ is translated down $4$ units in the xy-plane. What is the x-coordinate of the x-intercept of the resulting graph?',
    choices: [],
    correctAnswer: '59/9',
    collegeBoardId: 'cc3e9528',
  },

  // Transformation (function notation)
  {
    id: 'q-05bb1af9',
    skillId: 'linear-eq-transform-function-hard',
    questionText: '[Graph showing line $y = f(x) + 14$ passing through approximately $(-8, 16)$ and $(8, 12)$]\n\nThe graph of $y = f(x) + 14$ is shown. Which equation defines function $f$?',
    choices: [
      { label: 'A', text: '$f(x) = -\\frac{1}{4}x - 12$' },
      { label: 'B', text: '$f(x) = -\\frac{1}{4}x + 16$' },
      { label: 'C', text: '$f(x) = -\\frac{1}{4}x + 2$' },
      { label: 'D', text: '$f(x) = -\\frac{1}{4}x - 14$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '05bb1af9',
  },

  // Table to Equation to Intercept (chain)
  {
    id: 'q-d0e614a6',
    skillId: 'linear-eq-table-chain-hard',
    questionText: '$\\frac{3}{5}x + \\frac{3}{4}y = 7$\n\nWhich table gives three values of $x$ and their corresponding values of $y$ for the given equation?',
    choices: [
      { label: 'A', text: '$x$: 1, 2, 4; $y$: $\\frac{113}{20}$, $\\frac{101}{20}$, $\\frac{77}{20}$' },
      { label: 'B', text: '$x$: 1, 2, 4; $y$: $\\frac{47}{5}$, $\\frac{44}{5}$, $\\frac{38}{5}$' },
      { label: 'C', text: '$x$: 1, 2, 4; $y$: $\\frac{148}{15}$, $\\frac{136}{15}$, $\\frac{112}{15}$' },
      { label: 'D', text: '$x$: 1, 2, 4; $y$: $\\frac{128}{15}$, $\\frac{116}{15}$, $\\frac{92}{15}$' },
    ],
    correctAnswer: 'D',
    collegeBoardId: 'd0e614a6',
  },
  {
    id: 'q-768f3b7c',
    skillId: 'linear-eq-table-chain-hard',
    questionText: 'The table shows three values of $x$ and their corresponding values of $y$, where $s$ is a constant: $(-2s, 24)$, $(-s, 21)$, $(s, 15)$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?',
    choices: [
      { label: 'A', text: '$sx + 3y = 18s$' },
      { label: 'B', text: '$3x + sy = 18s$' },
      { label: 'C', text: '$3x + sy = 18$' },
      { label: 'D', text: '$sx + 3y = 18$' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '768f3b7c',
  },
  {
    id: 'q-49800634',
    skillId: 'linear-eq-table-chain-hard',
    questionText: 'The table shows two values of $x$ and their corresponding values of $y$: $(-18, -48)$ and $(7, 52)$. In the xy-plane, the graph of the linear equation representing this relationship passes through the point $\\left(\\frac{1}{7}, a\\right)$. What is the value of $a$?',
    choices: [
      { label: 'A', text: '$-\\frac{4}{11}$' },
      { label: 'B', text: '$-\\frac{4}{77}$' },
      { label: 'C', text: '$\\frac{4}{7}$' },
      { label: 'D', text: '$\\frac{172}{7}$' },
    ],
    correctAnswer: 'C',
    collegeBoardId: '49800634',
  },

  // Parallel Lines (with additional constraint)
  {
    id: 'q-0b46bad5',
    skillId: 'linear-eq-param-constraint-hard',
    questionText: '$ax + by = b$\n\nIn the equation above, $a$ and $b$ are constants and $0 < a < b$. Which of the following could represent the graph of the equation in the xy-plane?',
    choices: [
      { label: 'A', text: '[Graph showing line with negative slope passing through quadrants I and III]' },
      { label: 'B', text: '[Graph showing line with negative slope passing through quadrants II and IV]' },
      { label: 'C', text: '[Graph showing line with positive slope passing through quadrants II and IV]' },
      { label: 'D', text: '[Graph showing line with positive slope passing through quadrants I and III]' },
    ],
    correctAnswer: 'A',
    collegeBoardId: '0b46bad5',
  },

  // Mixture Problem
  {
    id: 'q-a1fd2304',
    skillId: 'linear-eq-mixture-hard',
    questionText: 'How many liters of a $25\\%$ saline solution must be added to $3$ liters of a $10\\%$ saline solution to obtain a $15\\%$ saline solution?',
    choices: [],
    correctAnswer: '1.5',
    collegeBoardId: 'a1fd2304',
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
