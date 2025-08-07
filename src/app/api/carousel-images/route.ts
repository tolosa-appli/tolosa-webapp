import { NextRequest, NextResponse } from 'next/server';
import { CarouselImage, ApiResponse } from '@/types';

// Mock data - replace with database calls later
const carouselImagesData: CarouselImage[] = [
  // Top carousel
  {
    id: '1',
    src: 'http://bilingue31.free.fr/Accueil_afterwork_224.jpg',
    alt: 'Afterwork à Toulouse',
    section: 'top',
  },
  {
    id: '2',
    src: 'http://bilingue31.free.fr/Accueil_rando_224.jpg',
    alt: 'Randonnée autour de Toulouse',
    section: 'top',
  },
  {
    id: '3',
    src: 'http://bilingue31.free.fr/Accueil_danse_224.jpg',
    alt: 'Cours de danse',
    section: 'top',
  },
  // Middle carousel
  {
    id: '4',
    src: 'http://bilingue31.free.fr/Accueil_concert_224.jpg',
    alt: 'Concert à Toulouse',
    section: 'middle',
  },
  {
    id: '5',
    src: 'http://bilingue31.free.fr/Accueil_jeux1_224.jpg',
    alt: 'Soirée jeux',
    section: 'middle',
  },
  {
    id: '6',
    src: 'http://bilingue31.free.fr/Accueil_lecture3_224.jpg',
    alt: 'Club de lecture',
    section: 'middle',
  },
  // Bottom carousel
  {
    id: '7',
    src: 'http://bilingue31.free.fr/Accueil_musee2_224.jpg',
    alt: 'Visite de musée',
    section: 'bottom',
  },
  {
    id: '8',
    src: 'http://bilingue31.free.fr/Accueil_piquenique2_224.jpg',
    alt: 'Pique-nique dans un parc',
    section: 'bottom',
  },
  {
    id: '9',
    src: 'http://bilingue31.free.fr/Accueil_restaurant_224.jpg',
    alt: 'Sortie restaurant',
    section: 'bottom',
  },
  // Final carousel
  {
    id: '10',
    src: 'http://bilingue31.free.fr/Accueil_theatre_224.jpg',
    alt: 'Spectacle de théâtre',
    section: 'final',
  },
  {
    id: '11',
    src: 'http://bilingue31.free.fr/Accueil_visite_224.jpg',
    alt: 'Visite guidée de Toulouse',
    section: 'final',
  },
  {
    id: '12',
    src: 'http://bilingue31.free.fr/Accueil_yoga_224.jpg',
    alt: 'Séance de yoga',
    section: 'final',
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') as 'top' | 'middle' | 'bottom' | 'final' | null;

    // Filter by section if provided
    let filteredImages = carouselImagesData;
    if (section) {
      filteredImages = carouselImagesData.filter(image => image.section === section);
    }

    // In the future, replace this with actual database call
    // const images = await db.carouselImages.findMany({
    //   where: section ? { section } : undefined
    // });
    
    const response: ApiResponse<CarouselImage[]> = {
      data: filteredImages,
      success: true,
      message: 'Carousel images retrieved successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    
    const errorResponse: ApiResponse<CarouselImage[]> = {
      data: [],
      success: false,
      message: 'Failed to fetch carousel images',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
