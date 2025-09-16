'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GradeSelectorSimple() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const router = useRouter();

  // Map grades to their corresponding courses
  const getGradeCourse = (grade: number): string => {
    switch(grade) {
      case 6:
      case 7:
        return 'Pre-Algebra';
      case 8:
        return 'Algebra 1';
      case 9:
        return 'Geometry';
      case 10:
        return 'Algebra 2';
      case 11:
        return 'Pre-Calculus';
      case 12:
        return 'Calculus';
      default:
        return 'Math';
    }
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    // Navigate to diagnostic with grade parameter
    router.push(`/diagnostic?grade=${grade}`);
  };

  return (
    <div className="relative p-10 bg-gradient-to-br from-white via-gray-50 to-orange-50 rounded-2xl shadow-2xl overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-blue-100 rounded-full blur-2xl opacity-30" />

      <h2 className="text-3xl font-bold text-center mb-8 relative">
        <span className="bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent">
          Choose Your Grade Level
        </span>
        <div className="mt-2 text-sm font-normal text-gray-600">
          Get a personalized diagnostic based on your curriculum
        </div>
      </h2>

      <div className="grid grid-cols-7 gap-3 relative z-10">
        {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
          <button
            key={grade}
            className={`group relative py-6 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
              selectedGrade === grade
                ? 'bg-gradient-to-br from-[#ff6b35] to-[#ff8c5f] text-white shadow-xl scale-105'
                : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-orange-50 shadow-md hover:shadow-xl'
            }`}
            onClick={() => handleGradeSelect(grade)}
          >
            {selectedGrade === grade && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5f] rounded-xl blur opacity-50" />
            )}
            <div className="relative">
              <div className={`text-3xl font-black mb-1 ${
                selectedGrade === grade ? 'text-white' : 'text-[#1a3a52]'
              }`}>
                {grade}
              </div>
              <div className={`text-xs font-medium uppercase tracking-wide ${
                selectedGrade === grade ? 'text-white opacity-80' : 'text-gray-600'
              }`}>
                Grade
              </div>
              <div className={`text-xs font-semibold mt-1 ${
                selectedGrade === grade ? 'text-white' : 'text-[#ff6b35]'
              }`}>
                {getGradeCourse(grade)}
              </div>
            </div>
            {selectedGrade === grade && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedGrade && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1a3a52] to-[#0f2436] text-white rounded-full">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-semibold">Preparing Grade {selectedGrade} Assessment...</span>
          </div>
        </div>
      )}
    </div>
  );
}