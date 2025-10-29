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
  const [confidence, setConfidence] = useState<number>(60); // Default to "Pretty Sure"
  const [isLoading, setIsLoading] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [useMvpMode, setUseMvpMode] = useState<boolean>(true); // Default to MVP mode for demos

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
    const parts = text.split(/(\$[^$]+\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        return <InlineMath key={index} math={math} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (report) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#1a3a52] mb-6">Diagnostic Complete!</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Summary</h2>
                <p>Total Questions: {report.totalQuestions}</p>
                <p>Correct: {report.correctCount}</p>
                <p>Average Confidence: {Math.round(report.avgConfidence)}%</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-green-600">Mastered Skills</h2>
                {report.masteredSkills?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {report.masteredSkills.map((skill: any) => (
                      <li key={skill.skill.code}>{skill.skill.name} ({Math.round(skill.pMastery * 100)}%)</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">None yet</p>}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-yellow-600">Developing Skills</h2>
                {report.developingSkills?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {report.developingSkills.map((skill: any) => (
                      <li key={skill.skill.code}>{skill.skill.name} ({Math.round(skill.pMastery * 100)}%)</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">None</p>}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 text-red-600">Weak Skills</h2>
                {report.weakSkills?.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {report.weakSkills.map((skill: any) => (
                      <li key={skill.skill.code}>{skill.skill.name} ({Math.round(skill.pMastery * 100)}%)</li>
                    ))}
                  </ul>
                ) : <p className="text-gray-500">None</p>}
              </div>

              <button
                onClick={() => window.location.reload()}
                className="mt-6 btn-primary"
              >
                Start New Diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#1a3a52] mb-4">Algebra 1 Adaptive Diagnostic</h1>
          <p className="text-gray-600 mb-6">
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
                  {useMvpMode ? '15 curated questions (10-15 min)' : '5-10 questions (demo)'}
                </p>
              </div>
            </label>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            • {useMvpMode ? '15' : '5-10'} adaptive questions<br/>
            • Uses Bayesian Knowledge Tracing<br/>
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-lg shadow-lg p-8 relative z-0"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Question {questionNumber}
              </h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                  {currentItem.difficulty}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
                  {currentItem.format}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6 text-lg text-gray-800">
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
                  showPreview={true}
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
                        showPreview={true}
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
                {selectedSteps.size > 0 && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-700">
                    Order: {Array.from(stepOrders.entries())
                      .sort((a, b) => a[1] - b[1])
                      .map(([id]) => {
                        const step = currentItem.stepOptions?.find(s => s.id === id);
                        return `${stepOrders.get(id)}. ${step?.text.substring(0, 30)}...`;
                      })
                      .join(' → ')}
                  </div>
                )}
              </div>
            )}

            {/* Confidence Selector - Kid Friendly */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How sure are you about your answer?
              </label>
              <div className="grid grid-cols-3 gap-3">
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