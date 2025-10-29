'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Keyboard, X, HelpCircle, Check } from 'lucide-react';
import { MathKeyboard } from './MathKeyboard';
import { MathPreview } from './MathPreview';
import { MathParser } from '@/lib/math-input/MathParser';

interface MathInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  expectedFormat?: 'number' | 'fraction' | 'equation' | 'expression';
  showKeyboard?: boolean;
  showPreview?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

export function MathInput({
  id = 'math-input',
  value,
  onChange,
  onSubmit,
  placeholder = 'Enter your answer...',
  expectedFormat,
  showKeyboard: showKeyboardProp = true,
  showPreview = true,
  autoFocus = false,
  disabled = false,
  error,
  hint,
  className = ''
}: MathInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [parseResult, setParseResult] = useState(MathParser.parse(''));
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const touchCheck = 'ontouchstart' in window;
      setIsMobile(mobileCheck || touchCheck);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parse input whenever it changes
  useEffect(() => {
    const result = MathParser.parse(value, expectedFormat);
    setParseResult(result);
  }, [value, expectedFormat]);

  // Auto-focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleKeyboardInput = (insert: string) => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    
    const newValue = value.substring(0, start) + insert + value.substring(end);
    onChange(newValue);
    
    // Restore cursor position after React re-renders
    setTimeout(() => {
      const newPosition = start + insert.length;
      input.setSelectionRange(newPosition, newPosition);
      setCursorPosition(newPosition);
    }, 0);
  };

  const handleDelete = () => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    let newValue;
    if (start !== end) {
      // Delete selection
      newValue = value.substring(0, start) + value.substring(end);
      setCursorPosition(start);
    } else if (start > 0) {
      // Delete character before cursor
      newValue = value.substring(0, start - 1) + value.substring(start);
      setCursorPosition(start - 1);
    } else {
      return;
    }

    onChange(newValue);
    
    // Restore cursor position
    setTimeout(() => {
      input.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handleClear = () => {
    onChange('');
    setCursorPosition(0);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Don't auto-show keyboard on focus to avoid blocking issues
    // User can manually toggle it with the keyboard button
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Hide keyboard on blur after a small delay
    setTimeout(() => {
      if (!isFocused) {
        setShowKeyboard(false);
      }
    }, 200);
  };

  return (
    <div className={`math-input-container ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <div className={`
          flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
          ${isFocused ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          bg-white
        `}>
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 font-mono text-lg"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {value && (
              <button
                onClick={handleClear}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {showKeyboardProp && (
              <button
                onClick={() => setShowKeyboard(!showKeyboard)}
                className={`p-1.5 rounded-md transition-colors ${
                  showKeyboard
                    ? 'bg-orange-100 text-orange-600'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }`}
                title="Toggle keyboard"
              >
                {isMobile ? <Keyboard className="w-4 h-4" /> : <Calculator className="w-4 h-4" />}
              </button>
            )}

            {parseResult.isValid && (
              <div className="p-1.5 text-green-500">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Validation feedback */}
        <AnimatePresence>
          {(error || hint || parseResult.suggestions) && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-0 right-0 mt-1"
            >
              {error && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                  <X className="w-3 h-3" />
                  {error}
                </div>
              )}
              
              {!error && hint && (
                <div className="text-blue-500 text-sm flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  {hint}
                </div>
              )}

              {!error && !hint && parseResult.suggestions && parseResult.suggestions.length > 0 && (
                <div className="text-gray-500 text-sm">
                  {parseResult.suggestions[0]}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Math Preview */}
      {showPreview && parseResult.isValid && parseResult.latex && (
        <div className="mt-3">
          <MathPreview latex={parseResult.latex} />
        </div>
      )}

      {/* Math Keyboard */}
      <MathKeyboard
        isVisible={showKeyboard}
        onInput={handleKeyboardInput}
        onDelete={handleDelete}
        onClear={handleClear}
        onSubmit={() => onSubmit?.()}
        onClose={() => setShowKeyboard(false)}
        mode={expectedFormat === 'expression' || expectedFormat === 'equation' ? 'advanced' : 'basic'}
        isMobile={isMobile}
      />
    </div>
  );
}