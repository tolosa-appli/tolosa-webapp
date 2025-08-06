
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { type Sortie, sortiesData, outingCategories, sportSubCategories } from './data';
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
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";

type RegistrationStatus = 'none' | 'registered' | 'waiting';

const themeImageMapping: Record<string, string> = {
    'afterwork': 'http://bilingue31.free.fr/sortie_Afterwork_1_OK.jpg',
    'atelier artistique': 'http://bilingue31.free.fr/sortie_AtelierArt_OK.jpg',
    'balade dans la nature': 'http://bilingue31.free.fr/sortie_Balade_Nature_OK.jpg',
    'bar, pub': 'http://bilingue31.free.fr/sortie_bar_OK.jpg',
    'Bien-Être': 'http://bilingue31.free.fr/sortie_BienEtre_OK.jpg',
    'billard': 'http://bilingue31.free.fr/sortie_Billard_OK.jpg',
    'Blind Test': 'http://bilingue31.free.fr/sortie_BlindTest_OK.jpg',
    'botanique': 'http://bilingue31.free.fr/sortie_Botanique_OK.jpg',
    'bowling': 'http://bilingue31.free.fr/sortie_Bowling_OK.jpg',
    'brunch': 'http://bilingue31.free.fr/sortie_Brunch_OK.jpg',
    'chant': 'http://bilingue31.free.fr/sortie_Chant_OK.jpg',
    'cinéma': 'http://bilingue31.free.fr/sortie_Cinema_1_OK.jpg',
    'concert': 'http://bilingue31.free.fr/sortie_concert_1_OK.jpg',
    'conférence': 'http://bilingue31.free.fr/sortie_conference_1_OK.jpg',
    'couture et crochet': 'http://bilingue31.free.fr/sortie_couture_1_OK.jpg',
    'cueillette': 'http://bilingue31.free.fr/sortie_ceuillette_OK.jpg',
    'cuisine': 'http://bilingue31.free.fr/sortie_cuisine_1_OK.jpg',
    'danse': 'http://bilingue31.free.fr/sortie_danse_OK.jpg',
    'débat': 'http://bilingue31.free.fr/sortie_debat_OK.jpg',
    'découverte du patrimoine': 'http://bilingue31.free.fr/sortie_decouvrepatri_OK.jpg',
    'dessin': 'http://bilingue31.free.fr/sortie_dessin_1_OK.jpg',
    'discothèque': 'http://bilingue31.free.fr/sortie_discotheque_1_OK.jpg',
    'écologie': 'http://bilingue31.free.fr/sortie_Ecologie_OK.jpg',
    'écriture': 'http://bilingue31.free.fr/sortie_ecriture_OK.jpg',
    'emploi': 'http://bilingue31.free.fr/sortie_Emploi_1_OK.jpg',
    'Escape Game': 'http://bilingue31.free.fr/sortie_EscapeGame_1_OK.jpg',
    'exposition': 'http://bilingue31.free.fr/sortie_Exposition_OK.jpg',
    'impro': 'http://bilingue31.free.fr/sortie_improvisation_OK.jpg',
    'informatique': 'http://bilingue31.free.fr/sortie_Informatique_OK.jpg',
    'jardinage': 'http://bilingue31.free.fr/sortie_Jardinage_OK.jpg',
    'jeux': 'http://bilingue31.free.fr/sortie_Jeux_1_OK.jpg',
    'karaoké': 'http://bilingue31.free.fr/sortie_Karaoke_OK.jpg',
    'langue': 'http://bilingue31.free.fr/sortie_Langues_1_OK.jpg',
    'Laser Game': 'http://bilingue31.free.fr/sortie_LaserGame_1_OK.jpg',
    'lecture': 'http://bilingue31.free.fr/sortie_Lecture_OK.jpg',
    'musées': 'http://bilingue31.free.fr/sortie_Musees_OK.jpg',
    'oenologie': 'http://bilingue31.free.fr/sortie_oenologie_1_OK.jpg',
    'peinture': 'http://bilingue31.free.fr/sortie_peinture_1_OK.jpg',
    'philo': 'http://bilingue31.free.fr/sortie_Philo_OK.jpg',
    'photographie': 'http://bilingue31.free.fr/sortie_Photo_1_OK.jpg',
    'pique-nique': 'http://bilingue31.free.fr/sortie_PiqueNique_4_OK.jpg',
    'psycho': 'http://bilingue31.free.fr/sortie_psycho_1_OK.jpg',
    'randonnée': 'http://bilingue31.free.fr/sortie_rando_1_OK.jpg',
    'restaurant': 'http://bilingue31.free.fr/sortie_restaurant_1_OK.jpg',
    'salon de thé': 'http://bilingue31.free.fr/sortie_salondeThe_OK.jpg',
    'sciences': 'http://bilingue31.free.fr/sortie_Sciences_OK.jpg',
    'shopping': 'http://bilingue31.free.fr/sortie_shopping_1_OK.jpg',
    'soirée entre filles': 'http://bilingue31.free.fr/sortie_soireefilles_OK.jpg',
    'social': 'http://bilingue31.free.fr/sortie_Social_OK.jpg',
    'sortie étudiante': 'http://bilingue31.free.fr/sortie_ERASMUS_OK.jpg',
    'sortie en Andorre': 'http://bilingue31.free.fr/sortie_Andorre_1_OK.jpg',
    'sortie en Espagne': 'http://bilingue31.free.fr/sortie_Espagne_1_OK.jpg',
    'spectacle': 'http://bilingue31.free.fr/sortie_Spectacle_OK.jpg',
    'spiritualité': 'http://bilingue31.free.fr/sortie_Spirirtualite_OK.jpg',
    'Stand Up': 'http://bilingue31.free.fr/sortie_StandUp_OK.jpg',
    'théâtre': 'http://bilingue31.free.fr/sortie_Theatre_OK.jpg',
    'train à 1 euro': 'http://bilingue31.free.fr/sortie_Train_OK.jpg',
    'vernissage et inauguration': 'http://bilingue31.free.fr/sortie_Vernissage_1_OK.jpg',
    'vidéo': 'http://bilingue31.free.fr/sortie_video_1_OK.jpg',
    'visite urbaine': 'http://bilingue31.free.fr/sortie_visiteville_OK.jpg',
    'volontariat': 'http://bilingue31.free.fr/sortie_Volontaires_1_OK.jpg',
    'voyage': 'http://bilingue31.free.fr/sortie_Voyage_OK.jpg',
    'autre sport': 'http://bilingue31.free.fr/sortie_autresport_OK.jpg',
    'camping': 'http://bilingue31.free.fr/sortie_Camping_OK.jpg',
    'fitness': 'http://bilingue31.free.fr/sortie_fitness_OK.jpg',
    'football': 'http://bilingue31.free.fr/sortie_football_OK.jpg',
    'jogging': 'http://bilingue31.free.fr/sortie_jogging_OK.jpg',
    'karting': 'http://bilingue31.free.fr/sortie_karting_OK.jpg',
    'natation': 'http://bilingue31.free.fr/sortie_nage_1_OK.jpg',
    'navigation': 'http://bilingue31.free.fr/navigation_OK.jpg',
    'patinoire': 'http://bilingue31.free.fr/sortie_patinoire_OK.jpg',
    'pétanque': 'http://bilingue31.free.fr/sortie_Petanque_OK.jpg',
    'plage': 'http://bilingue31.free.fr/sortie_Plage_OK.jpg',
    'rugby': 'http://bilingue31.free.fr/sortie_rugby_OK.jpg',
    'ski': 'http://bilingue31.free.fr/sortie_ski_OK.jpg',
    'sport de balle ou ballon': 'http://bilingue31.free.fr/sortie_sportballe_OK.jpg',
    'squash': 'http://bilingue31.free.fr/sortie_squash_OK.jpg',
    'tennis': 'http://bilingue31.free.fr/sortie_tennis_OK.jpg',
    'vélo': 'http://bilingue31.free.fr/sortie_velo_OK.jpg',
    'yoga': 'http://bilingue31.free.fr/sortie_yoga_OK.jpg',
};


