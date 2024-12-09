'use client'

import { LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

interface SkillCardProps {
  skill: {
    id: number
    name: string
    isLocked: boolean
    progress: {
      learned: boolean
      practiced: boolean
      tested: boolean
    }
  }
  levelId: string
}

export default function SkillCard({ skill, levelId }: SkillCardProps) {
  const router = useRouter()

  const getProgressText = () => {
    if (skill.progress.tested) return 'Completed'
    if (skill.progress.practiced) return 'Practice Complete'
    if (skill.progress.learned) return 'Learning Complete'
    return 'Not Started'
  }

  const getNextStep = () => {
    if (!skill.progress.learned) return 'learn'
    if (!skill.progress.practiced) return 'practice'
    if (!skill.progress.tested) return 'test'
    return 'learn' // Default to learn if all complete
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{skill.name}</h3>
          <p className="text-sm text-gray-600">{getProgressText()}</p>
        </div>
        {skill.isLocked ? (
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <div className="flex space-x-2">
            {skill.progress.learned && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
            {skill.progress.practiced && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
            {skill.progress.tested && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
          </div>
        )}
      </div>
      
      <button
        onClick={() => router.push(`/skill/${skill.id}/${getNextStep()}`)}
        className={`w-full py-2 px-4 rounded-md ${
          skill.isLocked
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={skill.isLocked}
      >
        {skill.isLocked ? 'Locked' : `Start ${getNextStep()}`}
      </button>
    </div>
  )
} 