import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FacebookGroup, ApiResponse } from '@/types';
import { apiClient } from '@/lib/api-client';

// Query keys
export const facebookGroupKeys = {
  all: ['facebook-groups'] as const,
  lists: () => [...facebookGroupKeys.all, 'list'] as const,
  list: (filters: FacebookGroupFilters) => [...facebookGroupKeys.lists(), filters] as const,
  details: () => [...facebookGroupKeys.all, 'detail'] as const,
  detail: (id: string) => [...facebookGroupKeys.details(), id] as const,
};

export interface FacebookGroupFilters {
  category?: 'all' | 'general' | 'events' | 'housing' | 'culture' | 'women' | 'professional';
  search?: string;
}

// Get Facebook groups with filters
export function useGetFacebookGroups(filters: FacebookGroupFilters = {}) {
  return useQuery({
    queryKey: ['facebook-groups', filters],
    queryFn: async (): Promise<FacebookGroup[]> => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get<FacebookGroup[]>(`/facebook-groups?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes (groups don't change often)
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Get Facebook group by ID
export function useGetFacebookGroup(id: string) {
  return useQuery({
    queryKey: ['facebook-groups', id],
    queryFn: async (): Promise<FacebookGroup | null> => {
      const response = await apiClient.get<ApiResponse<FacebookGroup[]>>(`/facebook-groups`);
      const group = response.data.data.find(g => g.id === id);
      return group || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 15,
  });
}

// Create Facebook group mutation
export function useCreateFacebookGroup() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Omit<FacebookGroup, 'id'>): Promise<FacebookGroup> => {
      const response = await apiClient.post<ApiResponse<FacebookGroup>>('/facebook-groups', data);
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate and refetch Facebook group queries
      queryClient.invalidateQueries({ queryKey: ['facebook-groups'] });
    },
  });
}

// Get Facebook groups by category
export function useGetFacebookGroupsByCategory(category: FacebookGroup['category']) {
  return useGetFacebookGroups({ category });
}

// Search Facebook groups
export function useSearchFacebookGroups(search: string) {
  return useGetFacebookGroups({ search });
}

// Get all categories with their groups
export function useGetFacebookGroupCategories() {
  const { data: groups, ...rest } = useGetFacebookGroups();
  
  const categories = groups ? Array.from(new Set(groups.map(g => g.category))).sort() : [];
  
  return {
    data: categories,
    groups,
    ...rest
  };
}
