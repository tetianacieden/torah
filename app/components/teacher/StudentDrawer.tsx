import { XMarkIcon } from '@heroicons/react/24/outline';
import { skillsData } from '@/data/curriculum/skills';
import { levelsData } from '@/data/curriculum/levels';
import { useState } from 'react';

interface StudentProgress {
  id: string;
  name: string;
  progress: {
    [skillId: string]: {
      status: 'completed' | 'in-progress' | 'not-started';
      score?: number;
      lastActivity?: string;
    }
  }
}

interface StudentDrawerProps {
  student: StudentProgress | null;
  onClose: () => void;
}

function ProgressRing({ progress }: { progress: number }) {
  const size = 120;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-gray-200"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-blue-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-900">{progress}%</span>
      </div>
    </div>
  );
}

function SkillProgressBar({ skill, progress }: { skill: any; progress: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{skill.title}</span>
        <span className="font-medium text-gray-900">{progress?.score || '-'}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-100">
        <div 
          className={`h-full rounded-full ${getStatusColor(progress?.status)}`}
          style={{ width: `${progress?.score || 0}%` }}
        />
      </div>
    </div>
  );
}

type Tab = 'summary' | 'details';

export function StudentDrawer({ student, onClose }: StudentDrawerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  
  if (!student) return null;

  const completedSkills = Object.values(student.progress).filter(p => p.status === 'completed').length;
  const totalSkills = Object.keys(student.progress).length;
  const averageScore = Object.values(student.progress)
    .filter(p => p.score)
    .reduce((acc, curr) => acc + (curr.score || 0), 0) / completedSkills;

  const currentLevel = levelsData.find(level => 
    skillsData.filter(s => s.level === level.id.toString())
      .some(s => student.progress[s.id]?.status === 'in-progress')
  );

  const strugglingAreas = Object.entries(student.progress)
    .filter(([_, p]) => p.status === 'completed' && p.score && p.score < 90)
    .map(([skillId]) => skillsData.find(s => s.id === skillId)?.title);

  const skillsByLevel = levelsData.reduce((acc, level) => {
    acc[level.id] = skillsData
      .filter(skill => skill.level === level.id.toString())
      .sort((a, b) => a.order - b.order);
    return acc as Record<string, typeof skillsData>;
  }, {} as Record<string, typeof skillsData>);

  const tabs = [
    { id: 'summary' as const, label: 'Summary' },
    { id: 'details' as const, label: 'Detailed Progress' }
  ];

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
          <p className="text-sm text-gray-500 mt-1">Level {currentLevel?.id}: {currentLevel?.title}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              py-4 px-8 text-sm font-medium border-b-2 -mb-px
              ${activeTab === tab.id
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'summary' ? (
          <div className="p-8 space-y-8">
            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <ProgressRing progress={Math.round((completedSkills / totalSkills) * 100)} />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Average Score</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {Math.round(averageScore)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500">Skills Mastered</div>
                  <div className="text-2xl font-semibold text-gray-900 mt-1">
                    {Object.values(student.progress).filter(p => p.score && p.score > 90).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Progress */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Current Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-800 mb-2">Strengths</h4>
                  <div className="text-sm text-gray-600">
                    Highest scores in: {Object.entries(student.progress)
                      .filter(([_, p]) => p.score && p.score > 90)
                      .map(([skillId]) => skillsData.find(s => s.id === skillId)?.title)
                      .join(', ')}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-orange-800 mb-2">Current Focus</h4>
                  <div className="text-sm text-gray-600">
                    Working on: {Object.entries(student.progress)
                      .filter(([_, p]) => p.status === 'in-progress')
                      .map(([skillId]) => skillsData.find(s => s.id === skillId)?.title)
                      .join(', ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher Recommendations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recommendations</h3>
              <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
                {strugglingAreas.length > 0 && (
                  <div className="text-sm text-gray-600">
                    • Review {strugglingAreas[0]} with additional exercises
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  • Schedule one-on-one session for Text Markers
                </div>
                <div className="text-sm text-gray-600">
                  • Provide visual learning materials for current topics
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {Object.entries(student.progress)
                  .filter(([_, p]) => p.lastActivity)
                  .sort((a, b) => new Date(b[1].lastActivity!).getTime() - new Date(a[1].lastActivity!).getTime())
                  .slice(0, 3)
                  .map(([skillId, progress]) => (
                    <div key={skillId} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {skillsData.find(s => s.id === skillId)?.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(progress.lastActivity!).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${progress.status === 'completed' ? 'bg-green-100 text-green-800' :
                            progress.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {progress.status}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-8">
            {/* Skill Progress by Level */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Skills Progress</h3>
              {Object.entries(skillsByLevel).map(([levelId, skills]) => (
                <div key={levelId} className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm">
                      {levelId}
                    </span>
                    <span>{levelsData.find(l => l.id.toString() === levelId)?.title}</span>
                  </h4>
                  <div className="space-y-3">
                    {skills.map(skill => (
                      <SkillProgressBar 
                        key={skill.id}
                        skill={skill}
                        progress={student.progress[skill.id]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Insights */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Learning Insights</h3>
              
              {/* Strengths */}
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-2">Strengths</h4>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">
                    <strong>Mastered Skills:</strong> {Object.entries(student.progress)
                      .filter(([_, p]) => p.score && p.score > 90)
                      .map(([skillId]) => skillsData.find(s => s.id === skillId)?.title)
                      .join(', ')}
                  </div>
                </div>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h4 className="text-sm font-medium text-orange-600 mb-2">Areas for Improvement</h4>
                <div className="bg-orange-50 rounded-lg p-4 space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Current Focus:</strong> {Object.entries(student.progress)
                      .filter(([_, p]) => p.status === 'in-progress')
                      .map(([skillId]) => skillsData.find(s => s.id === skillId)?.title)
                      .join(', ')}
                  </div>
                  {strugglingAreas.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <strong>Need More Practice:</strong> {strugglingAreas.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* Teacher Recommendations */}
              <div>
                <h4 className="text-sm font-medium text-indigo-600 mb-2">Teacher Recommendations</h4>
                <div className="bg-indigo-50 rounded-lg p-4 space-y-3">
                  {strugglingAreas.length > 0 && (
                    <div className="text-sm text-gray-600">
                      • Consider reviewing {strugglingAreas[0]} with additional exercises
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    • Provide extra support with visual learning materials
                  </div>
                  <div className="text-sm text-gray-600">
                    • Schedule one-on-one session to address specific challenges
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <h4 className="text-sm font-medium text-blue-600 mb-2">Progress Timeline</h4>
                <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                  <div className="text-sm text-gray-600">
                    <strong>Current Level Progress:</strong> {completedSkills} of {currentLevel?.skills?.length || 0} skills completed
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Estimated Completion:</strong> {completedSkills >= 3 ? '2 weeks' : '4 weeks'}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Next Milestone:</strong> Complete current skill assessment
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Learning Style & Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="text-sm text-gray-600">
                  • Shows strong comprehension of foundational concepts
                </div>
                <div className="text-sm text-gray-600">
                  • Benefits from visual learning materials
                </div>
                <div className="text-sm text-gray-600">
                  • Consistent practice schedule with good engagement
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {Object.entries(student.progress)
                  .filter(([_, p]) => p.lastActivity)
                  .sort((a, b) => new Date(b[1].lastActivity!).getTime() - new Date(a[1].lastActivity!).getTime())
                  .slice(0, 5)
                  .map(([skillId, progress]) => (
                    <div key={skillId} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {skillsData.find(s => s.id === skillId)?.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(progress.lastActivity!).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${progress.status === 'completed' ? 'bg-green-100 text-green-800' :
                            progress.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {progress.status}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 