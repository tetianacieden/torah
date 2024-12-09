'use client'

import { LockClosedIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import ProgressBar from './ProgressBar'

interface LevelCardProps {
  level: {
    id: number
    name: string
    progress: number
    isLocked: boolean
  }
}

export default function LevelCard({ level }: LevelCardProps) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{level.name}</h3>
        {level.isLocked && (
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
        )}
      </div>
      
      <ProgressBar progress={level.progress} className="mb-4" />
      
      <button
        onClick={() => router.push(`/level/${level.id}`)}
        className={`w-full py-2 px-4 rounded-md ${
          level.isLocked
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={level.isLocked}
      >
        Enter Level
      </button>
    </div>
  )
} 