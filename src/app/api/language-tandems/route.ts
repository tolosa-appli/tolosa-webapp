import { NextResponse } from 'next/server';

export type TandemOffer = {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    dataAiHint?: string;
    languages: string;
  };
  offeredLanguage: { name: string; flagCode: string };
  soughtLanguage: { name: string; flagCode: string };
  maxParticipants: number;
  participants: string[];
  description: string;
  isAutomatic: boolean;
  isOnline: boolean;
};

// Minimal mock offers (decoupled from UI file)
const tandemOffers: TandemOffer[] = [
  {
    id: 't1',
    user: { id: '1', username: 'Sophie', avatar: 'https://placehold.co/40x40.png', languages: 'Français, Anglais, Espagnol' },
    offeredLanguage: { name: 'Français', flagCode: 'FR' },
    soughtLanguage: { name: 'Anglais', flagCode: 'GB' },
    maxParticipants: 4,
    participants: ['2', '3'],
    description: 'Pratiquons ensemble dans un café du centre-ville !',
    isAutomatic: true,
    isOnline: false,
  },
  {
    id: 't2',
    user: { id: '2', username: 'Lucas', avatar: 'https://placehold.co/40x40.png', languages: 'Français, Occitan' },
    offeredLanguage: { name: 'Occitan', flagCode: 'FR-OCC' },
    soughtLanguage: { name: 'Espagnol', flagCode: 'ES' },
    maxParticipants: 2,
    participants: ['4'],
    description: 'Per parlar la lenga nòstra ! En visio.',
    isAutomatic: false,
    isOnline: true,
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: tandemOffers });
}

