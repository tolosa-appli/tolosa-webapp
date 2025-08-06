
import type { Member } from '@/app/(app)/members/data';
import { initialMembersData } from '@/app/(app)/members/data';

export type TandemOffer = {
  id: string;
  user: Member;
  offeredLanguage: { name: string; flagCode: string };
  soughtLanguage: { name: string; flagCode: string };
  maxParticipants: number;
  participants: string[]; // Array of user IDs
  description: string;
  isAutomatic: boolean;
  isOnline: boolean;
};

// Helper to find a member by username
const findMember = (username: string): Member | undefined => 
  initialMembersData.find(m => m.username === username);

// Mock data for tandem offers linked to user profiles
export const tandemOffers: TandemOffer[] = [
  {
    id: 't1',
    user: findMember('Sophie')!,
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
    user: findMember('Lucas')!,
    offeredLanguage: { name: 'Occitan', flagCode: 'FR-OCC' },
    soughtLanguage: { name: 'Espagnol', flagCode: 'ES' },
    maxParticipants: 2,
    participants: ['4'],
    description: 'Per parlar la lenga nòstra ! En visio.',
    isAutomatic: false,
    isOnline: true,
  },
  {
    id: 't3',
    user: findMember('Mehdi')!,
    offeredLanguage: { name: 'Arabe', flagCode: 'SA' },
    soughtLanguage: { name: 'Français', flagCode: 'FR' },
    maxParticipants: 5,
    participants: [],
    description: 'Ouvert à la discussion sur la culture et la cuisine.',
    isAutomatic: true,
    isOnline: false,
  },
  {
    id: 't4',
    user: findMember('Émilie')!,
    offeredLanguage: { name: 'Allemand', flagCode: 'DE' },
    soughtLanguage: { name: 'Français', flagCode: 'FR' },
    maxParticipants: 2,
    participants: ['1', '2'],
    description: 'Lust auf Deutsch und Französisch zu plaudern?',
    isAutomatic: true,
    isOnline: false,
  }
].filter(offer => offer.user); // Filter out any offers where the user wasn't found
