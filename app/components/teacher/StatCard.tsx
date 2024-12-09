interface StatCardProps {
  title: string;
  value: number | string;
  trend: string;
}

export function StatCard({ title, value, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="mt-2 flex items-center">
        {trend.startsWith('↑') ? (
          <span className="text-sm text-green-600">{trend}</span>
        ) : trend.startsWith('↓') ? (
          <span className="text-sm text-red-600">{trend}</span>
        ) : (
          <span className="text-sm text-gray-500">{trend}</span>
        )}
      </div>
    </div>
  );
}
