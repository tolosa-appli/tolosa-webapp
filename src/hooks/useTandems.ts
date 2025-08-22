import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type TandemOffer = {
  id: string;
  user: { id: string; username: string; avatar: string; dataAiHint?: string; languages: string };
  offeredLanguage: { name: string; flagCode: string };
  soughtLanguage: { name: string; flagCode: string };
  maxParticipants: number;
  participants: string[];
  description: string;
  isAutomatic: boolean;
  isOnline: boolean;
};

export const useGetTandems = (): UseQueryResult<TandemOffer[], any> => {
  return useQuery({
    queryKey: ['language-tandems'],
    queryFn: async () => {
      const response = await apiClient.get<TandemOffer[]>('/language-tandems');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

