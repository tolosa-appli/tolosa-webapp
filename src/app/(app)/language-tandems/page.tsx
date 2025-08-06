
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, Languages, User, Users, Check, Clock, Video } from 'lucide-react';
import { tandemOffers, type TandemOffer } from './data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { FlagIcon } from 'react-flag-kit';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

type RegistrationStatus = 'none' | 'registered' | 'waiting';

export default function LanguageTandemsPage() {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<Record<string, RegistrationStatus>>({});
  const [participantCounts, setParticipantCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsClient(true);
    const initialCounts: Record<string, number> = {};
    tandemOffers.forEach(offer => {
      initialCounts[offer.id] = offer.participants.length;
    });
    setParticipantCounts(initialCounts);
  }, []);

  const handleRegistration = (offer: TandemOffer) => {
    const currentParticipants = participantCounts[offer.id] || 0;
    
    if (currentParticipants >= offer.maxParticipants) {
        setStatuses(prev => ({ ...prev, [offer.id]: 'waiting' }));
        toast({
            title: "Liste d'attente",
            description: "L'événement est complet, vous avez été ajouté à la liste d'attente.",
        });
    } else {
        setStatuses(prev => ({ ...prev, [offer.id]: 'registered' }));
        setParticipantCounts(prev => ({ ...prev, [offer.id]: currentParticipants + 1 }));
        toast({
            title: "Inscription confirmée !",
            description: `Vous êtes bien inscrit(e) au tandem de ${offer.user.username}.`,
        });
    }
  };

  const handleUnsubscribe = (offerId: string) => {
    setStatuses(prev => ({ ...prev, [offerId]: 'none' }));
    setParticipantCounts(prev => ({...prev, [offerId]: (prev[offerId] || 1) - 1 }));
    toast({
        title: "Désinscription réussie",
        description: "Vous n'êtes plus inscrit(e) à cet événement.",
    });
  };

  const renderActionButton = (offer: TandemOffer) => {
    const status = statuses[offer.id] || 'none';
    
    switch (status) {
        case 'registered':
            return (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full"><Check className="mr-2"/>Inscrit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Se désinscrire</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir vous désinscrire de ce tandem ? Votre place pourrait être prise par quelqu'un sur la liste d'attente.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleUnsubscribe(offer.id)}>Confirmer la désinscription</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        case 'waiting':
            return <Button variant="secondary" size="sm" className="w-full" disabled><Clock className="mr-2"/>En attente</Button>;
        case 'none':
        default:
             return <Button variant="destructive" size="sm" className="w-full" onClick={() => handleRegistration(offer)}>S'inscrire</Button>;
    }
  }


  return (
    <div className="container mx-auto p-4 md-p-8">
       <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4 -ml-4">
                <Link href="/language-cafe">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au Café des langues
                </Link>
            </Button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Tandems & Groupes de conversation</h1>
                    <p className="text-muted-foreground">Trouvez un partenaire pour pratiquer une langue étrangère.</p>
                </div>
                <Button asChild>
                    <Link href="/language-tandems/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Proposer un tandem ou une réunion de groupe
                    </Link>
                </Button>
            </div>
       </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Membres proposant un tandem</CardTitle>
            <CardDescription>Contactez un membre pour organiser un échange linguistique.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tandemOffers.map((offer) => (
              <Card key={offer.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="items-center text-center p-4 bg-muted/30 relative">
                    {offer.isOnline && (
                        <Badge variant="secondary" className="absolute top-2 right-2">
                           <Video className="h-3 w-3 mr-1"/> En visio
                        </Badge>
                    )}
                   <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                        <AvatarImage src={offer.user.avatar} alt={offer.user.username} data-ai-hint={offer.user.dataAiHint} />
                        <AvatarFallback>{offer.user.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg mt-2">{offer.user.username}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                        <Languages className="h-3 w-3" /> {offer.user.languages}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-4 space-y-3">
                    <div className="text-sm">
                        <p className="font-semibold mb-1">Langue proposée :</p>
                        <div className="flex items-center gap-2">
                           <FlagIcon code={offer.offeredLanguage.flagCode} size={20} />
                           <span>{offer.offeredLanguage.name}</span>
                        </div>
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold mb-1">Langue recherchée :</p>
                         <div className="flex items-center gap-2">
                           <FlagIcon code={offer.soughtLanguage.flagCode} size={20} />
                           <span>{offer.soughtLanguage.name}</span>
                        </div>
                    </div>
                   <p className="text-xs text-muted-foreground pt-2 border-t">{offer.description}</p>
                </CardContent>
                <CardFooter className="flex-col items-stretch p-3 bg-muted/50 space-y-2">
                   <div className="flex justify-center items-center text-sm font-medium">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{participantCounts[offer.id] || 0} / {offer.maxParticipants}</span>
                    </div>
                    {renderActionButton(offer)}
                </CardFooter>
              </Card>
            ))}
             {tandemOffers.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                    <p>Aucun membre ne propose de tandem pour le moment.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
