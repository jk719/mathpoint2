'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grade6Item } from '@/data/grade6-questions';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { MathInput } from '@/components/math-input/MathInput';

interface StartDiagnosticResponse {
  sessionId: string;
  firstItem: Grade6Item;
}

interface SubmitAnswerResponse {
  isCorrect: boolean;
  feedback?: string;
  isComplete: boolean;
  nextItem?: Grade6Item;
  report?: any;
}

export default function Grade6DiagnosticPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<Grade6Item | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(new Set());
  const [stepOrders, setStepOrders] = useState<Map<string, number>>(new Map());
  const [selectedVerifications, setSelectedVerifications] = useState<Set<string>>(new Set());
  const [primaryAnswer, setPrimaryAnswer] = useState<any>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [stepAnswers, setStepAnswers] = useState<string[]>([]);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [questionTimes, setQuestionTimes] = useState<{questionId: string, timeSpent: number}[]>([]);

  // Timer effect
  React.useEffect(() => {
    if (!currentItem || report || isLoading) return;

    const interval = setInterval(() => {
      setElapsedTime((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(interval);
  }, [currentItem, report, isLoading, startTime]);

  const startDiagnostic = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnostic/grade6/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: 'test-student-001',
          config: {
            maxItems: 10,
            minItems: 5,
            adaptiveMode: true
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        const data: StartDiagnosticResponse = result.data;
        setSessionId(data.sessionId);
        setCurrentItem(data.firstItem);
        setStartTime(Date.now());
        setQuestionNumber(1);
      } else {
        setError(result.error || 'Failed to start diagnostic');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!sessionId || !currentItem) return;

    const timeSpentMs = Date.now() - startTime;
    setIsLoading(true);
    setFeedback(null);

    try {
      let answerToSubmit: any;
      if (currentItem.format === 'MCQ' || currentItem.format === 'TWO_TIER') {
        answerToSubmit = selectedChoice;
      } else if (currentItem.format === 'STEP_SELECTION') {
        answerToSubmit = {
          steps: Array.from(selectedSteps),
          order: Array.from(stepOrders.entries())
            .sort((a, b) => a[1] - b[1])
            .map(([stepId]) => stepId)
        };
      } else if (currentItem.format === 'HYBRID_VERIFY') {
        answerToSubmit = {
          primaryAnswer: primaryAnswer || answer,
          verifications: Array.from(selectedVerifications)
        };
      } else if (currentItem.format === 'MULTI_STEP') {
        answerToSubmit = {
          stepResponses: stepAnswers
        };
      } else {
        answerToSubmit = answer;
      }

      const response = await fetch('/api/diagnostic/grade6/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          itemId: currentItem.id,
          answer: answerToSubmit,
          confidence,
          timeSpentMs,
          hintsUsed: []
        })
      });

      const result = await response.json();

      if (result.success && result.data) {
        const data: SubmitAnswerResponse = result.data;

        // Track time spent on this question
        const timeSpent = (Date.now() - startTime) / 1000;
        setQuestionTimes(prev => [...prev, { questionId: currentItem.id, timeSpent }]);

        setFeedback(data.feedback || (data.isCorrect ? '✓ Correct!' : '✗ Incorrect'));

        setTimeout(() => {
          if (data.isComplete) {
            setReport(data.report);
          } else if (data.nextItem) {
            setCurrentItem(data.nextItem);
            setAnswer('');
            setSelectedChoice('');
            setSelectedSteps(new Set());
            setStepOrders(new Map());
            setSelectedVerifications(new Set());
            setPrimaryAnswer(null);
            setShowVerification(false);
            setStepAnswers([]);
            setConfidence(null);
            setStartTime(Date.now());
            setElapsedTime(0);
            setFeedback(null);
            setQuestionNumber(prev => prev + 1);
          } else {
            setAnswer('');
            setSelectedChoice('');
            setSelectedSteps(new Set());
            setStepOrders(new Map());
            setSelectedVerifications(new Set());
            setPrimaryAnswer(null);
            setShowVerification(false);
            setStepAnswers([]);
            setConfidence(null);
            setFeedback(null);
          }
        }, 2000);
      } else {
        setError(result.error || 'Failed to submit answer');
      }
    } catch (err) {
      setError('Failed to submit answer');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMath = (text: string) => {
    const textWithBreaks = text.replace(/\\n/g, '\n');
    const lines = textWithBreaks.split('\n');

    return lines.map((line, lineIndex) => {
      const parts = line.split(/(\$[^$]+\$)/g);
      const renderedParts = parts.map((part, partIndex) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <InlineMath key={`${lineIndex}-${partIndex}`} math={math} />;
        }
        return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
      });

      return (
        <React.Fragment key={lineIndex}>
          {renderedParts}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  if (report) {
    const scorePercentage = Math.round((report.correctCount / report.totalQuestions) * 100);
    const performanceLevel = scorePercentage >= 80 ? 'Excellent' :
                            scorePercentage >= 60 ? 'Good' :
                            scorePercentage >= 40 ? 'Needs Practice' : 'Needs Significant Support';
    const performanceColor = scorePercentage >= 80 ? 'text-green-600' :
                            scorePercentage >= 60 ? 'text-blue-600' :
                            scorePercentage >= 40 ? 'text-yellow-600' : 'text-red-600';

    // Calculate total time and average time per question
    const totalTime = questionTimes.reduce((sum, qt) => sum + qt.timeSpent, 0);
    const avgTimePerQuestion = totalTime / questionTimes.length;

    // Format time helper
    const formatTimeReport = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  🎉 Diagnostic Complete!
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Grade 6 Math Assessment</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Take Another Diagnostic
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Overall Performance</h2>
                  <p className={`text-xl sm:text-2xl md:text-3xl font-extrabold ${performanceColor} mt-2`}>{performanceLevel}</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">{scorePercentage}%</div>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Accuracy</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  📊
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Questions</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{report.totalQuestions}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  ✅
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Correct</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{report.correctCount}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  💪
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Confidence</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{Math.round(report.avgConfidence)}%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                  ⏱️
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Total Time</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">{formatTimeReport(totalTime)}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Time Breakdown Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <span>⏱️</span>
              Time Breakdown
            </h2>

            <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Average Time per Question:</span>
                <span className="text-lg font-bold text-orange-600">{formatTimeReport(avgTimePerQuestion)}</span>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {questionTimes.map((qt, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700">Question {idx + 1}</span>
                    <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600 font-mono">{qt.questionId.substring(0, 8)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2 hidden sm:block">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          qt.timeSpent < 30 ? 'bg-green-500' :
                          qt.timeSpent < 60 ? 'bg-yellow-500' :
                          qt.timeSpent < 120 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((qt.timeSpent / 180) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-16 text-right">{formatTimeReport(qt.timeSpent)}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-2xl w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3a52] mb-4">Grade 6 Math Diagnostic</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Get a precise assessment of your Grade 6 math skills, then work with our AI tutor (managed by expert educators) to master the topics where you need help.
          </p>

          {/* 3-Step Process */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#ff6b35] text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">📊 Diagnostic Assessment (FREE)</p>
                  <p className="text-sm text-gray-600">Take our adaptive diagnostic to identify your strengths and weak topics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#ff6b35] text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">🤖 AI Tutoring (Human-Managed)</p>
                  <p className="text-sm text-gray-600">Get personalized AI tutoring on weak topics, monitored by expert educators</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#ff6b35] text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">✅ Master & Verify</p>
                  <p className="text-sm text-gray-600">After tutoring, take concept-specific mastery tests to verify you've mastered each topic</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 text-sm text-gray-600">
            <p className="font-semibold text-gray-900 mb-2">This Diagnostic Includes:</p>
            <ul className="space-y-1 ml-4">
              <li>• 10 adaptive questions</li>
              <li>• Covers all Grade 6 domains (ratios, fractions, geometry, statistics)</li>
              <li>• Advanced algorithm adjusts difficulty based on your answers</li>
              <li>• Identifies misconceptions and knowledge gaps</li>
              <li>• Detailed report with personalized learning recommendations</li>
            </ul>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <button
            onClick={startDiagnostic}
            disabled={isLoading}
            className="w-full btn-accent"
          >
            {isLoading ? 'Starting...' : 'Start Free Diagnostic'}
          </button>
          <p className="text-xs text-center text-gray-500 mt-3">
            After the diagnostic, you'll receive recommendations for AI tutoring on your weak topics
          </p>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get color based on time elapsed
  const getTimerColor = (seconds: number) => {
    if (seconds < 30) return 'from-green-500 to-emerald-400';
    if (seconds < 60) return 'from-yellow-500 to-orange-400';
    if (seconds < 120) return 'from-orange-500 to-red-400';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 relative z-0"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Question {questionNumber}
              </h2>
              <div className="flex gap-2 flex-wrap items-center">
                {/* Timer Display */}
                {showTimer && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-3 py-1 bg-gradient-to-r ${getTimerColor(elapsedTime)} text-white rounded-lg font-bold text-sm shadow-lg flex items-center gap-2`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime(elapsedTime)}</span>
                  </motion.div>
                )}
                {/* Timer Toggle */}
                <button
                  onClick={() => setShowTimer(!showTimer)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs transition-colors"
                  title={showTimer ? "Hide Timer" : "Show Timer"}
                >
                  {showTimer ? '👁️' : '👁️‍🗨️'}
                </button>
                <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs sm:text-sm">
                  {currentItem.difficulty}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs sm:text-sm">
                  {currentItem.format}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6 text-base sm:text-lg text-gray-800">
              {renderMath(currentItem.stem)}
            </div>

            {/* Answer Input - MCQ */}
            {currentItem.format === 'MCQ' && currentItem.choices && (
              <div className="space-y-3 mb-6">
                {currentItem.choices.map((choice) => (
                  <label
                    key={choice.id}
                    className={`mathpoint-radio ${
                      selectedChoice === choice.id ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={choice.id}
                      checked={selectedChoice === choice.id}
                      onChange={(e) => setSelectedChoice(e.target.value)}
                      className="mr-3 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-800">{renderMath(choice.text)}</span>
                  </label>
                ))}
              </div>
            )}

            {/* TWO_TIER */}
            {currentItem.format === 'TWO_TIER' && currentItem.choices && (
              <>
                <div className="space-y-3 mb-6">
                  {currentItem.choices.map((choice) => (
                    <label
                      key={choice.id}
                      className={`mathpoint-radio ${
                        selectedChoice === choice.id ? 'selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={choice.id}
                        checked={selectedChoice === choice.id}
                        onChange={(e) => setSelectedChoice(e.target.value)}
                        className="mr-3 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-gray-800">{renderMath(choice.text)}</span>
                    </label>
                  ))}
                </div>
                {currentItem.reasoningPrompt && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {currentItem.reasoningPrompt}
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Explain your reasoning..."
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                      rows={3}
                    />
                  </div>
                )}
              </>
            )}

            {/* NUM or FR */}
            {(currentItem.format === 'NUM' || currentItem.format === 'FR') && (
              <div className="mb-6">
                <MathInput
                  value={answer}
                  onChange={setAnswer}
                  onSubmit={submitAnswer}
                  placeholder={currentItem.format === 'FR' ? 'Enter your answer (e.g., 3/4, 0.75)...' : 'Enter your answer...'}
                  expectedFormat={currentItem.format === 'FR' ? 'fraction' : 'number'}
                  showPreview={false}
                  autoFocus={true}
                  hint={currentItem.format === 'FR' ? 'You can enter fractions like 3/4 or decimals like 0.75' : undefined}
                />
              </div>
            )}

            {/* HYBRID_VERIFY */}
            {currentItem.format === 'HYBRID_VERIFY' && (
              <div className="mb-6">
                {!showVerification ? (
                  <>
                    <div className="mb-4">
                      <MathInput
                        value={answer}
                        onChange={setAnswer}
                        onSubmit={() => {
                          setPrimaryAnswer(answer);
                          setShowVerification(true);
                        }}
                        placeholder="Enter your answer..."
                        expectedFormat="expression"
                        showPreview={false}
                        autoFocus={true}
                      />
                    </div>
                    {answer && (
                      <button
                        onClick={() => {
                          setPrimaryAnswer(answer);
                          setShowVerification(true);
                        }}
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Continue to verification →
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-700">Your answer: <strong>{renderMath(`$${primaryAnswer}$`)}</strong></p>
                    </div>
                    {currentItem.verificationPrompt && (
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        {currentItem.verificationPrompt}
                      </p>
                    )}
                    <div className="space-y-2">
                      {currentItem.verificationOptions?.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedVerifications.has(option.id)
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedVerifications.has(option.id)}
                            onChange={(e) => {
                              const newVerifications = new Set(selectedVerifications);
                              if (e.target.checked) {
                                newVerifications.add(option.id);
                              } else {
                                newVerifications.delete(option.id);
                              }
                              setSelectedVerifications(newVerifications);
                            }}
                            className="mt-1 mr-3 h-4 w-4 text-orange-500 focus:ring-orange-500 rounded"
                          />
                          <div className="flex-1">
                            <span className="text-gray-800">{renderMath(option.text)}</span>
                            {option.category && (
                              <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                {option.category}
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setShowVerification(false);
                        setPrimaryAnswer(null);
                      }}
                      className="mt-3 text-sm text-blue-500 hover:underline"
                    >
                      ← Change answer
                    </button>
                  </>
                )}
              </div>
            )}

            {/* STEP_SELECTION */}
            {currentItem.format === 'STEP_SELECTION' && currentItem.stepOptions && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Check the steps needed and number them in order (1, 2, 3...):
                </p>
                <div className="space-y-2">
                  {currentItem.stepOptions.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-start p-3 rounded-lg border-2 transition-all ${
                        selectedSteps.has(step.id)
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSteps.has(step.id)}
                        onChange={(e) => {
                          const newSteps = new Set(selectedSteps);
                          const newOrders = new Map(stepOrders);
                          if (e.target.checked) {
                            newSteps.add(step.id);
                            const maxOrder = Math.max(0, ...Array.from(newOrders.values()));
                            newOrders.set(step.id, maxOrder + 1);
                          } else {
                            newSteps.delete(step.id);
                            newOrders.delete(step.id);
                            const remainingOrders = Array.from(newOrders.entries())
                              .sort((a, b) => a[1] - b[1])
                              .map((entry, idx): [string, number] => [entry[0], idx + 1]);
                            newOrders.clear();
                            remainingOrders.forEach(([id, order]) => newOrders.set(id, order));
                          }
                          setSelectedSteps(newSteps);
                          setStepOrders(newOrders);
                        }}
                        className="mt-1 mr-3 h-4 w-4 text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <div className="flex-1 flex items-start gap-3">
                        <span className="text-gray-800 flex-1">{renderMath(step.text)}</span>
                        {selectedSteps.has(step.id) && (
                          <input
                            type="number"
                            min="1"
                            max={currentItem.stepOptions?.length || 10}
                            value={stepOrders.get(step.id) || ''}
                            onChange={(e) => {
                              const newOrders = new Map(stepOrders);
                              const newValue = parseInt(e.target.value);
                              if (!isNaN(newValue) && newValue > 0) {
                                newOrders.set(step.id, newValue);
                                setStepOrders(newOrders);
                              }
                            }}
                            className="w-16 px-2 py-1 border-2 border-gray-300 rounded text-center focus:border-orange-500 focus:outline-none"
                            placeholder="#"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ERROR_ANALYSIS */}
            {currentItem.format === 'ERROR_ANALYSIS' && (
              <div className="mb-6">
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-red-700 mb-2">
                    ❌ Student Work (contains an error):
                  </p>
                  <div className="text-gray-800 font-mono bg-white p-3 rounded">
                    {renderMath(currentItem.errorProblem || '')}
                  </div>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is the correct answer?
                </label>
                <MathInput
                  value={answer}
                  onChange={setAnswer}
                  onSubmit={submitAnswer}
                  placeholder="Enter the correct answer..."
                  expectedFormat="expression"
                  showPreview={false}
                  autoFocus={true}
                  hint={currentItem.errorType ? `Error type: ${currentItem.errorType}` : undefined}
                />
              </div>
            )}

            {/* MULTI_STEP */}
            {currentItem.format === 'MULTI_STEP' && currentItem.steps && (
              <div className="mb-6 space-y-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Solve this problem step-by-step:
                </p>
                {currentItem.steps.map((step, idx) => (
                  <div key={step.id} className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <label className="block text-sm font-semibold text-blue-800 mb-2">
                      Step {idx + 1}: {step.instruction}
                    </label>
                    <MathInput
                      value={stepAnswers[idx] || ''}
                      onChange={(val) => {
                        const newAnswers = [...stepAnswers];
                        newAnswers[idx] = val;
                        setStepAnswers(newAnswers);
                      }}
                      onSubmit={() => {
                        if (idx === currentItem.steps!.length - 1) {
                          submitAnswer();
                        }
                      }}
                      placeholder="Enter your answer for this step..."
                      expectedFormat="expression"
                      showPreview={false}
                      autoFocus={idx === 0}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Confidence Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How sure are you about your answer?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setConfidence(0)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    confidence === 0
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-300 hover:border-red-300'
                  }`}
                >
                  <div className="text-3xl mb-2">😰</div>
                  <div className="text-sm font-medium text-gray-700">Just Guessing</div>
                </button>
                <button
                  type="button"
                  onClick={() => setConfidence(25)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    confidence === 25
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                >
                  <div className="text-3xl mb-2">😟</div>
                  <div className="text-sm font-medium text-gray-700">Not Sure</div>
                </button>
                <button
                  type="button"
                  onClick={() => setConfidence(60)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    confidence === 60
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">😊</div>
                  <div className="text-sm font-medium text-gray-700">Pretty Sure</div>
                </button>
                <button
                  type="button"
                  onClick={() => setConfidence(90)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    confidence === 90
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <div className="text-3xl mb-2">😃</div>
                  <div className="text-sm font-medium text-gray-700">Very Confident</div>
                </button>
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 p-4 rounded-lg ${
                  feedback.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {feedback}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              onClick={submitAnswer}
              disabled={isLoading ||
                confidence === null ||
                (currentItem.format === 'MCQ' && !selectedChoice) ||
                (currentItem.format === 'TWO_TIER' && !selectedChoice) ||
                ((currentItem.format === 'NUM' || currentItem.format === 'FR') && !answer) ||
                (currentItem.format === 'STEP_SELECTION' && selectedSteps.size === 0) ||
                (currentItem.format === 'HYBRID_VERIFY' && (!primaryAnswer || !showVerification))}
              className="w-full btn-accent relative z-10"
              style={{ position: 'relative', zIndex: 10 }}
            >
              {isLoading ? 'Submitting...' : 'Submit Answer'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
