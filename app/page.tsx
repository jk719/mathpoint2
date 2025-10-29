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
              FREE diagnostics identify your weak topics, then our human-managed AI tutor helps you master them with personalized learning
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
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white border-2 border-green-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">FREE Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Fast, accurate assessment of your math skills in just 10-15 minutes.
                  Identify exactly which topics you need to work on - completely free.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white border-2 border-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">AI Tutor + Human Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Personalized AI tutoring on your weak topics, monitored 24/7 by expert
                  educators to ensure quality, accuracy, and effective learning strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow bg-white border-2 border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Concept Mastery Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  After tutoring each topic, take targeted tests to verify true mastery.
                  Track your progress and see exactly which concepts you've conquered.
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
              Three simple steps from assessment to mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">📊 Diagnostic Assessment</h3>
              <p className="text-sm font-semibold text-green-600 mb-2">FREE</p>
              <p className="text-gray-600 text-sm">
                Take our adaptive diagnostic to identify your strengths and weak topics. Get a detailed report in minutes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">🤖 AI Tutoring</h3>
              <p className="text-sm font-semibold text-blue-600 mb-2">Human-Managed</p>
              <p className="text-gray-600 text-sm">
                Get personalized AI tutoring on your weak topics, monitored by expert educators to ensure quality learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">✅ Master & Verify</h3>
              <p className="text-sm font-semibold text-purple-600 mb-2">Track Progress</p>
              <p className="text-gray-600 text-sm">
                After tutoring, take concept-specific mastery tests to verify you've mastered each topic. See your growth over time.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              <span className="font-semibold text-gray-900">Complete Learning Loop:</span> Diagnose → Learn → Improve → Repeat
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-[#1a3a52] to-[#0f2436] text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                The Complete Learning Solution
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">FREE Diagnostic Assessment</h3>
                    <p className="text-gray-300">
                      Get precise insights into your strengths and weak topics in just 10-15 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">AI Tutor with Human Oversight</h3>
                    <p className="text-gray-300">
                      Personalized AI tutoring on your weak topics, monitored by expert educators to ensure quality
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Targeted Learning Path</h3>
                    <p className="text-gray-300">
                      Focus only on topics you need to improve - no wasted time reviewing what you already know
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Track Your Progress</h3>
                    <p className="text-gray-300">
                      Take concept-specific mastery tests to verify you've mastered each topic with visual progress tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">FREE</div>
                <div className="text-sm text-gray-300">Diagnostic assessment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">10-15</div>
                <div className="text-sm text-gray-300">Minutes to complete</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm text-gray-300">AI tutor availability</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm text-gray-300">Human-managed quality</div>
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
                Is the diagnostic assessment really free?
              </h3>
              <p className="text-gray-700">
                Yes! The diagnostic assessment is 100% free with instant results. It takes 10-15 minutes and identifies your strengths and weak topics. No credit card required, no hidden fees. After the diagnostic, you'll have the option to get personalized AI tutoring on your weak topics.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does the AI tutoring work?
              </h3>
              <p className="text-gray-700">
                After your free diagnostic, our AI tutor creates a personalized learning plan focused on your weak topics. You get 24/7 access to AI-powered tutoring that adapts to your learning pace. All tutoring sessions are monitored by expert educators to ensure quality and accuracy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What does "human-managed AI tutor" mean?
              </h3>
              <p className="text-gray-700">
                Our AI tutor is powered by advanced algorithms, but every learning path and tutoring session is reviewed by certified math educators. This ensures the AI provides accurate explanations, appropriate difficulty levels, and effective teaching strategies - combining AI efficiency with human expertise.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What grade levels do you support?
              </h3>
              <p className="text-gray-700">
                Currently, we offer diagnostics for Grade 6 Math and Algebra 1 (typically grades 8-9). We're actively developing diagnostics for Grade 7, Geometry, Algebra 2, and other high school math courses. Sign up for free to get notified when new courses launch!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I track my progress?
              </h3>
              <p className="text-gray-700">
                After completing tutoring on each topic, you take concept-specific mastery tests to verify you've truly mastered that concept. Our system tracks your mastery level for each topic, showing you exactly which areas you've conquered. Visual progress charts help you stay motivated as you work through your learning path!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
