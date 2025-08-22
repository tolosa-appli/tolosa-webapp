import { NextResponse } from 'next/server';

export type HousingAd = {
  id: string;
  type: 'offer' | 'request';
  address: string;
  city: string;
  rooms: number;
  surface: number;
  furnished: boolean;
  rent: number;
  isColocation: boolean;
  flatmates?: number;
  image: string;
  dataAiHint?: string;
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
};

// Mock data for housing ads (moved from UI)
const housingData: HousingAd[] = [
  { id: '1', type: 'offer', address: '12 Rue des Changes', city: 'Toulouse', rooms: 2, surface: 45, furnished: true, rent: 750, isColocation: false, image: 'https://placehold.co/600x400.png', dataAiHint: 'apartment interior', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, postedAt: '2024-07-22T09:00:00Z' },
  { id: '2', type: 'request', address: 'Proche Université Paul Sabatier', city: 'Toulouse', rooms: 1, surface: 20, furnished: true, rent: 500, isColocation: true, flatmates: 2, image: 'https://placehold.co/600x400.png', dataAiHint: 'student room', user: { name: 'Bob', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' }, postedAt: '2024-07-21T14:00:00Z' },
  { id: '3', type: 'offer', address: 'Avenue de Grande Bretagne', city: 'Toulouse', rooms: 4, surface: 90, furnished: false, rent: 1200, isColocation: false, image: 'https://placehold.co/600x400.png', dataAiHint: 'modern living room', user: { name: 'Clara', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'female portrait' }, postedAt: '2024-07-20T11:30:00Z' },
  { id: '4', type: 'offer', address: 'Centre ville', city: 'Blagnac', rooms: 3, surface: 75, furnished: true, rent: 950, isColocation: false, image: 'https://placehold.co/600x400.png', dataAiHint: 'cozy apartment', user: { name: 'David', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'male portrait' }, postedAt: '2024-07-22T15:00:00Z' },
];

export async function GET() {
  return NextResponse.json({ success: true, data: housingData });
}

