
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Search, Car, User, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { carpoolData } from './data';

// Schema for the form
const carpoolSchema = z.object({
  tripType: z.enum(['regular', 'outing'], { required_error: 'Veuillez sélectionner un type de trajet.' }),
  from: z.string().min(3, 'Le lieu de départ doit contenir au moins 3 caractères.'),
  to: z.string().min(3, 'Le lieu d\'arrivée doit contenir au moins 3 caractères.'),
  date: z.date({ required_error: 'Veuillez sélectionner une date.' }),
});

type CarpoolFormData = z.infer<typeof carpoolSchema>;

const CarpoolForm = ({ type }: { type: 'offer' | 'request' }) => {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<CarpoolFormData>({
        resolver: zodResolver(carpoolSchema),
    });

    const onSubmit = (data: CarpoolFormData) => {
        console.log(`New ${type} submitted:`, data);
        toast({
            title: "òsca !",
            description: "Annonce publiée avec succès.",
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
                <Label>Type de trajet</Label>
                <Controller
                    name="tripType"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="regular" id={`r1-${type}`} />
                                <Label htmlFor={`r1-${type}`}>Régulier</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="outing" id={`r2-${type}`} />
                                <Label htmlFor={`r2-${type}`}>Pour des sorties</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.tripType && <p className="text-sm text-destructive">{errors.tripType.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={`from-${type}`}>Départ</Label>
                    <Input id={`from-${type}`} placeholder="Ex: Toulouse, Capitole" {...register('from')} />
                    {errors.from && <p className="text-sm text-destructive">{errors.from.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor={`to-${type}`}>Arrivée</Label>
                    <Input id={`to-${type}`} placeholder="Ex: Blagnac, Aéroport" {...register('to')} />
                    {errors.to && <p className="text-sm text-destructive">{errors.to.message}</p>}
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Quand ?</Label>
                 <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    locale={fr}
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>
            <Button type="submit" className="w-full">
                {type === 'offer' ? 'Proposer ce trajet' : 'Chercher ce trajet'}
            </Button>
        </form>
    );
};


export default function CarpoolingPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchDate, setSearchDate] = useState<Date | undefined>();
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
        } else if (hasSearched && term.length === 0 && !searchDate) {
            setHasSearched(false);
        }
    };
    
    const handleDateChange = (date: Date | undefined) => {
        setSearchDate(date);
        if (!hasSearched && date) {
            setHasSearched(true);
        } else if (hasSearched && !date && searchTerm.length === 0) {
            setHasSearched(false);
        }
    }

    const filteredAds = useMemo(() => {
        if (!hasSearched) return carpoolData;

        let ads = [...carpoolData];

        if (searchTerm.length >= 3) {
            const lowercasedTerm = searchTerm.toLowerCase();
            ads = ads.filter(ad =>
                ad.from.toLowerCase().includes(lowercasedTerm) ||
                ad.to.toLowerCase().includes(lowercasedTerm) ||
                ad.user.name.toLowerCase().includes(lowercasedTerm)
            );
        }
        
        if (searchDate) {
            ads = ads.filter(ad => format(new Date(ad.date), 'yyyy-MM-dd') === format(searchDate, 'yyyy-MM-dd'));
        }
        
        if (searchTerm.length > 0 && searchTerm.length < 3 && !searchDate) {
            return [];
        }

        return ads;
    }, [searchTerm, searchDate, hasSearched]);

    const renderSearchResultMessage = () => {
        if (!hasSearched) return null;

        if (searchTerm.length > 0 && searchTerm.length < 3 && !searchDate) {
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
    
    const adsToDisplay = hasSearched ? filteredAds : carpoolData;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Covoiturage</CardTitle>
                    <CardDescription>
                        Proposez ou trouvez un trajet pour vos sorties ou vos déplacements réguliers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Tabs defaultValue="offer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="offer">Je propose un covoiturage</TabsTrigger>
                            <TabsTrigger value="request">Je cherche un covoiturage</TabsTrigger>
                        </TabsList>
                        <TabsContent value="offer">
                           <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Offre</CardTitle>
                                    <CardDescription>Remplissez les détails de votre trajet.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CarpoolForm type="offer" />
                                </CardContent>
                           </Card>
                        </TabsContent>
                        <TabsContent value="request">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Demande</CardTitle>
                                    <CardDescription>Indiquez le trajet que vous recherchez.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CarpoolForm type="request" />
                                </CardContent>
                           </Card>
                        </TabsContent>
                    </Tabs>

                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Annonces de covoiturage</h2>
                         <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Rechercher par lieu ou personne..."
                                    className="pl-10 w-full"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full sm:w-[280px] justify-start text-left font-normal",
                                            !searchDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {searchDate ? format(searchDate, "PPP", { locale: fr }) : <span>Rechercher par date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={searchDate}
                                        onSelect={handleDateChange}
                                        initialFocus
                                        locale={fr}
                                    />
                                </PopoverContent>
                            </Popover>
                         </div>
                         
                         {renderSearchResultMessage()}

                        <div className="space-y-4">
                            {adsToDisplay.map(ad => (
                                <Card key={ad.id} className="flex flex-col sm:flex-row">
                                    <div className="p-4 flex items-center justify-center sm:border-r">
                                         <Avatar className="h-16 w-16">
                                            <AvatarImage src={ad.user.avatar} alt={ad.user.name} data-ai-hint={ad.user.dataAiHint} />
                                            <AvatarFallback>{ad.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex-grow">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>{ad.from} → {ad.to}</span>
                                                <span className={`text-sm font-medium ${ad.type === 'offer' ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {ad.type === 'offer' ? 'Propose' : 'Recherche'}
                                                </span>
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-1 text-sm">
                                                <User className="h-4 w-4" /> {ad.user.name}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                <Car className="w-4 h-4 mr-2" />
                                                <span>Trajet {ad.tripType === 'regular' ? 'régulier' : 'pour sortie'}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <CalendarIcon className="w-4 h-4 mr-2" />
                                                <span>{isClient ? format(new Date(ad.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr }) : '...'}</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                             <div className="flex items-center text-xs text-muted-foreground">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span>
                                            </div>
                                        </CardFooter>
                                    </div>
                                    <div className="p-4 flex items-center justify-center border-t sm:border-t-0 sm:border-l">
                                         <Button>Contacter</Button>
                                    </div>
                                </Card>
                            ))}
                            {adsToDisplay.length === 0 && !hasSearched && (
                                <div className="text-center text-muted-foreground py-10">
                                    <p>Aucune annonce de covoiturage pour le moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    