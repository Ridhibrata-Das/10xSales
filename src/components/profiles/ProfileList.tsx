import React, { useState } from 'react';
import { useProfiles } from '../../hooks/useProfiles';
import { ProfileCard } from './ProfileCard';
import { ProfileSettings } from './ProfileSettings';
import type { Profile } from '../../types/profile';

export function ProfileList() {
  const { profiles, updateProfileStatus, updateProfileSettings } = useProfiles();
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onStatusChange={updateProfileStatus}
            onSettingsClick={setSelectedProfile}
          />
        ))}
      </div>

      {selectedProfile && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-lg w-full">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProfileSettings
              profile={selectedProfile}
              onUpdate={updateProfileSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
}