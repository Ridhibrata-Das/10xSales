export interface Profile {
  id: string;
  name: string;
  type: 'linkedin' | 'email';
  status: 'active' | 'paused' | 'limited';
  dailyLimit: number;
  usageToday: number;
}

export interface Analytics {
  connectRate: number;
  responseRate: number;
  messagesSent: number;
  connections: number;
  responses: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  profiles: Profile[];
  analytics: Analytics;
}