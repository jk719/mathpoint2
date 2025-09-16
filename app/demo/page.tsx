'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';
import { DiagnosisDisplay } from '@/components/diagnostic/DiagnosisDisplay';
import { Progress } from '@/components/ui/Progress';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { comprehensiveQuestionBank } from '@/data/comprehensiveQuestionBank';
import { StudentResponse } from '@/types';

export default function DemoPage() {
  const [engine] = useState(() => new DiagnosticEngine({ questions: comprehensiveQuestionBank }));
  const [session, setSession] = useState(() => engine.startSession('demo-user'));
  const [startTime, setStartTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const currentQuestion = session.questionsAsked[session.questionsAsked.length - 1];
  const progress = engine.getSessionProgress(session);

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
      const result = await engine.processResponse(session, response);

      setSession({ ...session });

      if (result.isComplete) {
        setIsComplete(true);
        setDiagnosis(result.diagnosis);
      }
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  const handleRestart = () => {
    const newSession = engine.startSession('demo-user');
    setSession(newSession);
    setIsComplete(false);
    setDiagnosis(null);
    setStartTime(Date.now());
  };

  if (isComplete && diagnosis) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiagnosisDisplay
              diagnosis={diagnosis as any}
              onRestart={handleRestart}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MathPoint Demo - Adaptive Diagnostic
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the intelligent branching system that adapts to your responses
          </p>
        </div>

        <div className="space-y-6">
          <div className="w-full max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{progress.questionsAnswered} questions answered</span>
              </div>
              <Progress value={progress.percentComplete} variant="gradient" />
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
                    questionNumber={session.questionsAsked.length}
                    onSubmit={handleAnswer}
                    isLoading={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500 space-y-1">
                <p>Current Branch: <span className="font-medium text-[#ff6b35]">{progress.currentBranch}</span></p>
                <p>Estimated Remaining: {progress.estimatedRemaining} questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}