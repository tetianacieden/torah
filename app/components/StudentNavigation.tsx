import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpenIcon,
  TrophyIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { ViewSwitcher } from './ViewSwitcher';

const menuItems = [
  {
    name: 'My Progress',
    href: '/',
    icon: BookOpenIcon
  },
  {
    name: 'Achievements',
    href: '/achievements',
    icon: TrophyIcon
  },
  {
    name: 'Help',
    href: '/help',
    icon: QuestionMarkCircleIcon
  }
];

export function StudentNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <item.icon 
                  className={`
                    mr-3 h-5 w-5
                    ${isActive ? 'text-blue-700' : 'text-gray-400'}
                  `}
                />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* View Switcher */}
        <div className="p-4 border-t border-gray-200">
          <ViewSwitcher />
        </div>

        {/* Student Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">ST</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Student Name</p>
              <p className="text-xs text-gray-500">student@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 