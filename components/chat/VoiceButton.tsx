'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface VoiceButtonProps {
  isListening: boolean;
  isCompact: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function VoiceButton({ isListening, isCompact, disabled, onClick }: VoiceButtonProps) {
  const { t } = useTranslation();
  const speakLabel = t('lesson.voiceSpeak');
  const stopLabel = t('lesson.voiceStop');

  if (isListening) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="relative w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 flex-shrink-0"
        title={stopLabel}
      >
        {/* Animated pulse rings */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-red-400"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-red-400"
          animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        />

        {/* Animated sound bars */}
        <div className="relative z-10 flex items-center gap-[3px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-white"
              animate={{
                height: ['8px', `${12 + Math.random() * 8}px`, '6px', `${10 + Math.random() * 10}px`, '8px'],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </button>
    );
  }

  // Not listening — show mic icon
  if (isCompact) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-10 h-10 rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 hover:text-gray-600 transition-all disabled:opacity-50 flex-shrink-0"
        title={speakLabel}
      >
        <MicIcon className="w-4 h-4" />
      </button>
    );
  }

  // Not listening, not compact — prominent button
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="h-10 px-4 rounded-xl bg-[#1a3a52] text-white flex items-center justify-center gap-2 hover:bg-[#152e42] transition-colors disabled:opacity-50 flex-shrink-0"
      title={speakLabel}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MicIcon className="w-4 h-4" />
      </motion.div>
      <span className="text-xs font-semibold">{speakLabel}</span>
    </motion.button>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
