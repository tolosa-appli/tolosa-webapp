
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Building, MapPin, BedDouble, Ruler, Users, Clock, Search, Home, Sofa, Coins } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { housingData } from './data';

// Schema for the form
const housingSchema = z.object({
  address: z.string().min(3, "L'adresse doit contenir au moins 3 caractères."),
  city: z.string().min(3, "La ville doit contenir au moins 3 caractères."),
  rooms: z.coerce.number().min(1, 'Veuillez indiquer le nombre de pièces.'),
  surface: z.coerce.number().min(10, "La surface doit être d'au moins 10m²."),
  furnished: z.boolean().default(false),
  rent: z.coerce.number().min(1, 'Veuillez indiquer le loyer.'),
  isColocation: z.boolean().default(false),
  flatmates: z.coerce.number().optional(),
  totalSurface: z.coerce.number().optional(),
  roomSurface: z.coerce.number().optional(),
}).refine(data => {
    if (data.isColocation) {
        return data.flatmates && data.flatmates > 0 && data.totalSurface && data.totalSurface > 0 && data.roomSurface && data.roomSurface > 0;
    }
    return true;
}, {
    message: "Pour une colocation, veuillez remplir tous les champs spécifiques.",
    path: ['isColocation']
});

type HousingFormData = z.infer<typeof housingSchema>;


