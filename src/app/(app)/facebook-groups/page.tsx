
'use client';

import { useState } from 'react';
import { ExternalLink, Search, Users, Filter, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Hooks
import { useGetFacebookGroups } from '@/hooks/useFacebookGroups';
import { FacebookGroup } from '@/types';

const getCategoryLabel = (category: FacebookGroup['category']): string => {
  const labels = {
    general: 'Général',
    events: 'Événements',
    housing: 'Logement',
    culture: 'Culture',
    women: 'Femmes',
    professional: 'Professionnel'
  };
  return labels[category] || category;
};

const getCategoryColor = (category: FacebookGroup['category']): string => {
  const colors = {
    general: 'default',
    events: 'secondary',
    housing: 'outline',
    culture: 'destructive',
    women: 'default',
    professional: 'secondary'
  };
  return colors[category] || 'default';
};

const FacebookGroupCard = ({ group }: { group: FacebookGroup }) => {
  const handleVisit = () => {
    window.open(group.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1 mb-2 sm:mb-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{group.name}</span>
          <Badge variant={getCategoryColor(group.category) as any} className="text-xs">
            {getCategoryLabel(group.category)}
          </Badge>
        </div>
        {group.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
        )}
      </div>
      <Button onClick={handleVisit} size="sm" variant="outline" className="shrink-0">
        Visiter le groupe <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </li>
  );
};

const GroupSkeleton = () => (
  <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
    <div className="flex-1 mb-2 sm:mb-0">
      <div className="flex items-center gap-2 mb-1">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3 mt-1" />
    </div>
    <Skeleton className="h-8 w-24" />
  </li>
);

export default function FacebookGroupsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Get Facebook groups data
  const { 
    data: groups = [], 
    isLoading, 
    error 
  } = useGetFacebookGroups({ 
    search: search.length >= 2 ? search : undefined,
    category: categoryFilter !== 'all' ? categoryFilter as FacebookGroup['category'] : undefined
  });

  // Get unique categories for filter
  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'general', label: 'Général' },
    { value: 'events', label: 'Événements' },
    { value: 'housing', label: 'Logement' },
    { value: 'culture', label: 'Culture' },
    { value: 'women', label: 'Femmes' },
    { value: 'professional', label: 'Professionnel' },
  ];

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground">Impossible de charger les groupes Facebook.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Les meilleurs sites sur Facebook d'accueil et de sorties</h1>
        <p className="text-muted-foreground">Découvrez une sélection de groupes Facebook pour rester connecté et trouver des activités à Toulouse.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5" />
            Groupes Facebook recommandés
          </CardTitle>
          <CardDescription>
            Ces groupes sont gérés sur une plateforme externe. Cliquez sur les liens pour les découvrir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un groupe..."
                className="pl-10 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          {search.length > 0 && search.length < 2 && (
            <div className="text-center text-muted-foreground py-4">
              <p>Tapez au moins 2 caractères pour rechercher</p>
            </div>
          )}

          {isLoading ? (
            <ul className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <GroupSkeleton key={i} />
              ))}
            </ul>
          ) : groups.length > 0 ? (
            <>
              <div className="text-center text-muted-foreground mb-4">
                <p>{groups.length} groupe{groups.length > 1 ? 's' : ''} trouvé{groups.length > 1 ? 's' : ''}</p>
              </div>
              <ul className="space-y-4">
                {groups.map((group) => (
                  <FacebookGroupCard key={group.id} group={group} />
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Aucun groupe trouvé</p>
              <p className="text-sm">
                {search || categoryFilter !== 'all' 
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Aucun groupe Facebook disponible pour le moment'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
