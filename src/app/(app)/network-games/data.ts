
export type NetworkGameAd = {
  id: string;
  gameTitle: string;
  gameGenre: string;
  platform: 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo Switch' | 'Mobile';
  description: string;
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
  image: string;
  dataAiHint?: string;
};

export const networkGamesData: NetworkGameAd[] = [
    { id: '1', gameTitle: 'League of Legends', gameGenre: 'MOBA', platform: 'PC', description: 'Cherche un support pour duoQ, rang Or. Ambiance chill mais tryhard.', user: { name: 'Lucas', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man gaming' }, postedAt: '2024-07-22T18:00:00Z', image: 'https://placehold.co/600x400.png', dataAiHint: 'fantasy battle' },
    { id: '2', gameTitle: 'EA Sports FC 24', gameGenre: 'Sport', platform: 'PlayStation', description: 'Qui est chaud pour des matchs amicaux en mode Club Pro ?', user: { name: 'Mehdi', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'male portrait' }, postedAt: '2024-07-21T20:30:00Z', image: 'https://placehold.co/600x400.png', dataAiHint: 'soccer game' },
    { id: '3', gameTitle: 'Baldur\'s Gate 3', gameGenre: 'RPG', platform: 'PC', description: 'On commence une nouvelle campagne ce week-end, il nous manque un joueur ! Débutants bienvenus.', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, postedAt: '2024-07-22T11:00:00Z', image: 'https://placehold.co/600x400.png', dataAiHint: 'fantasy rpg' },
    { id: '4', gameTitle: 'Mario Kart 8 Deluxe', gameGenre: 'Course', platform: 'Nintendo Switch', description: 'Session tryhard pour s\'entraîner avant le prochain tournoi. Bonne humeur exigée !', user: { name: 'Chloé', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'female portrait' }, postedAt: '2024-07-20T15:00:00Z', image: 'https://placehold.co/600x400.png', dataAiHint: 'racing kart' },
];

    