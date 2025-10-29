'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Brain, Target, Zap, Award, CheckCircle, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35]/10 to-[#1a3a52]/10 rounded-full text-[#1a3a52] text-sm font-semibold mb-6 border border-[#1a3a52]/10">
              <Zap className="w-4 h-4 text-[#ff6b35]" />
              Adaptive AI-Powered Diagnostics
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Where Math Meets
              <span className="block mt-2 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent">
                Mastery
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive adaptive assessments that identify strengths, pinpoint gaps, and provide personalized learning pathways
            </p>
          </div>

          {/* Featured Courses - Grid */}
          <div className="max-w-6xl mx-auto mb-12 grid md:grid-cols-2 gap-6">
            {/* Grade 6 Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AVAILABLE NOW
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    Grade 6 Math
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                    Ratios, fractions, expressions, geometry, and statistics. Complete diagnostic in 15 minutes.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">15</div>
                        <div className="text-xs text-gray-600">min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-cyan-600" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">10</div>
                        <div className="text-xs text-gray-600">questions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">Free</div>
                        <div className="text-xs text-gray-600">report</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/grade6')}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Start Diagnostic
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Algebra 1 Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b35] via-purple-600 to-[#1a3a52] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-white via-orange-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AVAILABLE NOW
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                    Algebra 1
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                    Perfect for 8th grade. Comprehensive assessment of algebra skills in just 15 minutes.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#ff6b35]" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">15</div>
                        <div className="text-xs text-gray-600">min</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">15</div>
                        <div className="text-xs text-gray-600">questions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-green-600" />
                      <div>
                        <div className="text-lg font-bold text-gray-900">Free</div>
                        <div className="text-xs text-gray-600">report</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/algebra1')}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Start Diagnostic
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Grade-Specific Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Tailored assessments for grades 6-12, covering Algebra 1, Algebra 2, and
                  Geometry with age-appropriate difficulty levels.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-[#1a3a52]/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-[#1a3a52]" />
                </div>
                <CardTitle className="text-xl text-gray-900">Comprehensive Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  From linear equations to polynomials, from basic geometry to trigonometry -
                  complete mathematical diagnostic coverage.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Gamified Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Earn points, unlock badges, and track streaks while building
                  mathematical confidence through engaging challenges.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Additional Courses Coming Soon
              </h2>
              <p className="text-lg text-gray-600">
                Expanding our comprehensive diagnostic coverage across all grade levels
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Grade 7 Math', grade: 'Grade 7', color: 'bg-blue-100', textColor: 'text-blue-600' },
                { name: 'Geometry', grade: 'Grade 9', color: 'bg-green-100', textColor: 'text-green-600' },
                { name: 'Algebra 2', grade: 'Grade 10', color: 'bg-orange-100', textColor: 'text-orange-600' },
                { name: 'Pre-Calculus', grade: 'Grade 11', color: 'bg-purple-100', textColor: 'text-purple-600' },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="relative p-6 bg-white/50 border border-gray-200 rounded-xl opacity-60"
                >
                  <div className="absolute top-3 right-3 px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-semibold">
                    Coming Soon
                  </div>
                  <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Brain className={`w-6 h-6 ${course.textColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.grade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Four simple steps to comprehensive mathematical assessment
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3a52] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-md">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Select Course</h3>
              <p className="text-gray-600 text-sm">
                Choose your grade level and begin the adaptive diagnostic assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-md">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Answer Questions</h3>
              <p className="text-gray-600 text-sm">
                Respond to adaptive questions that adjust to your skill level in real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-md">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Advanced algorithms analyze your performance across multiple skill domains
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-md">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Review Report</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed insights and personalized learning recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-[#1a3a52] to-[#0f2436] text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Students Choose MathPoint
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Saves Time</h3>
                    <p className="text-gray-300">
                      Get precise feedback in minutes, not hours of traditional practice
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Builds Confidence</h3>
                    <p className="text-gray-300">
                      Focus on your actual weaknesses instead of reviewing what you already know
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Tracks Progress</h3>
                    <p className="text-gray-300">
                      Visual progress tracking and achievement system keeps you motivated
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Expert-Designed</h3>
                    <p className="text-gray-300">
                      Created by math educators and learning scientists
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">4-7</div>
                <div className="text-sm text-gray-300">Questions per diagnostic</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-sm text-gray-300">Student satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">15-20</div>
                <div className="text-sm text-gray-300">Minutes to complete</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">∞</div>
                <div className="text-sm text-gray-300">Improvement potential</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does the diagnostic assessment take?
              </h3>
              <p className="text-gray-700">
                The comprehensive diagnostic assessment typically requires 20-30 minutes to complete,
                with the exact duration varying based on individual student performance and knowledge level.
                Our adaptive algorithm customizes the question sequence to efficiently evaluate each student&apos;s
                mathematical proficiency across multiple concept areas.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is MathPoint really free?
              </h3>
              <p className="text-gray-700">
                Yes! The diagnostic assessment is completely free with instant results.
                No credit card required, no hidden fees, and no time limits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What topics does MathPoint cover?
              </h3>
              <p className="text-gray-700">
                MathPoint covers comprehensive mathematics from grades 6-12, including Pre-Algebra,
                Algebra 1, Geometry, Algebra 2, Pre-Calculus, and Calculus. Our adaptive system
                adjusts questions based on your grade level.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the adaptive technology work?
              </h3>
              <p className="text-gray-700">
                Our AI analyzes your responses in real-time, identifying patterns in your problem-solving
                approach. Based on this analysis, it selects the next most informative question to
                pinpoint your exact learning needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
