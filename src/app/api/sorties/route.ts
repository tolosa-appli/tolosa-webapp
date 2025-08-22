import { NextResponse } from 'next/server';

export type Sortie = {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  maxParticipants: number;
  image: string;
  dataAiHint?: string;
};

const sortiesData: Sortie[] = [
  { id: '1', title: 'Pique-nique au Jardin des Plantes', theme: 'pique-nique', date: '2024-08-10T12:00:00Z', location: 'Jardin des Plantes, Toulouse', description: 'Rejoignez-nous pour un pique-nique convivial et des jeux en plein air.', participants: 12, maxParticipants: 20, image: 'https://placehold.co/600x400.png', dataAiHint: 'picnic park' },
  { id: '2', title: 'Visite du Musée des Augustins', theme: 'musées', date: '2024-08-17T14:30:00Z', location: 'Musée des Augustins, Toulouse', description: 'Découverte des collections de peintures et sculptures du musée.', participants: 8, maxParticipants: 8, image: 'https://placehold.co/600x400.png', dataAiHint: 'museum art' },
  { id: '3', title: 'Soirée Tapas', theme: 'restaurant', date: '2024-08-22T19:00:00Z', location: 'Quartier Saint-Cyprien', description: 'Dégustation de tapas dans les meilleurs bars du quartier.', participants: 20, maxParticipants: 20, image: 'https://placehold.co/600x400.png', dataAiHint: 'tapas food' },
  { id: '4', title: 'Randonnée le long du Canal du Midi', theme: 'randonnée', date: '2024-09-01T09:30:00Z', location: 'Canal du Midi', description: 'Une belle randonnée de 10km accessible à tous les niveaux.', participants: 15, maxParticipants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'canal nature' },
  { id: '5', title: "Cinéma en plein air", theme: 'cinéma', date: '2024-08-25T21:00:00Z', location: 'La Prairie des Filtres', description: "Projection d'un film classique sous les étoiles.", participants: 28, maxParticipants: 30, image: 'https://placehold.co/600x400.png', dataAiHint: 'outdoor cinema' },
  { id: '6', title: 'Cours de cuisine toulousaine', theme: 'cuisine', date: '2024-09-07T18:00:00Z', location: 'Atelier de cuisine, centre-ville', description: 'Apprenez à préparer le fameux cassoulet toulousain.', participants: 10, maxParticipants: 10, image: 'https://placehold.co/600x400.png', dataAiHint: 'cooking class' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: sortiesData });
}

