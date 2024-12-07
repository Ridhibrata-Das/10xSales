import { useState, useCallback } from 'react';
import type { Profile, ProfileStatus, ProfileSettings } from '../types/profile';

const DEFAULT_SETTINGS: ProfileSettings = {
  dailyLimit: 100,
  rotationEnabled: true,
  rotationInterval: 24,
  warmupMode: true,
  warmupMessageLimit: 20,
};

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'John LinkedIn',
      type: 'linkedin',
      status: 'active',
      dailyLimit: 100,
      usageToday: 45,
      settings: { ...DEFAULT_SETTINGS },
      nextRotation: new Date(Date.now() + 8 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'sales@company.com',
      type: 'email',
      status: 'limited',
      dailyLimit: 200,
      usageToday: 198,
      settings: { ...DEFAULT_SETTINGS, warmupMode: false },
      nextRotation: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
  ]);

  const updateProfileStatus = useCallback((id: string, status: ProfileStatus) => {
    setProfiles(current =>
      current.map(profile =>
        profile.id === id ? { ...profile, status } : profile
      )
    );
  }, []);

  const updateProfileSettings = useCallback((id: string, settings: Partial<ProfileSettings>) => {
    setProfiles(current =>
      current.map(profile =>
        profile.id === id
          ? { ...profile, settings: { ...profile.settings, ...settings } }
          : profile
      )
    );
  }, []);

  return {
    profiles,
    updateProfileStatus,
    updateProfileSettings,
  };
}