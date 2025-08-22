import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type NetworkGameAd = {
  id: string;
  gameTitle: string;
  gameGenre: string;
  platform: 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo Switch' | 'Mobile';
  description: string;
  user: { name: string; avatar: string; dataAiHint?: string };
  postedAt: string;
  image: string;
  dataAiHint?: string;
};

export const useGetNetworkGames = (): UseQueryResult<NetworkGameAd[], any> => {
  return useQuery({
    queryKey: ['network-games'],
    queryFn: async () => {
      const response = await apiClient.get<NetworkGameAd[]>('/network-games');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

