import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GirlsEvent } from '@/types';
import { apiClient } from '@/lib/api-client';

export interface GirlsEventFilters {
  theme?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  organizerId?: string;
  search?: string;
  hasSpace?: boolean;
  page?: number;
  limit?: number;
}

// Get girls events with filters
export function useGetGirlsEvents(filters: GirlsEventFilters = {}) {
  return useQuery({
    queryKey: ['girls-events', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get<GirlsEvent[]>(`/girls-events?${params.toString()}`);
      return {
        events: response.data,
        pagination: undefined
      };
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

// Join/leave event mutation
export function useUpdateEventParticipation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ eventId, action }: { eventId: string; action: 'join' | 'leave' }) => {
      const params = new URLSearchParams();
      params.append('eventId', eventId);
      params.append('action', action);
      
      const response = await apiClient.patch<GirlsEvent>(`/girls-events?${params.toString()}`);
      return response.data;
    },
    onSuccess: (updatedEvent: GirlsEvent) => {
      queryClient.setQueryData(['girls-events', updatedEvent.id], updatedEvent);
      queryClient.invalidateQueries({ queryKey: ['girls-events'] });
    },
  });
}
