'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { StudentDashboard } from './StudentDashboard';
import { ParentDashboard } from './ParentDashboard';
import { TutorDashboard } from './TutorDashboard';
import { AdminDashboard } from './AdminDashboard';

export default function DashboardPage() {
  const router = useRouter();
  const { isLoggedIn, role, name } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !role) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {role === 'student' && <StudentDashboard name={name} />}
        {role === 'parent' && <ParentDashboard name={name} />}
        {role === 'tutor' && <TutorDashboard name={name} />}
        {role === 'admin' && <AdminDashboard name={name} />}
      </div>
    </div>
  );
}
