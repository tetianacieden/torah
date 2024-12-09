import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '@/data/curriculum/skills';
import { levelsData } from '@/data/curriculum/levels';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StudentDrawer } from './StudentDrawer';
import { StarIcon } from '@heroicons/react/24/solid';
import { TeacherInsights } from './TeacherInsights';

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

// Generate 25 students with realistic progress
const generateStudents = (): StudentProgress[] => {
  // Students who need support (below 82% average)
  const strugglingStudents = [
    {
      firstName: 'David',
      lastName: 'Klein',
      scoreRange: { min: 65, max: 75 }
    },
    {
      firstName: 'Sarah',
      lastName: 'Friedman',
      scoreRange: { min: 70, max: 80 }
    },
    {
      firstName: 'Michael',
      lastName: 'Shapiro',
      scoreRange: { min: 68, max: 78 }
    },
    {
      firstName: 'Rachel',
      lastName: 'Cohen',
      scoreRange: { min: 72, max: 81 }
    }
  ];

  // Regular and top performing students
  const otherStudents = [
    'Hannah Levy', 'Daniel Katz', 'Joshua Rosen', 'Rebecca Stern', 
    'Samuel Gold', 'Leah Weiss', 'Benjamin Friedman', 'Esther Klein',
    'Jacob Stern', 'Ruth Cohen', 'Noah Shapiro', 'Miriam Katz',
    'Adam Levy', 'Deborah Rosen', 'Isaac Gold', 'Naomi Weiss',
    'Joseph Klein', 'Abigail Stern', 'Aaron Cohen', 'Elizabeth Shapiro',
    'Nathan Friedman'
  ].map(name => {
    const [firstName, lastName] = name.split(' ');
    return { firstName, lastName };
  });

  const generateProgress = (isStruggling: boolean) => {
    const progress: { [key: string]: any } = {};

    skillsData.forEach(skill => {
      if (skill.id === 'text-markers') {
        // Text Markers is in progress for all students
        progress[skill.id] = {
          status: 'in-progress',
          score: Math.floor(Math.random() * 30) + 40, // Score between 40-69
          lastActivity: new Date().toISOString()
        };
      } else if (shouldBeCompleted(skill.id)) {
        // Completed skills
        const baseScore = isStruggling 
          ? Math.floor(Math.random() * 15) + 65 // 65-79 for struggling students
          : Math.floor(Math.random() * 15) + 85; // 85-99 for others
        progress[skill.id] = {
          status: 'completed',
          score: baseScore,
          lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
      } else {
        // Future skills
        progress[skill.id] = {
          status: 'not-started'
        };
      }
    });

    return progress;
  };

  // Generate all students
  const allStudents = [
    // First add struggling students
    ...strugglingStudents.map((student, index) => ({
      id: (index + 1).toString(),
      name: `${student.firstName} ${student.lastName}`,
      progress: generateProgress(true)
    })),
    // Then add other students
    ...otherStudents.map((student, index) => ({
      id: (index + strugglingStudents.length + 1).toString(),
      name: `${student.firstName} ${student.lastName}`,
      progress: generateProgress(false)
    }))
  ];

  return allStudents;
};

// Helper function to determine if a skill should be completed
const shouldBeCompleted = (skillId: string): boolean => {
  const skillOrder = skillsData.findIndex(s => s.id === skillId);
  const textMarkersOrder = skillsData.findIndex(s => s.id === 'text-markers');
  return skillOrder < textMarkersOrder;
};

const students = generateStudents();

const classes = [
  { id: '1', name: 'Class 7A' },
  { id: '2', name: 'Class 7B' },
  { id: '3', name: 'Class 8A' },
  { id: '4', name: 'Class 8B' },
];

function getScoreColor(score: number | undefined, status: string) {
  if (!score) return 'text-gray-400';
  if (score >= 90) return 'text-green-700 font-medium';
  if (score >= 80) return 'text-yellow-700 font-medium';
  return 'text-orange-700 font-medium';
}

function getStatusColor(status: string, score?: number) {
  switch (status) {
    case 'completed':
      return score && score >= 90 ? 'bg-green-500' : 'bg-yellow-500';
    case 'in-progress':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
}

export function TeacherTable() {
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const currentSkillRef = useRef<HTMLTableCellElement>(null);

  // Find first in-progress skill for auto-scrolling
  useEffect(() => {
    if (currentSkillRef.current && tableRef.current) {
      const scrollLeft = currentSkillRef.current.offsetLeft - 300;
      tableRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  // Find skills that have students in progress
  const skillsInProgress = new Set(
    students.flatMap(student => 
      Object.entries(student.progress)
        .filter(([_, progress]) => progress.status === 'in-progress')
        .map(([skillId]) => skillId)
    )
  );

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        {/* Class Selector */}
        <div className="relative min-w-[200px]">
          <button
            onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {selectedClass.name}
            </span>
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>

          {isClassDropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setIsClassDropdownOpen(false)}
              />
              
              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                {classes.map((classItem) => (
                  <button
                    key={classItem.id}
                    onClick={() => {
                      setSelectedClass(classItem);
                      setIsClassDropdownOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-50
                      ${classItem.id === selectedClass.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                      ${classItem.id === classes[classes.length - 1].id ? '' : 'border-b border-gray-100'}
                    `}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {classItem.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Insights */}
      <TeacherInsights 
        students={students} 
        onSelectStudent={setSelectedStudent}
      />

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Student Progress</h2>
        </div>

        {/* Table Wrapper */}
        <div className="max-h-[calc(100vh-280px)] overflow-auto">
          <div ref={tableRef} className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-20">
                {/* Level Headers Row */}
                <tr>
                  {/* Empty cell for student column */}
                  <th className="sticky left-0 z-30 bg-gray-50 px-6 py-3 border-b border-gray-200" rowSpan={2}>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </div>
                  </th>
                  
                  {/* Level Headers */}
                  {levelsData.map((level, levelIndex) => {
                    const levelSkills = skillsData.filter(skill => skill.level === level.id.toString());
                    const isInProgress = levelSkills.some(skill => skillsInProgress.has(skill.id));
                    return (
                      <th 
                        key={level.id} 
                        colSpan={levelSkills.length}
                        className={`
                          px-6 py-2 text-center border-b border-gray-200
                          ${isInProgress ? 'bg-blue-100' : levelIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
                        `}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className={`
                            inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium
                            ${isInProgress ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
                          `}>
                            {level.id}
                          </span>
                          <span className={`
                            text-sm font-medium
                            ${isInProgress ? 'text-blue-900' : 'text-gray-900'}
                          `}>
                            {level.title}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>

                {/* Skill Headers Row */}
                <tr>
                  {levelsData.map((level, levelIndex) => (
                    <React.Fragment key={level.id}>
                      {skillsData
                        .filter(skill => skill.level === level.id.toString())
                        .sort((a, b) => a.order - b.order)
                        .map(skill => {
                          const isInProgress = skillsInProgress.has(skill.id);
                          return (
                            <th 
                              key={skill.id} 
                              className={`
                                px-4 py-3 border-r border-gray-200
                                ${isInProgress ? 'bg-blue-100' : levelIndex % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
                              `}
                            >
                              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider max-w-[120px]">
                                {skill.title}
                              </div>
                            </th>
                          );
                        })}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="divide-x divide-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    {/* Fixed student column */}
                    <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap hover:bg-gray-50">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>

                    {/* Dynamic skill columns */}
                    {levelsData.map((level, levelIndex) => (
                      <React.Fragment key={level.id}>
                        {skillsData
                          .filter(skill => skill.level === level.id.toString())
                          .sort((a, b) => a.order - b.order)
                          .map(skill => {
                            const progress = student.progress[skill.id];
                            const isInProgress = skillsInProgress.has(skill.id);
                            const isHighScore = progress?.score && progress.score >= 95;
                            
                            return (
                              <td 
                                key={skill.id} 
                                ref={isInProgress ? currentSkillRef : null}
                                className={`
                                  px-4 py-4 whitespace-nowrap
                                  ${isInProgress ? 'bg-blue-100' : levelIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                                  ${progress?.status === 'in-progress' ? 'bg-blue-200' : ''}
                                `}
                              >
                                <div className="flex items-center justify-center gap-2">
                                  {isHighScore ? (
                                    <StarIcon className="h-4 w-4 text-yellow-400" />
                                  ) : (
                                    <div 
                                      className={`h-3 w-3 rounded-full ${getStatusColor(progress?.status, progress?.score)}`}
                                    />
                                  )}
                                  <span className={getScoreColor(progress?.score, progress?.status)}>
                                    {progress?.score || '-'}
                                  </span>
                                </div>
                              </td>
                            );
                          })}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">
                  {searchTerm 
                    ? "No students found matching your search" 
                    : "No students in this class yet"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Drawer */}
      <StudentDrawer 
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
} 