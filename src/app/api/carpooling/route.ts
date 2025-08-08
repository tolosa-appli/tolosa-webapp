import { NextRequest, NextResponse } from 'next/server';
import { CarpoolAd, CreateCarpoolData, ApiResponse, User } from '@/types';

// Mock users data
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
    name: 'Julien Dubois',
    email: 'julien.dubois@example.com',
    avatar: '/avatars/julien.jpg',
    verified: true,
    joinedAt: '2023-02-20',
    isActive: true
  },
  {
    id: '3',
    name: 'Marie Leroy',
    email: 'marie.leroy@example.com',
    avatar: '/avatars/marie.jpg',
    verified: true,
    joinedAt: '2023-03-10',
    isActive: true
  },
  {
    id: '4',
    name: 'Pierre Bernard',
    email: 'pierre.bernard@example.com',
    avatar: '/avatars/pierre.jpg',
    verified: false,
    joinedAt: '2023-04-05',
    isActive: true
  }
];

// Mock carpool data
let carpoolData: CarpoolAd[] = [
  {
    id: '1',
    type: 'offer',
    tripType: 'regular',
    from: 'Toulouse Centre',
    to: 'Paul Sabatier',
    date: '2024-01-15T08:00:00Z',
    userId: '1',
    user: mockUsers[0],
    contactInfo: {
      phone: '+33 6 12 34 56 78',
      preferredContact: 'phone'
    },
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    type: 'request',
    tripType: 'regular',
    from: 'Capitole',
    to: 'Rangueil',
    date: '2024-01-16T18:30:00Z',
    userId: '2',
    user: mockUsers[1],
    contactInfo: {
      email: 'julien.dubois@example.com',
      preferredContact: 'email'
    },
    isActive: true,
    createdAt: '2024-01-11T09:30:00Z',
    updatedAt: '2024-01-11T09:30:00Z'
  },
  {
    id: '3',
    type: 'offer',
    tripType: 'outing',
    from: 'Toulouse',
    to: 'Montpellier',
    date: '2024-01-20T14:00:00Z',
    userId: '3',
    user: mockUsers[2],
    contactInfo: {
      phone: '+33 6 98 76 54 32',
      preferredContact: 'phone'
    },
    isActive: true,
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  {
    id: '4',
    type: 'request',
    tripType: 'outing',
    from: 'Toulouse',
    to: 'Barcelone',
    date: '2024-01-25T10:00:00Z',
    userId: '4',
    user: mockUsers[3],
    contactInfo: {
      email: 'pierre.bernard@example.com',
      preferredContact: 'message'
    },
    isActive: true,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    id: '5',
    type: 'offer',
    tripType: 'regular',
    from: 'Mirail',
    to: 'Jean Jaurès',
    date: '2024-01-17T07:45:00Z',
    userId: '1',
    user: mockUsers[0],
    contactInfo: {
      phone: '+33 6 12 34 56 78',
      preferredContact: 'phone'
    },
    isActive: true,
    createdAt: '2024-01-14T11:15:00Z',
    updatedAt: '2024-01-14T11:15:00Z'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const type = searchParams.get('type');
    const tripType = searchParams.get('tripType');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const userId = searchParams.get('userId');
    const search = searchParams.get('search');
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Filter data
    let filteredData = carpoolData.filter(carpool => carpool.isActive);
    
    // Apply filters
    if (type && type !== 'all') {
      filteredData = filteredData.filter(carpool => carpool.type === type);
    }
    
    if (tripType && tripType !== 'all') {
      filteredData = filteredData.filter(carpool => carpool.tripType === tripType);
    }
    
    if (from) {
      filteredData = filteredData.filter(carpool => 
        carpool.from.toLowerCase().includes(from.toLowerCase())
      );
    }
    
    if (to) {
      filteredData = filteredData.filter(carpool => 
        carpool.to.toLowerCase().includes(to.toLowerCase())
      );
    }
    
    if (dateFrom) {
      filteredData = filteredData.filter(carpool => 
        new Date(carpool.date) >= new Date(dateFrom)
      );
    }
    
    if (dateTo) {
      filteredData = filteredData.filter(carpool => 
        new Date(carpool.date) <= new Date(dateTo)
      );
    }
    
    if (userId) {
      filteredData = filteredData.filter(carpool => carpool.userId === userId);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(carpool =>
        carpool.from.toLowerCase().includes(searchLower) ||
        carpool.to.toLowerCase().includes(searchLower) ||
        carpool.user.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by date (most recent first)
    filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    const response: ApiResponse<CarpoolAd[]> = {
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
    console.error('Error fetching carpool ads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carpool ads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCarpoolData = await request.json();
    
    // Validate required fields
    if (!body.type || !body.tripType || !body.from || !body.to || !body.date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // For demo purposes, use the first user
    const user = mockUsers[0];
    
    // Create new carpool ad
    const newCarpool: CarpoolAd = {
      id: Date.now().toString(),
      type: body.type,
      tripType: body.tripType,
      from: body.from,
      to: body.to,
      date: body.date,
      userId: user.id,
      user: user,
      contactInfo: body.contactInfo,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to mock data
    carpoolData.push(newCarpool);
    
    const response: ApiResponse<CarpoolAd> = {
      success: true,
      data: newCarpool
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating carpool ad:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create carpool ad' },
      { status: 500 }
    );
  }
}
