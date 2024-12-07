import { useState, useCallback } from 'react';
import type { Automation, AutomationStep } from '../types/automation';

export function useAutomation() {
  const [automations, setAutomations] = useState<Automation[]>([]);

  const createAutomation = useCallback((name: string, description: string) => {
    const newAutomation: Automation = {
      id: Date.now().toString(),
      name,
      description,
      isActive: false,
      steps: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setAutomations(current => [...current, newAutomation]);
    return newAutomation;
  }, []);

  const updateAutomation = useCallback((
    automationId: string,
    updates: Partial<Automation>
  ) => {
    setAutomations(current =>
      current.map(automation =>
        automation.id === automationId
          ? { ...automation, ...updates, updatedAt: new Date() }
          : automation
      )
    );
  }, []);

  const addStep = useCallback((
    automationId: string,
    step: Omit<AutomationStep, 'id'>
  ) => {
    const newStep: AutomationStep = {
      ...step,
      id: Date.now().toString(),
    };

    setAutomations(current =>
      current.map(automation =>
        automation.id === automationId
          ? {
              ...automation,
              steps: [...automation.steps, newStep],
              updatedAt: new Date(),
            }
          : automation
      )
    );

    return newStep;
  }, []);

  return {
    automations,
    createAutomation,
    updateAutomation,
    addStep,
  };
}