import { useState, useCallback } from 'react';
import type { Lead, LeadList, LeadFilter } from '../types/lead';

export function useLeadGeneration() {
  const [lists, setLists] = useState<LeadList[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateLeads = useCallback(async (filters: LeadFilter[]) => {
    setIsGenerating(true);
    try {
      // Simulated lead generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newLeads: Lead[] = [
        {
          id: Date.now().toString(),
          firstName: 'John',
          lastName: 'Doe',
          title: 'CEO',
          company: 'Tech Corp',
          industry: 'Technology',
          location: 'San Francisco, CA',
          linkedinUrl: 'https://linkedin.com/in/johndoe',
          tags: ['tech', 'decision-maker'],
          status: 'new',
          score: 85,
          lastActivity: new Date(),
          notes: '',
        },
      ];

      return newLeads;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const createList = useCallback((name: string, description: string) => {
    const newList: LeadList = {
      id: Date.now().toString(),
      name,
      description,
      leads: [],
      filters: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setLists(current => [...current, newList]);
    return newList;
  }, []);

  const updateList = useCallback((listId: string, updates: Partial<LeadList>) => {
    setLists(current =>
      current.map(list =>
        list.id === listId
          ? { ...list, ...updates, updatedAt: new Date() }
          : list
      )
    );
  }, []);

  return {
    lists,
    isGenerating,
    generateLeads,
    createList,
    updateList,
  };
}