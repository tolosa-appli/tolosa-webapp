import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ForumCategory, ForumTheme, ForumMessage, CreateForumMessageData, ApiResponse } from '@/types';
import { apiClient } from '@/lib/api-client';

// Query keys
export const forumKeys = {
  all: ['forum'] as const,
  categories: () => [...forumKeys.all, 'categories'] as const,
  themes: () => [...forumKeys.all, 'themes'] as const,
  themesByCategory: (categoryId: string) => [...forumKeys.themes(), categoryId] as const,
  messages: () => [...forumKeys.all, 'messages'] as const,
  messagesList: (filters: ForumMessageFilters) => [...forumKeys.messages(), filters] as const,
  messageDetail: (id: string) => [...forumKeys.messages(), 'detail', id] as const,
};

export interface ForumMessageFilters {
  themeId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Get forum categories with themes
export function useGetForumCategories() {
  return useQuery({
    queryKey: forumKeys.categories(),
    queryFn: async (): Promise<ForumCategory[]> => {
      const response = await apiClient.get<ForumCategory[]>('/forum?endpoint=categories');
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Get forum themes
export function useGetForumThemes(categoryId?: string) {
  return useQuery({
    queryKey: categoryId ? forumKeys.themesByCategory(categoryId) : forumKeys.themes(),
    queryFn: async (): Promise<ForumTheme[]> => {
      const params = new URLSearchParams();
      params.append('endpoint', 'themes');
      
      if (categoryId && categoryId !== 'all') {
        params.append('categoryId', categoryId);
      }
      
      const response = await apiClient.get<ForumTheme[]>(`/forum?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  });
}

// Get forum messages
export function useGetForumMessages(filters: ForumMessageFilters = {}) {
  return useQuery({
    queryKey: forumKeys.messagesList(filters),
    queryFn: async (): Promise<{ messages: ForumMessage[], pagination?: any }> => {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await apiClient.get<{ messages: ForumMessage[], pagination?: any }>(`/forum?${params.toString()}`);
      return {
        messages: response.data.messages,
        pagination: response.data.pagination
      };
    },
    staleTime: 1000 * 60 * 2, // 2 minutes (messages change more frequently)
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get forum message by ID
export function useGetForumMessage(id: string) {
  return useQuery({
    queryKey: forumKeys.messageDetail(id),
    queryFn: async (): Promise<ForumMessage | null> => {
      const response = await apiClient.get<ForumMessage[]>('/forum');
      const message = response.data.find(m => m.id === id);
      return message || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

// Create forum message mutation
export function useCreateForumMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateForumMessageData): Promise<ForumMessage> => {
      const response = await apiClient.post<ForumMessage>('/forum', data);
      return response.data;
    },
    onSuccess: (newMessage) => {
      // Invalidate and refetch forum queries
      queryClient.invalidateQueries({ queryKey: forumKeys.messages() });
      queryClient.invalidateQueries({ queryKey: forumKeys.themes() });
      
      // Update the specific theme's message count in cache if possible
      const themeQueryKey = forumKeys.themes();
      queryClient.setQueryData(themeQueryKey, (oldData: ForumTheme[] | undefined) => {
        if (!oldData) return oldData;
        
        return oldData.map(theme => 
          theme.id === newMessage.themeId 
            ? { 
                ...theme, 
                messageCount: theme.messageCount + 1,
                lastActivity: newMessage.createdAt 
              }
            : theme
        );
      });
    },
  });
}

// Get messages by theme
export function useGetMessagesByTheme(themeId: string, page?: number, limit?: number) {
  return useGetForumMessages({ themeId, page, limit });
}

// Search forum messages
export function useSearchForumMessages(search: string, themeId?: string) {
  return useGetForumMessages({ search, themeId });
}

// Get popular themes (by message count)
export function useGetPopularThemes(limit: number = 5) {
  return useQuery({
    queryKey: [...forumKeys.themes(), 'popular', limit],
    queryFn: async (): Promise<ForumTheme[]> => {
  const response = await apiClient.get<ApiResponse<ForumTheme[]>>('/forum?endpoint=themes');
      return response.data.data
        .sort((a, b) => b.messageCount - a.messageCount)
        .slice(0, limit);
    },
    staleTime: 1000 * 60 * 10,
  });
}

// Get recent activity (latest messages)
export function useGetRecentForumActivity(limit: number = 10) {
  return useGetForumMessages({ limit });
}
