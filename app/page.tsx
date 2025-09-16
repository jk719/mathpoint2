'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Brain, Target, Zap, Award, CheckCircle } from 'lucide-react';
import { GradeSelectorSimple } from '@/components/GradeSelectorSimple';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Adaptive AI-Powered Diagnostics
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Where
              <span className="bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent">
                {" "}Math Meets Mastery
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive diagnostics for grades 6-12. Our adaptive AI covers Algebra 1,
              Algebra 2, and Geometry to identify your unique learning patterns and create personalized paths to success.
            </p>

            <GradeSelectorSimple />
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
                <div className="w-12 h-12 bg-[#1a3a52] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
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
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How MathPoint Works
            </h2>
            <p className="text-xl text-gray-600">
              Our adaptive system adjusts to your grade level and performance in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3a52] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Grade Selection</h3>
              <p className="text-gray-700 text-sm">
                Choose your grade level for appropriately challenging questions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Adaptive Branching</h3>
              <p className="text-gray-700 text-sm">
                AI analyzes your response and selects the optimal next question
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Pattern Recognition</h3>
              <p className="text-gray-700 text-sm">
                Identify specific error patterns and knowledge gaps
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Personalized Plan</h3>
              <p className="text-gray-700 text-sm">
                Receive a custom learning path with targeted practice
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
                Our adaptive algorithm customizes the question sequence to efficiently evaluate each student's
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
