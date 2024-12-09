"use client";

import { useState } from 'react';
import { TeacherNavigation } from '@/components/TeacherNavigation';
import { TeacherTable } from '@/components/teacher/TeacherTable';

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <TeacherNavigation />

      {/* Main Content */}
      <main className="lg:pl-64 pt-8">
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <TeacherTable />
        </div>
      </main>
    </div>
  );
}