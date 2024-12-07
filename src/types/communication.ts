import { z } from 'zod';

export const MessageSchema = z.object({
  id: z.string(),
  profileId: z.string(),
  leadId: z.string(),
  type: z.enum(['connection', 'message', 'follow_up', 'inmail']),
  content: z.string(),
  sentiment: z.enum(['positive', 'neutral', 'negative']).optional(),
  status: z.enum(['sent', 'delivered', 'read', 'replied']),
  timestamp: z.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type Message = z.infer<typeof MessageSchema>;

export interface CommunicationStats {
  totalMessages: number;
  responseRate: number;
  averageResponseTime: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  messagesByType: Record<Message['type'], number>;
}

export interface TimeSeriesData {
  date: string;
  messages: number;
  responses: number;
  connections: number;
}