"use client";

import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, BookOpenIcon, TrophyIcon, QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { WelcomeCharacter } from '@/components/WelcomeCharacter';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { levels } from '@/data/levels';
import { UI } from '@/styles/constants';
import { Navigation } from '@/components/Navigation';

export default function StudentDashboard() {
  const [expandedLevels, setExpandedLevels] = useState<number[]>(() => {
    return levels.filter(level => level.status === 'in-progress').map(level => level.id);
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation />
      <main className="ml-64 flex-1 p-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Shalom, Daniel 👋
              </h1>
              <p className="text-lg text-gray-600">
                Every lesson is a new journey, full of exciting discoveries. Explore new words, stories, and wisdom, and watch yourself grow with every step! 🌟
              </p>
            </div>
            <WelcomeCharacter />
          </div>
        </div>

        {/* Levels List */}
        <div className="space-y-6">
          {levels.map((level) => (
            <div key={level.id} className="bg-white rounded-xl shadow-lg">
              {/* ... level header ... */}

              {expandedLevels.includes(level.id) && (
                <div className="px-8 pb-6 animate-fade-in">
                  <div className="grid grid-cols-4 gap-4 relative">
                    {level.skills.map((skill, index) => (
                      <Link
                        key={index}
                        href={`/skill/${skill.id}`}
                        className={`
                          group relative flex-1 p-4 rounded-lg border h-24 
                          transition-all duration-300
                          ${index < level.progress 
                            ? 'bg-white border-emerald-200 hover:border-emerald-300' 
                            : level.status === 'in-progress' && index === level.progress
                              ? 'bg-white border-blue-200 hover:border-blue-300 shadow-md'
                              : 'bg-white border-gray-100 hover:border-gray-200'}
                          ${level.status !== 'locked' ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed opacity-50'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                            transition-colors
                            ${index < level.progress 
                              ? 'bg-emerald-600 text-white group-hover:bg-emerald-700' 
                              : level.status === 'in-progress' && index === level.progress
                                ? 'bg-blue-600 text-white group-hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-600'}
                          `}>
                            {index < level.progress ? '✓' : (index + 1)}
                          </span>
                          <span className={`
                            font-medium transition-colors
                            ${index < level.progress 
                              ? 'text-emerald-700 group-hover:text-emerald-800' 
                              : level.status === 'in-progress' && index === level.progress
                                ? 'text-gray-900'
                                : 'text-gray-400'}
                          `}>
                            {skill.title}
                          </span>
                        </div>

                        {index < level.progress && (
                          <div className="absolute bottom-2 right-2">
                            <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                              89/100
                            </span>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}