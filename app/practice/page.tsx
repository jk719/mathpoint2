'use client';

import { Suspense, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  ArrowRight,
  TrendingUp,
  BookOpen,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { usePracticeStore } from '@/lib/stores/practiceStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { QuestionCard } from '@/components/diagnostic/QuestionCard';

function PracticeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { diagnosticResult } = useDiagnosticStore();
  const { t, language } = useTranslation();

  const {
    phase,
    targetSkillId,
    targetSkillName,
    currentQuestion,
    questionNumber,
    responses,
    initialMastery,
    currentMastery,
    lastAnswerCorrect,
    startPractice,
    submitAnswer,
    reset,
  } = usePracticeStore();

  const hasResults = !!diagnosticResult;
  const skillParam = searchParams.get('skill');

  // Auto-start practice if skill param is present and we're idle
  useEffect(() => {
    if (skillParam && phase === 'idle') {
      startPractice(skillParam, language);
    }
  }, [skillParam, phase, startPractice, language]);

  const handleSubmit = useCallback(
    (answer: string | string[]) => {
      submitAnswer(answer, language);
    },
    [submitAnswer, language]
  );

  const handlePracticeSkill = useCallback(
    (skillId: string) => {
      reset();
      router.push(`/practice?skill=${skillId}`);
    },
    [reset, router]
  );

  // Build skills list from diagnostic results
  const skills = hasResults
    ? [...(diagnosticResult.recommended ?? []), ...(diagnosticResult.weaknesses ?? [])]
        .filter((s, i, arr) => arr.findIndex((x) => x.skillId === s.skillId) === i)
        .map((s) => ({
          id: s.skillId,
          displayName: s.displayName,
          topic: s.topic,
          mastery: Math.round(s.accuracy * 100),
          status: s.status,
          questionsAttempted: s.questionsAttempted,
        }))
    : [];

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 70) return 'bg-green-500';
    if (mastery >= 50) return 'bg-[#ff6b35]';
    return 'bg-red-500';
  };

  // ─── ACTIVE PHASE: Answering practice questions ───────────────────────────

  if (phase === 'active' && currentQuestion) {
    const correctCount = responses.filter((r) => r.isCorrect).length;
    const maxQuestions = 10;

    return (
      <div className="min-h-screen bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => { reset(); router.push('/practice'); }}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('practice.backToSkills')}
            </button>

            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  {targetSkillName}
                </h1>
                <p className="text-sm text-gray-500">
                  {t('practice.questionProgress')
                    .replace('{current}', String(questionNumber))
                    .replace('{total}', String(maxQuestions))
                    .replace('{correct}', String(correctCount))}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{currentMastery}%</div>
                <div className="text-xs text-gray-500">{t('practice.mastery')}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <motion.div
                className="h-full rounded-full bg-[#ff6b35]"
                initial={{ width: 0 }}
                animate={{ width: `${(questionNumber / maxQuestions) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Mastery bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-16">{t('practice.mastery')}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className={`h-full rounded-full ${getMasteryColor(currentMastery)}`}
                  animate={{ width: `${currentMastery}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{currentMastery}%</span>
            </div>
          </motion.div>

          {/* Feedback flash */}
          <AnimatePresence>
            {lastAnswerCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg mb-4 text-sm font-medium ${
                  lastAnswerCorrect
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {lastAnswerCorrect ? (
                  <><CheckCircle className="w-4 h-4" /> {t('practice.correctBadge')}</>
                ) : (
                  <><XCircle className="w-4 h-4" /> {t('practice.incorrectBadge')}</>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={questionNumber}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  }

  // ─── COMPLETE PHASE: Practice results ─────────────────────────────────────

  if (phase === 'complete') {
    const totalQuestions = responses.length;
    const correctCount = responses.filter((r) => r.isCorrect).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const improved = currentMastery > initialMastery;
    const masteryGain = currentMastery - initialMastery;

    return (
      <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            {/* Icon */}
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
              currentMastery >= 85 ? 'bg-green-100' : 'bg-[#ff6b35]/10'
            }`}>
              {currentMastery >= 85 ? (
                <Sparkles className="w-8 h-8 text-green-600" />
              ) : (
                <TrendingUp className="w-8 h-8 text-[#ff6b35]" />
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentMastery >= 85 ? t('practice.skillMastered') : t('practice.practiceComplete')}
            </h1>
            <p className="text-gray-500 mb-8">
              {targetSkillName}
            </p>

            {/* Before / After */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">{initialMastery}%</div>
                <div className="text-xs text-gray-400 mt-1">{t('practice.before')}</div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300" />
              <div className="text-center">
                <div className={`text-3xl font-bold ${currentMastery >= 85 ? 'text-green-600' : 'text-[#ff6b35]'}`}>
                  {currentMastery}%
                </div>
                <div className="text-xs text-gray-500 mt-1">{t('practice.after')}</div>
              </div>
            </div>

            {/* Improvement badge */}
            {improved && (
              <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                +{masteryGain}% improvement
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{totalQuestions}</div>
                <div className="text-xs text-gray-500">{t('practice.questionsLabel')}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{correctCount}</div>
                <div className="text-xs text-gray-500">{t('practice.correctLabel')}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-bold text-gray-900">{accuracy}%</div>
                <div className="text-xs text-gray-500">{t('common.accuracy')}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {targetSkillId && currentMastery < 85 && (
                <button
                  onClick={() => handlePracticeSkill(targetSkillId)}
                  className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('practice.continuePracticing')}
                </button>
              )}
              <button
                onClick={() => { reset(); router.push('/practice'); }}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Target className="w-4 h-4" />
                {t('practice.practiceAnother')}
              </button>
              <button
                onClick={() => router.push('/results')}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                {t('practice.viewFullResults')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── IDLE PHASE: Skill selection ──────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('practice.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('practice.subtitle')}
          </p>
        </motion.div>

        {/* Take Diagnostic Prompt */}
        {!hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-[#ff6b35]"
          >
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-[#ff6b35] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{t('practice.takeDiagnosticFirst')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('practice.takeDiagnosticDesc')}
                </p>
                <button
                  onClick={() => router.push('/diagnostic')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors"
                >
                  {t('practice.takeDiagnostic')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills to Practice */}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('practice.skillsToPractice')}</h2>
              <span className="text-sm text-gray-500">
                {t('practice.skillsToImprove').replace('{count}', String(skills.length))}
              </span>
            </div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-gray-900 truncate">{skill.displayName}</h3>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                          {skill.topic}
                        </span>
                        {skill.status === 'WEAK' && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full flex-shrink-0">
                            {t('common.weak')}
                          </span>
                        )}
                        {skill.status === 'DEVELOPING' && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full flex-shrink-0">
                            {t('common.developing')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4" />
                          <span>{skill.mastery}% {t('practice.accuracyLabel')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{skill.questionsAttempted} {t('practice.attempted')}</span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full ${getMasteryColor(skill.mastery)}`}
                          style={{ width: `${skill.mastery}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handlePracticeSkill(skill.id)}
                      className="ml-4 px-4 py-2 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors flex-shrink-0 flex items-center gap-1.5"
                    >
                      <Target className="w-4 h-4" />
                      Practice
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!hasResults && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {t('practice.emptyState')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PracticeLoading() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-gray-500">{t('practice.loading')}</div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<PracticeLoading />}>
      <PracticeContent />
    </Suspense>
  );
}
