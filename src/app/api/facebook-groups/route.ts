import { NextRequest, NextResponse } from 'next/server';
import { FacebookGroup, ApiResponse } from '@/types';

// Mock Facebook groups data
let facebookGroups: FacebookGroup[] = [
  {
    id: '1',
    name: 'Étudiants Français Toulouse',
    description: 'Groupe principal pour tous les étudiants français de Toulouse',
    url: 'https://www.facebook.com/groups/etudiantsfrancaistoulouse',
    category: 'general',
    isActive: true,
    order: 1
  },
  {
    id: '2',
    name: 'Événements Étudiants Toulouse',
    description: 'Partage d\'événements et sorties pour étudiants',
    url: 'https://www.facebook.com/groups/evenementsetudiantstoulouse',
    category: 'events',
    isActive: true,
    order: 2
  },
  {
    id: '3',
    name: 'Logement Étudiant Toulouse',
    description: 'Annonces de colocation et logements étudiants',
    url: 'https://www.facebook.com/groups/logementetudianttoulouse',
    category: 'housing',
    isActive: true,
    order: 3
  },
  {
    id: '4',
    name: 'Culture & Sorties Toulouse',
    description: 'Découverte culturelle et sorties dans la région toulousaine',
    url: 'https://www.facebook.com/groups/culturesortitoustoulouse',
    category: 'culture',
    isActive: true,
    order: 4
  },
  {
    id: '5',
    name: 'Filles Toulousaines',
    description: 'Groupe réservé aux étudiantes de Toulouse',
    url: 'https://www.facebook.com/groups/fillestoulousaines',
    category: 'women',
    isActive: true,
    order: 5
  },
  {
    id: '6',
    name: 'Jobs & Stages Toulouse',
    description: 'Offres d\'emploi et de stages pour étudiants',
    url: 'https://www.facebook.com/groups/jobsstagestoulouse',
    category: 'professional',
    isActive: true,
    order: 6
  },
  {
    id: '7',
    name: 'Entraide Étudiants Toulouse',
    description: 'Aide scolaire et support entre étudiants',
    url: 'https://www.facebook.com/groups/entraideetudiantstoulouse',
    category: 'general',
    isActive: true,
    order: 7
  },
  {
    id: '8',
    name: 'Sorties Week-end Toulouse',
    description: 'Organisation de sorties week-end et voyages',
    url: 'https://www.facebook.com/groups/sortiesweekendtoulouse',
    category: 'events',
    isActive: true,
    order: 8
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    // Filter data
    let filteredData = facebookGroups.filter(group => group.isActive);
    
    // Apply category filter
    if (category && category !== 'all') {
      filteredData = filteredData.filter(group => group.category === category);
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(group =>
        group.name.toLowerCase().includes(searchLower) ||
        (group.description && group.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort by order
    filteredData.sort((a, b) => a.order - b.order);
    
    const response: ApiResponse<FacebookGroup[]> = {
      success: true,
      data: filteredData
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching Facebook groups:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Facebook groups' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Omit<FacebookGroup, 'id'> = await request.json();
    
    // Validate required fields
    if (!body.name || !body.url || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, url, category' },
        { status: 400 }
      );
    }
    
    // Validate URL format
    try {
      new URL(body.url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    // Create new Facebook group
    const newGroup: FacebookGroup = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      url: body.url,
      category: body.category,
      isActive: body.isActive ?? true,
      order: body.order ?? facebookGroups.length + 1
    };
    
    // Add to mock data
    facebookGroups.push(newGroup);
    
    const response: ApiResponse<FacebookGroup> = {
      success: true,
      data: newGroup
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating Facebook group:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create Facebook group' },
      { status: 500 }
    );
  }
}
