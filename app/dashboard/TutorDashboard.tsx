'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Video, Calendar, TrendingUp, ArrowRight, X, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface MockStudent {
  name: string;
  mastery: number;
  lastActive: string;
  status: string;
  skills: { name: string; mastery: number; status: string }[];
  activity: { action: string; detail: string; time: string }[];
  sessionsCompleted: number;
  diagnosticsCompleted: number;
}

const MOCK_STUDENTS: MockStudent[] = [
  {
    name: 'Emma W.', mastery: 67, lastActive: '2h ago', status: 'active',
    skills: [
      { name: 'Rice Spreading', mastery: 90, status: 'mastered' },
      { name: 'Rolling Technique', mastery: 72, status: 'developing' },
      { name: 'Filling Placement', mastery: 55, status: 'developing' },
      { name: 'Precision Cutting', mastery: 35, status: 'weak' },
    ],
    activity: [
      { action: 'Completed diagnostic', detail: 'Maki Rolls', time: '2h ago' },
      { action: 'AI Lesson', detail: 'Rolling Technique', time: '1d ago' },
      { action: 'Live Session', detail: 'with you', time: '3d ago' },
    ],
    sessionsCompleted: 5, diagnosticsCompleted: 3,
  },
  {
    name: 'James L.', mastery: 45, lastActive: '1d ago', status: 'needs-help',
    skills: [
      { name: 'Nori Orientation', mastery: 80, status: 'mastered' },
      { name: 'Rice-Outside Technique', mastery: 40, status: 'weak' },
      { name: 'Topping Application', mastery: 30, status: 'weak' },
      { name: 'Cone Shaping', mastery: 50, status: 'developing' },
    ],
    activity: [
      { action: 'Struggled with', detail: 'Uramaki basics', time: '1d ago' },
      { action: 'Completed diagnostic', detail: 'Uramaki Rolls', time: '2d ago' },
      { action: 'Missed session', detail: 'scheduled for Monday', time: '4d ago' },
    ],
    sessionsCompleted: 2, diagnosticsCompleted: 2,
  },
  {
    name: 'Sofia R.', mastery: 82, lastActive: '3h ago', status: 'active',
    skills: [
      { name: 'Rice Spreading', mastery: 95, status: 'mastered' },
      { name: 'Filling Balance', mastery: 88, status: 'mastered' },
      { name: 'Structural Integrity', mastery: 75, status: 'developing' },
      { name: 'Advanced Presentation', mastery: 60, status: 'developing' },
    ],
    activity: [
      { action: 'AI Lesson', detail: 'Presentation techniques', time: '3h ago' },
      { action: 'Completed diagnostic', detail: 'All topics', time: '1d ago' },
      { action: 'Live Session', detail: 'with you', time: '2d ago' },
    ],
    sessionsCompleted: 8, diagnosticsCompleted: 4,
  },
  {
    name: 'Alex K.', mastery: 31, lastActive: '5d ago', status: 'inactive',
    skills: [
      { name: 'Nori Orientation', mastery: 60, status: 'developing' },
      { name: 'Rice Spreading', mastery: 25, status: 'weak' },
      { name: 'Rolling Technique', mastery: 20, status: 'weak' },
      { name: 'Filling Placement', mastery: 15, status: 'weak' },
    ],
    activity: [
      { action: 'Started diagnostic', detail: 'abandoned after 3 questions', time: '5d ago' },
      { action: 'Signed up', detail: 'new student', time: '1w ago' },
    ],
    sessionsCompleted: 0, diagnosticsCompleted: 1,
  },
];

const MOCK_SESSIONS = [
  { student: 'Emma W.', topic: 'Uramaki Technique', time: 'Today, 4:00 PM', status: 'upcoming' },
  { student: 'James L.', topic: 'Maki Fundamentals', time: 'Tomorrow, 10:00 AM', status: 'upcoming' },
  { student: 'Group Session', topic: 'Temaki Workshop', time: 'Fri, 2:00 PM', status: 'upcoming' },
];

