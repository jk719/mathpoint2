'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Target, BookOpen, Award, ArrowRight, Flame, Sparkles, CheckCircle, Clock, Video, MessageCircle, Send } from 'lucide-react';
import { useDiagnosticStore } from '@/lib/stores/diagnosticStore';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS, MOCK_STUDENT_QUESTIONS } from '@/data/mock-assignments';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';
import { SubmitHomeworkForm } from '@/components/assignments/SubmitHomeworkForm';
import { QuestionThread } from '@/components/questions/QuestionThread';
import type { Submission, StudentQuestion } from '@/types/assignments';

const STUDENT_NAME = 'Emma W.';

const MOCK_SKILLS = [
  { skillId: 'pct-find-pct-easy', skill: 'Finding a Percent of a Number', topic: 'Percents', mastery: 92 },
  { skillId: 'pct-convert-frac-easy', skill: 'Fraction to Percent', topic: 'Percents', mastery: 85 },
  { skillId: 'pct-increase-word-medium', skill: 'Percent Increase Word Problems', topic: 'Percents', mastery: 68 },
  { skillId: 'pct-stacked-discount-medium', skill: 'Stacked Discounts', topic: 'Percents', mastery: 55 },
  { skillId: 'pct-successive-change-hard', skill: 'Successive Percent Changes', topic: 'Percents', mastery: 45 },
  { skillId: 'pct-markup-margin-hard', skill: 'Markup vs Margin', topic: 'Percents', mastery: 30 },
];

const MOCK_ACTIVITY = [
  { icon: CheckCircle, action: 'Completed diagnostic', detail: 'Percents', time: '2h ago', color: 'text-green-500' },
  { icon: Sparkles, action: 'AI Lesson', detail: 'Percent Increase', time: '1d ago', color: 'text-[#ff6b35]' },
  { icon: Video, action: 'Live Session', detail: 'with Tutor Sarah', time: '2d ago', color: 'text-blue-500' },
  { icon: Target, action: 'Practiced', detail: 'Stacked Discounts — 4 questions', time: '3d ago', color: 'text-purple-500' },
  { icon: CheckCircle, action: 'Completed diagnostic', detail: 'Percent Change', time: '5d ago', color: 'text-green-500' },
];

const MOCK_UPCOMING = [
  { title: 'Live Session with Tutor Sarah', time: 'Today, 4:00 PM', topic: 'Percent Change' },
  { title: 'Practice Reminder', time: 'Tomorrow', topic: 'Compound Discounts' },
];

