import { NextRequest, NextResponse } from 'next/server';
import { GirlsEvent, CreateGirlsEventData, ApiResponse, User } from '@/types';

// Mock users data (female users only for this context)
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    avatar: '/avatars/sophie.jpg',
    verified: true,
    joinedAt: '2023-01-15',
    isActive: true
  },
  {
    id: '2',
    name: 'Marie Leroy',
    email: 'marie.leroy@example.com',
    avatar: '/avatars/marie.jpg',
    verified: true,
    joinedAt: '2023-03-10',
    isActive: true
  },
  {
    id: '3',
    name: 'Camille Dubois',
    email: 'camille.dubois@example.com',
    avatar: '/avatars/camille.jpg',
    verified: true,
    joinedAt: '2023-02-20',
    isActive: true
  },
  {
    id: '4',
    name: 'Emma Bernard',
    email: 'emma.bernard@example.com',
    avatar: '/avatars/emma.jpg',
    verified: false,
    joinedAt: '2023-04-05',
    isActive: true
  }
];

// Mock girls events data
let girlsEvents: GirlsEvent[] = [
  {
    id: '1',
    title: 'Soirée filles au Rooftop',
    description: 'Une soirée détente entre filles sur un magnifique rooftop avec vue sur Toulouse. Ambiance cosy, cocktails et bonne humeur garantis !',
    theme: 'Soirée détente',
    date: '2025-08-20T19:00:00Z',
    location: 'Rooftop Bar, Centre-ville Toulouse',
    maxParticipants: 15,
    currentParticipants: 8,
    images: ['/events/rooftop1.jpg', '/events/rooftop2.jpg'],
    organizerId: '1',
    organizer: mockUsers[0],
    isActive: true,
    createdAt: '2025-08-01T14:30:00Z',
    updatedAt: '2025-08-01T14:30:00Z'
  },
  {
    id: '2',
    title: 'Atelier cuisine du monde',
    description: 'Venez découvrir les secrets de la cuisine internationale ! Nous préparerons ensemble des plats de différents pays. Niveau débutant accepté.',
    theme: 'Cuisine',
    date: '2025-08-25T14:00:00Z',
    location: 'Cuisine partagée, Quartier Saint-Cyprien',
    maxParticipants: 12,
    currentParticipants: 7,
    images: ['/events/cooking1.jpg'],
    organizerId: '2',
    organizer: mockUsers[1],
    isActive: true,
    createdAt: '2025-08-02T10:15:00Z',
    updatedAt: '2025-08-02T10:15:00Z'
  },
  {
    id: '3',
    title: 'Randonnée dans les Pyrénées',
    description: 'Escapade d\'une journée dans les Pyrénées pour une randonnée accessible à tous les niveaux. Transport organisé depuis Toulouse.',
    theme: 'Sport & Nature',
    date: '2025-08-28T08:00:00Z',
    location: 'Départ: Place du Capitole',
    maxParticipants: 20,
    currentParticipants: 15,
    images: ['/events/hiking1.jpg', '/events/hiking2.jpg', '/events/hiking3.jpg'],
    organizerId: '3',
    organizer: mockUsers[2],
    isActive: true,
    createdAt: '2025-08-03T16:20:00Z',
    updatedAt: '2025-08-03T16:20:00Z'
  },
  {
    id: '4',
    title: 'Soirée cinéma et débat',
    description: 'Projection d\'un film inspirant suivi d\'un débat autour d\'un thé. Une soirée pour échanger et partager nos points de vue.',
    theme: 'Culture',
    date: '2025-09-02T18:30:00Z',
    location: 'Cinéma ABC, Toulouse',
    maxParticipants: 25,
    currentParticipants: 12,
    images: ['/events/cinema1.jpg'],
    organizerId: '4',
    organizer: mockUsers[3],
    isActive: true,
    createdAt: '2025-08-04T11:45:00Z',
    updatedAt: '2025-08-04T11:45:00Z'
  },
  {
    id: '5',
    title: 'Cours de yoga en plein air',
    description: 'Séance de yoga relaxante dans un parc de Toulouse. Parfait pour se détendre après une semaine chargée. Tapis fournis.',
    theme: 'Sport & Bien-être',
    date: '2025-09-05T10:00:00Z',
    location: 'Parc de la Maourine',
    maxParticipants: 18,
    currentParticipants: 9,
    images: ['/events/yoga1.jpg', '/events/yoga2.jpg'],
    organizerId: '1',
    organizer: mockUsers[0],
    isActive: true,
    createdAt: '2025-08-05T09:30:00Z',
    updatedAt: '2025-08-05T09:30:00Z'
  },
  {
    id: '6',
    title: 'Brunch dominical entre copines',
    description: 'Un brunch convivial dans un café cosy du centre-ville. L\'occasion parfaite pour se retrouver et papoter autour de bons petits plats.',
    theme: 'Gastronomie',
    date: '2025-08-15T11:00:00Z',
    location: 'Café des Arts, Place Wilson',
    maxParticipants: 10,
    currentParticipants: 6,
    images: ['/events/brunch1.jpg'],
    organizerId: '2',
    organizer: mockUsers[1],
    isActive: true,
    createdAt: '2025-08-06T12:00:00Z',
    updatedAt: '2025-08-06T12:00:00Z'
  },
  {
    id: '7',
    title: 'Atelier créatif : Poterie',
    description: 'Découverte de la poterie dans un atelier chaleureux. Venez créer vos propres œuvres avec vos mains ! Aucune expérience requise.',
    theme: 'Art & Créativité',
    date: '2025-08-30T15:00:00Z',
    location: 'Atelier Terre & Feu, Quartier Carmes',
    maxParticipants: 8,
    currentParticipants: 4,
    images: ['/events/pottery1.jpg', '/events/pottery2.jpg'],
    organizerId: '3',
    organizer: mockUsers[2],
    isActive: true,
    createdAt: '2025-08-07T14:00:00Z',
    updatedAt: '2025-08-07T14:00:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const theme = searchParams.get('theme');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const location = searchParams.get('location');
    const organizerId = searchParams.get('organizerId');
    const search = searchParams.get('search');
    const hasSpace = searchParams.get('hasSpace'); // Filter events with available spots
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Filter data
    let filteredData = girlsEvents.filter(event => event.isActive);
    
    // Apply filters
    if (theme && theme !== 'all') {
      filteredData = filteredData.filter(event => 
        event.theme.toLowerCase().includes(theme.toLowerCase())
      );
    }
    
    if (dateFrom) {
      filteredData = filteredData.filter(event => 
        new Date(event.date) >= new Date(dateFrom)
      );
    }
    
    if (dateTo) {
      filteredData = filteredData.filter(event => 
        new Date(event.date) <= new Date(dateTo)
      );
    }
    
    if (location) {
      filteredData = filteredData.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (organizerId) {
      filteredData = filteredData.filter(event => event.organizerId === organizerId);
    }
    
    if (hasSpace === 'true') {
      filteredData = filteredData.filter(event => 
        !event.maxParticipants || event.currentParticipants < event.maxParticipants
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.theme.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.organizer.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by date (upcoming events first)
    filteredData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    const response: ApiResponse<GirlsEvent[]> = {
      success: true,
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching girls events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch girls events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateGirlsEventData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.theme || !body.date || !body.location) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, theme, date, location' },
        { status: 400 }
      );
    }
    
    // Validate date is in the future
    if (new Date(body.date) <= new Date()) {
      return NextResponse.json(
        { success: false, error: 'Event date must be in the future' },
        { status: 400 }
      );
    }
    
    // For demo purposes, use the first user as organizer
    const organizer = mockUsers[0];
    
    // Create new girls event
    const newEvent: GirlsEvent = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      theme: body.theme,
      date: body.date,
      location: body.location,
      maxParticipants: body.maxParticipants,
      currentParticipants: 0,
      images: body.images || [],
      organizerId: organizer.id,
      organizer: organizer,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock data
    girlsEvents.push(newEvent);
    
    const response: ApiResponse<GirlsEvent> = {
      success: true,
      data: newEvent
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating girls event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create girls event' },
      { status: 500 }
    );
  }
}

// Additional endpoint for joining/leaving events
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');
    const action = searchParams.get('action'); // 'join' or 'leave'
    
    if (!eventId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing eventId or action parameter' },
        { status: 400 }
      );
    }
    
    const event = girlsEvents.find(e => e.id === eventId && e.isActive);
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    if (action === 'join') {
      if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
        return NextResponse.json(
          { success: false, error: 'Event is full' },
          { status: 400 }
        );
      }
      event.currentParticipants += 1;
    } else if (action === 'leave') {
      if (event.currentParticipants > 0) {
        event.currentParticipants -= 1;
      }
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Use "join" or "leave"' },
        { status: 400 }
      );
    }
    
    event.updatedAt = new Date().toISOString();
    
    const response: ApiResponse<GirlsEvent> = {
      success: true,
      data: event
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating event participation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event participation' },
      { status: 500 }
    );
  }
}
