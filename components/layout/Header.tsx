'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Star, User, Menu } from 'lucide-react';

interface HeaderProps {
  userPoints?: number;
  userName?: string;
}

export function Header({ userPoints = 0, userName }: HeaderProps) {
  return (
    <header className="bg-[#1a3a52] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* 3D Cube Logo */}
                <svg viewBox="0 0 60 60" className="w-full h-full">
                  {/* Top face - lightest */}
                  <path
                    d="M 18 20 L 30 14 L 42 20 L 30 26 Z"
                    fill="#ffa366"
                  />
                  {/* Left face - medium */}
                  <path
                    d="M 18 20 L 18 32 L 30 38 L 30 26 Z"
                    fill="#ff8c5f"
                  />
                  {/* Right face - darkest */}
                  <path
                    d="M 30 26 L 30 38 L 42 32 L 42 20 Z"
                    fill="#ff6b35"
                  />
                  {/* M letter on the front face */}
                  <text
                    x="30"
                    y="31"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="Orbitron, system-ui"
                    className="select-none"
                  >
                    M
                  </text>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-wider">MATHPOINT</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/diagnostic"
                className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors"
              >
                Diagnostic
              </Link>
              <div className="flex items-center gap-1">
                <span className="text-gray-500 font-medium">Tutor</span>
                <span className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full font-normal">
                  Coming Soon
                </span>
              </div>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-[#ff6b35] font-medium transition-colors"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {userPoints > 0 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full">
                <Star className="w-4 h-4 text-[#ff6b35]" />
                <span className="text-sm font-semibold text-[#1a3a52]">{userPoints}</span>
              </div>
            )}

            {userName ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-[#ff6b35]" />
                </div>
                <span className="text-sm font-medium text-white hidden sm:block">
                  {userName}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button variant="gradient" size="sm">
                  Get Started
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}