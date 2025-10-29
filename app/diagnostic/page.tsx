'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

function DiagnosticRouterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = searchParams.get('grade');

  useEffect(() => {
    // If grade is 8, automatically redirect to Algebra 1 diagnostic
    if (grade === '8') {
      router.push('/algebra1');
    }
  }, [grade, router]);

  // If grade is 8, show loading state while redirecting
  if (grade === '8') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Loading Diagnostic...</CardTitle>
            <CardDescription>Preparing your Algebra 1 assessment</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // For other grades, show coming soon message
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{grade}</span>
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Grade {grade} Diagnostic</CardTitle>
          <CardDescription className="text-lg">
            Coming Soon
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-blue-900 text-lg">
              We're expanding our diagnostic system
            </h3>
            <p className="text-blue-800">
              Currently, we offer a comprehensive Algebra 1 adaptive diagnostic (Grade 8).
              Additional grade levels are in development and will be available soon.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Available Now:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Algebra 1 Diagnostic (Grade 8) - 15 adaptive questions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced adaptive algorithm for personalized assessment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Comprehensive skill mapping across 11 domains</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Detailed diagnostic reports with mastery levels</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => router.push('/algebra1')}
              className="flex-1"
            >
              Try Algebra 1 Diagnostic
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="flex-1"
            >
              Back to Home
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Interested in early access for your school?{' '}
              <a href="mailto:contact@mathpoint.com" className="text-blue-600 hover:underline font-medium">
                Contact us
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DiagnosticRouter() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <DiagnosticRouterContent />
    </Suspense>
  );
}
