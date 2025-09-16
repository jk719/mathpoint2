'use client';

import React from 'react';
import Link from 'next/link';

export function GradeSelectorLinks() {
  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border-4 border-[#1a3a52]">
      <h2 className="text-2xl font-bold text-[#1a3a52] mb-6 text-center">
        Select Your Grade Level
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
          <Link
            key={grade}
            href={`/diagnostic?grade=${grade}`}
            className="block p-6 rounded-lg border-2 transition-all transform hover:scale-105 bg-white text-[#1a3a52] border-[#1a3a52] hover:border-[#ff6b35] hover:shadow-lg text-center"
          >
            <div className="text-2xl font-bold mb-2">Grade {grade}</div>
            <div className="text-sm opacity-80">
              {grade <= 7 ? 'Algebra 1' : grade <= 9 ? 'Algebra 1 & 2' : 'Advanced Math'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}