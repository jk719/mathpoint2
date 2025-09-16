'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { GraduationCap, BookOpen, Calculator, Shapes, ArrowRight, Star } from 'lucide-react';

interface GradeLevel {
  grade: number;
  label: string;
  topics: string[];
  icon: React.ReactNode;
  color: string;
}

const gradeLevels: GradeLevel[] = [
  {
    grade: 6,
    label: 'Grade 6',
    topics: ['Pre-Algebra', 'Basic Equations', 'Number Systems'],
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
  },
  {
    grade: 7,
    label: 'Grade 7',
    topics: ['Pre-Algebra', 'Linear Equations', 'Ratios'],
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-purple-400 to-purple-600',
  },
  {
    grade: 8,
    label: 'Grade 8 - Algebra 1',
    topics: ['Algebra 1', 'Functions', 'Quadratics'],
    icon: <Shapes className="w-6 h-6" />,
    color: 'from-green-400 to-green-600',
  },
  {
    grade: 9,
    label: 'Grade 9 - Geometry',
    topics: ['Geometry', 'Proofs', 'Trigonometry Basics'],
    icon: <Star className="w-6 h-6" />,
    color: 'from-orange-400 to-orange-600',
  },
  {
    grade: 10,
    label: 'Grade 10 - Algebra 2',
    topics: ['Algebra 2', 'Advanced Functions', 'Polynomials'],
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-red-400 to-red-600',
  },
  {
    grade: 11,
    label: 'Grade 11',
    topics: ['Pre-Calculus', 'Advanced Trigonometry', 'Limits'],
    icon: <Calculator className="w-6 h-6" />,
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    grade: 12,
    label: 'Grade 12',
    topics: ['Calculus', 'Derivatives', 'Integrals'],
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
  },
];

export function GradeSelector() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const router = useRouter();

  const handleStartDiagnostic = () => {
    if (selectedGrade) {
      // Pass the grade as a query parameter
      router.push(`/diagnostic?grade=${selectedGrade}`);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Grade Level
        </h2>
        <p className="text-gray-600">
          Choose your current grade to get a personalized diagnostic assessment
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {gradeLevels.map((level, index) => (
          <motion.div
            key={level.grade}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onHoverStart={() => setIsHovering(level.grade)}
            onHoverEnd={() => setIsHovering(null)}
          >
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedGrade === level.grade
                  ? 'ring-2 ring-[#ff6b35] shadow-lg scale-105'
                  : 'hover:shadow-md hover:scale-102'
              }`}
              onClick={() => setSelectedGrade(level.grade)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    animate={{
                      scale: selectedGrade === level.grade ? 1.1 : 1,
                      rotate: isHovering === level.grade ? 10 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${level.color} flex items-center justify-center text-white mb-3`}
                  >
                    {level.icon}
                  </motion.div>

                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {level.label}
                  </h3>

                  <div className="space-y-1">
                    {level.topics.map((topic, i) => (
                      <p key={i} className="text-xs text-gray-600">
                        {topic}
                      </p>
                    ))}
                  </div>

                  {selectedGrade === level.grade && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3"
                    >
                      <div className="w-6 h-6 bg-[#ff6b35] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGrade && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <div className="text-left">
                <p className="text-sm text-gray-600 mb-1">
                  Selected: <span className="font-semibold">Grade {selectedGrade}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Diagnostic will focus on {gradeLevels.find(g => g.grade === selectedGrade)?.topics.join(', ')}
                </p>
              </div>

              <Button
                variant="gradient"
                size="xl"
                onClick={handleStartDiagnostic}
                className="group"
              >
                Start Diagnostic
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedGrade && (
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500 italic">
            Please select your grade level to begin
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-20 bg-gray-300"></div>
            <span className="text-xs text-gray-500">or</span>
            <div className="h-px w-20 bg-gray-300"></div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/diagnostic')}
          >
            Continue Without Grade Selection
          </Button>
        </div>
      )}
    </div>
  );
}