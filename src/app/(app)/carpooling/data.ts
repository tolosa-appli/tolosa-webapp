
export type CarpoolAd = {
  id: string;
  type: 'offer' | 'request';
  tripType: 'regular' | 'outing';
  from: string;
  to: string;
  date: string;
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
};

export const carpoolData: CarpoolAd[] = [
    { id: '1', type: 'offer', tripType: 'outing', from: 'Toulouse Centre', to: 'Albi', date: '2024-08-15T10:00:00Z', user: { name: 'Julien', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' }, postedAt: '2024-07-22T08:00:00Z' },
    { id: '2', type: 'request', tripType: 'regular', from: 'Blagnac', to: 'Labège', date: '2024-08-19T08:30:00Z', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, postedAt: '2024-07-21T18:00:00Z' },
    { id: '3', type: 'offer', tripType: 'outing', from: 'Colomiers', to: 'Pyrénées', date: '2024-08-24T07:00:00Z', user: { name: 'Paul', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'male portrait' }, postedAt: '2024-07-20T12:30:00Z' },
    { id: '4', type: 'request', tripType: 'outing', from: 'Toulouse', to: 'Carcassonne', date: '2024-08-15T09:00:00Z', user: { name: 'Lea', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'female portrait' }, postedAt: '2024-07-22T11:00:00Z' },
];

    