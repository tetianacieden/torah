import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, UserGroupIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@headlessui/react';

interface Student {
  id: string;
  name: string;
  averageScore: number;
  lastActive: string;
  group?: string;
}

interface Class {
  id: string;
  name: string;
  students: Student[];
  groups: Group[];
  averageProgress: number;
  lastActivity: string;
}

interface Group {
  id: string;
  name: string;
  students: string[]; // Student IDs
  skillFocus?: string;
}

export function ClassManagement() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Class 7B',
      students: [
        {
          id: '1',
          name: 'David Klein',
          averageScore: 75,
          lastActive: '2024-03-15',
          group: 'text-markers-practice'
        },
        // ... more students
      ],
      groups: [
        {
          id: 'text-markers-practice',
          name: 'Text Markers Practice',
          students: ['1', '2', '3'],
          skillFocus: 'text-markers'
        }
      ],
      averageProgress: 68,
      lastActivity: '2024-03-15'
    }
  ]);

  const [isNewClassOpen, setIsNewClassOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Classes</h1>
        <button 
          onClick={() => setIsNewClassOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700"
        >
          <PlusIcon className="h-4 w-4" />
          New Class
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Cards */}
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-lg shadow">
            {/* Class Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{cls.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {cls.students.length} students
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <PencilIcon className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <TrashIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Class Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Average Progress</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {cls.averageProgress}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Groups</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {cls.groups.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Student Groups */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-900">Groups</h3>
                <button 
                  onClick={() => {
                    setSelectedClass(cls);
                    setIsNewGroupOpen(true);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Create Group
                </button>
              </div>

              <div className="space-y-3">
                {cls.groups.map((group) => (
                  <div 
                    key={group.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {group.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {group.students.length} students
                        </p>
                      </div>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Class Modal */}
      <Dialog
        open={isNewClassOpen}
        onClose={() => setIsNewClassOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white rounded-lg max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Create New Class
            </Dialog.Title>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Class 7B"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewClassOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create Class
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* New Group Modal */}
      <Dialog
        open={isNewGroupOpen}
        onClose={() => setIsNewGroupOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white rounded-lg max-w-md w-full p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Create Study Group
            </Dialog.Title>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Group Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Text Markers Practice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Skill Focus</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="text-markers">Text Markers</option>
                  <option value="vowel-marks">Vowel Marks</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Students</label>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                  {selectedClass?.students.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student.id]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-900">{student.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewGroupOpen(false);
                    setSelectedStudents([]);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create Group
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 