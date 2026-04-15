'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  RotateCcw,
  Target,
  Clock,
  Award,
} from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { SkillResult } from '@/lib/diagnostic/DiagnosticScorer';
import { useTranslation } from '@/lib/i18n/LanguageContext';

function StatusBadge({ status, t }: { status: string; t: (key: string) => string }) {
  const config: Record<string, { bg: string; text: string; labelKey: string }> = {
    MASTERED: { bg: 'bg-green-100', text: 'text-green-700', labelKey: 'common.mastered' },
    DEVELOPING: { bg: 'bg-orange-100', text: 'text-[#ff6b35]', labelKey: 'common.developing' },
    WEAK: { bg: 'bg-red-100', text: 'text-red-700', labelKey: 'common.weak' },
    INSUFFICIENT_DATA: { bg: 'bg-gray-100', text: 'text-gray-500', labelKey: 'common.notEnoughData' },
  };
  const c = config[status] ?? config.INSUFFICIENT_DATA;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {t(c.labelKey)}
    </span>
  );
}

function AccuracyBar({ accuracy, questionsCorrect, questionsAttempted }: {
  accuracy: number;
  questionsCorrect: number;
  questionsAttempted: number;
}) {
  const pct = Math.round(accuracy * 100);
  const color = pct >= 85 ? 'bg-green-500' : pct >= 50 ? 'bg-[#ff6b35]' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <span className="text-sm text-gray-600 w-20 text-right">
        {questionsCorrect}/{questionsAttempted} ({pct}%)
      </span>
    </div>
  );
}

