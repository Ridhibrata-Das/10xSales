import { useQuery } from 'react-query';
import type { Message, CommunicationStats, TimeSeriesData } from '../types/communication';

export function useCommunication(profileId: string) {
  const { data: messages, isLoading: isLoadingMessages } = useQuery<Message[]>(
    ['messages', profileId],
    async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [];
    }
  );

  const { data: stats, isLoading: isLoadingStats } = useQuery<CommunicationStats>(
    ['stats', profileId],
    async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        totalMessages: 1250,
        responseRate: 0.32,
        averageResponseTime: 4.5,
        sentimentDistribution: {
          positive: 0.45,
          neutral: 0.40,
          negative: 0.15,
        },
        messagesByType: {
          connection: 450,
          message: 600,
          follow_up: 150,
          inmail: 50,
        },
      };
    }
  );

  const { data: timeSeriesData, isLoading: isLoadingTimeSeries } = useQuery<TimeSeriesData[]>(
    ['timeSeries', profileId],
    async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return Array.from({ length: 14 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        messages: Math.floor(Math.random() * 50) + 50,
        responses: Math.floor(Math.random() * 20) + 10,
        connections: Math.floor(Math.random() * 10) + 5,
      })).reverse();
    }
  );

  return {
    messages,
    stats,
    timeSeriesData,
    isLoading: isLoadingMessages || isLoadingStats || isLoadingTimeSeries,
  };
}