"use client";

import Link from 'next/link';
import { HomeIcon, BookOpenIcon, TrophyIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { RoleSwitcher } from './RoleSwitcher';

export function Navigation() {
  return (
    <nav className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-600 mb-8">TorahGPT</h2>
          <ul className="space-y-4">
            <li>
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-3 text-blue-600 bg-blue-50 rounded-lg p-3"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/progress" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <BookOpenIcon className="w-5 h-5" />
                <span>My Progress</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/achievements" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <TrophyIcon className="w-5 h-5" />
                <span>Achievements</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/help" 
                className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
              >
                <QuestionMarkCircleIcon className="w-5 h-5" />
                <span>Help</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t">
          <RoleSwitcher />
        </div>
      </div>
    </nav>
  );
} 