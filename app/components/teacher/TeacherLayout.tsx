"use client";

import type { ReactNode } from 'react';
import { TeacherNavigation } from './TeacherNavigation';

interface TeacherLayoutProps {
  children: ReactNode;
}

export function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavigation />
      <main className="lg:pl-64 pt-8">
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {children}
        </div>
      </main>
    </div>
  );
} 