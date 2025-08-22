import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type JobAd = {
  id: string;
  type: 'offer' | 'request';
  title: string;
  company?: string;
  city: string;
  contractType?: string;
  workSchedule: 'full-time' | 'part-time';
  user: { name: string; avatar: string; dataAiHint?: string };
  postedAt: string;
  details: any;
};

export const useGetJobs = (): UseQueryResult<JobAd[], any> => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await apiClient.get<JobAd[]>('/jobs');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

