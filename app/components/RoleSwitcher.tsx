"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AcademicCapIcon, UserIcon } from '@heroicons/react/24/outline';
import { UI } from '@/styles/constants';

export function RoleSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchRole = async (role: 'student' | 'teacher') => {
    setIsOpen(false);
    
    // Force a full page reload when switching roles
    if (role === 'teacher') {
      window.location.href = '/teacher';
    } else {
      window.location.href = '/';  // or '/dashboard' depending on your preferred landing page
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-lg
          text-gray-600 hover:bg-gray-50 transition-colors
          border border-gray-200
        `}
      >
        <div className="flex items-center gap-2">
          <AcademicCapIcon className="w-5 h-5" />
          <span className="font-medium">Switch Role</span>
        </div>
      </button>

      {isOpen && (
        <div className={`
          absolute bottom-full left-0 mb-2 w-full
          bg-white rounded-lg shadow-lg border border-gray-200
          overflow-hidden
          ${UI.animations.fadeIn}
        `}>
          <button
            onClick={() => switchRole('student')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
          >
            <UserIcon className="w-5 h-5" />
            <span>Student View</span>
          </button>
          <button
            onClick={() => switchRole('teacher')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left border-t"
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span>Teacher View</span>
          </button>
        </div>
      )}
    </div>
  );
} 