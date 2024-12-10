"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { levelsData } from '@/data/curriculum/levels';
import { Level } from '@/types';

interface LevelSkill {
  skillId: string;
  weekNumber: number;
  requiredMastery: number;
}

export default function LevelPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const level = levelsData.find(l => l.id === parseInt(params.id));

  const handleSkillClick = async (skillId: string) => {
    try {
      await router.push(`/skill/${skillId}`);
    } catch (error) {
      console.error('Error navigating to skill:', error);
    }
  };

  if (!level) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Level not found</h1>
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{level.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{level.hebrewTitle}</h2>
          <p className="text-gray-600">{level.description}</p>
        </div>
        <div className="space-y-4">
          {level.skills.map((skill, index) => (
            <button
              key={skill.skillId}
              onClick={() => handleSkillClick(skill.skillId)}
              className="w-full bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
                  <p className="text-gray-600">{skill.skillId}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Required Mastery: {skill.requiredMastery * 100}%
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Learning Goals */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Learning Goals</h2>
          <ul className="space-y-2">
            {level.learningGoals.map((goal: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