const HousingForm = ({ type }: { type: 'offer' | 'request' }) => {
    const { toast } = useToast();
    const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm<HousingFormData>({
        resolver: zodResolver(housingSchema),
        defaultValues: {
            furnished: false,
            isColocation: false,
        }
    });

    const isColocation = watch('isColocation');

    const onSubmit = (data: HousingFormData) => {
        console.log(`New housing ${type} submitted:`, data);
        toast({
            title: "òsca !",
            description: "Annonce de logement publiée avec succès.",
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`address-${type}`}>Adresse / Quartier</Label>
                    <Input id={`address-${type}`} placeholder="Ex: 3 Rue du Taur" {...register('address')} />
                    {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={`city-${type}`}>Ville / Commune</Label>
                    <Input id={`city-${type}`} placeholder="Ex: Toulouse" {...register('city')} />
                    {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
            </div>
             <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`rooms-${type}`}>Pièces</Label>
                    <Input id={`rooms-${type}`} type="number" placeholder="Ex: 2" {...register('rooms')} />
                    {errors.rooms && <p className="text-sm text-destructive">{errors.rooms.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={`surface-${type}`}>Surface (m²)</Label>
                    <Input id={`surface-${type}`} type="number" placeholder="Ex: 50" {...register('surface')} />
                    {errors.surface && <p className="text-sm text-destructive">{errors.surface.message}</p>}
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor={`rent-${type}`}>Loyer (€/mois)</Label>
                    <Input id={`rent-${type}`} type="number" placeholder="Ex: 800" {...register('rent')} />
                    {errors.rent && <p className="text-sm text-destructive">{errors.rent.message}</p>}
                </div>
            </div>
            
            <div className="flex items-center space-x-2">
                <Controller
                    name="furnished"
                    control={control}
                    render={({ field }) => (
                         <Switch id={`furnished-${type}`} checked={field.value} onCheckedChange={field.onChange} />
                    )}
                />
                <Label htmlFor={`furnished-${type}`}>Meublé</Label>
            </div>

            <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                    <Controller
                        name="isColocation"
                        control={control}
                        render={({ field }) => (
                           <Checkbox id={`isColocation-${type}`} checked={field.value} onCheckedChange={field.onChange} />
                        )}
                    />
                    <Label htmlFor={`isColocation-${type}`}>C'est une colocation</Label>
                </div>
                {errors.isColocation && <p className="text-sm text-destructive">{errors.isColocation.message}</p>}


                {isColocation && (
                     <div className="grid md:grid-cols-3 gap-4 p-4 border rounded-md">
                        <div className="grid gap-2">
                            <Label htmlFor={`flatmates-${type}`}>Nb de colocs</Label>
                            <Input id={`flatmates-${type}`} type="number" placeholder="Ex: 3" {...register('flatmates')} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`totalSurface-${type}`}>Surface totale (m²)</Label>
                            <Input id={`totalSurface-${type}`} type="number" placeholder="Ex: 100" {...register('totalSurface')} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor={`roomSurface-${type}`}>Surface chambre (m²)</Label>
                            <Input id={`roomSurface-${type}`} type="number" placeholder="Ex: 15" {...register('roomSurface')} />
                        </div>
                    </div>
                )}
            </div>

            <Button type="submit" className="w-full">
                {type === 'offer' ? 'Proposer ce logement' : 'Publier ma recherche'}
            </Button>
        </form>
    );
};


export default function HousingPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (!hasSearched && term.length > 0) {
            setHasSearched(true);
        } else if (hasSearched && term.length === 0) {
            setHasSearched(false);
        }
    };

    const filteredAds = useMemo(() => {
        if (!hasSearched) return housingData;

        if (searchTerm.length < 3) return [];

        const lowercasedTerm = searchTerm.toLowerCase();
        return housingData.filter(ad =>
            ad.address.toLowerCase().includes(lowercasedTerm) ||
            ad.city.toLowerCase().includes(lowercasedTerm) ||
            ad.user.name.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm, hasSearched]);

    const renderSearchResultMessage = () => {
        if (!hasSearched) return null;

        if (searchTerm.length > 0 && searchTerm.length < 3) {
            return (
                <div className="text-center text-destructive py-4">
                    <p>mot trop court, trois lettres minimum !</p>
                </div>
            );
        }
        
        if (filteredAds.length > 0) {
            return (
                <div className="text-center text-muted-foreground mb-4">
                    <p>tè ! On a trouvé {filteredAds.length} résultat{filteredAds.length > 1 ? 's' : ''} pour toi :</p>
                </div>
            );
        } else {
             return (
                <div className="text-center text-muted-foreground py-4">
                    <p>damatge, il y a 0 résultats pour ta recherche</p>
                </div>
            );
        }
    };
    
    const adsToDisplay = hasSearched ? filteredAds : housingData;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Logement</CardTitle>
                    <CardDescription>
                        Trouvez votre prochain logement, ou publiez une annonce.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Tabs defaultValue="offer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="offer">Je propose un logement</TabsTrigger>
                            <TabsTrigger value="request">Je cherche un logement</TabsTrigger>
                        </TabsList>
                        <TabsContent value="offer">
                           <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Offre de Logement</CardTitle>
                                    <CardDescription>Remplissez les détails de votre logement.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <HousingForm type="offer" />
                                </CardContent>
                           </Card>
                        </TabsContent>
                        <TabsContent value="request">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Recherche de Logement</CardTitle>
                                    <CardDescription>Indiquez le logement que vous recherchez.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <HousingForm type="request" />
                                </CardContent>
                           </Card>
                        </TabsContent>
                    </Tabs>

                    <div>
                        <h2 className="text-2xl font-bold font-headline my-4">Annonces de logement</h2>
                         <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher par lieu, ville, ou personne..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                         
                         {renderSearchResultMessage()}

                        <div className="grid md:grid-cols-2 gap-6">
                            {adsToDisplay.map(ad => (
                                <Card key={ad.id} className="overflow-hidden flex flex-col">
                                     <div className="relative h-48 w-full">
                                        <Image 
                                            src={ad.type === 'offer' ? 'http://bilingue31.free.fr/Logement_interieur_OK.jpg' : 'http://bilingue31.free.fr/Logement_demande_OK.jpg'} 
                                            alt={ad.city} 
                                            layout="fill" 
                                            objectFit="cover" 
                                            data-ai-hint={ad.dataAiHint} 
                                        />
                                         <Badge variant={ad.type === 'offer' ? 'destructive' : 'default'} className="absolute top-2 right-2">
                                            {ad.type === 'offer' ? 'Offre' : 'Demande'}
                                        </Badge>
                                    </div>
                                    <div className="p-4 flex-grow">
                                        <CardTitle className="text-lg mb-2">{ad.isColocation ? `Colocation à ${ad.city}` : `T${ad.rooms} à ${ad.city}`}</CardTitle>
                                        <CardDescription className="flex items-center gap-1 text-sm mb-4">
                                            <MapPin className="h-4 w-4" /> {ad.address}
                                        </CardDescription>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-primary" /><span>{ad.rooms} pièces</span></div>
                                            <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-primary" /><span>{ad.surface} m²</span></div>
                                            <div className="flex items-center gap-2"><Sofa className="w-4 h-4 text-primary" /><span>{ad.furnished ? 'Meublé' : 'Non meublé'}</span></div>
                                            <div className="flex items-center gap-2"><Coins className="w-4 h-4 text-primary" /><span>{ad.rent} € / mois</span></div>
                                            {ad.isColocation && (
                                                <div className="flex items-center gap-2 col-span-2"><Users className="w-4 h-4 text-primary" /><span>Colocation de {ad.flatmates} personnes</span></div>
                                            )}
                                        </div>
                                    </div>

                                    <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center">
                                                <Image src={ad.user.avatar} alt={ad.user.name} width={24} height={24} className="rounded-full mr-2" data-ai-hint={ad.user.dataAiHint} />
                                                <span className="text-sm font-medium">{ad.user.name}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span>{isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span>
                                            </div>
                                        </div>
                                        <Button size="sm">Contacter</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            {adsToDisplay.length === 0 && !hasSearched && (
                                <div className="col-span-full text-center text-muted-foreground py-10">
                                    <p>Aucune annonce de logement pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
