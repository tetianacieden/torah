import { useState } from 'react';
import { ChartBarIcon, DocumentTextIcon, ArrowDownTrayIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ClassProgress {
  skillId: string;
  skillName: string;
  averageScore: number;
  completionRate: number;
  strugglingStudents: number;
}

interface Report {
  id: string;
  title: string;
  type: 'progress' | 'assessment' | 'summary';
  date: string;
  downloadUrl: string;
}

export function ReportsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Sample data for charts
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Class Average',
        data: [65, 72, 78, 82],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'Completion Rate',
        data: [40, 55, 70, 85],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4,
      },
    ],
  };

  const skillProgressData = {
    labels: ['Text Markers', 'Letter Recognition', 'Vowel Marks', 'Basic Reading'],
    datasets: [{
      label: 'Average Score',
      data: [75, 85, 68, 92],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
    }],
  };

  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Progress Report',
      type: 'progress',
      date: '2024-03-01',
      downloadUrl: '#'
    },
    // ... more reports
  ];

  const classProgress: ClassProgress[] = [
    {
      skillId: 'text-markers',
      skillName: 'Text Markers',
      averageScore: 75,
      completionRate: 68,
      strugglingStudents: 8
    },
    // ... more skills
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-6">
            <ChartBarIcon className="h-5 w-5 text-blue-500" />
            Class Progress
          </h2>
          <div className="h-64">
            <Line 
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Skill Performance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-6">
            <UserGroupIcon className="h-5 w-5 text-blue-500" />
            Skill Performance
          </h2>
          <div className="h-64">
            <Bar 
              data={skillProgressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Detailed Skill Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Skill Analysis</h2>
          <div className="space-y-4">
            {classProgress.map((skill) => (
              <div 
                key={skill.skillId}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSkill(skill.skillId)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{skill.skillName}</h3>
                    <p className="text-sm text-gray-500">
                      {skill.strugglingStudents} students need help
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {skill.averageScore}% avg
                    </div>
                    <div className="text-sm text-gray-500">
                      {skill.completionRate}% completed
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${skill.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Reports */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
            <DocumentTextIcon className="h-5 w-5 text-blue-500" />
            Available Reports
          </h2>
          <div className="space-y-3">
            {reports.map((report) => (
              <div 
                key={report.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">
                    Generated on {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}