import { NextRequest, NextResponse } from 'next/server';

type Message = { id: number; senderId: string; text: string; timestamp: string };

const conversations: Record<string, Message[]> = {
  '2': [
    { id: 1, senderId: '2', text: 'Salut Chloé, tu viens à la soirée Tapas ?', timestamp: 'Hier à 18:05' },
    { id: 2, senderId: '3', text: "Hey Lucas ! Oui bien sûr, j'y serai. Tu penses qu'il y aura du monde ?", timestamp: 'Hier à 18:10' },
    { id: 3, senderId: '2', text: 'Oui, la sortie est complète ! Ça va être sympa.', timestamp: 'Hier à 18:12' },
  ],
  '1': [
    { id: 1, senderId: '1', text: "Bonjour Chloé, bienvenue sur l'application ! N'hésitez pas si vous avez des questions.", timestamp: 'Il y a 2 jours' },
    { id: 2, senderId: '3', text: 'Bonjour Sophie, merci beaucoup pour l\'accueil !', timestamp: 'Il y a 2 jours' },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get('contactId') || '';
  const data = conversations[contactId] || [];
  return NextResponse.json({ success: true, data });
}

