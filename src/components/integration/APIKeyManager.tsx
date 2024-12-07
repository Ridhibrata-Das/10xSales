import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import type { APIKey } from '../../types/integration';

interface APIKeyManagerProps {
  apiKeys: APIKey[];
  onGenerateKey: (name: string, scopes: string[]) => void;
  onDeleteKey: (id: string) => void;
}

export function APIKeyManager({
  apiKeys,
  onGenerateKey,
  onDeleteKey,
}: APIKeyManagerProps) {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
  };

  const availableScopes = [
    'read:leads',
    'write:leads',
    'read:campaigns',
    'write:campaigns',
    'read:analytics',
  ];

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">API Keys</h3>

        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Key Name
              </label>
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter key name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Scopes
              </label>
              <div className="mt-2 space-y-2">
                {availableScopes.map((scope) => (
                  <label key={scope} className="inline-flex items-center mr-4">
                    <input
                      type="checkbox"
                      checked={selectedScopes.includes(scope)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedScopes([...selectedScopes, scope]);
                        } else {
                          setSelectedScopes(
                            selectedScopes.filter((s) => s !== scope)
                          );
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{scope}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (newKeyName && selectedScopes.length > 0) {
                onGenerateKey(newKeyName, selectedScopes);
                setNewKeyName('');
                setSelectedScopes([]);
              }
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Key className="h-4 w-4 mr-2" />
            Generate New Key
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {apiKey.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    Created: {apiKey.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteKey(apiKey.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <code className="flex-1 bg-gray-50 px-2 py-1 rounded">
                  {showKey[apiKey.id]
                    ? apiKey.key
                    : '•'.repeat(20)}
                </code>
                <button
                  onClick={() => handleCopyKey(apiKey.key)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setShowKey((current) => ({
                      ...current,
                      [apiKey.id]: !current[apiKey.id],
                    }))
                  }
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showKey[apiKey.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {apiKey.scopes.map((scope) => (
                  <span
                    key={scope}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}