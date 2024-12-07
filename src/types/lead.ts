import { z } from 'zod';

export const LeadSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  company: z.string(),
  industry: z.string(),
  location: z.string(),
  email: z.string().email().optional(),
  linkedinUrl: z.string().url(),
  tags: z.array(z.string()),
  status: z.enum(['new', 'contacted', 'responded', 'converted', 'archived']),
  score: z.number().min(0).max(100),
  lastActivity: z.date(),
  notes: z.string(),
});

export type Lead = z.infer<typeof LeadSchema>;

export interface LeadList {
  id: string;
  name: string;
  description: string;
  leads: Lead[];
  filters: LeadFilter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFilter {
  field: keyof Lead;
  operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number | Date;
}