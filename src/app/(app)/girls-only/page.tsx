
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin, Lock, Search, Filter, Heart, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Hooks and utilities
import { useGetGirlsEvents, useUpdateEventParticipation } from '@/hooks/girlsEventsHooks';
import { 
  formatEventDate, 
  getEventStatus, 
  getEventStatusLabel, 
  getEventStatusColor,
  formatParticipantsCount,
  getAvailabilityStatus,
  getAvailabilityLabel,
  getThemeEmoji,
  eventThemes
} from '@/lib/girls-events-utils';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// --- Simulation de l'utilisateur connecté ---
// Dans une application réelle, ces données proviendraient de votre système d'authentification.
const currentUser = {
  id: 'admin007',
  name: 'Admin James',
  sex: 'female', // Changed to female for testing
  role: 'admin', // 'user' ou 'admin'
};

const EventCard = ({ event }: { event: any }) => {
  const { toast } = useToast();
  // const updateParticipationMutation = useUpdateEventParticipation();
  
  const status = getEventStatus(event);
  const availability = getAvailabilityStatus(event);
  
  const handleParticipate = async () => {
    try {
      // await updateParticipationMutation.mutateAsync({ 
      //   eventId: event.id, 
      //   action: 'join' 
      // });
      
      toast({
        title: "Inscription confirmée !",
        description: "Vous participez maintenant à cet événement.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de vous inscrire à cet événement.",
        variant: "destructive"
      });
    }
  };

  const canParticipate = status === 'upcoming' && availability !== 'full';

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        {event.images && event.images.length > 0 ? (
          <Image 
            src={event.images[0]} 
            alt={event.title} 
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
            <span className="text-4xl">{getThemeEmoji(event.theme)}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary">{event.theme}</Badge>
          <Badge variant={getEventStatusColor(status) as any}>
            {getEventStatusLabel(status)}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {event.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatEventDate(event.date)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-2" />
          <span>{formatParticipantsCount(event.currentParticipants, event.maxParticipants)}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Heart className="w-4 h-4 mr-2" />
          <span>Organisé par {event.organizer.name}</span>
        </div>
        {availability === 'few-spots' && (
          <Badge variant="destructive" className="text-xs">
            {getAvailabilityLabel(availability)}
          </Badge>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" />
          <span>Créé {formatEventDate(event.createdAt)}</span>
        </div>
        <Button 
          variant={canParticipate ? "default" : "secondary"}
          size="sm"
          disabled={!canParticipate}
          onClick={handleParticipate}
        >
          {status === 'full' ? 'Complet' :
           status === 'past' ? 'Terminé' :
           'Participer'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const EventSkeleton = () => (
  <Card className="flex flex-col overflow-hidden">
    <Skeleton className="h-48 w-full" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-8 w-20" />
    </CardFooter>
  </Card>
);

export default function GirlsOnlyPage() {
  const [search, setSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('upcoming');

  // Check access permissions
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

  // Get events data with filters
  // Stabilize filters to avoid infinite refetch loops
  const todayIso = useMemo(() => new Date().toISOString(), []);
  const girlsEventFilters = useMemo(() => ({
    search: search.length >= 2 ? search : undefined,
    theme: themeFilter !== 'all' ? themeFilter : undefined,
    hasSpace: statusFilter === 'available' ? true : undefined,
    dateFrom: statusFilter === 'upcoming' ? todayIso : undefined,
  }), [search, themeFilter, statusFilter, todayIso]);

  const { 
    data: eventsData, 
    isLoading, 
    error 
  } = useGetGirlsEvents(girlsEventFilters);

  // Temporary mock data for testing
  // const eventsData = { events: [] };
  // const isLoading = false;
  // const error = null;

  const events = eventsData?.events || [];

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground">Impossible de charger les événements.</p>
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
        <CardContent className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un événement..."
                className="pl-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les thèmes</SelectItem>
                  {eventThemes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {getThemeEmoji(theme)} {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="upcoming">À venir</SelectItem>
                <SelectItem value="available">Places dispo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          {search.length > 0 && search.length < 2 && (
            <div className="text-center text-muted-foreground py-4">
              <p>Tapez au moins 2 caractères pour rechercher</p>
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <EventSkeleton key={i} />
              ))}
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="text-center text-muted-foreground mb-4">
                <p>{events.length} événement{events.length > 1 ? 's' : ''} trouvé{events.length > 1 ? 's' : ''}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Aucun événement trouvé</p>
              <p className="text-sm">
                {search || themeFilter !== 'all' || statusFilter !== 'upcoming'
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Aucune sortie entre filles n\'est prévue pour le moment'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
