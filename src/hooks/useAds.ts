import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { Ad, ApiError, AdsFilters, AdsSortOptions, CreateAdData } from '@/types';
import { apiClient } from '@/lib/api-client';

interface UseGetAdsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: Ad['category'];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: Ad['condition'];
  sortField?: AdsSortOptions['field'];
  sortDirection?: AdsSortOptions['direction'];
  tags?: string[];
}

export const useGetAds = (params: UseGetAdsParams = {}): UseQueryResult<{
  ads: Ad[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}, ApiError> => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        queryParams.set(key, value.join(','));
      } else {
        queryParams.set(key, value.toString());
      }
    }
  });

  return useQuery({
    queryKey: ['ads', params],
    queryFn: async () => {
      const url = `/ads${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await apiClient.get<Ad[]>(url);
      return {
        ads: response.data,
        pagination: response.pagination!,
      };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 3,
  });
};

export const useCreateAd = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (adData: CreateAdData) => {
      const response = await apiClient.post<Ad>('/ads', adData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate ads queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};

export const useDeleteAd = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (adId: string) => {
      const response = await apiClient.delete<{ success: boolean }>(`/ads/${adId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate ads queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['ads'] });
    },
  });
};

export const useReportAd = () => {
  return useMutation({
    mutationFn: async ({ adId, reason }: { adId: string; reason: string }) => {
      const response = await apiClient.post<{ success: boolean }>(`/ads/${adId}/report`, { reason });
      return response.data;
    },
  });
};
