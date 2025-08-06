
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Lock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// --- Simulation de l'utilisateur connecté ---
// Dans une application réelle, ces données proviendraient de votre système d'authentification.
const currentUser = {
  id: 'admin007',
  name: 'Admin James',
  sex: 'male',
  role: 'admin', // 'user' ou 'admin'
};
// Pour tester en tant qu'utilisateur homme : const currentUser = { id: 'user456', name: 'Marc', sex: 'male', role: 'user' };
// Pour tester en tant qu'utilisatrice : const currentUser = { id: 'user123', name: 'Sophie', sex: 'female', role: 'user' };
// -----------------------------------------


type Sortie = {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  image: string;
  dataAiHint?: string;
};

const sortiesFillesData: Sortie[] = [
  { id: '1', title: 'Brunch & Papotage', theme: 'Gastronomie', date: '2024-08-11T11:00:00Z', location: 'Café des Rêves, Toulouse', description: 'Un moment convivial entre filles autour d\'un délicieux brunch.', participants: 8, image: 'https://placehold.co/600x400.png', dataAiHint: 'brunch cafe' },
  { id: '2', title: 'Session Shopping rue St-Rome', theme: 'Shopping', date: '2024-08-18T15:00:00Z', location: 'Rue Saint-Rome, Toulouse', description: 'À la recherche de la perle rare !', participants: 4, image: 'https://placehold.co/600x400.png', dataAiHint: 'women shopping' },
  { id: '3', title: 'Cours de Yoga en plein air', theme: 'Bien-être', date: '2024-08-24T10:00:00Z', location: 'Jardin Japonais, Toulouse', description: 'Séance de yoga Vinyasa pour se recentrer et se détendre.', participants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'yoga park' },
  { id: '4', title: 'Atelier poterie', theme: 'Créatif', date: '2024-09-01T14:00:00Z', location: 'Atelier Terre & Formes', description: 'Exprimons notre créativité et créons des objets uniques.', participants: 6, image: 'https://placehold.co/600x400.png', dataAiHint: 'pottery workshop' },
];

export default function GirlsOnlyPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (currentUser.role !== 'admin' && currentUser.sex !== 'female') {
    return (
        <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center">Accès Restreint</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <Lock className="h-4 w-4" />
                        <AlertTitle>Section privée</AlertTitle>
                        <AlertDescription>
                            Désolé, cette section est réservée aux membres féminins et aux administrateurs.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex flex-col items-center text-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Sorties entre filles</h1>
          <p className="text-muted-foreground">L'espace dédié aux rencontres et activités 100% féminines.</p>
        </div>
        <Button asChild>
          <Link href="/sorties/create-only-girls">Proposer une sortie entre filles</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Prochaines sorties</CardTitle>
            <CardDescription>Rejoignez un groupe et partagez des moments uniques.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortiesFillesData.map((sortie) => (
              <Card key={sortie.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={sortie.image} alt={sortie.title} layout="fill" objectFit="cover" data-ai-hint={sortie.dataAiHint} />
                  <Badge variant="secondary" className="absolute top-2 right-2">{sortie.theme}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{sortie.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-4">{sortie.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{isClient ? format(new Date(sortie.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr }) : '...'}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{sortie.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                   <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{sortie.participants} participantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="destructive" size="sm">Participer</Button>
                    {currentUser.role === 'admin' && (
                        <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" title="Supprimer la sortie">
                            <Trash2 className="h-4 w-4"/>
                        </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
             {sortiesFillesData.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                    <p>Aucune sortie entre filles n'est prévue pour le moment.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
