'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Delete, ChevronLeft, ChevronRight, Mic, CheckCircle } from 'lucide-react';

interface MathKeyboardProps {
  onInput: (value: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onSubmit: () => void;
  isVisible: boolean;
  onClose: () => void;
  mode?: 'basic' | 'advanced';
  isMobile?: boolean;
}

interface KeyButton {
  label: string;
  value: string;
  type?: 'number' | 'operator' | 'symbol' | 'action';
  className?: string;
  icon?: React.ReactNode;
}

export function MathKeyboard({
  onInput,
  onDelete,
  onClear,
  onSubmit,
  isVisible,
  onClose,
  mode = 'basic',
  isMobile = false
}: MathKeyboardProps) {
  const [currentPanel, setCurrentPanel] = useState<'numbers' | 'symbols' | 'functions'>('numbers');

  // Detect if on mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    };

    if (checkMobile() && isVisible) {
      // Prevent default keyboard on mobile
      const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
      inputs.forEach(input => {
        (input as HTMLInputElement).setAttribute('readonly', 'true');
      });

      return () => {
        inputs.forEach(input => {
          (input as HTMLInputElement).removeAttribute('readonly');
        });
      };
    }
  }, [isVisible]);

  // Number keys
  const numberKeys: KeyButton[] = [
    { label: '7', value: '7', type: 'number' },
    { label: '8', value: '8', type: 'number' },
    { label: '9', value: '9', type: 'number' },
    { label: '4', value: '4', type: 'number' },
    { label: '5', value: '5', type: 'number' },
    { label: '6', value: '6', type: 'number' },
    { label: '1', value: '1', type: 'number' },
    { label: '2', value: '2', type: 'number' },
    { label: '3', value: '3', type: 'number' },
    { label: '0', value: '0', type: 'number' },
    { label: '.', value: '.', type: 'number' },
    { label: '−', value: '-', type: 'operator' },
  ];

  // Basic operators
  const operatorKeys: KeyButton[] = [
    { label: '+', value: '+', type: 'operator' },
    { label: '−', value: '-', type: 'operator' },
    { label: '×', value: '*', type: 'operator' },
    { label: '÷', value: '/', type: 'operator' },
    { label: '=', value: '=', type: 'operator' },
    { label: '(', value: '(', type: 'operator' },
    { label: ')', value: ')', type: 'operator' },
    { label: ',', value: ',', type: 'operator' },
  ];

  // Symbol keys
  const symbolKeys: KeyButton[] = [
    { label: 'x', value: 'x', type: 'symbol' },
    { label: 'y', value: 'y', type: 'symbol' },
    { label: 'π', value: 'π', type: 'symbol' },
    { label: '√', value: 'sqrt(', type: 'symbol' },
    { label: 'x²', value: '^2', type: 'symbol' },
    { label: 'x³', value: '^3', type: 'symbol' },
    { label: 'xⁿ', value: '^', type: 'symbol' },
    { label: '±', value: '±', type: 'symbol' },
    { label: '∞', value: '∞', type: 'symbol' },
    { label: '≤', value: '≤', type: 'symbol' },
    { label: '≥', value: '≥', type: 'symbol' },
    { label: '≠', value: '≠', type: 'symbol' },
  ];

  // Function keys (advanced mode)
  const functionKeys: KeyButton[] = [
    { label: 'sin', value: 'sin(', type: 'symbol' },
    { label: 'cos', value: 'cos(', type: 'symbol' },
    { label: 'tan', value: 'tan(', type: 'symbol' },
    { label: 'log', value: 'log(', type: 'symbol' },
    { label: 'ln', value: 'ln(', type: 'symbol' },
    { label: '|x|', value: 'abs(', type: 'symbol' },
    { label: 'n!', value: '!', type: 'symbol' },
    { label: 'frac', value: '/', type: 'symbol', className: 'text-sm' },
  ];

  const renderKeypad = () => {
    let keys: KeyButton[] = [];

    switch (currentPanel) {
      case 'numbers':
        keys = [...numberKeys, ...operatorKeys.slice(0, 4)];
        break;
      case 'symbols':
        keys = symbolKeys;
        break;
      case 'functions':
        keys = functionKeys;
        break;
    }

    return (
      <div className="grid grid-cols-4 gap-2 p-3">
        {keys.map((key, index) => (
          <motion.button
            key={`${key.label}-${index}`}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onInput(key.value);
              // Haptic feedback for mobile
              if (isMobile && 'vibrate' in navigator) {
                navigator.vibrate(10);
              }
            }}
            className={`
              ${key.type === 'number' ? 'bg-white text-gray-900' : ''}
              ${key.type === 'operator' ? 'bg-orange-100 text-orange-700' : ''}
              ${key.type === 'symbol' ? 'bg-blue-100 text-blue-700' : ''}
              ${key.className || ''}
              p-4 rounded-lg font-semibold text-lg
              hover:opacity-80 active:opacity-60
              transition-all duration-150
              shadow-sm hover:shadow-md
              min-h-[60px]
            `}
          >
            {key.label}
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[9998]"
          />
          <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`
            fixed bottom-0 left-0 right-0 z-[9999]
            bg-gray-50 border-t-2 border-gray-200 shadow-2xl
            ${isMobile ? 'h-[60vh]' : 'h-auto max-h-[400px]'}
            overflow-hidden
            pointer-events-auto
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-white border-b">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPanel('numbers')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  currentPanel === 'numbers'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                123
              </button>
              <button
                onClick={() => setCurrentPanel('symbols')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  currentPanel === 'symbols'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                x²√
              </button>
              {mode === 'advanced' && (
                <button
                  onClick={() => setCurrentPanel('functions')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors ${
                    currentPanel === 'functions'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  f(x)
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onDelete}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                aria-label="Delete"
              >
                <Delete className="w-5 h-5" />
              </button>
              <button
                onClick={onClear}
                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
              >
                Clear
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                aria-label="Close keyboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Keypad */}
          {renderKeypad()}

          {/* Action bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t">
            <div className="flex gap-2">
              {isMobile && (
                <button
                  className="flex-1 py-3 px-4 rounded-lg bg-gray-100 text-gray-700 font-medium
                           hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  aria-label="Voice input"
                >
                  <Mic className="w-5 h-5" />
                  Voice
                </button>
              )}
              <button
                onClick={onSubmit}
                className="flex-1 py-3 px-4 rounded-lg bg-green-500 text-white font-medium
                         hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Submit
              </button>
            </div>
          </div>

          {/* Quick tips for mobile */}
          {isMobile && (
            <div className="absolute top-16 left-0 right-0 px-3 py-2 bg-blue-50 text-blue-700 text-sm">
              💡 Tip: Swipe up for exponents, down for fractions
            </div>
          )}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}