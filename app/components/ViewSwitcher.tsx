import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export function ViewSwitcher() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchView = (view: 'student' | 'teacher') => {
    setIsOpen(false);
    router.push(view === 'student' ? '/' : '/teacher');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
        Switch View
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            <button
              onClick={() => switchView('student')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Student View
            </button>
            <button
              onClick={() => switchView('teacher')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Teacher View
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 