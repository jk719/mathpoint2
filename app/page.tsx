'use client';

import { Award, ArrowRight, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              SAT Math
              <span className="block mt-2 text-[#ff6b35]">
                Diagnostic
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Free diagnostic identifies your weak SAT Math skills.
              Then master them with targeted practice.
            </p>
          </div>

          {/* Main CTA Card */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#ff6b35]">
              <div className="p-8">
                  {/* Stats */}
                  <div className="flex justify-center gap-8 mb-8">
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
                      <span className="text-sm text-gray-500">always</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => router.push('/diagnostic')}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ff6b35] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e55a2a] transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Start Free Diagnostic
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    No account required
                  </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simplified */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Diagnostic</h3>
              <p className="text-gray-600 leading-relaxed">
                Take a free adaptive assessment to identify your weak SAT Math skills.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get a skill-by-skill breakdown showing exactly what to work on.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Practice</h3>
              <p className="text-gray-600 leading-relaxed">
                Focus only on skills you need to improve with targeted practice.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => router.push('/diagnostic')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* What's Covered - Simple List */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
            SAT Math Topics Covered
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Algebra',
              'Problem Solving & Data Analysis',
              'Advanced Math',
              'Geometry & Trigonometry'
            ].map((topic) => (
              <div
                key={topic}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200"
              >
                <CheckCircle className="w-5 h-5 text-[#ff6b35] flex-shrink-0" />
                <span className="text-gray-700 font-medium">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
