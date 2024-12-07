import React from 'react';
import { Link2, Settings, RefreshCw, AlertCircle } from 'lucide-react';
import type { CRMIntegration } from '../../types/integration';

interface CRMIntegrationCardProps {
  integration: CRMIntegration;
  onConfigure: (integration: CRMIntegration) => void;
  onSync: (integration: CRMIntegration) => void;
}

export function CRMIntegrationCard({
  integration,
  onConfigure,
  onSync,
}: CRMIntegrationCardProps) {
  const getStatusColor = (status: CRMIntegration['status']) => {
    switch (status) {
      case 'connected':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link2 className="h-6 w-6 text-indigo-500" />
          <h3 className="ml-2 text-lg font-medium text-gray-900">
            {integration.name}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          {integration.status === 'error' && (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <button
            onClick={() => onSync(integration)}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <button
            onClick={() => onConfigure(integration)}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className={getStatusColor(integration.status)}>
          {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
        </span>
        {integration.lastSync && (
          <span className="text-gray-500">
            Last synced: {new Date(integration.lastSync).toLocaleString()}
          </span>
        )}
      </div>

      {integration.status === 'connected' && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div>
            <span className="block font-medium text-gray-700">Webhook URL</span>
            <span className="truncate">{integration.config.webhookUrl}</span>
          </div>
          <div>
            <span className="block font-medium text-gray-700">Field Mappings</span>
            <span>{Object.keys(integration.config.mappings).length} configured</span>
          </div>
        </div>
      )}
    </div>
  );
}