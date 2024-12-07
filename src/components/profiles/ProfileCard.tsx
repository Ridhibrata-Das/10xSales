import React from 'react';
import { LinkedinIcon, Mail, AlertCircle, Settings, RotateCcw, Clock } from 'lucide-react';
import type { Profile } from '../../types/profile';

interface ProfileCardProps {
  profile: Profile;
  onStatusChange: (id: string, status: Profile['status']) => void;
  onSettingsClick: (profile: Profile) => void;
}

export function ProfileCard({ profile, onStatusChange, onSettingsClick }: ProfileCardProps) {
  const getStatusColor = (status: Profile['status']) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'limited': return 'text-yellow-500';
      case 'paused': return 'text-gray-500';
      case 'rotating': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const formatNextRotation = (date?: Date) => {
    if (!date) return 'Not scheduled';
    const hours = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60));
    return `${hours}h`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {profile.type === 'linkedin' ? (
            <LinkedinIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <Mail className="h-5 w-5 text-gray-600" />
          )}
          <span className="ml-2 font-medium text-gray-900">{profile.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          {profile.status === 'limited' && (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
          <button
            onClick={() => onSettingsClick(profile)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Settings className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <RotateCcw className={`h-4 w-4 ${getStatusColor(profile.status)}`} />
          <span className={getStatusColor(profile.status)}>
            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-gray-500">
            Next: {formatNextRotation(profile.nextRotation)}
          </span>
        </div>
      </div>

      <div className="mt-4 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-indigo-500 rounded-full"
          style={{ width: `${(profile.usageToday / profile.dailyLimit) * 100}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-500">
        <span>{profile.usageToday} used today</span>
        <span>{profile.dailyLimit} limit</span>
      </div>
    </div>
  );
}