import type { Assignment, Submission, StudentQuestion } from '@/types/assignments';

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Percent Fundamentals',
    description: 'Complete 10 practice questions on finding percents and fraction-to-percent conversions. Focus on accuracy.',
    dueDate: 'Apr 3, 2026',
    assignedStudents: ['Emma W.', 'James L.', 'Sofia R.', 'Alex K.'],
    linkedSkills: ['Finding a Percent', 'Conversions'],
    createdAt: 'Mar 28, 2026',
  },
  {
    id: 'a2',
    title: 'Percent Change Practice',
    description: 'Practice percent increase and decrease word problems with at least 5 attempts. Show your work.',
    dueDate: 'Apr 8, 2026',
    assignedStudents: ['Emma W.', 'James L.'],
    linkedSkills: ['Percent Increase', 'Percent Decrease'],
    createdAt: 'Apr 1, 2026',
  },
  {
    id: 'a3',
    title: 'Applied Percents Challenge',
    description: 'Solve compound discount problems with tax. Compare prices across different discount scenarios.',
    dueDate: 'Apr 14, 2026',
    assignedStudents: ['Emma W.', 'Sofia R.', 'Alex K.'],
    linkedSkills: ['Compound Discounts', 'Tax & Tip'],
    createdAt: 'Apr 4, 2026',
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 's1',
    assignmentId: 'a1',
    studentName: 'Emma W.',
    submittedAt: 'Apr 2, 2026',
    answer: 'Completed all 10 questions. Finding percents: 9/10, Conversions: 8/10.',
    grade: 85,
    tutorFeedback: 'Great work on finding percents! For conversions, remember to divide by the denominator first.',
  },
  {
    id: 's2',
    assignmentId: 'a1',
    studentName: 'Sofia R.',
    submittedAt: 'Apr 1, 2026',
    answer: 'All questions done. Finding percents: 10/10, Conversions: 9/10.',
    grade: 95,
    tutorFeedback: 'Excellent! Near perfect scores across the board.',
  },
  {
    id: 's3',
    assignmentId: 'a1',
    studentName: 'James L.',
    submittedAt: 'Apr 3, 2026',
    answer: 'Finished the questions. Finding percents: 6/10, Conversions: 7/10. Struggled with decimals to percents.',
  },
  {
    id: 's4',
    assignmentId: 'a2',
    studentName: 'Emma W.',
    submittedAt: 'Apr 6, 2026',
    answer: 'Completed 7 problems. Got all increase problems right but made errors on 2 decrease problems — forgot to subtract from original.',
  },
];

export const MOCK_STUDENT_QUESTIONS: StudentQuestion[] = [
  {
    id: 'q1',
    studentName: 'Emma W.',
    question: 'When dealing with successive percent changes, why can\'t I just add the percentages? Like 20% increase then 10% decrease isn\'t just 10% increase?',
    topic: 'Percent Change',
    askedAt: 'Apr 4, 2026',
    tutorReply: 'Great question! Each percent change applies to a different base. After a 20% increase, the new base is larger, so the 10% decrease removes more than it would from the original. Try it with $100: +20% = $120, then -10% = $108, not $110.',
    repliedAt: 'Apr 4, 2026',
  },
  {
    id: 'q2',
    studentName: 'James L.',
    question: 'I keep getting confused between markup and margin. They both seem like the same thing to me.',
    topic: 'Applied Percents',
    askedAt: 'Apr 5, 2026',
  },
  {
    id: 'q3',
    studentName: 'Alex K.',
    question: 'How do I find the original price when I only know the discounted price and the percent off? I keep dividing by the percent instead of using the formula.',
    topic: 'Discounts',
    askedAt: 'Apr 5, 2026',
  },
];
