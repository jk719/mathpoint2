'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  variant?: 'default' | 'gradient' | 'success' | 'warning';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showLabel = false, variant = 'default', ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const variantStyles = {
      default: 'bg-primary',
      gradient: 'bg-gradient-to-r from-[#1a3a52] to-[#ff6b35]',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
    };

    return (
      <div className={cn('relative', className)} {...props}>
        <div
          ref={ref}
          className="relative h-4 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out',
              variantStyles[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };