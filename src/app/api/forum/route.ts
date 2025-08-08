import { NextRequest, NextResponse } from 'next/server';
import { ForumCategory, ForumTheme, ForumMessage, CreateForumMessageData, ApiResponse, User } from '@/types';

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
  }
];

// Mock forum themes
const forumThemes: ForumTheme[] = [
  {
    id: '1',
    name: 'Vie étudiante',
    slug: 'vie-etudiante',
    description: 'Discussions sur la vie étudiante à Toulouse',
    image: '📚',
    categoryId: 'general',
    isActive: true,
    order: 1,
    messageCount: 156,
    lastActivity: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Logement',
    slug: 'logement',
    description: 'Conseils et recherche de logement',
    image: '🏠',
    categoryId: 'general',
    isActive: true,
    order: 2,
    messageCount: 89,
    lastActivity: '2024-01-14T16:45:00Z'
  },
  {
    id: '3',
    name: 'Études & Cours',
    slug: 'etudes-cours',
    description: 'Questions sur les cours et programmes',
    image: '🎓',
    categoryId: 'academic',
    isActive: true,
    order: 3,
    messageCount: 234,
    lastActivity: '2024-01-15T14:20:00Z'
  },
  {
    id: '4',
    name: 'Jobs & Stages',
    slug: 'jobs-stages',
    description: 'Offres d\'emploi et stages',
    image: '💼',
    categoryId: 'professional',
    isActive: true,
    order: 4,
    messageCount: 67,
    lastActivity: '2024-01-13T09:15:00Z'
  },
  {
    id: '5',
    name: 'Sorties & Événements',
    slug: 'sorties-evenements',
    description: 'Organisation de sorties et événements',
    image: '🎉',
    categoryId: 'social',
    isActive: true,
    order: 5,
    messageCount: 178,
    lastActivity: '2024-01-15T18:00:00Z'
  },
  {
    id: '6',
    name: 'Culture & Loisirs',
    slug: 'culture-loisirs',
    description: 'Activités culturelles et loisirs',
    image: '🎨',
    categoryId: 'social',
    isActive: true,
    order: 6,
    messageCount: 92,
    lastActivity: '2024-01-12T20:30:00Z'
  }
];

// Mock forum categories
const forumCategories: ForumCategory[] = [
  {
    id: 'general',
    name: 'Général',
    slug: 'general',
    description: 'Discussions générales sur la vie à Toulouse',
    isActive: true,
    order: 1,
    themes: forumThemes.filter(theme => theme.categoryId === 'general')
  },
  {
    id: 'academic',
    name: 'Académique',
    slug: 'academic',
    description: 'Tout ce qui concerne les études',
    isActive: true,
    order: 2,
    themes: forumThemes.filter(theme => theme.categoryId === 'academic')
  },
  {
    id: 'professional',
    name: 'Professionnel',
    slug: 'professional',
    description: 'Emploi, stages et carrière',
    isActive: true,
    order: 3,
    themes: forumThemes.filter(theme => theme.categoryId === 'professional')
  },
  {
    id: 'social',
    name: 'Social',
    slug: 'social',
    description: 'Sorties, événements et loisirs',
    isActive: true,
    order: 4,
    themes: forumThemes.filter(theme => theme.categoryId === 'social')
  }
];

// Mock forum messages
let forumMessages: ForumMessage[] = [
  {
    id: '1',
    title: 'Conseils pour bien commencer l\'année universitaire',
    content: 'Salut tout le monde ! Je viens d\'arriver à Toulouse pour mes études. Quelqu\'un aurait des conseils pour bien commencer l\'année ?',
    themeId: '1',
    theme: forumThemes[0],
    userId: '1',
    user: mockUsers[0],
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    replyCount: 12
  },
  {
    id: '2',
    title: 'Recherche colocation proche Paul Sabatier',
    content: 'Je cherche une colocation pas trop loin de l\'université Paul Sabatier. Budget max 400€. Quelqu\'un a des pistes ?',
    themeId: '2',
    theme: forumThemes[1],
    userId: '2',
    user: mockUsers[1],
    isActive: true,
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    replyCount: 8
  },
  {
    id: '3',
    title: 'Cours de français pour étrangers',
    content: 'Bonjour, je suis étudiant étranger et je cherche des cours de français. Connaissez-vous de bonnes adresses à Toulouse ?',
    themeId: '3',
    theme: forumThemes[2],
    userId: '3',
    user: mockUsers[2],
    isActive: true,
    createdAt: '2024-01-15T14:20:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    replyCount: 15
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    
    if (endpoint === 'categories') {
      // Return categories with themes
      const response: ApiResponse<ForumCategory[]> = {
        success: true,
        data: forumCategories.filter(cat => cat.isActive)
      };
      return NextResponse.json(response);
    }
    
    if (endpoint === 'themes') {
      // Return themes
      const categoryId = searchParams.get('categoryId');
      let filteredThemes = forumThemes.filter(theme => theme.isActive);
      
      if (categoryId && categoryId !== 'all') {
        filteredThemes = filteredThemes.filter(theme => theme.categoryId === categoryId);
      }
      
      filteredThemes.sort((a, b) => a.order - b.order);
      
      const response: ApiResponse<ForumTheme[]> = {
        success: true,
        data: filteredThemes
      };
      return NextResponse.json(response);
    }
    
    // Default: return messages
    const themeId = searchParams.get('themeId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredMessages = forumMessages.filter(message => message.isActive);
    
    if (themeId && themeId !== 'all') {
      filteredMessages = filteredMessages.filter(message => message.themeId === themeId);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredMessages = filteredMessages.filter(message =>
        message.title.toLowerCase().includes(searchLower) ||
        message.content.toLowerCase().includes(searchLower) ||
        message.user.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort by creation date (most recent first)
    filteredMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredMessages.slice(startIndex, endIndex);
    
    const response: ApiResponse<ForumMessage[]> = {
      success: true,
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredMessages.length,
        totalPages: Math.ceil(filteredMessages.length / limit)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching forum data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forum data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateForumMessageData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.themeId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, content, themeId' },
        { status: 400 }
      );
    }
    
    // Validate theme exists
    const theme = forumThemes.find(t => t.id === body.themeId && t.isActive);
    if (!theme) {
      return NextResponse.json(
        { success: false, error: 'Invalid theme ID' },
        { status: 400 }
      );
    }
    
    // For demo purposes, use the first user
    const user = mockUsers[0];
    
    // Create new forum message
    const newMessage: ForumMessage = {
      id: Date.now().toString(),
      title: body.title,
      content: body.content,
      themeId: body.themeId,
      theme: theme,
      userId: user.id,
      user: user,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replyCount: 0
    };
    
    // Add to mock data
    forumMessages.push(newMessage);
    
    // Update theme message count
    theme.messageCount += 1;
    theme.lastActivity = newMessage.createdAt;
    
    const response: ApiResponse<ForumMessage> = {
      success: true,
      data: newMessage
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating forum message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create forum message' },
      { status: 500 }
    );
  }
}
