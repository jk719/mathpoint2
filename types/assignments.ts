export type AssignmentStatus = 'not-started' | 'in-progress' | 'submitted' | 'graded';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignedStudents: string[];
  linkedSkills?: string[];
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentName: string;
  submittedAt: string;
  answer: string;
  grade?: number;
  tutorFeedback?: string;
}

export interface StudentQuestion {
  id: string;
  studentName: string;
  question: string;
  topic: string;
  askedAt: string;
  tutorReply?: string;
  repliedAt?: string;
}
