'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { motion } from 'framer-motion';

interface MathPreviewProps {
  latex: string;
  display?: 'inline' | 'block';
  className?: string;
}

export function MathPreview({
  latex,
  display = 'block',
  className = ''
}: MathPreviewProps) {
  // Sanitize latex to prevent rendering errors
  const sanitizedLatex = latex
    .replace(/\\/g, '\\')
    .replace(/\n/g, ' ')
    .trim();

  if (!sanitizedLatex) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`math-preview ${className}`}
    >
      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
        <div className="text-xs text-orange-600 mb-1 font-medium">Preview:</div>
        <div className="text-center">
          {display === 'inline' ? (
            <InlineMath math={sanitizedLatex} />
          ) : (
            <BlockMath math={sanitizedLatex} />
          )}
        </div>
      </div>
    </motion.div>
  );
}