'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiagnosticQuestion } from '@/types';
import { MathTypeWriter } from '@/components/ui/MathTypeWriter';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface QuestionCardProps {
  question: DiagnosticQuestion;
  questionNumber: number;
  onSubmit: (answer: string | string[]) => void;
  isLoading?: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  onSubmit,
  isLoading = false,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Reset states when question changes
    setAnswer('');
    setSelectedOptions([]);
    setShowHint(false);
    setTypingComplete(false);
    setShowOptions(false);
  }, [question.id]);

  const handleSubmit = () => {
    if (question.type === 'multi-select') {
      onSubmit(selectedOptions);
    } else {
      onSubmit(answer);
    }
  };

  const renderMathContent = (content: string) => {
    const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2);
        return <BlockMath key={index} math={math} />;
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        return <InlineMath key={index} math={math} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const renderInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.label
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mathpoint-radio ${answer === option ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={answer === option}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-3 text-base text-gray-800">
                  {renderMathContent(option)}
                </span>
              </motion.label>
            ))}
          </div>
        );

      case 'multi-select':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.label
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mathpoint-checkbox ${selectedOptions.includes(option) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedOptions([...selectedOptions, option]);
                    } else {
                      setSelectedOptions(selectedOptions.filter((o) => o !== option));
                    }
                  }}
                  className="w-5 h-5 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-3 text-base text-gray-800">
                  {renderMathContent(option)}
                </span>
              </motion.label>
            ))}
          </div>
        );

      case 'open-ended':
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <label
              htmlFor="answer"
              className="block text-base font-semibold text-[#1a3a52]"
            >
              Your Answer
            </label>
            <motion.input
              id="answer"
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer here..."
              className="mathpoint-input"
              whileFocus={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.div>
        );
    }
  };

  const isAnswerValid = () => {
    if (question.type === 'multi-select') {
      return selectedOptions.length > 0;
    }
    return answer.trim().length > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mathpoint-card"
    >
      {/* Question Header */}
      <div className="question-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="relative"
        >
          <div className="question-count">
            Question {questionNumber}
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute -inset-1 bg-[#ff6b35] opacity-20 rounded-md blur-md"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          <span className="px-3 py-1 text-sm font-semibold rounded-md bg-[#1a3a52] bg-opacity-10 text-[#1a3a52]">
            {question.difficulty}
          </span>
          <span className="px-3 py-1 text-sm font-semibold rounded-md bg-[#ff6b35] bg-opacity-10 text-[#ff6b35]">
            {question.branch}
          </span>
        </motion.div>
      </div>

      {/* Question Content with Typing Animation */}
      <div className="mb-6 min-h-[80px]">
        <MathTypeWriter
          content={question.content}
          speed={20}
          delay={300}
          className="text-lg leading-relaxed text-gray-800"
          onComplete={() => {
            setTypingComplete(true);
            setTimeout(() => setShowOptions(true), 200);
          }}
        />
      </div>

      {/* Answer Input with Animation */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-6"
          >
            {renderInput()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Section */}
      {question.hint && typingComplete && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-sm font-semibold text-[#1a3a52] hover:text-[#ff6b35] transition-colors"
          >
            💡 {showHint ? 'Hide' : 'Show'} Hint
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 p-4 rounded-lg bg-orange-50 border-2 border-orange-200"
              >
                <div className="text-sm text-gray-700">
                  {renderMathContent(question.hint)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Footer */}
      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex justify-between items-center pt-4 border-t-2 border-gray-200"
          >
        <div className="text-sm text-gray-600 font-medium">
          {question.type === 'multi-select' && 'Select all that apply'}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isAnswerValid() || isLoading}
          className="btn-accent"
        >
          {isLoading ? 'Submitting...' : 'Submit Answer →'}
        </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}