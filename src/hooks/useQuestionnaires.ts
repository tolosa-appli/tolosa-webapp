import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export type QuestionnaireAd = {
  id: string;
  title: string;
  description: string;
  location: string;
  compensation: number;
  link: string;
  user: { name: string; avatar: string; dataAiHint?: string };
  postedAt: string;
  image: string;
  dataAiHint?: string;
};

export const useGetQuestionnaires = (): UseQueryResult<QuestionnaireAd[], any> => {
  return useQuery({
    queryKey: ['questionnaires'],
    queryFn: async () => {
      const response = await apiClient.get<QuestionnaireAd[]>('/questionnaires');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

