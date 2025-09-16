'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';
import { DiagnosisDisplay } from '@/components/diagnostic/DiagnosisDisplay';
import { DiagnosticEngine } from '@/lib/diagnostic-engine';
import { questionBank } from '@/data/questionBank';
import { StudentResponse, DiagnosticQuestion, FinalDiagnosis } from '@/types';

export default function DiagnosticPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : null;

  // Filter questions based on grade level
  const getQuestionsForGrade = (gradeLevel: number | null): DiagnosticQuestion[] => {
    if (!gradeLevel) return questionBank;

    // Grade-specific topic filtering
    const topicsByGrade: { [key: number]: string[] } = {
      6: ['main'],
      7: ['main'],
      8: ['main', 'B'],
      9: ['main', 'A', 'B'],
      10: ['A', 'B'],
      11: ['A'],
      12: ['A'],
    };

    const allowedTopics = topicsByGrade[gradeLevel] || ['main'];
    const difficultyByGrade: { [key: number]: string[] } = {
      6: ['easy'],
      7: ['easy', 'medium'],
      8: ['easy', 'medium'],
      9: ['medium'],
      10: ['medium', 'hard'],
      11: ['medium', 'hard'],
      12: ['hard'],
    };

    const allowedDifficulties = difficultyByGrade[gradeLevel] || ['medium'];

    return questionBank.filter(q =>
      allowedTopics.includes(q.branch) &&
      allowedDifficulties.includes(q.difficulty)
    );
  };

  const [engine] = useState(() => new DiagnosticEngine({
    questions: getQuestionsForGrade(grade),
    maxQuestions: grade && grade <= 7 ? 5 : 7,
    minQuestions: grade && grade <= 7 ? 3 : 4,
  }));
  const [session, setSession] = useState(() => engine.startSession('demo-user'));
  const [startTime, setStartTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [diagnosis, setDiagnosis] = useState<FinalDiagnosis | null>(null);

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
        if (result.diagnosis && 'sessionId' in result.diagnosis) {
          setDiagnosis(result.diagnosis);
        }
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
            className="fade-in"
          >
            <DiagnosisDisplay
              diagnosis={diagnosis}
              onRestart={handleRestart}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-5xl font-black mb-2 text-[#1a3a52] tracking-wider">
            MATHPOINT
          </h1>
          <h2 className="text-2xl font-bold text-[#ff6b35] mb-4">
            {grade ? `Grade ${grade}` : 'Math'} Diagnostic Assessment
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This adaptive assessment will identify your strengths and areas for improvement
            in {grade ? `Grade ${grade} mathematics` : 'mathematics'}. Answer each question to the best of your ability.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#1a3a52]"
            >
              <div className="text-center">
                <motion.div
                  key={progress.questionsAnswered}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-3xl font-bold text-[#1a3a52] mb-1"
                >
                  {progress.questionsAnswered}
                </motion.div>
                <div className="text-sm text-gray-600 font-semibold">
                  Questions
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-4 shadow-md border-l-4 border-[#ff6b35]"
            >
              <div className="text-center">
                <motion.div
                  key={progress.currentBranch}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-[#ff6b35] mb-1"
                >
                  {progress.currentBranch}
                </motion.div>
                <div className="text-sm text-gray-600 font-semibold">
                  Current Path
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500"
            >
              <div className="text-center">
                <motion.div
                  key={progress.estimatedRemaining}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-3xl font-bold text-green-600 mb-1"
                >
                  {progress.estimatedRemaining}
                </motion.div>
                <div className="text-sm text-gray-600 font-semibold">
                  Remaining
                </div>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-6">
            <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
              <span>Progress</span>
              <span>{progress.percentComplete}% Complete</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-[#1a3a52] to-[#ff6b35]"
                style={{ width: `${progress.percentComplete}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
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
        </div>
      </div>
    </div>
  );
}