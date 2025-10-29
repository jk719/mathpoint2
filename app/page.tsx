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
              FREE diagnostics identify ALL your weak topics, then master them one-by-one with our human-managed AI tutor. Verify complete course mastery when you're done.
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
                <CardTitle className="text-xl text-gray-900">Topic-by-Topic Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Master each weak topic with AI tutoring → concept quiz → mark as mastered.
                  After mastering all topics, verify complete course mastery by retaking the full diagnostic.
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
              Your complete journey from assessment to course mastery
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">📊 Diagnostic Assessment</h3>
              <p className="text-sm font-semibold text-green-600 mb-2">FREE • 10-15 minutes</p>
              <p className="text-gray-600 text-sm mb-4">
                Take our adaptive diagnostic to identify your strengths and weak topics. Get a detailed report in minutes.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-left">
                <p className="text-xs font-semibold text-green-800 mb-1">You Get:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Instant detailed report</li>
                  <li>• ALL weak topics identified</li>
                  <li>• Personalized learning path</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">🔄 Topic-by-Topic Mastery</h3>
              <p className="text-sm font-semibold text-blue-600 mb-2">Human-Managed AI</p>
              <p className="text-gray-600 text-sm mb-4">
                For EACH weak topic, work with our AI tutor until you master it, then move to the next.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
                <p className="text-xs font-semibold text-blue-800 mb-1">For Each Topic:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• AI tutoring session (24/7 access)</li>
                  <li>• Interactive practice problems</li>
                  <li>• Concept-specific mastery quiz</li>
                  <li>• ✓ Mark as mastered, move to next</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-3xl shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">✅ Course Mastery Verification</h3>
              <p className="text-sm font-semibold text-purple-600 mb-2">Final Step</p>
              <p className="text-gray-600 text-sm mb-4">
                After mastering ALL topics, retake the full diagnostic to verify complete course mastery.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-left">
                <p className="text-xs font-semibold text-purple-800 mb-1">Final Verification:</p>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Retake full diagnostic</li>
                  <li>• See your improvement score</li>
                  <li>• Verify course mastery</li>
                  <li>• Celebrate your achievement!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Visual Learning Loop */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 via-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Your Learning Journey (Example)
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                  <div className="flex-1 bg-white rounded-lg p-3 border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-gray-900">Diagnostic Complete</p>
                    <p className="text-xs text-gray-600">ALL weak topics identified (e.g., Quadratic equations, Systems of equations, Polynomials, Inequalities, Functions)</p>
                  </div>
                </div>

                <div className="ml-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
                    <div className="flex-1 bg-white rounded-lg p-2 border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-gray-900">Topic 1: Quadratic equations → AI Tutor → Quiz → ✓ Mastered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
                    <div className="flex-1 bg-white rounded-lg p-2 border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-gray-900">Topic 2: Systems of equations → AI Tutor → Quiz → ✓ Mastered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
                    <div className="flex-1 bg-white rounded-lg p-2 border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-gray-900">Topic 3: Polynomials → AI Tutor → Quiz → ✓ Mastered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
                    <div className="flex-1 bg-white rounded-lg p-2 border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-gray-900">Topic 4: Inequalities → AI Tutor → Quiz → ✓ Mastered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">✓</div>
                    <div className="flex-1 bg-white rounded-lg p-2 border-l-4 border-blue-500">
                      <p className="text-xs font-semibold text-gray-900">Topic 5: Functions → AI Tutor → Quiz → ✓ Mastered</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">🎉</div>
                  <div className="flex-1 bg-white rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="text-sm font-semibold text-gray-900">All Topics Mastered → Retake Full Diagnostic → Course Mastery Verified!</p>
                    <p className="text-xs text-gray-600">Your score improved from 65% to 95% - Course Mastered!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">Complete Learning Loop:</span>
            </p>
            <p className="text-sm text-gray-600">
              Diagnose → Learn Topic 1 → Quiz → Learn Topic 2 → Quiz → ... → Master All Topics → Verify Course Mastery
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
                    <h3 className="font-semibold mb-1">Topic-by-Topic Mastery</h3>
                    <p className="text-gray-300">
                      Master each weak topic one at a time with AI tutoring → concept quiz → mark as mastered, then verify complete course mastery
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
                Our system shows you exactly which topics you've mastered in real-time. For each weak topic identified in your diagnostic, you'll work through: AI Tutoring → Concept Quiz → Mark as Mastered. Once ALL topics are mastered, you retake the full diagnostic to verify complete course mastery and see your overall improvement score. Visual progress charts help you stay motivated as you conquer each topic!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens after I master all my weak topics?
              </h3>
              <p className="text-gray-700">
                Once you've mastered all the topics identified in your diagnostic (each with its own concept quiz), you'll retake the full diagnostic assessment to verify your course mastery. This shows you how much you've improved from your initial score - students typically see 20-30+ percentage point improvements! This validates that you've truly mastered the entire course.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
