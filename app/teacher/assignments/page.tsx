"use client";

import { TeacherNavigation } from '@/components/TeacherNavigation';
import { AssignmentsTable } from '@/components/teacher/AssignmentsTable';

export default function TeacherAssignments() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavigation />
      <main className="lg:pl-64 pt-8">
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          <AssignmentsTable />
        </div>
      </main>
    </div>
  );
} 