import React from 'react';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { MessageSquare, Users, Clock, TrendingUp } from 'lucide-react';
import type { CommunicationStats, TimeSeriesData } from '../../types/communication';

interface AnalyticsDashboardProps {
  stats: CommunicationStats;
  timeSeriesData: TimeSeriesData[];
}

export function AnalyticsDashboard({ stats, timeSeriesData }: AnalyticsDashboardProps) {
  const metrics = [
    {
      name: 'Total Messages',
      value: stats.totalMessages,
      icon: MessageSquare,
      change: '+12%',
    },
    {
      name: 'Response Rate',
      value: `${(stats.responseRate * 100).toFixed(1)}%`,
      icon: TrendingUp,
      change: '+2.3%',
    },
    {
      name: 'Avg Response Time',
      value: `${stats.averageResponseTime}h`,
      icon: Clock,
      change: '-1.5h',
    },
    {
      name: 'New Connections',
      value: stats.messagesByType.connection,
      icon: Users,
      change: '+8%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <metric.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {metric.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {metric.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="#6366F1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="responses"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Types</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(stats.messagesByType).map(([type, count]) => ({
                type,
                count,
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}