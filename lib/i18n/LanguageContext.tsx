'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations, { Language } from './translations';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mathpoint-lang') as Language | null;
    if (saved === 'en' || saved === 'zh') {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('mathpoint-lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      const parts = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = translations[language];
      for (const part of parts) {
        value = value?.[part];
      }
      return typeof value === 'string' ? value : key;
    },
    [language]
  );

  // Prevent hydration mismatch by rendering children only after mount
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback for components rendered before LanguageProvider mounts
    return {
      language: 'en' as Language,
      toggleLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return ctx;
}
