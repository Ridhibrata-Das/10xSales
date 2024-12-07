import React from 'react';
import { BarChart3, Users, MessageCircle, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Profiles',
    value: '50+',
    change: '+12%',
    icon: Users,
  },
  {
    name: 'Response Rate',
    value: '32.9%',
    change: '+4.3%',
    icon: MessageCircle,
  },
  {
    name: 'Campaigns Active',
    value: '12',
    change: '+2',
    icon: BarChart3,
  },
  {
    name: 'Conversion Rate',
    value: '28.5%',
    change: '+2.4%',
    icon: TrendingUp,
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}