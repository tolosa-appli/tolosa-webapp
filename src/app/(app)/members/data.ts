
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

export const initialMembersData: Member[] = [
  { id: '1', username: 'Sophie', avatar: '', dataAiHint: 'woman portrait', city: 'Toulouse', joined: '2023-10-26T10:00:00Z', lastSeen: '2024-07-20T15:30:00Z', role: 'admin', status: 'not_connected', languages: 'Français, Anglais, Espagnol', wantsToWelcome: true, sex: 'female' },
  { id: '2', username: 'Lucas', avatar: '', dataAiHint: 'man portrait', city: 'Blagnac', joined: '2024-01-15T18:20:00Z', lastSeen: '2024-07-21T09:00:00Z', role: 'moderator', status: 'connected', languages: 'Français, Occitan', wantsToWelcome: false, sex: 'male' },
  { id: '3', username: 'Chloé', avatar: '', dataAiHint: 'female portrait', city: 'Colomiers', joined: '2023-05-12T11:45:00Z', lastSeen: '2024-07-19T22:10:00Z', role: 'user', status: 'request_sent', languages: 'Français', wantsToWelcome: true, sex: 'female' },
  { id: '4', username: 'Mehdi', avatar: '', dataAiHint: 'male portrait', city: 'Toulouse', joined: '2024-06-01T09:00:00Z', lastSeen: '2024-07-21T11:05:00Z', role: 'user', status: 'not_connected', languages: 'Français, Arabe', wantsToWelcome: false, sex: 'male' },
  { id: '5', username: 'Émilie', avatar: '', dataAiHint: 'woman smiling', city: 'Tournefeuille', joined: '2022-11-30T22:15:00Z', lastSeen: '2022-12-28T14:00:00Z', role: 'user', status: 'not_connected', languages: 'Français, Allemand', wantsToWelcome: false, sex: 'female' },
  { id: '6', username: 'Alexandre', avatar: '', dataAiHint: 'man smiling', city: 'Cugnaux', joined: '2024-07-10T12:00:00Z', lastSeen: '2024-07-20T18:45:00Z', role: 'user', status: 'blocked', languages: 'Français', wantsToWelcome: false, sex: 'male' },
  { id: '7', username: 'Jean Ancien', avatar: '', dataAiHint: 'old man', city: 'Muret', joined: '2021-01-10T12:00:00Z', lastSeen: '2021-02-20T18:45:00Z', role: 'user', status: 'not_connected', languages: 'Français, Anglais', wantsToWelcome: false, sex: 'male' },
];
