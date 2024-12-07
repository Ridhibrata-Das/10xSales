import { z } from 'zod';

export const CRMProviderSchema = z.enum(['hubspot', 'pipedrive', 'zoho']);
export type CRMProvider = z.infer<typeof CRMProviderSchema>;

export interface CRMIntegration {
  id: string;
  provider: CRMProvider;
  name: string;
  isActive: boolean;
  config: {
    apiKey?: string;
    webhookUrl?: string;
    mappings: Record<string, string>;
  };
  lastSync?: Date;
  status: 'connected' | 'disconnected' | 'error';
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  scopes: string[];
  createdAt: Date;
  lastUsed?: Date;
}

export interface WhitelabelConfig {
  companyName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customDomain?: string;
  favicon?: string;
}