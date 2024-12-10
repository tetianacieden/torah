"use client";

import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard';

export default function TeacherPage() {
  return (
    <TeacherLayout>
      <TeacherDashboard />
    </TeacherLayout>
  );
} 