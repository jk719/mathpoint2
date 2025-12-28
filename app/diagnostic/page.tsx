'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function SATDiagnosticPage() {
  const [isStarting, setIsStarting] = useState(false);

  const startDiagnostic = () => {
    setIsStarting(true);
    // TODO: Initialize diagnostic session and navigate to first question
    setTimeout(() => {
      setIsStarting(false);
      alert('Diagnostic questions will be available once you import them into data/sat-questions.ts');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            SAT Math Diagnostic
          </h1>
          <p className="text-lg text-gray-600">
            Identify your weak skills in 15-20 minutes
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[#ff6b35]"
        >
          <div className="p-8">
            {/* Stats Row */}
            <div className="flex justify-center gap-8 mb-10 pb-8 border-b border-gray-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-2xl font-bold text-gray-900">15-20</span>
                </div>
                <span className="text-sm text-gray-500">minutes</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#1a3a52]" />
                  <span className="text-2xl font-bold text-gray-900">Adaptive</span>
                </div>
                <span className="text-sm text-gray-500">questions</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 text-[#ff6b35]" />
                  <span className="text-2xl font-bold text-gray-900">Free</span>
                </div>
                <span className="text-sm text-gray-500">report</span>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="mb-10">
              <h3 className="font-semibold text-gray-900 mb-4">What you'll get:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Skill-by-skill breakdown of your strengths and weaknesses</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Personalized practice recommendations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#ff6b35] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Questions adapt to your level as you go</span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startDiagnostic}
              disabled={isStarting}
              className="w-full py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isStarting ? (
                'Starting...'
              ) : (
                <>
                  Start Diagnostic
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              No account required. Results saved automatically.
            </p>
          </div>
        </motion.div>

        {/* Topics Covered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h3 className="text-sm font-medium text-gray-500 mb-4 text-center uppercase tracking-wide">
            Topics Covered
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {['Algebra', 'Problem Solving', 'Advanced Math', 'Geometry'].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
