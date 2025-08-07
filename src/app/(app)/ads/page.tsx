
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Search, MapPin, Clock, PlusCircle, Trash2, Flag, UserX, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useGetAds, useCreateAd, useDeleteAd, useReportAd } from '@/hooks/useAds';
import { CreateAdData, Ad } from '@/types';
import { 
  adCategories, 
  adConditions, 
  formatPrice, 
  getContactLabel, 
  getCategoryColor,
  getAdCategoryInfo,
  getAdConditionInfo 
} from '@/lib/ad-utils';

// --- Simulation de l'utilisateur connecté ---
const currentUser = {
  name: 'AdminUser',
  role: 'admin' as 'user' | 'moderator' | 'admin',
};
// -----------------------------------------

// Schema for the form
const adSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  location: z.string().min(3, "Le lieu doit contenir au moins 3 caractères."),
  price: z.coerce.number().min(0, "Le prix doit être positif.").default(0),
  category: z.enum(['sale', 'purchase', 'service', 'free', 'exchange'], {
    required_error: "Veuillez choisir une catégorie.",
  }),
  condition: z.enum(['new', 'like-new', 'good', 'fair', 'poor']).optional(),
});

type AdFormData = z.infer<typeof adSchema>;

const AdForm = ({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    const createAdMutation = useCreateAd();
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AdFormData>({
        resolver: zodResolver(adSchema),
    });

    const selectedCategory = watch('category');
    const showCondition = selectedCategory === 'sale' || selectedCategory === 'exchange';

    const onSubmit = async (data: AdFormData) => {
        try {
            const createData: CreateAdData = {
                title: data.title,
                description: data.description,
                location: data.location,
                price: data.price,
                category: data.category,
                condition: data.condition,
                contactInfo: {
                    preferredContact: 'message',
                },
            };

            await createAdMutation.mutateAsync(createData);
            
            toast({
                title: "òsca !",
                description: "Annonce publiée avec succès.",
            });
            reset();
            setDialogOpen(false);
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la publication.",
                variant: "destructive",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Titre de l'annonce</Label>
                <Input id="title" placeholder="Ex: Vends guitare classique" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select onValueChange={(value) => register('category').onChange({ target: { value } })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choisissez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        {adCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                                {category.label} - {category.description}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>

            {showCondition && (
                <div className="grid gap-2">
                    <Label htmlFor="condition">État (optionnel)</Label>
                    <Select onValueChange={(value) => register('condition').onChange({ target: { value } })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choisissez l'état" />
                        </SelectTrigger>
                        <SelectContent>
                            {adConditions.map((condition) => (
                                <SelectItem key={condition.value} value={condition.value!}>
                                    {condition.label} - {condition.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.condition && <p className="text-sm text-destructive">{errors.condition.message}</p>}
                </div>
            )}

            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Décrivez votre article ou service..." {...register('description')} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="location">Lieu</Label>
                    <Input id="location" placeholder="Ex: Toulouse, Capitole" {...register('location')} />
                    {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="price">Prix (€) (laisser 0 si gratuit)</Label>
                    <Input id="price" type="number" placeholder="Ex: 50" {...register('price')} />
                    {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>
                    Annuler
                </Button>
                <Button type="submit" disabled={createAdMutation.isPending}>
                    {createAdMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Publier l'annonce
                </Button>
            </DialogFooter>
        </form>
    );
};

export default function AdsPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('createdAt-desc');
    const [categoryFilter, setCategoryFilter] = useState<Ad['category'] | 'all'>('all');
    const [isClient, setIsClient] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Parse sort option
    const [sortField, sortDirection] = sortOption.split('-') as [keyof Pick<Ad, 'createdAt' | 'price' | 'title' | 'location'>, 'asc' | 'desc'];

    // API calls
    const { 
        data: adsResponse, 
        isLoading, 
        error 
    } = useGetAds({
        search: searchTerm.length >= 3 ? searchTerm : undefined,
        category: categoryFilter !== 'all' ? categoryFilter : undefined,
        sortField,
        sortDirection,
        limit: 50,
    });

    const deleteAdMutation = useDeleteAd();
    const reportAdMutation = useReportAd();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    const handleReport = async (adId: string, adTitle: string) => {
        try {
            await reportAdMutation.mutateAsync({ adId, reason: 'Contenu inapproprié' });
            toast({
                title: "Signalement envoyé",
                description: `Merci d'avoir signalé l'annonce "${adTitle}". Nous allons l'examiner.`,
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors du signalement.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async (adId: string, adTitle: string) => {
        try {
            await deleteAdMutation.mutateAsync(adId);
            toast({
                title: "Annonce supprimée",
                description: `L'annonce "${adTitle}" a été supprimée.`,
            });
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue lors de la suppression.",
                variant: "destructive",
            });
        }
    };

    const ads = adsResponse?.ads || [];
    const showEmptySearchMessage = searchTerm.length >= 3 && ads.length === 0;

    // --- Simulation de l'utilisateur connecté ---
    const currentUser = {
        id: 'admin1',
        name: 'AdminUser',
        role: 'admin' as 'user' | 'moderator' | 'admin',
    };
    // -----------------------------------------
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Petites Annonces</CardTitle>
                    <CardDescription>
                        Achetez, vendez ou échangez des biens et services au sein de la communauté.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher par titre, description, lieu..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Select onValueChange={(value) => setCategoryFilter(value as Ad['category'] | 'all')} value={categoryFilter}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Toutes catégories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes catégories</SelectItem>
                                {adCategories.map((category) => (
                                    <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={setSortOption} defaultValue={sortOption}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Trier par..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="createdAt-desc">Plus récentes</SelectItem>
                                <SelectItem value="createdAt-asc">Plus anciennes</SelectItem>
                                <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                                <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                                <SelectItem value="location-asc">Lieu (A-Z)</SelectItem>
                            </SelectContent>
                        </Select>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Poster une annonce
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Nouvelle Annonce</DialogTitle>
                                </DialogHeader>
                                <AdForm setDialogOpen={setIsDialogOpen} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Toutes les annonces</h2>
                        
                        {isLoading && (
                            <div className="flex justify-center items-center py-10">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <span className="ml-2">Chargement des annonces...</span>
                            </div>
                        )}

                        {error && (
                            <div className="text-center text-destructive py-10">
                                <p>Une erreur est survenue lors du chargement des annonces.</p>
                            </div>
                        )}

                        {searchTerm.length > 0 && searchTerm.length < 3 && (
                            <div className="text-center text-destructive py-10">
                                <p>mot trop court, trois lettres minimum !</p>
                            </div>
                        )}

                        {searchTerm.length >= 3 && ads.length > 0 && (
                             <div className="text-center text-muted-foreground mb-4">
                                <p>tè ! On a trouvé {ads.length} résultat{ads.length > 1 ? 's' : ''} pour toi :</p>
                            </div>
                        )}
                        
                        {showEmptySearchMessage && (
                             <div className="text-center text-muted-foreground py-10">
                                <p>damatge, il y a 0 résultats pour ta recherche</p>
                            </div>
                        )}

                        {!isLoading && !error && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {ads.map((ad: Ad) => (
                                    <Card key={ad.id} className="overflow-hidden flex flex-col group">
                                         <div className="relative h-48 w-full">
                                            <Image 
                                                src={ad.images[0]} 
                                                alt={ad.title} 
                                                fill
                                                className="object-cover"
                                            />
                                             <div className="absolute top-2 right-2">
                                                 <Badge variant="secondary" className="text-lg font-bold">
                                                    {formatPrice(ad.price)}
                                                 </Badge>
                                             </div>
                                             <div className="absolute top-2 left-2">
                                                 <Badge className={getCategoryColor(ad.category)}>
                                                    {getAdCategoryInfo(ad.category)?.label}
                                                 </Badge>
                                             </div>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{ad.title}</CardTitle>
                                             <CardDescription className="text-sm text-muted-foreground pt-1">
                                                {ad.description.substring(0, 100)}{ad.description.length > 100 && '...'}
                                             </CardDescription>
                                             {ad.condition && (
                                                 <Badge variant="outline" className="w-fit">
                                                     {getAdConditionInfo(ad.condition)?.label}
                                                 </Badge>
                                             )}
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                <MapPin className="w-4 h-4 mr-2 text-primary" />
                                                <span>{ad.location}</span>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={ad.user.avatar} alt={ad.user.name} />
                                                    <AvatarFallback>{ad.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{ad.user.name}</span>
                                                    <div className="flex items-center text-xs text-muted-foreground">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        <span>
                                                            {isClient ? formatDistanceToNow(new Date(ad.createdAt), { addSuffix: true, locale: fr }) : '...'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Button size="sm">
                                                    {getContactLabel(ad.contactInfo?.preferredContact || 'message')}
                                                </Button>
                                                {(ad.userId === currentUser.id || currentUser.role === 'admin') ? (
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="h-8 w-8 text-destructive" 
                                                        title="Supprimer"
                                                        onClick={() => handleDelete(ad.id, ad.title)}
                                                        disabled={deleteAdMutation.isPending}
                                                    >
                                                        {deleteAdMutation.isPending ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                ) : (
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="h-8 w-8 text-muted-foreground" 
                                                        title="Signaler" 
                                                        onClick={() => handleReport(ad.id, ad.title)}
                                                        disabled={reportAdMutation.isPending}
                                                    >
                                                        {reportAdMutation.isPending ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Flag className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                )}
                                                {currentUser.role === 'admin' && ad.userId !== currentUser.id && (
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" title="Suspendre l'utilisateur">
                                                        <UserX className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                ))}
                                
                                 {!showEmptySearchMessage && ads.length === 0 && !isLoading && (
                                    <div className="col-span-full text-center text-muted-foreground py-10">
                                        <p>Aucune petite annonce pour le moment.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


    

    
