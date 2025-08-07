import { NextRequest, NextResponse } from 'next/server';
import { Partner, ApiResponse } from '@/types';

// Mock data - replace with database calls later
const partnersData: Partner[] = [
  {
    id: '1',
    name: 'Bilingue 31',
    description: 'Le site pour pratiquer les langues à Toulouse.',
    website: 'http://www.bilingue.fr.nf/',
    icon: 'Languages',
    color: 'blue',
    isActive: true,
  },
  {
    id: '2',
    name: 'Happy People 31',
    description: 'Le réseau social pour se faire des amis et sortir à Toulouse.',
    website: 'http://happypeople.fr.nf/',
    icon: 'Heart',
    color: 'rose',
    isActive: true,
  },
];

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Filter only active partners
    const activePartners = partnersData.filter(partner => partner.isActive);

    // In the future, replace this with actual database call
    // const partners = await db.partners.findMany({
    //   where: { isActive: true }
    // });
    
    const response: ApiResponse<Partner[]> = {
      data: activePartners,
      success: true,
      message: 'Partners retrieved successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching partners:', error);
    
    const errorResponse: ApiResponse<Partner[]> = {
      data: [],
      success: false,
      message: 'Failed to fetch partners',
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
