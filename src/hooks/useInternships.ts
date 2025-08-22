import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type InternshipAd = {
  id: string;
  type: 'offer' | 'request';
  title: string;
  company?: string;
  city: string;
  contractType: 'Stage' | 'Alternance';
  workSchedule: 'full-time' | 'part-time';
  user: { name: string; avatar: string; dataAiHint?: string };
  postedAt: string;
  details: any;
};

export const useGetInternships = (): UseQueryResult<InternshipAd[], any> => {
  return useQuery({
    queryKey: ['internships'],
    queryFn: async () => {
      const response = await apiClient.get<InternshipAd[]>('/internships');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

