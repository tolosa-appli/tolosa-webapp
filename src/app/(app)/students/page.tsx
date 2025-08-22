
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
  isStudent: false, 
  role: 'admin', // 'user' ou 'admin'
};
// Pour tester en tant qu'utilisateur étudiant : const currentUser = { id: 'user789', name: 'Alex', isStudent: true, role: 'user' };
// Pour tester en tant qu'utilisateur non-étudiant : const currentUser = { id: 'user456', name: 'Marc', isStudent: false, role: 'user' };
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

import { useGetStudentOutings, type StudentOuting } from '@/hooks/useStudents';

export default function StudentsPage() {
  const [isClient, setIsClient] = useState(false);
  const { data: outings = [], isLoading, error } = useGetStudentOutings();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (currentUser.role !== 'admin' && !currentUser.isStudent) {
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
                            Désolé, cette section est réservée aux membres étudiants et aux administrateurs.
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
          <h1 className="text-3xl font-bold font-headline">Sorties étudiantes</h1>
          <p className="text-muted-foreground">L'espace dédié aux rencontres et activités pour les étudiants.</p>
        </div>
        <Button asChild>
          <Link href="/sorties/create-only-students">Proposer une sortie étudiante</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Prochaines sorties</CardTitle>
            <CardDescription>Rejoignez un groupe et partagez des moments uniques.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && (
              <div className="col-span-full text-center text-muted-foreground py-10">Chargement...</div>
            )}
            {error && (
              <div className="col-span-full text-center text-destructive py-10">Erreur de chargement</div>
            )}
            {outings.map((sortie: StudentOuting) => (
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
                    <span>{sortie.participants} participants</span>
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
             {outings.length === 0 && !isLoading && !error && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                    <p>Aucune sortie étudiante n'est prévue pour le moment.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
