
'use server';

export type Report = {
  id: string;
  type: 'Profil' | 'Annonce' | 'Sortie' | 'Discussion';
  content: string; // Title or name of the item
  link: string; // Link to the item
  reportedUser: string;
  reporter: string;
  date: string;
  reason: string;
  status: 'pending' | 'resolved';
};

export const reportsData: Report[] = [
  { id: '1', type: 'Annonce', content: 'Donne canapé convertible', link: '/ads', reportedUser: 'Juliette', reporter: 'Mehdi', date: '2024-07-22T10:00:00Z', reason: 'Spam, annonce postée plusieurs fois.', status: 'pending' },
  { id: '2', type: 'Profil', content: 'Alexandre', link: '/members', reportedUser: 'Alexandre', reporter: 'Sophie', date: '2024-07-21T15:30:00Z', reason: 'Comportement inapproprié dans la messagerie.', status: 'pending' },
  { id: '3', type: 'Sortie', content: 'Soirée Tapas', link: '/sorties', reportedUser: 'Admin', reporter: 'Lucas', date: '2024-07-20T11:00:00Z', reason: 'L\'organisateur ne répond pas aux messages.', status: 'resolved' },
  { id: '4', type: 'Discussion', content: 'Quel est votre avis sur... ?', link: '/forum/debat-actualites-opinion', reportedUser: 'Sophie', reporter: 'Chloé', date: '2024-07-19T09:45:00Z', reason: 'Message hors-sujet et insultant.', status: 'pending' },
];
