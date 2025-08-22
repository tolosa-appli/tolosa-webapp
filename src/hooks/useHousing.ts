import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type HousingAd = {
  id: string;
  type: 'offer' | 'request';
  address: string;
  city: string;
  rooms: number;
  surface: number;
  furnished: boolean;
  rent: number;
  isColocation: boolean;
  flatmates?: number;
  image: string;
  dataAiHint?: string;
  user: { name: string; avatar: string; dataAiHint?: string };
  postedAt: string;
};

export const useGetHousing = (): UseQueryResult<HousingAd[], any> => {
  return useQuery({
    queryKey: ['housing'],
    queryFn: async () => {
      const response = await apiClient.get<HousingAd[]>('/housing');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

