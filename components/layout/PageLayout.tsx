import React from 'react';
import { cn } from '@/lib/utils/cn';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'white';
}

export function PageLayout({
  children,
  className,
  variant = 'gradient'
}: PageLayoutProps) {
  const variants = {
    default: 'min-h-screen bg-background',
    gradient: 'min-h-screen bg-gradient-to-br from-blue-50 to-purple-50',
    white: 'min-h-screen bg-white',
  };

  return (
    <div className={cn(variants[variant], 'py-8', className)}>
      {children}
    </div>
  );
}