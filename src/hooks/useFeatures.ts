import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Feature, ApiError } from '@/types';
import { apiClient } from '@/lib/api-client';

export const useGetFeatures = (): UseQueryResult<Feature[], ApiError> => {
  return useQuery({
    queryKey: ['features'],
    queryFn: async () => {
      const response = await apiClient.get<Feature[]>('/features');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
