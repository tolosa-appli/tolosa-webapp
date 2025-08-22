import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type StudentOuting = {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  image: string;
  dataAiHint?: string;
};

export const useGetStudentOutings = (): UseQueryResult<StudentOuting[], any> => {
  return useQuery({
    queryKey: ['students', 'outings'],
    queryFn: async () => {
      const response = await apiClient.get<StudentOuting[]>('/students');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

