"use client";

import { useState } from 'react';
import { TeacherInsights } from './TeacherInsights';
import type { TeacherStudent } from '@/types/teacher';

const mockStudents: TeacherStudent[] = [
  {
    id: '1',
    name: 'David Klein',
    email: 'david.k@example.com',
    class: '7B',
    lastActive: '2024-03-15',
    progress: {
      'text-markers': {
        status: 'in-progress',
        score: 75,
        lastActivity: '2024-03-15'
      }
    }
  }
];

export function TeacherDashboard() {
  const [students] = useState<TeacherStudent[]>(mockStudents);

  const handleSelectStudent = (student: TeacherStudent) => {
    console.log('Selected:', student);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
      <TeacherInsights 
        students={students} 
        onSelectStudent={handleSelectStudent}
      />
    </div>
  );
} 