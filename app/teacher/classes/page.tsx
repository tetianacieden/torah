"use client";

import { TeacherNavigation } from '@/components/TeacherNavigation';
import { ClassManagement } from '@/components/teacher/ClassManagement';

export default function TeacherClasses() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavigation />
      <main className="lg:pl-64 pt-8">
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <ClassManagement />
        </div>
      </main>
    </div>
  );
} 