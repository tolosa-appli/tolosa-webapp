
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Search, MapPin, Clock, PlusCircle, Trash2, Flag, Coins, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

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
import { questionnairesData } from './data';

// Schema for the form
const questionnaireSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  location: z.string().min(3, "Le lieu doit contenir au moins 3 caractères."),
  compensation: z.coerce.number().optional().default(0),
  link: z.string().url("Veuillez entrer une URL valide."),
});

type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

const QuestionnaireForm = ({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<QuestionnaireFormData>({
        resolver: zodResolver(questionnaireSchema),
    });

    const onSubmit = (data: QuestionnaireFormData) => {
        console.log("New questionnaire ad submitted:", data);
        toast({
            title: "òsca !",
            description: "Annonce publiée avec succès.",
        });
        reset();
        setDialogOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Titre de l'annonce</Label>
                <Input id="title" placeholder="Ex: Questionnaire pour mémoire de Master" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Décrivez le questionnaire ou l'expérience..." {...register('description')} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="location">Lieu (ou "En ligne")</Label>
                    <Input id="location" placeholder="Ex: Université Capitole" {...register('location')} />
                    {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="compensation">Rémunération (€) (laisser 0 si aucune)</Label>
                    <Input id="compensation" type="number" placeholder="Ex: 10" {...register('compensation')} />
                    {errors.compensation && <p className="text-sm text-destructive">{errors.compensation.message}</p>}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="link">Lien vers le questionnaire/site</Label>
                <Input id="link" placeholder="https://..." {...register('link')} />
                {errors.link && <p className="text-sm text-destructive">{errors.link.message}</p>}
            </div>
            <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>Annuler</Button>
                <Button type="submit">Publier l'annonce</Button>
            </DialogFooter>
        </form>
    );
};

export default function QuestionnairesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('date-desc');
    const [isClient, setIsClient] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredAndSortedAds = useMemo(() => {
        let ads = [...questionnairesData];

        if (searchTerm.length >= 3) {
            const lowercasedTerm = searchTerm.toLowerCase();
            ads = ads.filter(ad =>
                ad.title.toLowerCase().includes(lowercasedTerm) ||
                ad.description.toLowerCase().includes(lowercasedTerm) ||
                ad.location.toLowerCase().includes(lowercasedTerm)
            );
        }

        switch (sortOption) {
            case 'date-desc':
                ads.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
                break;
            case 'date-asc':
                ads.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
                break;
            case 'compensation-desc':
                ads.sort((a, b) => b.compensation - a.compensation);
                break;
            case 'compensation-asc':
                ads.sort((a, b) => a.compensation - b.compensation);
                break;
            case 'location-asc':
                ads.sort((a, b) => a.location.localeCompare(b.location));
                break;
        }

        return ads;
    }, [searchTerm, sortOption]);
    
    const displayAds = searchTerm.length < 3 ? questionnairesData : filteredAndSortedAds;
    const showEmptySearchMessage = searchTerm.length >= 3 && filteredAndSortedAds.length === 0;


    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Questionnaires & Expériences</CardTitle>
                    <CardDescription>
                       Participez à des questionnaires pour des mémoires ou des thèses ou à des expériences.
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
                        <Select onValueChange={setSortOption} defaultValue={sortOption}>
                            <SelectTrigger className="w-full sm:w-[220px]">
                                <SelectValue placeholder="Trier par..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date-desc">Plus récents</SelectItem>
                                <SelectItem value="date-asc">Plus anciens</SelectItem>
                                <SelectItem value="compensation-desc">Rémunération (décroissant)</SelectItem>
                                <SelectItem value="compensation-asc">Rémunération (croissant)</SelectItem>
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
                            <DialogContent className="sm:max-w-[480px]">
                                <DialogHeader>
                                    <DialogTitle>Nouvelle Annonce</DialogTitle>
                                </DialogHeader>
                                <QuestionnaireForm setDialogOpen={setIsDialogOpen} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Toutes les annonces</h2>
                        
                        {searchTerm.length > 0 && searchTerm.length < 3 && (
                            <div className="text-center text-destructive py-10">
                                <p>mot trop court, trois lettres minimum !</p>
                            </div>
                        )}

                        {searchTerm.length >= 3 && filteredAndSortedAds.length > 0 && (
                             <div className="text-center text-muted-foreground mb-4">
                                <p>tè ! On a trouvé {filteredAndSortedAds.length} résultat{filteredAndSortedAds.length > 1 ? 's' : ''} pour toi :</p>
                            </div>
                        )}
                        
                        {showEmptySearchMessage && (
                             <div className="text-center text-muted-foreground py-10">
                                <p>damatge, il y a 0 résultats pour ta recherche</p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            {(displayAds).map(ad => (
                                <Card key={ad.id} className="overflow-hidden flex flex-col group">
                                     <div className="relative h-48 w-full">
                                        <Image src={ad.image} alt={ad.title} layout="fill" objectFit="cover" data-ai-hint={ad.dataAiHint} />
                                         <div className="absolute top-2 right-2">
                                             <Badge variant="secondary" className="text-lg font-bold">
                                                {ad.compensation > 0 ? `${ad.compensation} €` : 'Non rémunéré'}
                                             </Badge>
                                         </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{ad.title}</CardTitle>
                                         <CardDescription className="text-sm text-muted-foreground pt-1">{ad.description.substring(0, 100)}{ad.description.length > 100 && '...'}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow space-y-2">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                                            <span>{ad.location}</span>
                                        </div>
                                         <div className="flex items-center text-sm text-muted-foreground">
                                            <LinkIcon className="w-4 h-4 mr-2 text-primary" />
                                            <a href={ad.link} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{ad.link}</a>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={ad.user.avatar} alt={ad.user.name} data-ai-hint={ad.user.dataAiHint} />
                                                <AvatarFallback>{ad.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{ad.user.name}</span>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    <span>{isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button size="sm" asChild>
                                                <Link href={ad.link} target="_blank" rel="noopener noreferrer">Participer</Link>
                                            </Button>
                                            {/* For now, assuming current user is 'Sophie' for demo delete button */}
                                            {ad.user.name === 'Sophie' ? (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
                                                    <Flag className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                            
                             {!showEmptySearchMessage && displayAds.length === 0 && (
                                <div className="col-span-full text-center text-muted-foreground py-10">
                                    <p>Aucune annonce pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    