'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Video, Users, UserCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export default function JoinSessionPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [roomName, setRoomName] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'tutor' | 'student'>('tutor');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!roomName.trim() || !name.trim()) {
      setError(t('session.fillAllFields'));
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const res = await fetch('/api/session/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomName: roomName.trim(),
          participantName: name.trim(),
          role,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || t('session.failedToCreate'));
        setIsJoining(false);
        return;
      }

      router.push(
        `/session?token=${encodeURIComponent(data.token)}&room=${encodeURIComponent(roomName.trim())}&name=${encodeURIComponent(name.trim())}`
      );
    } catch {
      setError(t('session.failedToConnect'));
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t('session.title')}
          </h1>
          <p className="text-gray-600">
            {t('session.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35] p-8"
        >
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole('tutor')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                role === 'tutor'
                  ? 'bg-[#1a3a52] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              {t('session.tutor')}
            </button>
            <button
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                role === 'student'
                  ? 'bg-[#1a3a52] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Users className="w-4 h-4" />
              {t('session.student')}
            </button>
          </div>

          {/* Room name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('session.roomName')}
            </label>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder={t('session.roomPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm"
            />
          </div>

          {/* Your name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t('session.yourName')}
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('session.namePlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm"
            />
          </div>

          {error && (
            <div className="mb-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Join button */}
          <button
            onClick={handleJoin}
            disabled={isJoining}
            className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isJoining ? (
              t('session.connecting')
            ) : (
              <>
                <Video className="w-5 h-5" />
                {role === 'tutor' ? t('session.createAndJoin') : t('session.joinSession')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          <p>{t('session.shareRoom')}</p>
        </motion.div>
      </div>
    </div>
  );
}
