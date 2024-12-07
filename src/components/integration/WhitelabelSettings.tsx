import React from 'react';
import { Upload } from 'lucide-react';
import type { WhitelabelConfig } from '../../types/integration';

interface WhitelabelSettingsProps {
  config: WhitelabelConfig;
  onUpdate: (updates: Partial<WhitelabelConfig>) => void;
}

export function WhitelabelSettings({ config, onUpdate }: WhitelabelSettingsProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Whitelabel Settings
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              value={config.companyName}
              onChange={(e) => onUpdate({ companyName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <div className="mt-1 flex items-center">
              {config.logo ? (
                <div className="relative">
                  <img
                    src={config.logo}
                    alt="Company logo"
                    className="h-12 w-auto"
                  />
                  <button
                    onClick={() => onUpdate({ logo: undefined })}
                    className="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                  >
                    <span className="sr-only">Remove logo</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-12 w-12 rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                  className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                  className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Secondary Color
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                  className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={config.secondaryColor}
                  onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                  className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custom Domain
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                type="text"
                value={config.customDomain || ''}
                onChange={(e) => onUpdate({ customDomain: e.target.value })}
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="app.yourdomain.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Font Family
            </label>
            <select
              value={config.fontFamily}
              onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="opensans">Open Sans</option>
              <option value="lato">Lato</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}