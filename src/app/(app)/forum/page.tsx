'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, MessageSquarePlus, MessageCircle, Clock, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

// Hooks and utilities
import { useGetForumCategories, useGetForumThemes, useCreateForumMessage } from '@/hooks/useForum';
import { 
  formatLastActivity, 
  formatMessageCount, 
  getThemeEmoji, 
  getCategoryColor,
  generateForumUrl
} from '@/lib/forum-utils';
import { CreateForumMessageData } from '@/types';

const newDiscussionSchema = z.object({
  themeId: z.string().min(1, 'Veuillez sélectionner un thème.'),
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères.'),
  content: z.string().min(10, 'Le contenu doit contenir au moins 10 caractères.'),
});

type NewDiscussionFormData = z.infer<typeof newDiscussionSchema>;

const ThemeCard = ({ theme }: { theme: any }) => {
  return (
    <Link href={`/app/forum/${theme.slug}`}>
      <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer group">
        <div className="relative h-24 w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <span className="text-4xl">{getThemeEmoji(theme)}</span>
        </div>
        <CardHeader>
          <CardTitle className="text-base group-hover:text-primary line-clamp-2">
            {theme.name}
          </CardTitle>
          {theme.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {theme.description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>{formatMessageCount(theme.messageCount)}</span>
            </div>
            {theme.lastActivity && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatLastActivity(theme.lastActivity)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const ThemeSkeleton = () => (
  <Card className="h-full">
    <div className="h-24 w-full">
      <Skeleton className="h-full w-full rounded-t-lg" />
    </div>
    <CardHeader>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
    </CardContent>
  </Card>
);

export default function ForumPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get forum data
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useGetForumCategories();
  const { data: allThemes = [], isLoading: themesLoading } = useGetForumThemes();
  const createMessageMutation = useCreateForumMessage();
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<NewDiscussionFormData>({
    resolver: zodResolver(newDiscussionSchema),
  });

  const filteredCategories = useMemo(() => {
    if (searchTerm.length < 3) {
      if (hasSearched) {
        return [];
      }
      return categories;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    return categories.map(category => {
      const filteredThemes = category.themes.filter(theme =>
        theme.name.toLowerCase().includes(lowercasedTerm) ||
        theme.description?.toLowerCase().includes(lowercasedTerm)
      );
      return { ...category, themes: filteredThemes };
    }).filter(category => category.themes.length > 0);
  }, [searchTerm, hasSearched, categories]);
  
  const totalResults = useMemo(() => {
    return filteredCategories.reduce((acc, category) => acc + category.themes.length, 0);
  }, [filteredCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setHasSearched(term.length > 0);
  };

  const onSubmit = async (data: NewDiscussionFormData) => {
    try {
      const messageData: CreateForumMessageData = {
        title: data.title,
        content: data.content,
        themeId: data.themeId
      };

      await createMessageMutation.mutateAsync(messageData);
      
      toast({
        title: "òsca !",
        description: "Message publié avec succès",
        variant: "default"
      });
      reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de publier le message. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  if (categoriesError) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Erreur de chargement</h2>
            <p className="text-muted-foreground">Impossible de charger le forum.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Forum de discussions</h1>
        <p className="text-muted-foreground mt-2">
          Tu veux tchatcher, alors, crée ta discussion dans notre forum !
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Chercher un thème par mot-clé..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
             <Button>
              <MessageSquarePlus className="mr-2 h-5 w-5" />
              Créer une discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nouvelle Discussion</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="themeId">Thème</Label>
                <Controller
                  name="themeId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="themeId">
                            <SelectValue placeholder="Sélectionnez un thème" />
                        </SelectTrigger>
                        <SelectContent>
                            {allThemes.map(theme => (
                                <SelectItem key={theme.id} value={theme.id}>
                                  {getThemeEmoji(theme)} {theme.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  )}
                />
                {errors.themeId && <p className="text-sm text-destructive">{errors.themeId.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Titre du message</Label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Contenu du message</Label>
                <Textarea id="content" {...register('content')} />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>
              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={createMessageMutation.isPending}>
                  {createMessageMutation.isPending ? 'Publication...' : 'Publier'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

       {hasSearched && searchTerm.length > 0 && searchTerm.length < 3 && (
            <div className="text-center text-destructive py-10">
                <p>mot trop court, trois lettres minimum !</p>
            </div>
        )}

        {hasSearched && searchTerm.length >= 3 && (
             <div className="text-center text-muted-foreground mb-4">
                 {totalResults > 0 ? (
                     <p>tè ! On a trouvé {totalResults} résultat{totalResults > 1 ? 's' : ''} pour toi :</p>
                 ) : (
                     <p>damatge, il y a 0 résultats pour ta recherche</p>
                 )}
            </div>
        )}

      {categoriesLoading || themesLoading ? (
        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-10">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <ThemeSkeleton key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        filteredCategories.map((category) => (
          <div key={category.id} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold font-headline">{category.name}</h2>
              <Badge variant={getCategoryColor(category.id) as any}>
                {category.themes.length} thème{category.themes.length > 1 ? 's' : ''}
              </Badge>
            </div>
            {category.description && (
              <p className="text-muted-foreground mb-4">{category.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.themes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          </div>
        ))
      )}
      
      {!categoriesLoading && !themesLoading && filteredCategories.length === 0 && !hasSearched && (
        <div className="text-center text-muted-foreground py-10">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Aucun thème disponible</p>
          <p className="text-sm">Le forum est en cours de configuration</p>
        </div>
      )}
    </div>
  );
}