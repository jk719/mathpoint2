'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from './QuestionCard';
import { DiagnosisDisplay } from './DiagnosisDisplay';
import { Progress } from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useDiagnostic } from '@/lib/hooks/useDiagnostic';
import { StudentResponse, FinalDiagnosis } from '@/types';

interface DiagnosticFlowProps {
  userId: string;
  onComplete?: () => void;
}

export function DiagnosticFlow({ userId, onComplete }: DiagnosticFlowProps) {
  const {
    session,
    currentQuestion,
    questionHistory,
    diagnosis,
    isLoading,
    error,
    startDiagnostic,
    submitAnswer,
    resetDiagnostic,
  } = useDiagnostic();

  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!session) {
      startDiagnostic(userId);
    }
  }, [session, startDiagnostic, userId]);

  useEffect(() => {
    if (questionHistory.length > 0) {
      const minQuestions = 4;
      const maxQuestions = 7;
      const answered = questionHistory.length - 1;
      const estimatedTotal = (minQuestions + maxQuestions) / 2;
      setProgress(Math.min(100, (answered / estimatedTotal) * 100));
    }
  }, [questionHistory]);

  const handleAnswer = async (answer: string | string[]) => {
    if (!currentQuestion) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setStartTime(Date.now());

    const response: StudentResponse = {
      questionId: currentQuestion.id,
      answer,
      timeSpent,
      attemptNumber: 1,
      confidence: 75,
    };

    try {
      const result = await submitAnswer(response);
      if (result.isComplete) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const handleRestart = () => {
    setIsComplete(false);
    setProgress(0);
    resetDiagnostic();
    startDiagnostic(userId);
  };

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleRestart}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  const isFinalDiagnosis = (diag: unknown): diag is FinalDiagnosis => {
    return Boolean(diag && typeof diag === 'object' && diag !== null &&
      'sessionId' in diag && 'overallLevel' in diag && 'recommendedPath' in diag);
  };

  if (isComplete && isFinalDiagnosis(diagnosis)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DiagnosisDisplay
          diagnosis={diagnosis}
          onRestart={handleRestart}
        />
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{questionHistory.length} questions answered</span>
          </div>
          <Progress value={progress} variant="gradient" />
        </div>

        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={currentQuestion}
                questionNumber={questionHistory.length}
                onSubmit={handleAnswer}
                isLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && !currentQuestion && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}