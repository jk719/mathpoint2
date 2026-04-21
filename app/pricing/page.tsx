'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { PricingCards } from '@/components/marketing/PricingCards';

export default function PricingPage() {
  const { t } = useTranslation();

  const faqs = [
    { q: t('pricing.faq1Q'), a: t('pricing.faq1A') },
    { q: t('pricing.faq2Q'), a: t('pricing.faq2A') },
    { q: t('pricing.faq3Q'), a: t('pricing.faq3A') },
    { q: t('pricing.faq4Q'), a: t('pricing.faq4A') },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1a3a52]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
              {t('pricing.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
            <p className="text-sm text-gray-400 mt-3">
              {t('pricing.annualNote')}
            </p>
          </motion.div>

          <PricingCards />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              {t('pricing.faqTitle')}
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
