import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CarpoolAd, CreateCarpoolData, ApiResponse } from '@/types';
import { apiClient } from '@/lib/api-client';

// Query keys
export const carpoolKeys = {
  all: ['carpools'] as const,
  lists: () => [...carpoolKeys.all, 'list'] as const,
  list: (filters: CarpoolFilters) => [...carpoolKeys.lists(), filters] as const,
  details: () => [...carpoolKeys.all, 'detail'] as const,
  detail: (id: string) => [...carpoolKeys.details(), id] as const,
};

export interface CarpoolFilters {
  type?: 'all' | 'offer' | 'request';
  tripType?: 'all' | 'regular' | 'outing';
  from?: string;
  to?: string;
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Get carpools with filters
export function useGetCarpools(filters: CarpoolFilters = {}) {
  return useQuery({
    queryKey: carpoolKeys.list(filters),
    queryFn: async (): Promise<CarpoolAd[]> => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get<CarpoolAd[]>(`/carpooling?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Get carpool by ID
export function useGetCarpool(id: string) {
  return useQuery({
    queryKey: carpoolKeys.detail(id),
    queryFn: async (): Promise<CarpoolAd | null> => {
      const filters = { userId: undefined }; // Get all carpools
      const response = await apiClient.get<CarpoolAd[]>(`/carpooling`);
      const carpool = response.data.find(c => c.id === id);
      return carpool || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// Create carpool mutation
export function useCreateCarpool() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCarpoolData): Promise<CarpoolAd> => {
      const response = await apiClient.post<CarpoolAd>('/carpooling', data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch carpool queries
      queryClient.invalidateQueries({ queryKey: carpoolKeys.all });
    },
  });
}

// Get user's carpools
export function useGetUserCarpools(userId: string) {
  return useGetCarpools({ userId });
}

// Get carpools by type
export function useGetCarpoolsByType(type: 'offer' | 'request') {
  return useGetCarpools({ type });
}

// Get carpools by trip type
export function useGetCarpoolsByTripType(tripType: 'regular' | 'outing') {
  return useGetCarpools({ tripType });
}

// Search carpools
export function useSearchCarpools(search: string) {
  return useGetCarpools({ search });
}