function SkillCard({ skill, index, t }: { skill: SkillResult; index: number; t: (key: string) => string }) {
  const borderColor =
    skill.status === 'MASTERED' ? 'border-l-green-500' :
    skill.status === 'DEVELOPING' ? 'border-l-[#ff6b35]' :
    skill.status === 'WEAK' ? 'border-l-red-500' :
    'border-l-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
      className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-l-4 ${borderColor}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{skill.displayName}</h4>
          <div className="flex gap-2 mt-1">
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
              {skill.topic}
            </span>
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
              {skill.difficulty}
            </span>
          </div>
        </div>
        <StatusBadge status={skill.status} t={t} />
      </div>
      <AccuracyBar
        accuracy={skill.accuracy}
        questionsCorrect={skill.questionsCorrect}
        questionsAttempted={skill.questionsAttempted}
      />
    </motion.div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const { diagnosticResult, reset } = useDiagnosticStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (!diagnosticResult) {
      router.push('/diagnostic');
    }
  }, [diagnosticResult, router]);

  if (!diagnosticResult) return null;

  const {
    totalQuestions,
    correctCount,
    accuracy,
    totalTimeMs,
    skills,
    strengths,
    weaknesses,
    recommended,
    sections,
  } = diagnosticResult;

  const minutes = Math.floor(totalTimeMs / 60000);
  const seconds = Math.floor((totalTimeMs % 60000) / 1000);
  const pct = Math.round(accuracy * 100);

  // Group skills by topic for the breakdown — exclude skills with no data
  const assessedSkills = skills.filter((s) => s.status !== 'INSUFFICIENT_DATA');
  const byTopic = assessedSkills.reduce<Record<string, SkillResult[]>>((acc, s) => {
    (acc[s.topic] ??= []).push(s);
    return acc;
  }, {});

  const handleRetake = () => {
    reset();
    router.push('/diagnostic');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 sm:py-14">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* ─── Score Hero ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35] p-8 mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            {t('results.title')}
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
              className="text-center"
            >
              {/* Accuracy ring */}
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${pct * 2.64} 264`}
                    initial={{ strokeDasharray: '0 264' }}
                    animate={{ strokeDasharray: `${pct * 2.64} 264` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{pct}%</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{t('common.accuracy')}</span>
            </motion.div>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-[#1a3a52]" />
                <div>
                  <span className="font-bold text-gray-900">{correctCount}/{totalQuestions}</span>
                  <span className="text-sm text-gray-500 ml-1">{t('common.correct')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#1a3a52]" />
                <div>
                  <span className="font-bold text-gray-900">{minutes}m {seconds}s</span>
                  <span className="text-sm text-gray-500 ml-1">{t('common.totalTime')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-[#1a3a52]" />
                <div>
                  <span className="font-bold text-gray-900">{assessedSkills.length}</span>
                  <span className="text-sm text-gray-500 ml-1">{t('common.skillsAssessed')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Mastery Overview ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{strengths.length}</div>
            <div className="text-sm text-green-600 mt-1">{t('common.mastered')}</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-[#ff6b35]">
              {weaknesses.filter((w) => w.status === 'DEVELOPING').length}
            </div>
            <div className="text-sm text-orange-600 mt-1">{t('common.developing')}</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-700">
              {weaknesses.filter((w) => w.status === 'WEAK').length}
            </div>
            <div className="text-sm text-red-600 mt-1">{t('common.needsWork')}</div>
          </div>
        </motion.div>

        {/* ─── Section Breakdown ───────────────────────────────── */}
        {sections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('results.byTopic')}</h2>
            <div className="space-y-4">
              {sections.map((section) => {
                const sectionPct = Math.round(section.overallAccuracy * 100);
                return (
                  <div key={section.sectionId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-medium text-gray-800">{section.sectionName}</span>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="text-green-600">{section.masteredCount} {t('common.mastered').toLowerCase()}</span>
                        <span>{sectionPct}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          sectionPct >= 70 ? 'bg-green-500' : sectionPct >= 40 ? 'bg-[#ff6b35]' : 'bg-red-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${sectionPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Strengths ──────────────────────────────────────── */}
        {strengths.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {t('results.strengths')}
            </h2>
            <div className="space-y-2">
              {strengths.map((s) => (
                <div
                  key={s.skillId}
                  className="flex items-center justify-between py-2 px-3 bg-white/60 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">{s.displayName}</span>
                    <span className="text-xs text-gray-500 ml-2">{s.topic}</span>
                  </div>
                  <span className="text-sm font-semibold text-green-700">
                    {Math.round(s.accuracy * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Areas to Improve ───────────────────────────────── */}
        {weaknesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {t('results.areasToImprove')}
            </h2>
            <div className="space-y-2">
              {weaknesses.map((w) => (
                <div
                  key={w.skillId}
                  className="flex items-center justify-between py-2 px-3 bg-white/60 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">{w.displayName}</span>
                    <span className="text-xs text-gray-500 ml-2">{w.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => router.push(`/lesson?skill=${w.skillId}`)}
                      className="text-xs px-3 py-1 bg-[#ff6b35] text-white rounded-full font-medium hover:bg-[#e55a2a] transition-colors"
                    >
                      {t('lesson.startLesson')}
                    </button>
                    <StatusBadge status={w.status} t={t} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Skill-by-Skill Breakdown ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('results.skillBreakdown')}</h2>
          {Object.entries(byTopic).map(([topic, topicSkills]) => (
            <div key={topic} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {topic}
              </h3>
              <div className="space-y-3">
                {topicSkills.map((skill, i) => (
                  <SkillCard key={skill.skillId} skill={skill} index={i} t={t} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ─── Recommended Practice Path ──────────────────────── */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#ff6b35]" />
              {t('results.recommendedPath')}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {t('results.recommendedDesc')}
            </p>
            <div className="space-y-3">
              {recommended.map((skill, i) => (
                <div
                  key={skill.skillId}
                  className="flex items-center gap-4 py-3 px-4 rounded-lg bg-gray-50"
                >
                  <div className="w-7 h-7 rounded-full bg-[#ff6b35] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">{skill.displayName}</span>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-xs text-gray-500">{skill.topic}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">{skill.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/lesson?skill=${skill.skillId}`)}
                    className="text-xs px-3 py-1.5 bg-[#ff6b35] text-white rounded-lg font-medium hover:bg-[#e55a2a] transition-colors flex-shrink-0"
                  >
                    {t('lesson.startLesson')}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── CTAs ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={() => router.push('/practice')}
            className="flex-1 py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {t('results.startPracticing')}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push('/session/join')}
            className="flex-1 py-4 bg-[#1a3a52] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#152e42] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {t('session.bookSession')}
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleRetake}
            className="flex-1 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {t('results.retakeDiagnostic')}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
