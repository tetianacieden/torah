"use client";

import { ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import type { TeacherStudent } from '@/types/teacher';

interface TeacherInsightsProps {
  students: TeacherStudent[];
  onSelectStudent: (student: TeacherStudent) => void;
}

export function TeacherInsights({ students, onSelectStudent }: TeacherInsightsProps) {
  const needsAttention = students.filter(student => {
    const scores = Object.values(student.progress)
      .filter(p => p.status === 'completed')
      .map(p => p.score || 0);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return average < 82;
  });

  const topPerformers = students.filter(student => {
    const scores = Object.values(student.progress)
      .filter(p => p.status === 'completed')
      .map(p => p.score || 0);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    return average >= 90;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Students Needing Support */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
            Students Needing Support
          </h3>
          <span className="text-sm text-orange-600 font-medium">
            {needsAttention.length} students
          </span>
        </div>

        <div className="space-y-4">
          {needsAttention.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="w-full p-4 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors"
            >
              <div className="font-medium text-gray-900">{student.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                Average score below 82%
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            Top Performers
          </h3>
          <span className="text-sm text-yellow-600 font-medium">
            {topPerformers.length} students
          </span>
        </div>

        <div className="space-y-4">
          {topPerformers.map((student) => (
            <button
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="w-full p-4 bg-yellow-50 rounded-lg text-left hover:bg-yellow-100 transition-colors"
            >
              <div className="font-medium text-gray-900">{student.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                Average score above 90%
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 