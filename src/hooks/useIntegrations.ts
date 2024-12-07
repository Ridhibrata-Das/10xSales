import { useState, useCallback } from 'react';
import type { CRMIntegration, CRMProvider, APIKey } from '../types/integration';

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<CRMIntegration[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);

  const addIntegration = useCallback(async (provider: CRMProvider) => {
    const newIntegration: CRMIntegration = {
      id: Date.now().toString(),
      provider,
      name: `${provider.charAt(0).toUpperCase()}${provider.slice(1)} Integration`,
      isActive: false,
      config: {
        mappings: {},
      },
      status: 'disconnected',
    };

    setIntegrations(current => [...current, newIntegration]);
    return newIntegration;
  }, []);

  const updateIntegration = useCallback((
    id: string,
    updates: Partial<CRMIntegration>
  ) => {
    setIntegrations(current =>
      current.map(integration =>
        integration.id === id
          ? { ...integration, ...updates }
          : integration
      )
    );
  }, []);

  const generateApiKey = useCallback((name: string, scopes: string[]) => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name,
      key: `sk_${Math.random().toString(36).slice(2)}`,
      scopes,
      createdAt: new Date(),
    };

    setApiKeys(current => [...current, newKey]);
    return newKey;
  }, []);

  return {
    integrations,
    apiKeys,
    addIntegration,
    updateIntegration,
    generateApiKey,
  };
}