'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Clock } from 'lucide-react';
import type { StudentQuestion } from '@/types/assignments';

interface QuestionThreadProps {
  question: StudentQuestion;
  role: 'student' | 'tutor' | 'parent';
  index?: number;
  onReply?: (questionId: string, reply: string) => void;
}

export function QuestionThread({ question, role, index = 0, onReply }: QuestionThreadProps) {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = () => {
    if (!replyText.trim() || !onReply) return;
    onReply(question.id, replyText.trim());
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="p-4 bg-gray-50 rounded-xl border border-gray-100"
    >
      {/* Question */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#1a3a52] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {question.studentName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-gray-900 text-sm">{question.studentName}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{question.topic}</span>
            {!question.tutorReply && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-[#ff6b35]">Unanswered</span>
            )}
          </div>
          <p className="text-sm text-gray-700 mt-1">{question.question}</p>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            {question.askedAt}
          </div>
        </div>
      </div>

      {/* Reply */}
      {question.tutorReply && (
        <div className="ml-11 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-1.5 mb-1">
            <MessageCircle className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Tutor Reply</span>
            <span className="text-xs text-blue-400 ml-auto">{question.repliedAt}</span>
          </div>
          <p className="text-sm text-blue-800">{question.tutorReply}</p>
        </div>
      )}

      {/* Reply box for tutor */}
      {role === 'tutor' && !question.tutorReply && (
        <>
          {!showReplyBox ? (
            <button
              onClick={() => setShowReplyBox(true)}
              className="ml-11 mt-2 text-xs text-[#ff6b35] hover:underline font-medium flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              Reply
            </button>
          ) : (
            <div className="ml-11 mt-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
                rows={2}
              />
              <div className="flex gap-2 mt-2 justify-end">
                <button
                  onClick={() => { setShowReplyBox(false); setReplyText(''); }}
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-[#ff6b35] rounded-lg hover:bg-[#e55a2a] transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  Send
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
