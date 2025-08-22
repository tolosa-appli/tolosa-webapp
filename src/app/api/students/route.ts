import { NextResponse } from 'next/server';

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

const outings: StudentOuting[] = [
  { id: '1', title: "Soirée intégration BDE", theme: 'Fête', date: '2024-09-12T21:00:00Z', location: 'Salle Le Phare, Tournefeuille', description: "La plus grosse soirée de l'année pour bien commencer !", participants: 250, image: 'https://placehold.co/600x400.png', dataAiHint: 'student party' },
  { id: '2', title: 'Afterwork étudiants & jeunes pros', theme: 'Réseautage', date: '2024-09-19T18:30:00Z', location: 'Bar Le Wallace, Toulouse', description: 'Rencontrez des étudiants et des jeunes diplômés pour échanger.', participants: 40, image: 'https://placehold.co/600x400.png', dataAiHint: 'people networking' },
  { id: '3', title: 'Tournoi de jeux vidéo', theme: 'Jeux', date: '2024-09-28T14:00:00Z', location: 'E-sport Center, Montaudran', description: 'Affrontez-vous sur les jeux du moment. Lots à gagner !', participants: 64, image: 'https://placehold.co/600x400.png', dataAiHint: 'esports tournament' },
  { id: '4', title: 'Session de révision collective', theme: 'Études', date: '2024-10-05T10:00:00Z', location: 'Bibliothèque Universitaire Centrale', description: 'Préparons les partiels ensemble. Motivation garantie !', participants: 18, image: 'https://placehold.co/600x400.png', dataAiHint: 'students studying' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: outings });
}

