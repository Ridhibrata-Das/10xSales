import React from 'react';
import { Play, Pause, Plus, Settings } from 'lucide-react';
import type { Automation, AutomationStep } from '../../types/automation';

interface AutomationBuilderProps {
  automation: Automation;
  onUpdateStep: (stepId: string, updates: Partial<AutomationStep>) => void;
  onToggleActive: (automationId: string) => void;
}

export function AutomationBuilder({ 
  automation, 
  onUpdateStep, 
  onToggleActive 
}: AutomationBuilderProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {automation.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {automation.description}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => onToggleActive(automation.id)}
              className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium ${
                automation.isActive
                  ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
                  : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
              }`}
            >
              {automation.isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {automation.steps.map((step) => (
            <div
              key={step.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {step.type.charAt(0).toUpperCase() + step.type.slice(1)}:
                  {' '}
                  {step.config.triggerType || step.config.actionType}
                </span>
                <button className="text-gray-400 hover:text-gray-500">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
              {step.config.delay && (
                <p className="mt-1 text-sm text-gray-500">
                  Delay: {step.config.delay} minutes
                </p>
              )}
            </div>
          ))}
          
          <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-indigo-500 transition-colors">
            <Plus className="h-5 w-5 mx-auto text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Add Step
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}