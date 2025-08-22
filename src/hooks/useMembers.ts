import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type MemberStatus = 'not_connected' | 'request_sent' | 'connected' | 'blocked';
export type MemberRole = 'user' | 'moderator' | 'admin';

export type Member = {
  id: string;
  username: string;
  avatar: string;
  city: string;
  joined: string;
  lastSeen: string;
  role: MemberRole;
  status: MemberStatus;
  languages: string;
  dataAiHint?: string;
  wantsToWelcome?: boolean;
  sex?: 'male' | 'female' | 'other';
};

export const useGetMembers = (): UseQueryResult<Member[], any> => {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await apiClient.get<Member[]>('/members');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