export default function SortiesPage() {
  const { toast } = useToast();
  const [themeFilter, setThemeFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-newest');
  const [isClient, setIsClient] = useState(false);
  
  // State for managing registrations and participant counts
  const [statuses, setStatuses] = useState<Record<string, RegistrationStatus>>({});
  const [participantCounts, setParticipantCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    setIsClient(true);
    // Initialize participant counts from data
    const initialCounts: Record<string, number> = {};
    sortiesData.forEach(s => {
      initialCounts[s.id] = s.participants;
    });
    setParticipantCounts(initialCounts);
  }, []);

  const mainCategories = useMemo(() => outingCategories.filter(c => c !== 'Sport'), []);

  const filteredAndSortedSorties = useMemo(() => {
    let sorties = [...sortiesData];

    if (themeFilter !== 'all') {
      if (themeFilter === 'Sport') {
        sorties = sorties.filter(s => sportSubCategories.includes(s.theme));
      } else {
        sorties = sorties.filter(s => s.theme === themeFilter);
      }
    }

    switch (sortOption) {
      case 'date-newest':
        sorties.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-oldest':
        sorties.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'alphabetical':
        sorties.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sorties;
  }, [themeFilter, sortOption]);

  const handleRegistration = (sortie: Sortie) => {
    const isFull = (participantCounts[sortie.id] ?? sortie.participants) >= sortie.maxParticipants;
    
    if (isFull) {
        setStatuses(prev => ({ ...prev, [sortie.id]: 'waiting' }));
        toast({
            title: "Macaniche, il n'y a plus de place, raï, tu peux être mis en liste d'attente !",
        });
    } else {
        setStatuses(prev => ({ ...prev, [sortie.id]: 'registered' }));
        setParticipantCounts(prev => ({ ...prev, [sortie.id]: (prev[sortie.id] ?? sortie.participants) + 1 }));
        toast({
            title: "Inscription confirmée !",
            description: `Vous êtes inscrit(e) à "${sortie.title}".`,
        });
    }
  };
  
  const handleUnsubscribe = (sortieId: string) => {
    setStatuses(prev => ({ ...prev, [sortieId]: 'none' }));
    setParticipantCounts(prev => ({...prev, [sortieId]: (prev[sortieId] ?? 0) -1 }));
    toast({
        title: "Allez ! Mercès ! Désinscription prise en compte !",
    });
  };
  
  const renderActionButton = (sortie: Sortie) => {
    const status = statuses[sortie.id] || 'none';
    
    switch (status) {
        case 'registered':
            return (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">Se désinscrire</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>tu en sors pas ? Tu as la cagne ou tu es cané ?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Rester inscrit</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleUnsubscribe(sortie.id)}>Confirmer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            );
        case 'waiting':
            return <Button variant="secondary" size="sm" disabled>Sur liste d'attente</Button>;
        case 'none':
        default:
             return <Button variant="destructive" size="sm" onClick={() => handleRegistration(sortie)}>Participer</Button>;
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex flex-col items-center text-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Sorties à Toulouse</h1>
          <p className="text-muted-foreground">Créez et rejoignez des sorties et activités.</p>
        </div>
        <Button asChild>
          <Link href="/sorties/create">Proposer une sortie</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="theme-filter" className="text-sm font-medium">Filtrer par thème</label>
                <Select onValueChange={setThemeFilter} defaultValue={themeFilter}>
                  <SelectTrigger id="theme-filter" className="w-full mt-1">
                    <SelectValue placeholder="Thème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les thèmes</SelectItem>
                    {mainCategories.map(theme => (
                        <SelectItem key={theme} value={theme} className="capitalize">{theme}</SelectItem>
                    ))}
                    <SelectGroup>
                        <SelectLabel>Sport</SelectLabel>
                        <SelectItem value="Sport">Tous les sports</SelectItem>
                        {sportSubCategories.map(theme => (
                            <SelectItem key={theme} value={theme} className="capitalize pl-8">{theme}</SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label htmlFor="sort-order" className="text-sm font-medium">Trier par</label>
                <Select onValueChange={setSortOption} defaultValue={sortOption}>
                  <SelectTrigger id="sort-order" className="w-full mt-1">
                    <SelectValue placeholder="Trier par..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-newest">Date (plus proche)</SelectItem>
                    <SelectItem value="date-oldest">Date (plus lointaine)</SelectItem>
                    <SelectItem value="alphabetical">Ordre alphabétique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedSorties.map((sortie) => (
              <Card key={sortie.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image 
                    src={themeImageMapping[sortie.theme] || sortie.image} 
                    alt={sortie.title} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={sortie.dataAiHint} 
                   />
                  <Badge variant="secondary" className="absolute top-2 right-2 capitalize">{sortie.theme}</Badge>
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
                    <span>{participantCounts[sortie.id] ?? sortie.participants} / {sortie.maxParticipants} participants</span>
                  </div>
                  {renderActionButton(sortie)}
                </CardFooter>
              </Card>
            ))}
             {filteredAndSortedSorties.length === 0 && (
                <div className="col-span-full text-center text-muted-foreground py-10">
                    <p>Aucune sortie ne correspond à vos critères.</p>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
