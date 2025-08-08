
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    MapPin, Clock, Trash2, Car, User, CalendarIcon, Building, BedDouble, Ruler, Sofa, Coins, Users,
    Briefcase, GraduationCap, FileText, Sparkles, Clock3, BarChart, Link as LinkIcon
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Import data and types from other pages
// Mock ads data since ads page uses API hooks
const adsData: any[] = []; // Empty for now - could be replaced with API hook later
import { type CarpoolAd, carpoolData } from '@/app/(app)/carpooling/data';
import { type HousingAd, housingData } from '@/app/(app)/housing/data';
import { type JobAd, jobData } from '@/app/(app)/jobs/data';
import { type InternshipAd, internshipData } from '@/app/(app)/internships/data';
import { type QuestionnaireAd, questionnairesData } from '@/app/(app)/questionnaires/data';

// Mock current user
const currentUser = {
  name: 'Sophie',
};

// Generic component to render when a tab is empty
const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center text-muted-foreground py-10">
        <p>{message}</p>
    </div>
);

export default function MyAdsPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Filter ads for the current user
    const myAds = adsData.filter(ad => ad.user.name === currentUser.name);
    const myCarpools = carpoolData.filter(ad => ad.user.name === currentUser.name);
    const myHousings = housingData.filter(ad => ad.user.name === currentUser.name);
    const myJobs = jobData.filter(ad => ad.user.name === currentUser.name);
    const myInternships = internshipData.filter(ad => ad.user.name === currentUser.name);
    const myQuestionnaires = questionnairesData.filter(ad => ad.user.name === currentUser.name);

    if (!isClient) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col items-start mb-6 gap-2">
                <h1 className="text-3xl font-bold font-headline">Mes Annonces</h1>
                <p className="text-muted-foreground">Retrouvez ici toutes les annonces que vous avez publiées.</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="ads" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                            <TabsTrigger value="ads">Petites Annonces</TabsTrigger>
                            <TabsTrigger value="carpooling">Covoiturage</TabsTrigger>
                            <TabsTrigger value="housing">Logement</TabsTrigger>
                            <TabsTrigger value="jobs">Emploi</TabsTrigger>
                            <TabsTrigger value="internships">Stage & Alternance</TabsTrigger>
                            <TabsTrigger value="questionnaires">Questionnaires</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="ads" className="pt-6">
                            <h2 className="text-2xl font-bold font-headline mb-4">Mes Petites Annonces</h2>
                            {myAds.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myAds.map(ad => (
                                        <Card key={ad.id} className="overflow-hidden flex flex-col group">
                                             <div className="relative h-48 w-full">
                                                <Image src={ad.image} alt={ad.title} layout="fill" objectFit="cover" data-ai-hint={ad.dataAiHint} />
                                                 <div className="absolute top-2 right-2">
                                                     <Badge variant="secondary" className="text-lg font-bold">
                                                        {ad.price > 0 ? `${ad.price} €` : 'Gratuit'}
                                                     </Badge>
                                                 </div>
                                            </div>
                                            <CardHeader>
                                                <CardTitle className="text-lg">{ad.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                                                    <span>{ad.location}</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    <span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span>
                                                </div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : <EmptyState message="Vous n'avez publié aucune petite annonce." />}
                        </TabsContent>

                        <TabsContent value="carpooling" className="pt-6">
                             <h2 className="text-2xl font-bold font-headline mb-4">Mes annonces de covoiturage</h2>
                             {myCarpools.length > 0 ? (
                                <div className="space-y-4">
                                    {myCarpools.map(ad => (
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
                                                        <span className={`text-sm font-medium ${ad.type === 'offer' ? 'text-green-600' : 'text-blue-600'}`}>{ad.type === 'offer' ? 'Propose' : 'Recherche'}</span>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center text-sm text-muted-foreground mb-2"><Car className="w-4 h-4 mr-2" /><span>Trajet {ad.tripType === 'regular' ? 'régulier' : 'pour sortie'}</span></div>
                                                    <div className="flex items-center text-sm text-muted-foreground"><CalendarIcon className="w-4 h-4 mr-2" /><span>{isClient ? format(new Date(ad.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr }) : '...'}</span></div>
                                                </CardContent>
                                                <CardFooter>
                                                     <div className="flex items-center text-xs text-muted-foreground"><Clock className="w-3 h-3 mr-1" /><span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span></div>
                                                </CardFooter>
                                            </div>
                                            <div className="p-4 flex items-center justify-center border-t sm:border-t-0 sm:border-l">
                                                 <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : <EmptyState message="Vous n'avez publié aucune annonce de covoiturage." />}
                        </TabsContent>
                        
                        <TabsContent value="housing" className="pt-6">
                            <h2 className="text-2xl font-bold font-headline mb-4">Mes annonces de logement</h2>
                            {myHousings.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {myHousings.map(ad => (
                                        <Card key={ad.id} className="overflow-hidden flex flex-col">
                                             <div className="relative h-48 w-full">
                                                <Image src={ad.image} alt={ad.city} layout="fill" objectFit="cover" data-ai-hint={ad.dataAiHint} />
                                                 <Badge variant={ad.type === 'offer' ? 'destructive' : 'default'} className="absolute top-2 right-2">{ad.type === 'offer' ? 'Offre' : 'Demande'}</Badge>
                                            </div>
                                            <div className="p-4 flex-grow">
                                                <CardTitle className="text-lg mb-2">{ad.isColocation ? `Colocation à ${ad.city}` : `T${ad.rooms} à ${ad.city}`}</CardTitle>
                                                <CardDescription className="flex items-center gap-1 text-sm mb-4"><MapPin className="h-4 w-4" /> {ad.address}</CardDescription>
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2"><BedDouble className="w-4 h-4 text-primary" /><span>{ad.rooms} pièces</span></div>
                                                    <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-primary" /><span>{ad.surface} m²</span></div>
                                                    <div className="flex items-center gap-2"><Sofa className="w-4 h-4 text-primary" /><span>{ad.furnished ? 'Meublé' : 'Non meublé'}</span></div>
                                                    <div className="flex items-center gap-2"><Coins className="w-4 h-4 text-primary" /><span>{ad.rent} € / mois</span></div>
                                                    {ad.isColocation && (<div className="flex items-center gap-2 col-span-2"><Users className="w-4 h-4 text-primary" /><span>Colocation de {ad.flatmates} personnes</span></div>)}
                                                </div>
                                            </div>
                                            <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground"><Clock className="w-3 h-3 mr-1" /><span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span></div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : <EmptyState message="Vous n'avez publié aucune annonce de logement." />}
                        </TabsContent>

                        <TabsContent value="jobs" className="pt-6">
                            <h2 className="text-2xl font-bold font-headline mb-4">Mes annonces d'emploi</h2>
                            {myJobs.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {myJobs.map(ad => (
                                        <Card key={ad.id} className="overflow-hidden flex flex-col">
                                            <CardHeader className="flex flex-row justify-between items-start">
                                                <div>
                                                    <Badge variant={ad.type === 'offer' ? 'destructive' : 'default'} className="mb-2">{ad.type === 'offer' ? 'Offre' : 'Demande'}</Badge>
                                                    <CardTitle className="text-lg">{ad.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1">{ad.type === 'offer' ? <><Building className="h-4 w-4" />{ad.company}</> : <><User className="h-4 w-4" />{ad.user.name}</>}</CardDescription>
                                                </div>
                                                <div className="flex-shrink-0"><Image src={ad.user.avatar} alt={ad.user.name} width={40} height={40} className="rounded-full" data-ai-hint={ad.user.dataAiHint} /></div>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{ad.city}</span></div>
                                                    {ad.contractType && <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /><span>{ad.contractType}</span></div>}
                                                    <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /><span>{ad.workSchedule === 'full-time' ? 'Temps plein' : 'Temps partiel'}</span></div>
                                                    {ad.type === 'offer' && ad.details.educationLevel && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.educationLevel}</span></div>}
                                                    {ad.type === 'request' && ad.details.diploma && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.diploma}</span></div>}
                                                    {ad.type === 'request' && ad.details.skills && <div className="flex items-center gap-2 col-span-2"><Sparkles className="w-4 h-4 text-primary" /><span>{ad.details.skills}</span></div>}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground"><Clock className="w-3 h-3 mr-1" /><span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span></div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                             ) : <EmptyState message="Vous n'avez publié aucune annonce d'emploi." />}
                        </TabsContent>
                        
                        <TabsContent value="internships" className="pt-6">
                            <h2 className="text-2xl font-bold font-headline mb-4">Mes annonces de Stage & Alternance</h2>
                            {myInternships.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {myInternships.map(ad => (
                                         <Card key={ad.id} className="overflow-hidden flex flex-col">
                                            <CardHeader className="flex flex-row justify-between items-start">
                                                <div>
                                                    <Badge variant={ad.type === 'offer' ? 'destructive' : 'default'} className="mb-2">{ad.type === 'offer' ? 'Offre' : 'Demande'}</Badge>
                                                    <CardTitle className="text-lg">{ad.title}</CardTitle>
                                                    <CardDescription className="flex items-center gap-1">{ad.type === 'offer' ? <><Building className="h-4 w-4" />{ad.company}</> : <><User className="h-4 w-4" />{ad.user.name}</>}</CardDescription>
                                                </div>
                                                <div className="flex-shrink-0"><Image src={ad.user.avatar} alt={ad.user.name} width={40} height={40} className="rounded-full" data-ai-hint={ad.user.dataAiHint} /></div>
                                            </CardHeader>
                                            <CardContent className="flex-grow">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{ad.city}</span></div>
                                                    <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /><span>{ad.contractType}</span></div>
                                                    <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /><span>{ad.workSchedule === 'full-time' ? 'Temps plein' : 'Temps partiel'}</span></div>
                                                    {ad.type === 'offer' && ad.details.educationLevel && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.educationLevel}</span></div>}
                                                    {ad.type === 'request' && ad.details.diploma && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.diploma}</span></div>}
                                                    {ad.type === 'request' && ad.details.skills && <div className="flex items-center gap-2 col-span-2"><Sparkles className="w-4 h-4 text-primary" /><span>{ad.details.skills}</span></div>}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground"><Clock className="w-3 h-3 mr-1" /><span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span></div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : <EmptyState message="Vous n'avez publié aucune annonce de stage ou d'alternance." />}
                        </TabsContent>

                        <TabsContent value="questionnaires" className="pt-6">
                            <h2 className="text-2xl font-bold font-headline mb-4">Mes Questionnaires & Expériences</h2>
                            {myQuestionnaires.length > 0 ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {myQuestionnaires.map(ad => (
                                        <Card key={ad.id} className="overflow-hidden flex flex-col group">
                                             <div className="relative h-48 w-full">
                                                <Image src={ad.image} alt={ad.title} layout="fill" objectFit="cover" data-ai-hint={ad.dataAiHint} />
                                                 <div className="absolute top-2 right-2"><Badge variant="secondary" className="text-lg font-bold">{ad.compensation > 0 ? `${ad.compensation} €` : 'Non rémunéré'}</Badge></div>
                                            </div>
                                            <CardHeader>
                                                <CardTitle className="text-lg">{ad.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow space-y-2">
                                                <div className="flex items-center text-sm text-muted-foreground"><MapPin className="w-4 h-4 mr-2 text-primary" /><span>{ad.location}</span></div>
                                                 <div className="flex items-center text-sm text-muted-foreground"><LinkIcon className="w-4 h-4 mr-2 text-primary" /><a href={ad.link} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{ad.link}</a></div>
                                            </CardContent>
                                            <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                                <div className="flex items-center text-xs text-muted-foreground"><Clock className="w-3 h-3 mr-1" /><span>{isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span></div>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : <EmptyState message="Vous n'avez publié aucune annonce de questionnaire ou d'expérience." />}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

    