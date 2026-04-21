'use client';

import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle, XCircle, ArrowRight, RotateCcw, Target, Zap } from 'lucide-react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { getDemoSkillById } from '@/data/demo-skills';
import { demoQuestions } from '@/data/demo-questions';
import { toDisplayQuestion, extractAnswerLabel } from '@/lib/utils/questionAdapters';
import type { SATQuestion } from '@/types/sat';
import type { DiagnosticQuestion } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface QuizQuestion {
  raw: SATQuestion;
  display: DiagnosticQuestion;
}

function LessonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, language } = useTranslation();
  const { diagnosticResult } = useDiagnosticStore();

  const skillId = searchParams.get('skill') ?? '';
  const skill = getDemoSkillById(skillId);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const hasStartedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  // Quiz state
  const [quizMode, setQuizMode] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<boolean | null>(null);

  const userMessageCount = messages.filter((m) => m.role === 'user').length;
  const showQuizPrompt = userMessageCount >= 3 && !quizMode && !quizComplete;

  // Lesson progress — estimate ~5 exchanges before quiz
  const lessonSteps = 5;
  const currentStep = Math.min(userMessageCount, lessonSteps);
  const lessonProgress = quizMode ? 100 : Math.round((currentStep / lessonSteps) * 80); // 80% for chat, 20% for quiz

  // Build quiz questions for this skill
  const availableQuestions = useMemo(() => {
    if (!skill) return [];
    const skillQuestions = demoQuestions.filter((q) => q.skillId === skillId);
    // Shuffle and take 3
    const shuffled = [...skillQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map((raw) => ({
      raw,
      display: toDisplayQuestion(raw, skill, language),
    }));
  }, [skillId, skill, language]);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getGreeting = useCallback((lang: string) => {
    if (!skill) return '';
    return lang === 'zh'
      ? `你好！让我们一起学习"${skill.displayName}"。根据你的诊断结果，这是一个可以提高的领域。你对这个技能了解多少？`
      : `Hi! Let's work on "${skill.displayName}". Based on your diagnostic, this is an area we can improve together. What do you already know about this skill?`;
  }, [skill]);

  useEffect(() => {
    if (!skill || hasStartedRef.current) return;
    hasStartedRef.current = true;
    setMessages([{ role: 'assistant', content: getGreeting(language) }]);
  }, [skill, language, getGreeting]);

  useEffect(() => {
    if (prevLanguageRef.current !== language && messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: getGreeting(language) }]);
    }
    prevLanguageRef.current = language;
  }, [language, messages, getGreeting]);

  const sendMessage = async (content: string) => {
    if (!skill || isStreaming) return;

    const userMessage: Message = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          skillId: skill.id,
          skillName: skill.displayName,
          topic: skill.topic,
          difficulty: skill.difficulty,
          language,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Chat request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + text };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === 'assistant' && !last.content) {
          updated[updated.length - 1] = {
            ...last,
            content: language === 'zh'
              ? '抱歉，出现了错误。请检查API密钥是否已设置，然后重试。'
              : 'Sorry, something went wrong. Please check that the API key is set and try again.',
          };
        }
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const startQuiz = () => {
    setQuizQuestions(availableQuestions);
    setQuizIndex(0);
    setQuizResults([]);
    setQuizComplete(false);
    setQuizMode(true);
  };

  const handleQuizAnswer = (answer: string | string[]) => {
    const current = quizQuestions[quizIndex];
    if (!current) return;

    const answerStr = Array.isArray(answer) ? answer[0] : answer;
    const label = extractAnswerLabel(answerStr);
    const isCorrect = label === current.raw.correctAnswer;
    const newResults = [...quizResults, isCorrect];
    setQuizResults(newResults);
    setQuizFeedback(isCorrect);

    // Show feedback for 1.2s before advancing
    setTimeout(() => {
      setQuizFeedback(null);
      if (quizIndex + 1 >= quizQuestions.length) {
        setQuizComplete(true);
      } else {
        setQuizIndex(quizIndex + 1);
      }
    }, 1200);
  };

  const handleBackToLesson = () => {
    setQuizMode(false);
    setQuizComplete(false);
    // Add a review hint from the AI
    const reviewMsg: Message = {
      role: 'assistant',
      content: language === 'zh'
        ? `看起来有些地方还需要再理解一下。没关系！让我换一种方式来解释"${skill?.displayName}"。你觉得哪个部分最困惑？`
        : `Looks like some parts need a bit more review. No worries! Let me explain "${skill?.displayName}" from a different angle. Which part felt the trickiest?`,
    };
    setMessages((prev) => [...prev, reviewMsg]);
  };

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">{t('lesson.skillNotFound')}</p>
          <button onClick={() => router.push('/results')} className="text-[#ff6b35] hover:underline">
            {t('lesson.backToResults')}
          </button>
        </div>
      </div>
    );
  }

  const skillResult = diagnosticResult?.skills.find((s) => s.skillId === skillId);
  const correctCount = quizResults.filter(Boolean).length;
  const passed = correctCount >= 2;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Lesson Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-4 py-3"
      >
        <div className="container mx-auto max-w-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => router.push('/results')}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ff6b35]" />
                <h1 className="font-semibold text-gray-900 truncate">{skill.displayName}</h1>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{skill.topic}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{skill.difficulty}</span>
                {skillResult && (
                  <span className="text-xs text-[#ff6b35] bg-orange-50 px-2 py-0.5 rounded">
                    {Math.round(skillResult.accuracy * 100)}% {t('common.accuracy')}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-[#ff6b35] bg-orange-50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {quizMode ? t('lesson.quickCheck') : t('lesson.title')}
          </span>
        </div>

        {/* Lesson progress bar */}
        <div className="container mx-auto max-w-2xl mt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b35] to-orange-400"
                animate={{ width: `${lessonProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {!quizMode && (
              <span className="text-[10px] text-gray-400 flex-shrink-0">
                {t('lesson.stepProgress').replace('{current}', String(currentStep)).replace('{total}', String(lessonSteps))}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ─── QUIZ MODE ─────────────────────────────────────────────────── */}
      {quizMode ? (
        <div className="flex-1 flex flex-col">
          <div className="container mx-auto max-w-2xl px-4 py-6 flex-1">
            {!quizComplete ? (
              <>
                {/* Quiz progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#ff6b35]" />
                      {t('lesson.quickCheck')}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {t('lesson.questionOf')
                        .replace('{current}', String(quizIndex + 1))
                        .replace('{total}', String(quizQuestions.length))}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {quizQuestions.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-colors ${
                          i < quizResults.length
                            ? quizResults[i]
                              ? 'bg-green-500'
                              : 'bg-red-400'
                            : i === quizIndex
                              ? 'bg-[#ff6b35]'
                              : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quiz feedback flash */}
                <AnimatePresence>
                  {quizFeedback !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl mb-4 font-semibold ${
                        quizFeedback
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                      }`}
                    >
                      {quizFeedback ? (
                        <><CheckCircle className="w-5 h-5" /> {t('lesson.quizCorrect')}</>
                      ) : (
                        <><XCircle className="w-5 h-5" /> {t('lesson.quizTryAgain')}</>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Current question */}
                {quizFeedback === null && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={quizIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <QuestionCard
                        question={quizQuestions[quizIndex].display}
                        questionNumber={quizIndex + 1}
                        onSubmit={handleQuizAnswer}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            ) : (
              /* Quiz results */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto mt-8"
              >
                <div className={`rounded-2xl p-8 text-center ${passed ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
                  <div className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center ${passed ? 'bg-green-100' : 'bg-orange-100'}`}>
                    {passed ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <RotateCcw className="w-8 h-8 text-[#ff6b35]" />
                    )}
                  </div>

                  <h2 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-800' : 'text-orange-800'}`}>
                    {passed ? t('lesson.passTitle') : t('lesson.failTitle')}
                  </h2>
                  <p className={`text-sm mb-2 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
                    {passed ? t('lesson.passDesc') : t('lesson.failDesc')}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {t('lesson.score')
                      .replace('{correct}', String(correctCount))
                      .replace('{total}', String(quizQuestions.length))}
                  </p>

                  {/* Result indicators */}
                  <div className="flex justify-center gap-2 mb-8">
                    {quizResults.map((correct, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          correct ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {correct ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>

                  {passed ? (
                    <button
                      onClick={() => router.push(`/practice?skill=${skillId}`)}
                      className="w-full py-3 bg-[#ff6b35] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors"
                    >
                      <Target className="w-5 h-5" />
                      {t('lesson.startPractice')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleBackToLesson}
                      className="w-full py-3 bg-[#1a3a52] text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#152e42] transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      {t('lesson.backToLesson')}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        /* ─── CHAT MODE ──────────────────────────────────────────────── */
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto max-w-2xl px-4 py-6 space-y-4">
              {messages.map((msg, i) => {
                // Show encouragement chip after every 2nd user message
                const userMsgIndex = messages.slice(0, i + 1).filter((m) => m.role === 'user').length;
                const showEncouragement = msg.role === 'user' && userMsgIndex > 0 && userMsgIndex % 2 === 0;

                const encouragements = [
                  { text: t('lesson.encouragement1'), icon: '🔥' },
                  { text: t('lesson.encouragement2'), icon: '💪' },
                  { text: t('lesson.encouragement3'), icon: '⚡' },
                  { text: t('lesson.encouragement4'), icon: '🧠' },
                ];
                const encouragement = encouragements[(Math.floor(userMsgIndex / 2) - 1) % encouragements.length];

                return (
                  <div key={i}>
                    {showEncouragement && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-center mb-2"
                      >
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-[#ff6b35] rounded-full text-xs font-semibold border border-orange-100">
                          {encouragement.icon} {encouragement.text}
                        </span>
                      </motion.div>
                    )}
                    <ChatMessage
                      role={msg.role}
                      content={msg.content}
                      isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
                    />
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Check Understanding prompt */}
          <AnimatePresence>
            {showQuizPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="border-t border-gray-200 bg-gradient-to-r from-[#ff6b35]/5 to-orange-50"
              >
                <div className="container mx-auto max-w-2xl px-4 py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Zap className="w-4 h-4 text-[#ff6b35] flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{t('lesson.readyToTest')}</span>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="px-4 py-2 bg-[#ff6b35] text-white rounded-lg text-sm font-semibold hover:bg-[#e55a2a] transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    {t('lesson.checkUnderstanding')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Input */}
          <div className="container mx-auto max-w-2xl">
            <ChatInput
              onSend={sendMessage}
              disabled={isStreaming}
              placeholder={t('lesson.placeholder')}
              language={language}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <LessonContent />
    </Suspense>
  );
}
