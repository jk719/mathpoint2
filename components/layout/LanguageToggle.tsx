'use client';

import { useTranslation } from '@/lib/i18n/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
      aria-label="Toggle language"
    >
      <span className={language === 'en' ? 'text-white' : 'text-gray-400'}>EN</span>
      <span className="text-gray-500">|</span>
      <span className={language === 'zh' ? 'text-white' : 'text-gray-400'}>中文</span>
    </button>
  );
}
