'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, Award, ArrowRight, CheckCircle, Check } from 'lucide-react';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function DiagnosticPage() {
  const router = useRouter();
  const { t, language } = useTranslation();
  const {
    phase,
    currentQuestion,
    questionNumber,
    responses,
    startTime,
    diagnosticResult,
    startDiagnostic,
    submitAnswer,
    updateLanguage,
  } = useDiagnosticStore();

  const [isStarting, setIsStarting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Re-translate current question when language changes mid-diagnostic
  useEffect(() => {
    if (phase === 'active') {
      updateLanguage(language);
    }
  }, [language, phase, updateLanguage]);

  useEffect(() => {
    if (phase !== 'active' || !startTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, startTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      startDiagnostic(language);
      setIsStarting(false);
    }, 500);
  };

  // ─── Intro Phase ───────────────────────────────────────────────────────────

  if (phase === 'idle') {
    return (
      <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('diagnostic.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('diagnostic.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35]"
          >
            <div className="p-8">
              <div className="flex justify-center gap-8 mb-10 pb-8 border-b border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Clock className="w-4 h-4 text-[#ff6b35]" />
                    <span className="text-2xl font-bold text-gray-900">5-10</span>
                  </div>
                  <span className="text-sm text-gray-500">{t('common.minutes')}</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <TrendingUp className="w-4 h-4 text-[#1a3a52]" />
                    <span className="text-2xl font-bold text-gray-900">{t('common.adaptive')}</span>
                  </div>
                  <span className="text-sm text-gray-500">{t('common.questions')}</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Award className="w-4 h-4 text-[#ff6b35]" />
                    <span className="text-2xl font-bold text-gray-900">{t('diagnostic.detailed')}</span>
                  </div>
                  <span className="text-sm text-gray-500">{t('diagnostic.report')}</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-semibold text-gray-900 mb-4">{t('diagnostic.whatYouGet')}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('diagnostic.benefit1')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('diagnostic.benefit2')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{t('diagnostic.benefit3')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStart}
                disabled={isStarting}
                className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isStarting ? (
                  t('diagnostic.preparing')
                ) : (
                  <>
                    {t('diagnostic.startDiagnostic')}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                {t('diagnostic.noAccountNote')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h3 className="text-sm font-medium text-gray-500 mb-4 text-center uppercase tracking-wide">
              {t('diagnostic.topicsCovered')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {['Maki Rolls', 'Uramaki (Inside-Out)', 'Temaki (Hand Rolls)'].map((topic) => (
                <span key={topic} className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── Active Phase ──────────────────────────────────────────────────────────

  if (phase === 'active' && currentQuestion) {
    const progress = Math.min((questionNumber / 25) * 100, 95);

    return (
      <div className="min-h-screen bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {t('diagnostic.question')} {questionNumber}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {formatTime(elapsed)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#ff6b35] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={currentQuestion}
                questionNumber={questionNumber}
                onSubmit={(answer) => submitAnswer(answer, language)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // ─── Complete Phase ────────────────────────────────────────────────────────

  if (phase === 'complete') {
    const totalTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    return (
      <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35] p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              {t('diagnostic.complete')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 mb-8"
            >
              {t('diagnostic.answeredQuestions')
                .replace('{count}', String(responses.length))
                .replace('{minutes}', String(minutes))
                .replace('{seconds}', String(seconds))}
            </motion.p>

            {diagnosticResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-6 mb-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1a3a52]">
                    {Math.round(diagnosticResult.accuracy * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">{t('common.accuracy')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {diagnosticResult.strengths.length}
                  </div>
                  <div className="text-sm text-gray-500">{t('common.mastered')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#ff6b35]">
                    {diagnosticResult.weaknesses.length}
                  </div>
                  <div className="text-sm text-gray-500">{t('diagnostic.toImprove')}</div>
                </div>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={() => router.push('/results')}
              className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {t('diagnostic.viewResults')}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
