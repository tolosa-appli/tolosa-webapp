import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type Sortie = {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  maxParticipants: number;
  image: string;
  dataAiHint?: string;
};

export const useGetSorties = (): UseQueryResult<Sortie[], any> => {
  return useQuery({
    queryKey: ['sorties'],
    queryFn: async () => {
      const response = await apiClient.get<Sortie[]>('/sorties');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

