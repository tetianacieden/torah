"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { skillsData, getSkillContent } from '@/data/curriculum/skills';
import type { Skill, Step } from '@/types';

interface SkillPageProps {
  params: {
    id: string;
  };
}

export default function SkillPage({ params }: SkillPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>('learn');
  const skillId = params.id;
  const skill = skillsData.find((s: Skill) => s.id === skillId);
  const content = getSkillContent(skillId);

  if (!skill || !content) {
    return <div>Skill not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your skill page content here */}
    </div>
  );
}