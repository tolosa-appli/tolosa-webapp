
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Briefcase, MapPin, GraduationCap, Clock, Search, Building, User, FileText, Sparkles, Clock3, BarChart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useGetInternships, type InternshipAd } from '@/hooks/useInternships';

// Schemas for forms
const offerSchema = z.object({
    recruiterName: z.string().min(2, "Le nom du recruteur doit contenir au moins 2 caractères."),
    recruiterAddress: z.string().min(3, "L'adresse doit contenir au moins 3 caractères."),
    recruiterCity: z.string().min(2, "La ville doit contenir au moins 2 caractères."),
    contractType: z.enum(['Stage', 'Alternance'], { required_error: "Veuillez sélectionner un type de contrat." }),
    industry: z.string().min(2, "Le secteur d'activité est requis."),
    positionTitle: z.string().min(3, "Le nom du poste est requis."),
    experienceRequired: z.string().min(1, "L'expérience requise est requise."),
    skillsRequired: z.string().min(10, "Les compétences doivent faire au moins 10 caractères."),
    educationLevel: z.string().min(1, "Le niveau d'études est requis."),
    workSchedule: z.enum(['full-time', 'part-time'], { required_error: "Veuillez sélectionner un type d'horaire." }),
});

const requestSchema = z.object({
    address: z.string().min(3, "L'adresse doit contenir au moins 3 caractères."),
    city: z.string().min(2, "La ville doit contenir au moins 2 caractères."),
    diploma: z.string().min(2, "Le diplôme est requis."),
    positionSought: z.string().min(3, "Le poste recherché est requis."),
    training: z.string().min(3, "La formation est requise."),
    contractDuration: z.string().min(1, "La durée du contrat est requise."),
    skills: z.string().min(10, "Les compétences doivent faire au moins 10 caractères."),
    workSchedule: z.enum(['full-time', 'part-time'], { required_error: "Veuillez sélectionner un type d'horaire." }),
});

type OfferFormData = z.infer<typeof offerSchema>;
type RequestFormData = z.infer<typeof requestSchema>;

