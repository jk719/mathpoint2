'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlgebraItem, StartDiagnosticResponse, SubmitAnswerResponse } from '@/types/algebra1-diagnostic';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { MathInput } from '@/components/math-input/MathInput';

export default function Algebra1DiagnosticPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<AlgebraItem | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [selectedSteps, setSelectedSteps] = useState<Set<string>>(new Set());
  const [stepOrders, setStepOrders] = useState<Map<string, number>>(new Map());
  const [selectedVerifications, setSelectedVerifications] = useState<Set<string>>(new Set());
  const [primaryAnswer, setPrimaryAnswer] = useState<any>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null); // No default selection
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [useMvpMode, setUseMvpMode] = useState<boolean>(true); // Default to MVP mode for demos
  const [stepAnswers, setStepAnswers] = useState<string[]>([]); // For MULTI_STEP format

  const startDiagnostic = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/diagnostic/algebra1/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: 'test-student-001',
          config: {
            maxItems: useMvpMode ? 15 : 10,
            minItems: useMvpMode ? 10 : 5,
            adaptiveMode: true,
            mvp: useMvpMode
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        const data: StartDiagnosticResponse = result.data;
        setSessionId(data.sessionId);
        setCurrentItem(data.firstItem);
        setStartTime(Date.now());
        setQuestionNumber(1);  // Reset to question 1
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
        // Send both the selected steps and their orders
        answerToSubmit = {
          steps: Array.from(selectedSteps),
          order: Array.from(stepOrders.entries())
            .sort((a, b) => a[1] - b[1])
            .map(([stepId]) => stepId)
        };
      } else if (currentItem.format === 'HYBRID_VERIFY') {
        // For hybrid format, combine answer with verification steps
        answerToSubmit = {
          primaryAnswer: primaryAnswer || answer,
          verifications: Array.from(selectedVerifications)
        };
      } else if (currentItem.format === 'MULTI_STEP') {
        // For multi-step, send all step responses
        answerToSubmit = {
          stepResponses: stepAnswers
        };
      } else {
        answerToSubmit = answer;
      }

      const response = await fetch('/api/diagnostic/algebra1/submit', {
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

        // Show feedback
        setFeedback(data.feedback || (data.isCorrect ? '✓ Correct!' : '✗ Incorrect'));

        // Wait before moving to next question
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
            setConfidence(null);  // Reset confidence for next question
            setStartTime(Date.now());
            setFeedback(null);
            setQuestionNumber(prev => prev + 1);  // Increment question number
          } else {
            // No next item but not complete - just clear for now
            setAnswer('');
            setSelectedChoice('');
            setSelectedSteps(new Set());
            setStepOrders(new Map());
            setSelectedVerifications(new Set());
            setPrimaryAnswer(null);
            setShowVerification(false);
            setStepAnswers([]);
            setConfidence(null);  // Reset confidence
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
    // Replace \n with actual line breaks
    const textWithBreaks = text.replace(/\\n/g, '\n');

    // Split by newlines first
    const lines = textWithBreaks.split('\n');

    return lines.map((line, lineIndex) => {
      // Split each line by math expressions
      const parts = line.split(/(\$[^$]+\$)/g);
      const renderedParts = parts.map((part, partIndex) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          return <InlineMath key={`${lineIndex}-${partIndex}`} math={math} />;
        }
        return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
      });

      // Add line break after each line except the last
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

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header Section */}
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
                <p className="text-sm sm:text-base text-gray-600">Algebra 1 Adaptive Assessment</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
              >
                Take Another Diagnostic
              </button>
            </div>

            {/* Overall Score */}
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

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>
            </div>
          </motion.div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
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
                  <p className="text-gray-600 text-xs sm:text-sm">Questions Answered</p>
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
                  <p className="text-gray-600 text-xs sm:text-sm">Correct Answers</p>
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
                  <p className="text-gray-600 text-xs sm:text-sm">Avg. Confidence</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">{Math.round(report.avgConfidence)}%</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Domain Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <span>📚</span>
              Content Area Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Foundations of Algebra', score: 85, color: 'bg-blue-500' },
                { name: 'Equations & Inequalities', score: 67, color: 'bg-green-500' },
                { name: 'Linear Functions', score: 92, color: 'bg-purple-500' },
                { name: 'Systems of Equations', score: 75, color: 'bg-yellow-500' },
                { name: 'Polynomials', score: 58, color: 'bg-red-500' },
                { name: 'Quadratic Functions', score: 70, color: 'bg-indigo-500' },
              ].map((domain, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-gray-800 text-sm">{domain.name}</p>
                    <p className="text-lg font-bold text-gray-900">{domain.score}%</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-full ${domain.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${domain.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths and Areas for Growth */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
                <span>💪</span>
                Areas of Strength
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-800">Linear Functions</p>
                    <p className="text-sm text-gray-600">Strong understanding of slope and graphing</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-800">Foundations of Algebra</p>
                    <p className="text-sm text-gray-600">Excellent grasp of distributive property</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-gray-800">Systems of Equations</p>
                    <p className="text-sm text-gray-600">Proficient with elimination method</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Areas for Growth */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <span>🎯</span>
                Focus Areas
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">→</span>
                  <div>
                    <p className="font-semibold text-gray-800">Polynomials</p>
                    <p className="text-sm text-gray-600">Practice FOIL method and factoring</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">→</span>
                  <div>
                    <p className="font-semibold text-gray-800">Inequalities</p>
                    <p className="text-sm text-gray-600">Review sign flipping when dividing by negatives</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 text-xl">→</span>
                  <div>
                    <p className="font-semibold text-gray-800">Quadratic Formula</p>
                    <p className="text-sm text-gray-600">Work on multi-step problem solving</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Recommendations for Teachers/Parents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>👨‍🏫</span>
              Recommendations for Educators & Parents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg p-5">
                <h3 className="font-bold text-lg text-purple-600 mb-2">Next Steps</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Focus on polynomial operations and factoring techniques</li>
                  <li>Provide additional practice with inequality sign rules</li>
                  <li>Continue building on strong foundation skills</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Learning Resources</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Khan Academy: Polynomial factoring lessons</li>
                  <li>Interactive practice: Systems of equations</li>
                  <li>Video tutorials: Quadratic formula applications</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Print/Share Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8"
          >
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>🖨️</span>
              Print Report
            </button>
            <button
              onClick={() => {
                // Email functionality would go here
                alert('Email report feature coming soon!');
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>📧</span>
              Email Report
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3a52] mb-4">Algebra 1 Adaptive Diagnostic</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            This advanced diagnostic will adapt to your responses and identify your strengths and areas for improvement.
          </p>

          {/* MVP Mode Toggle */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={useMvpMode}
                onChange={(e) => setUseMvpMode(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900">MVP Demo Mode</span>
                <p className="text-sm text-gray-600">
                  {useMvpMode ? '15 curated questions (10-15 min)' : '10 questions (demo)'}
                </p>
              </div>
            </label>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            • {useMvpMode ? '15' : '10'} adaptive questions<br/>
            • Advanced adaptive algorithm<br/>
            • Detects common misconceptions<br/>
            • Provides personalized recommendations
          </p>
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
            {isLoading ? 'Starting...' : 'Start Diagnostic'}
          </button>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

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
              <div className="flex gap-2 flex-wrap">
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

            {/* Answer Input */}
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

            {/* TWO_TIER format - has both MCQ choices and reasoning */}
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

            {/* HYBRID_VERIFY format - Answer followed by process verification */}
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

            {/* STEP_SELECTION format - Check all that apply */}
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
                            // Auto-assign next order number
                            const maxOrder = Math.max(0, ...Array.from(newOrders.values()));
                            newOrders.set(step.id, maxOrder + 1);
                          } else {
                            newSteps.delete(step.id);
                            newOrders.delete(step.id);
                            // Reorder remaining steps
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

            {/* ERROR_ANALYSIS format - Find and fix the error */}
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

            {/* MULTI_STEP format - Step-by-step solution */}
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
                        // Move to next step or submit if last step
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

            {/* Confidence Selector - Kid Friendly */}
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