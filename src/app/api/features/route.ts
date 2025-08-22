import { NextRequest, NextResponse } from 'next/server';
import { Feature, ApiResponse } from '@/types';

// Mock data - replace with database calls later
const featuresData: Feature[] = [
  {
    id: '1',
    icon: 'Users',
    title: 'Membres',
    description: 'Trouvez et connectez-vous avec de nouveaux amis.',
    slug: 'members',
    color: 'blue',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    icon: 'MessageSquare',
    title: 'Forum de discussion',
    description: 'Participez à des discussions sur divers sujets.',
    slug: 'forum',
    color: 'green',
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    icon: 'CalendarDays',
    title: 'Sorties à Toulouse',
    description: 'Créez et rejoignez des sorties et activités.',
    slug: 'sorties',
    color: 'orange',
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    icon: 'Car',
    title: 'Covoiturage',
    description: 'Proposez ou cherchez des trajets.',
    slug: 'carpooling',
    color: 'indigo',
    isActive: true,
    order: 4,
  },
  {
    id: '5',
    icon: 'Home',
    title: 'Logement',
    description: 'Trouvez votre prochain logement ou colocataire.',
    slug: 'housing',
    color: 'emerald',
    isActive: true,
    order: 5,
  },
  {
    id: '6',
    icon: 'Briefcase',
    title: 'Emploi',
    description: 'Découvrez des offres d\'emploi locales.',
    slug: 'jobs',
    color: 'violet',
    isActive: true,
    order: 6,
  },
  {
    id: '7',
    icon: 'Megaphone',
    title: 'Petites Annonces',
    description: 'Achetez, vendez ou échangez des biens et services.',
    slug: 'ads',
    color: 'pink',
    isActive: true,
    order: 7,
  },
  {
    id: '8',
    icon: 'GraduationCap',
    title: 'Stage & Alternance',
    description: 'Opportunités pour les étudiants et jeunes diplômés.',
    slug: 'internships',
    color: 'cyan',
    isActive: true,
    order: 8,
  },
  {
    id: '9',
    icon: 'Heart',
    title: 'Sorties entre filles',
    description: 'Un espace dédié pour les sorties entre filles.',
    slug: 'girls-only',
    color: 'rose',
    isActive: true,
    order: 9,
  },
  {
    id: '10',
    icon: 'UserCheck',
    title: 'Sorties étudiantes',
    description: 'Rencontrez d\'autres étudiants et participez à des évènements.',
    slug: 'students',
    color: 'amber',
    isActive: true,
    order: 10,
  },
  {
    id: '11',
    icon: 'ClipboardList',
    title: 'Questionnaires & Expériences',
    description: 'Participez à des questionnaires pour des mémoires ou des thèses ou à des expériences',
    slug: 'questionnaires',
    color: 'slate',
    isActive: true,
    order: 11,
  },
  {
    id: '12',
    icon: 'MessageSquareText',
    title: 'Tandems de langues',
    description: 'Trouvez un partenaire pour pratiquer une langue.',
    slug: 'language-tandems',
    color: 'teal',
    isActive: true,
    order: 12,
  },
  {
    id: '13',
    icon: 'Languages',
    title: 'Café des langues',
    description: 'Pratiquez des langues avec d\'autres membres.',
    slug: 'language-cafe',
    color: 'lime',
    isActive: true,
    order: 13,
  },
  {
    id: '15',
    icon: 'Gamepad2',
    title: 'Jeux en réseau',
    description: 'Organisez des parties de jeux vidéo avec d\'autres membres.',
    slug: 'network-games',
    color: 'red',
    isActive: true,
    order: 15,
  },
  {
    id: '16',
    icon: 'ExternalLink',
    title: 'Évènements Meetup',
    description: 'Découvrez les événements du groupe partenaire.',
    slug: 'meetup-events',
    color: 'sky',
    isActive: true,
    order: 16,
  },
  {
    id: '17',
    icon: 'ThumbsUp',
    title: 'Groupes Facebook',
    description: 'Découvrez les groupes Facebook partenaires.',
    slug: 'facebook-groups',
    color: 'purple',
    isActive: true,
    order: 17,
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Filter only active features and sort by order
    const activeFeatures = featuresData
      .filter(feature => feature.isActive)
      .sort((a, b) => a.order - b.order);

    // In the future, replace this with actual database call
    // const features = await db.features.findMany({
    //   where: { isActive: true },
    //   orderBy: { order: 'asc' }
    // });
    
    const response: ApiResponse<Feature[]> = {
      data: activeFeatures,
      success: true,
      message: 'Features retrieved successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching features:', error);
    
    const errorResponse: ApiResponse<Feature[]> = {
      data: [],
      success: false,
      message: 'Failed to fetch features',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
