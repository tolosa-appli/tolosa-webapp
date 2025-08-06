
export type QuestionnaireAd = {
  id: string;
  title: string;
  description: string;
  location: string;
  compensation: number;
  link: string;
  user: {
    name: string;
    avatar: string;
    dataAiHint?: string;
  };
  postedAt: string;
  image: string;
  dataAiHint?: string;
};

export const questionnairesData: QuestionnaireAd[] = [
    { id: '1', title: 'Questionnaire sur les habitudes de transport', description: 'Participez à notre étude pour un mémoire de Master en sociologie. 15 minutes.', location: 'En ligne', compensation: 5, link: 'https://forms.gle/exemple', user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'student glasses' }, postedAt: '2024-07-22T14:00:00Z', image: 'http://bilingue31.free.fr/question_Labo_OK.jpg', dataAiHint: 'survey form' },
    { id: '2', title: 'Expérience sur la perception des couleurs', description: 'Recherche de participants pour une expérience en laboratoire de psychologie cognitive.', location: 'Université Toulouse - Jean Jaurès', compensation: 20, link: 'https://univ-tlse2.fr/exp', user: { name: 'Dr. Dubois', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'scientist man' }, postedAt: '2024-07-21T10:30:00Z', image: 'http://bilingue31.free.fr/question_Labo_OK.jpg', dataAiHint: 'colors perception' },
    { id: '3', title: 'Sondage sur les pratiques alimentaires', description: 'Dans le cadre d\'une thèse, nous cherchons à comprendre les habitudes alimentaires des jeunes adultes.', location: 'En ligne', compensation: 0, link: 'https://sondage.com/alim', user: { name: 'Paul', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man eating' }, postedAt: '2024-07-20T18:00:00Z', image: 'http://bilingue31.free.fr/question_Labo_OK.jpg', dataAiHint: 'healthy food' },
    { id: '4', title: 'Test utilisateur nouvelle application mobile', description: 'Venez tester notre nouvelle application et donnez-nous votre avis. Session de 30 minutes.', location: 'Startup-ville, Labège', compensation: 15, link: 'https://myapp.com/test', user: { name: 'Startup XYZ', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'modern office' }, postedAt: '2024-07-22T09:00:00Z', image: 'http://bilingue31.free.fr/question_Labo_OK.jpg', dataAiHint: 'mobile app' },
];

    