import { Suspense } from 'react';
import DiagnosticContent from './DiagnosticContent';

export default function DiagnosticPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-black mb-2 text-[#1a3a52] tracking-wider">
              MATHPOINT
            </h1>
            <p className="text-lg text-gray-600">Loading diagnostic assessment...</p>
          </div>
        </div>
      </div>
    }>
      <DiagnosticContent />
    </Suspense>
  );
}