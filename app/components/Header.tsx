import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
  studentName?: string
  progress?: string
  levelName?: string
  totalSkills?: string
}

export default function Header({ studentName, progress, levelName, totalSkills }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            {studentName && <h2 className="text-lg font-semibold">{studentName}</h2>}
            {progress && <p className="text-sm text-gray-600">{progress}</p>}
            {levelName && (
              <div>
                <h1 className="text-2xl font-bold">{levelName}</h1>
                {totalSkills && <p className="text-sm text-gray-600">{totalSkills}</p>}
              </div>
            )}
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Help"
          >
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
} 