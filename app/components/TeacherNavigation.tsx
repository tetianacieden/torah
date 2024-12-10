"use client";

import Link from 'next/link';
import { 
  HomeIcon, 
  UsersIcon, 
  DocumentTextIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export function TeacherNavigation() {
  return (
    <nav className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Teacher Portal</h2>
          <ul className="space-y-4">
            <li>
              <Link 
                href="/teacher" 
                className="flex items-center space-x-3 text-blue-600 bg-blue-50 rounded-lg p-3"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/teacher/classes" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <UsersIcon className="w-5 h-5" />
                <span>Classes</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/teacher/assignments" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span>Assignments</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/teacher/reports" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>Reports</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t">
          <Link 
            href="/"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span>Switch to Student</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}