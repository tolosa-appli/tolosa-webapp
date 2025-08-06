
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Search, Gamepad2, PlusCircle, Clock, ExternalLink } from 'lucide-react';

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
import { networkGamesData, type NetworkGameAd } from './data';

const platformOptions = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile', 'Steam Deck', 'Cloud Gaming', 'jeux sociaux ou hybrides', 'Autre plateforme'] as const;

// Schema for the form
const gameAdSchema = z.object({
  gameTitle: z.string().min(2, "Le titre du jeu doit contenir au moins 2 caractères."),
  gameGenre: z.string().min(3, "Le genre doit contenir au moins 3 caractères."),
  platform: z.enum(platformOptions, { required_error: "Veuillez sélectionner une plateforme." }),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
});

type GameAdFormData = z.infer<typeof gameAdSchema>;

const platformImages: Record<NetworkGameAd['platform'] | 'Autre plateforme' | 'jeux sociaux ou hybrides' | 'Steam Deck' | 'Cloud Gaming', string> = {
    'PC': 'http://bilingue31.free.fr/Ordi_OK.jpg',
    'PlayStation': 'http://bilingue31.free.fr/Playstation_OK.jpg',
    'Xbox': 'http://bilingue31.free.fr/Xbox_OK.jpg',
    'Nintendo Switch': 'http://bilingue31.free.fr/NintendoSwitch_OK.jpg',
    'Mobile': 'http://bilingue31.free.fr/Mobile_OK.jpg',
    'Autre plateforme': 'http://bilingue31.free.fr/autrePla_OK.jpg',
    'Steam Deck': 'http://bilingue31.free.fr/SteamDeck_OK.jpg',
    'Cloud Gaming': 'http://bilingue31.free.fr/CloudGaming_OK.jpg',
    'jeux sociaux ou hybrides': 'http://bilingue31.free.fr/JeuxSociauxHybr_OK.jpg',
};

const GameAdForm = ({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) => {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<GameAdFormData>({
        resolver: zodResolver(gameAdSchema),
    });

    const onSubmit = (data: GameAdFormData) => {
        console.log("New game ad submitted:", data);
        toast({
            title: "òsca !",
            description: "Annonce de jeu publiée avec succès.",
        });
        reset();
        setDialogOpen(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="gameTitle">Titre du jeu</Label>
                <Input id="gameTitle" placeholder="Ex: Stardew Valley" {...register('gameTitle')} />
                {errors.gameTitle && <p className="text-sm text-destructive">{errors.gameTitle.message}</p>}
            </div>
             <div className="grid md:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="gameGenre">Genre du jeu</Label>
                    <Input id="gameGenre" placeholder="Ex: Simulation" {...register('gameGenre')} />
                    {errors.gameGenre && <p className="text-sm text-destructive">{errors.gameGenre.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label>Plateforme</Label>
                    <Controller
                        name="platform"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                <SelectContent>
                                    {platformOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.platform && <p className="text-sm text-destructive">{errors.platform.message}</p>}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description de la recherche</Label>
                <Textarea id="description" placeholder="Qui cherchez-vous ? Quel mode de jeu ? Quel niveau ?" {...register('description')} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>Annuler</Button>
                <Button type="submit">Publier l'annonce</Button>
            </DialogFooter>
        </form>
    );
};

export default function NetworkGamesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [isClient, setIsClient] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    
    const filteredGames = useMemo(() => {
        let games = [...networkGamesData];

        if (platformFilter !== 'all') {
            games = games.filter(game => game.platform === platformFilter);
        }

        if (searchTerm.length >= 2) {
            const lowercasedTerm = searchTerm.toLowerCase();
            games = games.filter(game =>
                game.gameTitle.toLowerCase().includes(lowercasedTerm) ||
                game.gameGenre.toLowerCase().includes(lowercasedTerm) ||
                game.user.name.toLowerCase().includes(lowercasedTerm)
            );
        }

        return games.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }, [searchTerm, platformFilter]);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Gamepad2 />Jeux en réseau</CardTitle>
                    <CardDescription>
                        Trouvez des partenaires pour vos sessions de jeux en ligne.
                    </CardDescription>
                    <div className="pt-2">
                        <Button asChild>
                            <Link href="https://discord.gg/hFaxKxGWVR" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Rejoindre Discord
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher par jeu, genre..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Select onValueChange={setPlatformFilter} defaultValue={platformFilter}>
                            <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Plateforme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes plateformes</SelectItem>
                                {platformOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-5 w-5" />
                                    Chercher des joueurs
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[480px]">
                                <DialogHeader>
                                    <DialogTitle>Nouvelle Annonce de Jeu</DialogTitle>
                                </DialogHeader>
                                <GameAdForm setDialogOpen={setIsDialogOpen} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Annonces récentes</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGames.map(ad => (
                                <Card key={ad.id} className="overflow-hidden flex flex-col group">
                                     <div className="relative h-48 w-full">
                                        <Image 
                                            src={platformImages[ad.platform as keyof typeof platformImages] || ad.image} 
                                            alt={ad.gameTitle} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            data-ai-hint={ad.dataAiHint} 
                                        />
                                         <div className="absolute top-2 right-2">
                                             <Badge variant="secondary">{ad.platform}</Badge>
                                         </div>
                                          <div className="absolute top-2 left-2">
                                             <Badge variant="outline">{ad.gameGenre}</Badge>
                                         </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{ad.gameTitle}</CardTitle>
                                         <CardDescription className="text-sm text-muted-foreground pt-1">{ad.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="bg-muted/50 p-3 flex justify-between items-center mt-auto">
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
                                        <Button size="sm">Contacter</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            
                             {filteredGames.length === 0 && (
                                <div className="col-span-full text-center text-muted-foreground py-10">
                                    <p>Aucune annonce de jeu ne correspond à vos critères.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
