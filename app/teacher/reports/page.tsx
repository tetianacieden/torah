"use client";

import { TeacherNavigation } from '@/components/TeacherNavigation';
import { ReportsOverview } from '@/components/teacher/ReportsOverview';

export default function TeacherReports() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavigation />
      <main className="lg:pl-64 pt-8">
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <ReportsOverview />
        </div>
      </main>
    </div>
  );
} 