export function StudentDashboard({ name }: { name: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const { diagnosticResult } = useDiagnosticStore();

  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [questions, setQuestions] = useState<StudentQuestion[]>(MOCK_STUDENT_QUESTIONS);
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newQuestionTopic, setNewQuestionTopic] = useState('');

  const hasResults = !!diagnosticResult;

  const points = hasResults ? (diagnosticResult.correctCount ?? 0) * 50 : 450;
  const skillsAssessed = hasResults ? (diagnosticResult.skills?.length ?? 0) : 12;
  const accuracy = hasResults ? Math.round((diagnosticResult.accuracy ?? 0) * 100) : 63;
  const streak = 5;

  const skillMastery = hasResults
    ? (diagnosticResult.skills ?? []).map((s) => ({
        skillId: s.skillId,
        skill: s.displayName,
        topic: s.topic,
        mastery: Math.round(s.accuracy * 100),
      }))
    : MOCK_SKILLS;

  const getProgressColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 50) return 'bg-[#ff6b35]';
    return 'bg-red-400';
  };

  const myAssignments = MOCK_ASSIGNMENTS.filter((a) => a.assignedStudents.includes(STUDENT_NAME));
  const myQuestions = questions.filter((q) => q.studentName === STUDENT_NAME);

  const handleSubmitHomework = (assignmentId: string, answer: string) => {
    const newSubmission: Submission = {
      id: `s-${Date.now()}`,
      assignmentId,
      studentName: STUDENT_NAME,
      submittedAt: 'Just now',
      answer,
    };
    setSubmissions((prev) => [...prev, newSubmission]);
    setExpandedAssignment(null);
  };

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    const q: StudentQuestion = {
      id: `q-${Date.now()}`,
      studentName: STUDENT_NAME,
      question: newQuestion.trim(),
      topic: newQuestionTopic || 'General',
      askedAt: 'Just now',
    };
    setQuestions((prev) => [q, ...prev]);
    setNewQuestion('');
    setNewQuestionTopic('');
    setShowAskQuestion(false);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('auth.welcome')}, {name}</h1>
        <p className="text-gray-600">{t('dashboard.subtitle')}</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1a3a52]/10 rounded-lg flex items-center justify-center flex-shrink-0"><Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a3a52]" /></div>
            <div className="min-w-0"><div className="text-lg sm:text-2xl font-bold text-gray-900">{points}</div><div className="text-xs sm:text-sm text-gray-500 truncate">{t('common.points')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0"><Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" /></div>
            <div className="min-w-0"><div className="text-lg sm:text-2xl font-bold text-gray-900">{streak}</div><div className="text-xs sm:text-sm text-gray-500 truncate">Day Streak</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /></div>
            <div className="min-w-0"><div className="text-lg sm:text-2xl font-bold text-gray-900">{accuracy}%</div><div className="text-xs sm:text-sm text-gray-500 truncate">{t('common.accuracy')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-5">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ff6b35]/10 rounded-lg flex items-center justify-center flex-shrink-0"><Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6b35]" /></div>
            <div className="min-w-0"><div className="text-lg sm:text-2xl font-bold text-gray-900">{skillsAssessed}</div><div className="text-xs sm:text-sm text-gray-500 truncate">{t('common.skillsAssessed')}</div></div>
          </div>
        </div>
      </motion.div>

      {/* My Assignments */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Assignments</h2>
        <div className="space-y-3">
          {myAssignments.map((assignment, i) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              submissions={submissions}
              role="student"
              studentName={STUDENT_NAME}
              index={i}
              onSubmit={() => setExpandedAssignment(assignment.id)}
              onToggle={() => setExpandedAssignment(expandedAssignment === assignment.id ? null : assignment.id)}
            >
              <AnimatePresence>
                {expandedAssignment === assignment.id && !submissions.find((s) => s.assignmentId === assignment.id && s.studentName === STUDENT_NAME) && (
                  <SubmitHomeworkForm
                    onSubmit={(answer) => handleSubmitHomework(assignment.id, answer)}
                    onCancel={() => setExpandedAssignment(null)}
                  />
                )}
              </AnimatePresence>
            </AssignmentCard>
          ))}
          {myAssignments.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No assignments yet</p>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">{t('dashboard.skillMastery')}</h2>
            <button onClick={() => router.push(hasResults ? '/results' : '/diagnostic')} className="text-sm text-[#ff6b35] hover:underline flex items-center gap-1">
              {hasResults ? t('dashboard.fullReport') : t('common.diagnostic')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {skillMastery.slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">{item.skill}</span>
                      <span className="text-xs text-gray-400">{item.topic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.mastery < 80 && (
                        <button
                          onClick={() => router.push(`/lesson?skill=${item.skillId}`)}
                          className="text-xs px-2.5 py-0.5 bg-[#ff6b35] text-white rounded-full font-medium hover:bg-[#e55a2a] transition-colors flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          Lesson
                        </button>
                      )}
                      <span className={`text-sm font-semibold ${item.mastery >= 80 ? 'text-green-600' : item.mastery >= 50 ? 'text-[#ff6b35]' : 'text-red-500'}`}>{item.mastery}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <motion.div
                      className={`h-full rounded-full ${getProgressColor(item.mastery)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.mastery}%` }}
                      transition={{ duration: 0.6, delay: 0.1 * i }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('dashboard.quickActions')}</h2>
            <div className="space-y-3">
              <button onClick={() => router.push('/diagnostic')} className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#e55a2a] transition-colors">
                <BookOpen className="w-4 h-4" />
                {hasResults ? t('dashboard.retakeDiagnostic') : t('dashboard.takeDiagnostic')}
              </button>
              <button
                onClick={() => {
                  const weakest = skillMastery.filter((s) => s.mastery < 80).sort((a, b) => a.mastery - b.mastery)[0];
                  router.push(weakest ? `/lesson?skill=${weakest.skillId}` : '/diagnostic');
                }}
                className="w-full py-3 px-4 bg-[#1a3a52] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#152e42] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                {t('lesson.startLesson')}
              </button>
              <button onClick={() => router.push('/practice')} className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <TrendingUp className="w-4 h-4" />
                {t('dashboard.practiceWeak')}
              </button>
              <button onClick={() => router.push('/session/join')} className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Video className="w-4 h-4" />
                {t('session.joinSession')}
              </button>
              <button onClick={() => setShowAskQuestion(true)} className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Ask a Question
              </button>
            </div>
          </motion.div>

          {/* Upcoming */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-3">
              {MOCK_UPCOMING.map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.topic}</div>
                  <div className="text-xs text-[#ff6b35] mt-1">{item.time}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {MOCK_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* My Questions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">My Questions</h2>
          <button
            onClick={() => setShowAskQuestion(!showAskQuestion)}
            className="text-sm text-[#ff6b35] hover:underline font-medium flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" />
            Ask New
          </button>
        </div>

        {/* Ask Question Form */}
        <AnimatePresence>
          {showAskQuestion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <input
                  type="text"
                  value={newQuestionTopic}
                  onChange={(e) => setNewQuestionTopic(e.target.value)}
                  placeholder="Topic (e.g., Percent Change)"
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
                />
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What's your question?"
                  rows={2}
                  className="w-full p-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#ff6b35] focus:ring-1 focus:ring-[#ff6b35]/20 bg-white"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => { setShowAskQuestion(false); setNewQuestion(''); setNewQuestionTopic(''); }} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleAskQuestion}
                    disabled={!newQuestion.trim()}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#ff6b35] rounded-lg hover:bg-[#e55a2a] transition-colors disabled:opacity-50 flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Post Question
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          {myQuestions.map((q, i) => (
            <QuestionThread key={q.id} question={q} role="student" index={i} />
          ))}
          {myQuestions.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">No questions yet. Ask your tutor anything!</p>
          )}
        </div>
      </motion.div>
    </>
  );
}