const InternshipOfferForm = () => {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<OfferFormData>({
        resolver: zodResolver(offerSchema),
    });

    const onSubmit = (data: OfferFormData) => {
        console.log("New internship offer submitted:", data);
        toast({ title: "òsca !", description: "Offre publiée avec succès." });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="recruiterName">Nom du recruteur/entreprise</Label>
                    <Input id="recruiterName" placeholder="Ex: Web Solutions" {...register('recruiterName')} />
                    {errors.recruiterName && <p className="text-sm text-destructive">{errors.recruiterName.message}</p>}
                </div>
                <div>
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Input id="industry" placeholder="Ex: IT" {...register('industry')} />
                    {errors.industry && <p className="text-sm text-destructive">{errors.industry.message}</p>}
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="recruiterAddress">Adresse de l'entreprise</Label>
                    <Input id="recruiterAddress" placeholder="Ex: 1 Rue de l'Innovation" {...register('recruiterAddress')} />
                    {errors.recruiterAddress && <p className="text-sm text-destructive">{errors.recruiterAddress.message}</p>}
                </div>
                <div>
                    <Label htmlFor="recruiterCity">Ville</Label>
                    <Input id="recruiterCity" placeholder="Ex: Toulouse" {...register('recruiterCity')} />
                    {errors.recruiterCity && <p className="text-sm text-destructive">{errors.recruiterCity.message}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="positionTitle">Nom du poste</Label>
                <Input id="positionTitle" placeholder="Ex: Stage Développeur Web" {...register('positionTitle')} />
                {errors.positionTitle && <p className="text-sm text-destructive">{errors.positionTitle.message}</p>}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <Label>Type de contrat</Label>
                    <Controller name="contractType" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Stage">Stage</SelectItem>
                                <SelectItem value="Alternance">Alternance</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    {errors.contractType && <p className="text-sm text-destructive">{errors.contractType.message}</p>}
                </div>
                <div>
                    <Label>Temps de travail</Label>
                    <Controller name="workSchedule" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Temps plein</SelectItem>
                                <SelectItem value="part-time">Temps partiel</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    {errors.workSchedule && <p className="text-sm text-destructive">{errors.workSchedule.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="experienceRequired">Expérience requise</Label>
                    <Input id="experienceRequired" placeholder="Ex: Débutant accepté" {...register('experienceRequired')} />
                    {errors.experienceRequired && <p className="text-sm text-destructive">{errors.experienceRequired.message}</p>}
                </div>
                <div>
                    <Label htmlFor="educationLevel">Niveau d'études</Label>
                    <Input id="educationLevel" placeholder="Ex: Bac +3" {...register('educationLevel')} />
                    {errors.educationLevel && <p className="text-sm text-destructive">{errors.educationLevel.message}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="skillsRequired">Compétences recherchées</Label>
                <Textarea id="skillsRequired" placeholder="Listez les compétences clés..." {...register('skillsRequired')} />
                {errors.skillsRequired && <p className="text-sm text-destructive">{errors.skillsRequired.message}</p>}
            </div>

            <Button type="submit" className="w-full">Publier l'offre</Button>
        </form>
    );
};


const InternshipRequestForm = () => {
    const { toast } = useToast();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<RequestFormData>({
        resolver: zodResolver(requestSchema),
    });

    const onSubmit = (data: RequestFormData) => {
        console.log("New internship request submitted:", data);
        toast({ title: "òsca !", description: "Demande publiée avec succès." });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="address">Votre adresse / quartier</Label>
                    <Input id="address" placeholder="Ex: Quartier St-Cyprien" {...register('address')} />
                    {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
                </div>
                <div>
                    <Label htmlFor="city">Votre ville</Label>
                    <Input id="city" placeholder="Ex: Toulouse" {...register('city')} />
                    {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
            </div>

             <div>
                <Label htmlFor="positionSought">Poste recherché</Label>
                <Input id="positionSought" placeholder="Ex: Data Analyst" {...register('positionSought')} />
                {errors.positionSought && <p className="text-sm text-destructive">{errors.positionSought.message}</p>}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="diploma">Dernier diplôme (ou en cours)</Label>
                    <Input id="diploma" placeholder="Ex: Master 1 MIASHS" {...register('diploma')} />
                    {errors.diploma && <p className="text-sm text-destructive">{errors.diploma.message}</p>}
                </div>
                <div>
                    <Label htmlFor="training">Votre formation / école</Label>
                    <Input id="training" placeholder="Ex: Université Toulouse 1" {...register('training')} />
                    {errors.training && <p className="text-sm text-destructive">{errors.training.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                 <div>
                    <Label>Durée de contrat souhaitée</Label>
                    <Controller name="contractDuration" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="indifferent">Indifférent</SelectItem>
                                <SelectItem value="2 mois">2 mois</SelectItem>
                                <SelectItem value="3-5 mois">3-5 mois</SelectItem>
                                <SelectItem value="6 mois">6 mois</SelectItem>
                                <SelectItem value="1 an">1 an</SelectItem>
                                <SelectItem value="2 ans">2 ans</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    {errors.contractDuration && <p className="text-sm text-destructive">{errors.contractDuration.message}</p>}
                </div>
                 <div>
                    <Label>Temps de travail souhaité</Label>
                    <Controller name="workSchedule" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Temps plein</SelectItem>
                                <SelectItem value="part-time">Temps partiel</SelectItem>
                            </SelectContent>
                        </Select>
                    )} />
                    {errors.workSchedule && <p className="text-sm text-destructive">{errors.workSchedule.message}</p>}
                </div>
            </div>
            
            <div>
                <Label htmlFor="skills">Présentez vos compétences</Label>
                <Textarea id="skills" placeholder="Listez vos compétences et expériences pertinentes..." {...register('skills')} />
                {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
            </div>

            <Button type="submit" className="w-full">Publier ma recherche</Button>
        </form>
    );
};


export default function InternshipsPage() {
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

    const { data: internships = [], isLoading, error } = useGetInternships();

    const filteredAds = useMemo(() => {
        if (!hasSearched) return internships;
        if (searchTerm.length < 3) return [];

        const lowercasedTerm = searchTerm.toLowerCase();
        return internships.filter(ad =>
            ad.title.toLowerCase().includes(lowercasedTerm) ||
            (ad.company && ad.company.toLowerCase().includes(lowercasedTerm)) ||
            ad.city.toLowerCase().includes(lowercasedTerm) ||
            ad.user.name.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm, hasSearched, internships]);

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
    
    const adsToDisplay = hasSearched ? filteredAds : internships;
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Stage & Alternance</CardTitle>
                    <CardDescription>
                        Trouvez votre prochain stage/alternance ou le candidat idéal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Tabs defaultValue="offer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="offer">Je propose un stage / alternance</TabsTrigger>
                            <TabsTrigger value="request">Je cherche un stage / alternance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="offer">
                           <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Offre</CardTitle>
                                    <CardDescription>Remplissez les détails du poste à pourvoir.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <InternshipOfferForm />
                                </CardContent>
                           </Card>
                        </TabsContent>
                        <TabsContent value="request">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Nouvelle Recherche</CardTitle>
                                    <CardDescription>Décrivez le type de poste que vous recherchez.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <InternshipRequestForm />
                                </CardContent>
                           </Card>
                        </TabsContent>
                    </Tabs>

                    <div>
                        <h2 className="text-2xl font-bold font-headline my-4">Annonces de Stage & Alternance</h2>
                         <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher par poste, entreprise, ville..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                         
                         {renderSearchResultMessage()}

                        <div className="grid md:grid-cols-2 gap-6">
                            {isLoading && (
                                <div className="col-span-full text-center text-muted-foreground py-10">Chargement...</div>
                            )}
                            {error && (
                                <div className="col-span-full text-center text-destructive py-10">Erreur de chargement</div>
                            )}
                            {adsToDisplay.map((ad: InternshipAd) => (
                                <Card key={ad.id} className="overflow-hidden flex flex-col">
                                    <CardHeader className="flex flex-row justify-between items-start">
                                        <div>
                                            <Badge variant={ad.type === 'offer' ? 'destructive' : 'default'} className="mb-2">
                                                {ad.type === 'offer' ? 'Offre' : 'Demande'}
                                            </Badge>
                                            <CardTitle className="text-lg">{ad.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-1">
                                                {ad.type === 'offer' ? 
                                                    <><Building className="h-4 w-4" />{ad.company}</> : 
                                                    <><User className="h-4 w-4" />{ad.user.name}</>
                                                }
                                            </CardDescription>
                                        </div>
                                         <div className="flex-shrink-0">
                                            <Image src={ad.user.avatar} alt={ad.user.name} width={40} height={40} className="rounded-full" data-ai-hint={ad.user.dataAiHint} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /><span>{ad.city}</span></div>
                                            <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /><span>{ad.contractType}</span></div>
                                            <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /><span>{ad.workSchedule === 'full-time' ? 'Temps plein' : 'Temps partiel'}</span></div>
                                            
                                            {ad.type === 'offer' && ad.details.educationLevel && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.educationLevel}</span></div>}
                                            {ad.type === 'offer' && ad.details.experienceRequired && <div className="flex items-center gap-2"><BarChart className="w-4 h-4 text-primary" /><span>{ad.details.experienceRequired}</span></div>}
                                            {ad.type === 'offer' && ad.details.industry && <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /><span>{ad.details.industry}</span></div>}
                                            
                                            {ad.type === 'request' && ad.details.diploma && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-primary" /><span>{ad.details.diploma}</span></div>}
                                            {ad.type === 'request' && ad.details.skills && <div className="flex items-center gap-2 col-span-2"><Sparkles className="w-4 h-4 text-primary" /><span>{ad.details.skills}</span></div>}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-muted/50 p-3 flex justify-between items-center">
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>Publié {isClient ? formatDistanceToNow(new Date(ad.postedAt), { addSuffix: true, locale: fr }) : '...'}</span>
                                        </div>
                                        <Button size="sm">Contacter</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            {adsToDisplay.length === 0 && !hasSearched && !isLoading && !error && (
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

    
