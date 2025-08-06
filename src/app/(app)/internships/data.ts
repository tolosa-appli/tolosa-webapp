
export type InternshipAd = {
  id: string;
  type: 'offer' | 'request';
  title: string;
  company?: string;
  city: string;
  contractType: 'Stage' | 'Alternance';
  workSchedule: 'full-time' | 'part-time';
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
  details: any;
};

export const internshipData: InternshipAd[] = [
    { id: '1', type: 'offer', title: 'Stage Développeur Web', company: 'Web Solutions', city: 'Toulouse', contractType: 'Stage', workSchedule: 'full-time', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman office' }, postedAt: '2024-07-22T10:00:00Z', details: { industry: 'IT', experienceRequired: 'Débutant accepté', educationLevel: 'Bac +3' } },
    { id: '2', type: 'request', title: 'Recherche alternance Data Analyst', city: 'Toulouse', contractType: 'Alternance', workSchedule: 'full-time', user: { name: 'Léo', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'student portrait' }, postedAt: '2024-07-21T16:00:00Z', details: { diploma: 'Master 1 MIASHS', skills: 'Python, SQL, Power BI' } },
    { id: '3', type: 'offer', title: 'Alternance Community Manager', company: 'Socialy', city: 'Blagnac', contractType: 'Alternance', workSchedule: 'full-time', user: { name: 'Recrutement Socialy', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'modern office' }, postedAt: '2024-07-20T11:00:00Z', details: { industry: 'Marketing Digital', experienceRequired: '1 an', educationLevel: 'Bac +4/5' } },
    { id: '4', type: 'request', title: 'Cherche stage en graphisme', city: 'Colomiers', contractType: 'Stage', workSchedule: 'part-time', user: { name: 'Clara', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman artist' }, postedAt: '2024-07-22T09:30:00Z', details: { diploma: 'Licence Design Graphique', skills: 'Suite Adobe, Figma, Créativité' } },
];

    