import { ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { skillsData } from '@/data/curriculum/skills';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

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

interface SkillProgress {
  skillId: string;
  skillName: string;
  score: number;
}

interface SkillIssue {
  skillId: string;
  skillName: string;
  score: number;
  specificIssues: string[];
}

interface StudentInsight {
  student: StudentProgress;
  averageRecentScore: number;
  strugglingSkills: SkillIssue[];
}

interface TeacherInsightsProps {
  students: StudentProgress[];
  onSelectStudent: (student: StudentProgress) => void;
}

export function TeacherInsights({ students, onSelectStudent }: TeacherInsightsProps) {
  // Calculate insights
  const needsAttention: StudentInsight[] = students
    .map(student => {
      const recentScores = Object.entries(student.progress)
        .filter(([_, p]) => p.score !== undefined && p.status === 'completed')
        .sort((a, b) => {
          const dateA = a[1].lastActivity ? new Date(a[1].lastActivity).getTime() : 0;
          const dateB = b[1].lastActivity ? new Date(b[1].lastActivity).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 3);

      const averageRecentScore = recentScores.length > 0 
        ? recentScores.reduce((acc, [_, p]) => acc + (p.score || 0), 0) / recentScores.length
        : 0;
      
      const strugglingSkills = Object.entries(student.progress)
        .filter(([_, p]) => p.score !== undefined && p.score < 85)
        .map(([skillId, progress]) => {
          const skill = skillsData.find(s => s.id === skillId);
          const specificIssues = getSkillSpecificIssues(skillId, progress.score || 0);
          
          return {
            skillId,
            skillName: skill?.title || 'Unknown Skill',
            score: progress.score || 0,
            specificIssues
          };
        })
        .sort((a, b) => a.score - b.score);

      return {
        student,
        averageRecentScore,
        strugglingSkills
      };
    })
    .filter(data => data.averageRecentScore < 82)
    .sort((a, b) => a.averageRecentScore - b.averageRecentScore);

  const topPerformers = students
    .map(student => {
      const completedSkills = Object.values(student.progress).filter(p => p.status === 'completed').length;
      const averageScore = Object.values(student.progress)
        .filter(p => p.score)
        .reduce((acc, curr) => acc + (curr.score || 0), 0) / completedSkills;
      
      return {
        student,
        averageScore,
        completedSkills
      };
    })
    .filter(data => data.averageScore > 90)
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  // Calculate class trends
  const classStats = {
    recentTrend: 5.2, // Positive percentage indicates improvement
    mostChallenging: 'Text Markers',
    upcomingSkills: ['Verse Navigation', 'Chapter Structure'],
    studentsAtRisk: needsAttention.length,
    lastWeekProgress: 12 // Number of skills completed last week
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Students Needing Support */}
      <div className="bg-white rounded-lg shadow flex flex-col h-[420px]">
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
              Students Needing Support
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-orange-600 font-medium">
                {needsAttention.length} students
              </span>
              {classStats.recentTrend > 0 ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-4">
          {needsAttention.map(({ student, averageRecentScore, strugglingSkills }) => (
            <div key={student.id} className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <span>Average: {Math.round(averageRecentScore)}%</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      Last active 2d ago
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectStudent(student)}
                  className="text-sm text-orange-600 font-medium hover:text-orange-700 whitespace-nowrap"
                >
                  View Details →
                </button>
              </div>
              
              {/* Main struggling skill and specific issues */}
              <div className="text-sm space-y-2">
                <div className="text-orange-600 font-medium flex items-center justify-between">
                  <span>Current: {strugglingSkills[0]?.skillName}</span>
                  <span className="text-sm text-gray-500">
                    Score: {strugglingSkills[0]?.score}%
                  </span>
                </div>
                <div className="pl-4 text-gray-600 space-y-1">
                  {strugglingSkills[0]?.specificIssues.map((issue, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-orange-400"></div>
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class Insights */}
      <div className="bg-white rounded-lg shadow h-[420px] flex flex-col">
        <div className="flex-shrink-0 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-500" />
              Class Insights
            </h3>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Weekly Progress */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-blue-500" />
              This Week's Progress
            </h4>
            <div className="bg-blue-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Skills Completed</span>
                <span className="font-medium text-blue-700">{classStats.lastWeekProgress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Most Challenging</span>
                <span className="font-medium text-orange-600">{classStats.mostChallenging}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Students at Risk</span>
                <span className="font-medium text-red-600">{classStats.studentsAtRisk}</span>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              Top Performers
            </h4>
            <div className="space-y-2">
              {topPerformers.map(({ student, averageScore }) => (
                <div key={student.id} 
                  className="flex items-center justify-between p-2 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100"
                  onClick={() => onSelectStudent(student)}
                >
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-green-600">{Math.round(averageScore)}% avg</div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Up */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Coming Up</h4>
            <div className="space-y-2">
              {classStats.upcomingSkills.map((skill) => (
                <div key={skill} className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">{skill}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(students.length * 0.8)} students ready to start
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-500">Class Average</div>
              <div className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  students.reduce((acc, student) => {
                    const scores = Object.values(student.progress).filter(p => p.score);
                    return acc + scores.reduce((sum, p) => sum + (p.score || 0), 0) / scores.length;
                  }, 0) / students.length
                )}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Completion Rate</div>
              <div className="text-2xl font-semibold text-gray-900">
                {Math.round(
                  (students.reduce((acc, student) => {
                    const completedCount = Object.values(student.progress)
                      .filter(p => p.status === 'completed').length;
                    const totalSkills = Object.keys(student.progress).length;
                    return acc + completedCount;
                  }, 0) / (students.length * Object.keys(students[0]?.progress || {}).length)) * 100
                )}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate skill-specific issues
function getSkillSpecificIssues(skillId: string, score: number): string[] {
  const issues: Record<string, string[]> = {
    'letter-recognition': [
      'Difficulty distinguishing similar letters',
      'Slow recognition speed',
      'Confusion with final letter forms'
    ],
    'vowel-marks': [
      'Inconsistent vowel application',
      'Mixing up similar vowel sounds',
      'Difficulty with compound vowels'
    ],
    'text-markers': [
      'Trouble identifying cantillation marks',
      'Inconsistent pronunciation',
      'Difficulty with special marks'
    ]
  };

  // Return 1-2 relevant issues based on the skill
  const skillIssues = issues[skillId] || ['Needs additional practice'];
  return skillIssues.slice(0, score < 70 ? 2 : 1);
}