import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Partner, ApiError } from '@/types';
import { apiClient } from '@/lib/api-client';

export const useGetPartners = (): UseQueryResult<Partner[], ApiError> => {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await apiClient.get<Partner[]>('/partners');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
