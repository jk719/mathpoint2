'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathTypeWriterProps {
  content: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  enableMathAnimation?: boolean;
}

export function MathTypeWriter({
  content,
  speed = 25,
  delay = 200,
  onComplete,
  className = '',
  showCursor = true,
  enableMathAnimation = true,
}: MathTypeWriterProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Parse content to identify math segments
  const segments = useMemo(() => {
    const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return { type: 'block-math', content: part.slice(2, -2), raw: part };
      } else if (part.startsWith('$') && part.endsWith('$')) {
        return { type: 'inline-math', content: part.slice(1, -1), raw: part };
      }
      return { type: 'text', content: part, raw: part };
    });
  }, [content]);

  // Calculate total length for typing
  const totalLength = useMemo(() => {
    return segments.reduce((acc, seg) => acc + seg.raw.length, 0);
  }, [segments]);

  useEffect(() => {
    // Reset when content changes
    setDisplayedContent('');
    setCurrentIndex(0);
    setIsTyping(false);
    setIsComplete(false);

    // Start typing after delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [content, delay]);

  useEffect(() => {
    if (!isTyping || currentIndex >= totalLength) {
      if (currentIndex >= totalLength && !isComplete) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedContent(content.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, content, totalLength, isTyping, speed, isComplete, onComplete]);

  // Render the typed content with proper math rendering
  const renderContent = () => {
    let position = 0;
    const elements: React.ReactNode[] = [];

    segments.forEach((segment, index) => {
      const segmentEnd = position + segment.raw.length;

      if (currentIndex <= position) {
        // Haven't reached this segment yet
        return;
      }

      if (currentIndex >= segmentEnd) {
        // Fully typed segment
        if (segment.type === 'block-math') {
          elements.push(
            <motion.div
              key={index}
              initial={enableMathAnimation ? { scale: 0.8, opacity: 0 } : {}}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="my-4"
            >
              <BlockMath math={segment.content} />
            </motion.div>
          );
        } else if (segment.type === 'inline-math') {
          elements.push(
            <motion.span
              key={index}
              initial={enableMathAnimation ? { scale: 0.9, opacity: 0 } : {}}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <InlineMath math={segment.content} />
            </motion.span>
          );
        } else {
          elements.push(<span key={index}>{segment.content}</span>);
        }
      } else if (currentIndex > position) {
        // Partially typed segment
        const partialLength = currentIndex - position;
        const partialContent = segment.raw.slice(0, partialLength);

        if (segment.type === 'text') {
          elements.push(<span key={index}>{partialContent}</span>);
        } else {
          // For math, show placeholder while typing
          elements.push(
            <span key={index} className="text-[#ff6b35] font-mono">
              {partialContent}
            </span>
          );
        }
      }

      position = segmentEnd;
    });

    return elements;
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="inline-block ml-1 text-[#ff6b35] font-bold"
        >
          |
        </motion.span>
      )}
    </div>
  );
}