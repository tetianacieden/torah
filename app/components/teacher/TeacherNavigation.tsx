"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  DocumentTextIcon,
  ChartBarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/teacher',
    icon: HomeIcon
  },
  {
    name: 'Classes',
    href: '/teacher/classes',
    icon: UsersIcon
  },
  {
    name: 'Assignments',
    href: '/teacher/assignments',
    icon: DocumentTextIcon
  },
  {
    name: 'Reports',
    href: '/teacher/reports',
    icon: ChartBarIcon
  }
];

export function TeacherNavigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 border-r border-gray-200">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Teacher Portal</h2>
          <ul className="space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center space-x-3 rounded-lg p-3
                      ${isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t">
          <Link 
            href="/"
            className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 rounded-lg p-3"
          >
            <AcademicCapIcon className="w-5 h-5" />
            <span>Switch to Student</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 