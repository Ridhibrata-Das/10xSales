import React from 'react';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { ProfileList } from './components/profiles/ProfileList';
import { CampaignOverview } from './components/campaigns/CampaignOverview';
import { LayoutGrid } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <LayoutGrid className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  10xSales
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <DashboardStats />
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ProfileList />
              <CampaignOverview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;