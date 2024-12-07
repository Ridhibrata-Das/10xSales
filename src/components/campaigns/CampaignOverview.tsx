import React from 'react';
import { Play, Pause, BarChart } from 'lucide-react';
import type { Campaign } from '../../types';

const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Sales Outreach',
    status: 'active',
    profiles: [],
    analytics: {
      connectRate: 45,
      responseRate: 28,
      messagesSent: 1250,
      connections: 562,
      responses: 350,
    },
  },
];

export function CampaignOverview() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Active Campaigns
        </h3>
      </div>
      <div className="border-t border-gray-200">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="px-4 py-5 sm:p-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {campaign.name}
                </h4>
                <div className="mt-1 flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {campaign.analytics.messagesSent} messages sent
                  </span>
                  <span className="text-sm text-gray-500">
                    {campaign.analytics.responseRate}% response rate
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200">
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </button>
                <button className="inline-flex items-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-sm font-medium leading-4 text-green-700 hover:bg-green-200">
                  {campaign.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}