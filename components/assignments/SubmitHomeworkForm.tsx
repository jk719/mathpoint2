'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface SubmitHomeworkFormProps {
  onSubmit: (answer: string) => void;
  onCancel: () => void;
}

export function SubmitHomeworkForm({ onSubmit, onCancel }: SubmitHomeworkFormProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    onSubmit(answer.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mt-3 pt-3 border-t border-gray-200">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer or describe your work..."
          className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
          rows={3}
        />
        <div className="flex gap-2 mt-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-3 py-1.5 text-xs font-medium text-white bg-[#ff6b35] rounded-lg hover:bg-[#e55a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            Submit
          </button>
        </div>
      </div>
    </motion.div>
  );
}
