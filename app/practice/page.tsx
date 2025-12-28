'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Target, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';

// Placeholder skill data - will be populated from diagnostic results
const mockWeakSkills = [
  {
    id: 'linear-eq-perp-lines',
    displayName: 'Perpendicular Lines',
    topic: 'Algebra',
    mastery: 30,
    questionsAvailable: 5,
  },
  {
    id: 'quadratic-vertex-form',
    displayName: 'Vertex Form of Quadratics',
    topic: 'Advanced Math',
    mastery: 40,
    questionsAvailable: 8,
  },
  {
    id: 'systems-substitution',
    displayName: 'Systems by Substitution',
    topic: 'Algebra',
    mastery: 25,
    questionsAvailable: 6,
  },
];

export default function PracticePage() {
  const router = useRouter();

  const startPractice = (skillId: string) => {
    alert(`Practice for skill ${skillId} will be available once questions are imported.`);
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 70) return 'bg-[#1a3a52]';
    if (mastery >= 50) return 'bg-[#1a3a52]/70';
    return 'bg-[#ff6b35]';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Practice
          </h1>
          <p className="text-lg text-gray-600">
            Focus on your weak skills with targeted practice
          </p>
        </motion.div>

        {/* Take Diagnostic Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-[#ff6b35]"
        >
          <div className="flex items-start gap-4">
            <Target className="w-6 h-6 text-[#ff6b35] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Take the Diagnostic First</h3>
              <p className="text-gray-600 text-sm mb-4">
                Complete the diagnostic to get personalized practice recommendations based on your weak skills.
              </p>
              <button
                onClick={() => router.push('/diagnostic')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg font-medium text-sm hover:bg-[#e55a2a] transition-colors"
              >
                Take Diagnostic
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skills to Practice */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Skills to Practice</h2>
            <span className="text-sm text-gray-500">Sample data</span>
          </div>

          <div className="space-y-4">
            {mockWeakSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{skill.displayName}</h3>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                        {skill.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        <span>{skill.mastery}% mastery</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>{skill.questionsAvailable} questions</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full ${getMasteryColor(skill.mastery)}`}
                        style={{ width: `${skill.mastery}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => startPractice(skill.id)}
                    className="ml-4 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex-shrink-0"
                  >
                    Practice
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
