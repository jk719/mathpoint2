'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, ClipboardList, Users } from 'lucide-react';
import type { Assignment, Submission } from '@/types/assignments';

interface AssignmentCardProps {
  assignment: Assignment;
  submissions: Submission[];
  role: 'student' | 'tutor' | 'parent';
  studentName?: string;
  index?: number;
  onSubmit?: () => void;
  isExpanded?: boolean;
  onToggle?: () => void;
  children?: React.ReactNode;
}

export function AssignmentCard({
  assignment,
  submissions,
  role,
  studentName,
  index = 0,
  onSubmit,
  isExpanded,
  onToggle,
  children,
}: AssignmentCardProps) {
  const now = new Date('2026-04-05');
  const due = new Date(assignment.dueDate);
  const isPastDue = due < now;

  const studentSubmission = studentName
    ? submissions.find((s) => s.assignmentId === assignment.id && s.studentName === studentName)
    : null;

  const submissionCount = submissions.filter((s) => s.assignmentId === assignment.id).length;
  const totalStudents = assignment.assignedStudents.length;

  const getStatus = () => {
    if (role === 'student' || role === 'parent') {
      if (studentSubmission?.grade !== undefined) return { label: 'Graded', color: 'bg-green-100 text-green-700' };
      if (studentSubmission) return { label: 'Submitted', color: 'bg-blue-100 text-blue-700' };
      if (isPastDue) return { label: 'Overdue', color: 'bg-red-100 text-red-700' };
      return { label: 'Pending', color: 'bg-orange-100 text-[#ff6b35]' };
    }
    // tutor
    if (submissionCount === totalStudents) return { label: 'All submitted', color: 'bg-green-100 text-green-700' };
    if (submissionCount > 0) return { label: `${submissionCount}/${totalStudents} submitted`, color: 'bg-blue-100 text-blue-700' };
    if (isPastDue) return { label: 'Overdue', color: 'bg-red-100 text-red-700' };
    return { label: 'Assigned', color: 'bg-orange-100 text-[#ff6b35]' };
  };

  const status = getStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="p-4 bg-gray-50 rounded-xl border border-gray-100"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#1a3a52]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ClipboardList className="w-4 h-4 text-[#1a3a52]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-sm">{assignment.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{assignment.description}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Due {assignment.dueDate}
              </span>
              {role === 'tutor' && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {totalStudents} students
                </span>
              )}
              {studentSubmission?.grade !== undefined && (
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  {studentSubmission.grade}%
                </span>
              )}
            </div>
            {studentSubmission?.tutorFeedback && (
              <div className="mt-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-800">
                <span className="font-medium">Feedback:</span> {studentSubmission.tutorFeedback}
              </div>
            )}
          </div>
        </div>

        {role === 'student' && !studentSubmission && onSubmit && (
          <button
            onClick={onToggle || onSubmit}
            className="px-3 py-1.5 bg-[#ff6b35] text-white rounded-lg text-xs font-medium hover:bg-[#e55a2a] transition-colors flex-shrink-0"
          >
            Submit
          </button>
        )}

        {role === 'tutor' && onToggle && (
          <button
            onClick={onToggle}
            className="text-xs text-[#ff6b35] hover:underline font-medium flex-shrink-0"
          >
            {isExpanded ? 'Hide' : 'Details'}
          </button>
        )}
      </div>

      {children}
    </motion.div>
  );
}
