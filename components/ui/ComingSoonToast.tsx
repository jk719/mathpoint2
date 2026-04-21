'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export function useComingSoon() {
  const [label, setLabel] = useState<string | null>(null);
  const { language } = useTranslation();

  const show = useCallback((feature: string) => {
    setLabel(feature);
    window.setTimeout(() => setLabel(null), 2500);
  }, []);

  const suffix = language === 'zh' ? ' — 即将推出' : ' — coming soon';

  const toast = (
    <AnimatePresence>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1a3a52] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-[#ff6b35]" />
          <span className="text-sm font-semibold">
            {label}
            {suffix}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { show, toast };
}
