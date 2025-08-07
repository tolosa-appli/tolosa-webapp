import { NextRequest, NextResponse } from 'next/server';
import { Ad, User, ApiResponse, AdsFilters, AdsSortOptions, CreateAdData } from '@/types';

// Mock users data
const usersData: User[] = [
  {
    id: 'user1',
    name: 'Sophie',
    avatar: 'https://placehold.co/40x40.png',
    role: 'user',
  },
  {
    id: 'user2',
    name: 'Juliette',
    avatar: 'https://placehold.co/40x40.png',
    role: 'user',
  },
  {
    id: 'user3',
    name: 'Alex',
    avatar: 'https://placehold.co/40x40.png',
    role: 'user',
  },
  {
    id: 'user4',
    name: 'Laura',
    avatar: 'https://placehold.co/40x40.png',
    role: 'user',
  },
  {
    id: 'admin1',
    name: 'AdminUser',
    avatar: 'https://placehold.co/40x40.png',
    role: 'admin',
  },
];

// Mock ads data - replace with database calls later
const adsData: Ad[] = [
  {
    id: '1',
    title: 'Vélo de ville bon état',
    description: 'Vends vélo de ville de marque Btwin, peu servi. Idéal pour les déplacements en ville. Équipé d\'un panier et d\'un antivol.',
    location: 'Toulouse - Carmes',
    price: 80,
    category: 'sale',
    condition: 'good',
    userId: 'user1',
    user: usersData[0],
    images: ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
    contactInfo: {
      preferredContact: 'message',
    },
    isActive: true,
    createdAt: '2024-07-22T14:00:00Z',
    updatedAt: '2024-07-22T14:00:00Z',
    tags: ['transport', 'vélo', 'ville'],
  },
  {
    id: '2',
    title: 'Donne canapé convertible',
    description: 'Canapé 3 places, convertible en lit. Quelques traces d\'usure mais fonctionnel. A venir chercher sur place.',
    location: 'Blagnac',
    price: 0,
    category: 'free',
    condition: 'fair',
    userId: 'user2',
    user: usersData[1],
    images: ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
    contactInfo: {
      preferredContact: 'phone',
      phone: '06 12 34 56 78',
    },
    isActive: true,
    createdAt: '2024-07-21T10:30:00Z',
    updatedAt: '2024-07-21T10:30:00Z',
    tags: ['mobilier', 'canapé', 'gratuit'],
  },
  {
    id: '3',
    title: 'Cours de guitare pour débutants',
    description: 'Guitariste expérimenté propose des cours particuliers à domicile. Tous styles, tous âges. Premier cours gratuit.',
    location: 'Toulouse - Centre',
    price: 25,
    category: 'service',
    userId: 'user3',
    user: usersData[2],
    images: ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
    contactInfo: {
      preferredContact: 'email',
      email: 'alex.guitar@example.com',
    },
    isActive: true,
    createdAt: '2024-07-20T18:00:00Z',
    updatedAt: '2024-07-20T18:00:00Z',
    tags: ['musique', 'cours', 'guitare'],
  },
  {
    id: '4',
    title: 'Table basse design',
    description: 'Table basse en verre et métal, style industriel. Très bon état, aucun défaut.',
    location: 'Colomiers',
    price: 50,
    category: 'sale',
    condition: 'like-new',
    userId: 'user4',
    user: usersData[3],
    images: ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
    contactInfo: {
      preferredContact: 'message',
    },
    isActive: true,
    createdAt: '2024-07-22T09:00:00Z',
    updatedAt: '2024-07-22T09:00:00Z',
    tags: ['mobilier', 'table', 'design'],
  },
  {
    id: '5',
    title: 'Recherche colocataire',
    description: 'Cherche colocataire pour appartement T3 en centre-ville. Chambre meublée, balcon, proche transports.',
    location: 'Toulouse - Capitole',
    price: 450,
    category: 'service',
    userId: 'user1',
    user: usersData[0],
    images: ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
    contactInfo: {
      preferredContact: 'email',
      email: 'sophie.coloc@example.com',
    },
    isActive: true,
    createdAt: '2024-07-23T16:00:00Z',
    updatedAt: '2024-07-23T16:00:00Z',
    tags: ['logement', 'colocation', 'centre-ville'],
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') as Ad['category'] | null;
    const location = searchParams.get('location') || '';
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const condition = searchParams.get('condition') as Ad['condition'] | null;
    const sortField = searchParams.get('sortField') as AdsSortOptions['field'] || 'createdAt';
    const sortDirection = searchParams.get('sortDirection') as AdsSortOptions['direction'] || 'desc';
    const tags = searchParams.get('tags')?.split(',') || [];

    // Filter ads
    let filteredAds = adsData.filter(ad => ad.isActive);

    if (search) {
      const lowercaseSearch = search.toLowerCase();
      filteredAds = filteredAds.filter(ad =>
        ad.title.toLowerCase().includes(lowercaseSearch) ||
        ad.description.toLowerCase().includes(lowercaseSearch) ||
        ad.location.toLowerCase().includes(lowercaseSearch) ||
        ad.tags?.some(tag => tag.toLowerCase().includes(lowercaseSearch))
      );
    }

    if (category) {
      filteredAds = filteredAds.filter(ad => ad.category === category);
    }

    if (location) {
      const lowercaseLocation = location.toLowerCase();
      filteredAds = filteredAds.filter(ad => 
        ad.location.toLowerCase().includes(lowercaseLocation)
      );
    }

    if (minPrice !== undefined) {
      filteredAds = filteredAds.filter(ad => ad.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filteredAds = filteredAds.filter(ad => ad.price <= maxPrice);
    }

    if (condition) {
      filteredAds = filteredAds.filter(ad => ad.condition === condition);
    }

    if (tags.length > 0) {
      filteredAds = filteredAds.filter(ad =>
        ad.tags?.some(tag => tags.includes(tag))
      );
    }

    // Sort ads
    filteredAds.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Paginate
    const total = filteredAds.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAds = filteredAds.slice(startIndex, endIndex);

    const response: ApiResponse<Ad[]> = {
      data: paginatedAds,
      success: true,
      message: 'Ads retrieved successfully',
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching ads:', error);
    
    const errorResponse: ApiResponse<Ad[]> = {
      data: [],
      success: false,
      message: 'Failed to fetch ads',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateAdData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.location || body.price === undefined || !body.category) {
      const errorResponse: ApiResponse<Ad> = {
        data: {} as Ad,
        success: false,
        message: 'Missing required fields',
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get current user (in real app, this would come from auth)
    const currentUser = usersData.find(user => user.role === 'admin') || usersData[0];

    // Create new ad
    const newAd: Ad = {
      id: `ad_${Date.now()}`,
      title: body.title,
      description: body.description,
      location: body.location,
      price: body.price,
      category: body.category,
      condition: body.condition,
      userId: currentUser.id,
      user: currentUser,
      images: body.images || ['http://bilingue31.free.fr/Annonce_vitrine_OK.jpg'],
      contactInfo: body.contactInfo || {
        preferredContact: 'message',
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: body.expiresAt,
      tags: body.tags || [],
    };

    // In real app, save to database
    // await db.ads.create(newAd);
    
    // For now, just add to mock data
    adsData.push(newAd);

    const response: ApiResponse<Ad> = {
      data: newAd,
      success: true,
      message: 'Ad created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating ad:', error);
    
    const errorResponse: ApiResponse<Ad> = {
      data: {} as Ad,
      success: false,
      message: 'Failed to create ad',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
