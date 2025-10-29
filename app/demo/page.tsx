'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Algebra1 diagnostic system
    router.replace('/algebra1');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Redirecting to Algebra1 Diagnostic...
        </h1>
        <p className="text-lg text-gray-600">
          Please wait while we redirect you to the adaptive diagnostic system.
        </p>
      </div>
    </div>
  );
}
