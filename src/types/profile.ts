export type ProfileType = 'linkedin' | 'email';
export type ProfileStatus = 'active' | 'paused' | 'limited' | 'rotating';

export interface ProfileSettings {
  dailyLimit: number;
  rotationEnabled: boolean;
  rotationInterval: number; // in hours
  warmupMode: boolean;
  warmupMessageLimit: number;
}

export interface Profile {
  id: string;
  name: string;
  type: ProfileType;
  status: ProfileStatus;
  dailyLimit: number;
  usageToday: number;
  settings: ProfileSettings;
  lastRotation?: Date;
  nextRotation?: Date;
}