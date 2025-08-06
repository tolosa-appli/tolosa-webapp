
export type JobAd = {
  id: string;
  type: 'offer' | 'request';
  title: string;
  company?: string;
  city: string;
  contractType?: string;
  workSchedule: 'full-time' | 'part-time';
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
  details: any;
};

export const jobData: JobAd[] = [
    { id: '1', type: 'offer', title: 'Développeur Full-Stack', company: 'Tech Innovate', city: 'Toulouse', contractType: 'CDI', workSchedule: 'full-time', user: { name: 'Recruteur Tech', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'office building' }, postedAt: '2024-07-22T10:00:00Z', details: { industry: 'Logiciel', experienceRequired: '3 ans', educationLevel: 'Bac +5' } },
    { id: '2', type: 'request', title: 'Recherche alternance Marketing', city: 'Toulouse', workSchedule: 'part-time', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'student portrait' }, postedAt: '2024-07-21T16:00:00Z', details: { diploma: 'Master 1 Marketing', skills: 'SEO, SEA, Gestion de projet' } },
    { id: '3', type: 'offer', title: 'Chef de projet', company: 'BuildIt', city: 'Blagnac', contractType: 'CDD', workSchedule: 'full-time', user: { name: 'HR BuildIt', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'construction site' }, postedAt: '2024-07-20T11:00:00Z', details: { industry: 'Construction', experienceRequired: '5 ans', educationLevel: 'Bac +3' } },
    { id: '4', type: 'request', title: 'Cherche poste de Commercial', city: 'Colomiers', workSchedule: 'full-time', user: { name: 'Marc', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man suit' }, postedAt: '2024-07-22T09:30:00Z', details: { diploma: 'BTS NDRC', skills: 'Négociation, Prospection, CRM' } },
];

    