export function TutorDashboard({ name }: { name: string }) {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedStudent, setSelectedStudent] = useState<MockStudent | null>(null);

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-100 text-green-700';
    if (status === 'needs-help') return 'bg-orange-100 text-[#ff6b35]';
    return 'bg-gray-100 text-gray-500';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'active') return t('tutorDash.active');
    if (status === 'needs-help') return t('tutorDash.needsHelp');
    return t('tutorDash.inactive');
  };

  const getSkillColor = (mastery: number) => {
    if (mastery >= 80) return 'bg-green-500';
    if (mastery >= 50) return 'bg-[#ff6b35]';
    return 'bg-red-400';
  };

  const getSkillLabel = (status: string) => {
    if (status === 'mastered') return { bg: 'bg-green-100', text: 'text-green-700', label: t('common.mastered') };
    if (status === 'developing') return { bg: 'bg-orange-100', text: 'text-[#ff6b35]', label: t('common.developing') };
    return { bg: 'bg-red-100', text: 'text-red-700', label: t('common.weak') };
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{t('auth.welcome')}, {name}</h1>
        <p className="text-gray-600">{t('tutorDash.subtitle')}</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Users className="w-5 h-5 text-blue-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">4</div><div className="text-sm text-gray-500">{t('tutorDash.totalStudents')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5 text-[#ff6b35]" /></div>
            <div><div className="text-2xl font-bold text-gray-900">3</div><div className="text-sm text-gray-500">{t('tutorDash.upcomingSessions')}</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"><TrendingUp className="w-5 h-5 text-green-600" /></div>
            <div><div className="text-2xl font-bold text-gray-900">56%</div><div className="text-sm text-gray-500">{t('tutorDash.avgMastery')}</div></div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Students List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('tutorDash.myStudents')}</h2>
          <div className="space-y-3">
            {MOCK_STUDENTS.map((student) => (
              <div key={student.name}>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#1a3a52] flex items-center justify-center text-white font-bold">
                    {student.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{student.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-[120px]">
                        <div className={`h-full rounded-full ${getSkillColor(student.mastery)}`} style={{ width: `${student.mastery}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{student.mastery}%</span>
                      <span className="text-xs text-gray-400">{student.lastActive}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(selectedStudent?.name === student.name ? null : student)}
                    className={`text-sm font-medium transition-colors ${
                      selectedStudent?.name === student.name ? 'text-[#1a3a52]' : 'text-[#ff6b35] hover:underline'
                    }`}
                  >
                    {selectedStudent?.name === student.name ? t('tutorDash.hide') : t('tutorDash.viewProfile')}
                  </button>
                </div>

                {/* Expanded Student Profile */}
                <AnimatePresence>
                  {selectedStudent?.name === student.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-14 mr-2 mt-1 mb-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#1a3a52] flex items-center justify-center text-white text-lg font-bold">
                              {student.name[0]}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{student.name}</h3>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>{student.diagnosticsCompleted} diagnostics</span>
                                <span>{student.sessionsCompleted} sessions</span>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => setSelectedStudent(null)} className="p-1 rounded hover:bg-gray-200">
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        {/* Mastery Ring */}
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                              <circle
                                cx="50" cy="50" r="40" fill="none"
                                stroke={student.mastery >= 70 ? '#22c55e' : student.mastery >= 40 ? '#ff6b35' : '#ef4444'}
                                strokeWidth="8" strokeLinecap="round"
                                strokeDasharray={`${student.mastery * 2.51} 251`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-900">{student.mastery}%</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Overall mastery across all assessed skills
                          </div>
                        </div>

                        {/* Skills Breakdown */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('dashboard.skillMastery')}</h4>
                          <div className="space-y-2">
                            {student.skills.map((skill) => {
                              const badge = getSkillLabel(skill.status);
                              return (
                                <div key={skill.name} className="flex items-center gap-3">
                                  <span className="text-sm text-gray-800 w-36 truncate">{skill.name}</span>
                                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                    <div className={`h-full rounded-full ${getSkillColor(skill.mastery)}`} style={{ width: `${skill.mastery}%` }} />
                                  </div>
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>{badge.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('parentDash.recentActivity')}</h4>
                          <div className="space-y-2">
                            {student.activity.map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                                <span className="text-gray-700">{item.action}: <span className="font-medium">{item.detail}</span></span>
                                <span className="text-gray-400 ml-auto">{item.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          onClick={() => router.push('/session/join')}
                          className="w-full py-2.5 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors flex items-center justify-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Start Session with {student.name.split(' ')[0]}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Sessions + Start */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('tutorDash.upcomingSessions')}</h2>
            <div className="space-y-3">
              {MOCK_SESSIONS.map((session, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">{session.student}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{session.topic}</div>
                  <div className="text-xs text-[#ff6b35] mt-1">{session.time}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => router.push('/session/join')}
            className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold shadow-lg hover:bg-[#e55a2a] transition-all flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            {t('tutorDash.startSession')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </>
  );
}
