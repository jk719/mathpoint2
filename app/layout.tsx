import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MathPoint - Adaptive Math Diagnostics',
  description: 'Intelligent diagnostic system for quadratic equations with personalized learning paths',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header userPoints={750} userName="Demo User" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
