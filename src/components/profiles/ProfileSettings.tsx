import React from 'react';
import type { Profile, ProfileSettings } from '../../types/profile';

interface ProfileSettingsProps {
  profile: Profile;
  onUpdate: (id: string, settings: Partial<ProfileSettings>) => void;
}

export function ProfileSettings({ profile, onUpdate }: ProfileSettingsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.settings.rotationEnabled}
              onChange={(e) =>
                onUpdate(profile.id, { rotationEnabled: e.target.checked })
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">Enable Auto-Rotation</span>
          </label>
          
          {profile.settings.rotationEnabled && (
            <div className="mt-2">
              <label className="block text-sm text-gray-700">Rotation Interval (hours)</label>
              <input
                type="number"
                value={profile.settings.rotationInterval}
                onChange={(e) =>
                  onUpdate(profile.id, {
                    rotationInterval: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={profile.settings.warmupMode}
              onChange={(e) =>
                onUpdate(profile.id, { warmupMode: e.target.checked })
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-900">Enable Warmup Mode</span>
          </label>
          
          {profile.settings.warmupMode && (
            <div className="mt-2">
              <label className="block text-sm text-gray-700">Daily Message Limit</label>
              <input
                type="number"
                value={profile.settings.warmupMessageLimit}
                onChange={(e) =>
                  onUpdate(profile.id, {
                    warmupMessageLimit: parseInt(e.target.value, 10),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700">Daily Connection Limit</label>
          <input
            type="number"
            value={profile.settings.dailyLimit}
            onChange={(e) =>
              onUpdate(profile.id, {
                dailyLimit: parseInt(e.target.value, 10),
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}