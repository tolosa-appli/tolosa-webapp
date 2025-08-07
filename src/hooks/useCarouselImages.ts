import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CarouselImage, ApiError } from '@/types';
import { apiClient } from '@/lib/api-client';

export const useGetCarouselImages = (section?: 'top' | 'middle' | 'bottom' | 'final'): UseQueryResult<CarouselImage[], ApiError> => {
  return useQuery({
    queryKey: ['carousel-images', section],
    queryFn: async () => {
      const url = section ? `/carousel-images?section=${section}` : '/carousel-images';
      const response = await apiClient.get<CarouselImage[]>(url);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
