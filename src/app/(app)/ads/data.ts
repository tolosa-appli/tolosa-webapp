
export type Ad = {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
  image: string;
  dataAiHint?: string;
};

export const adsData: Ad[] = [
    { id: '1', title: 'Vélo de ville bon état', description: 'Vends vélo de ville de marque Btwin, peu servi. Idéal pour les déplacements en ville.', location: 'Toulouse - Carmes', price: 80, user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, postedAt: '2024-07-22T14:00:00Z', image: 'http://bilingue31.free.fr/Annonce_vitrine_OK.jpg', dataAiHint: 'city bike' },
    { id: '2', title: 'Donne canapé convertible', description: 'Canapé 3 places, convertible en lit. Quelques traces d\'usure mais fonctionnel. A venir chercher sur place.', location: 'Blagnac', price: 0, user: { name: 'Juliette', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, postedAt: '2024-07-21T10:30:00Z', image: 'http://bilingue31.free.fr/Annonce_vitrine_OK.jpg', dataAiHint: 'sofa bed' },
    { id: '3', title: 'Cours de guitare pour débutants', description: 'Guitariste expérimenté propose des cours particuliers à domicile. Tous styles, tous âges.', location: 'Toulouse - Centre', price: 25, user: { name: 'Alex', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'male portrait' }, postedAt: '2024-07-20T18:00:00Z', image: 'http://bilingue31.free.fr/Annonce_vitrine_OK.jpg', dataAiHint: 'acoustic guitar' },
    { id: '4', title: 'Table basse design', description: 'Table basse en verre et métal, style industriel. Très bon état.', location: 'Colomiers', price: 50, user: { name: 'Laura', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'female portrait' }, postedAt: '2024-07-22T09:00:00Z', image: 'http://bilingue31.free.fr/Annonce_vitrine_OK.jpg', dataAiHint: 'coffee table' },
];

    
