
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { outingCategories, sportSubCategories } from '../data';
import { ArrowLeft, CalendarIcon, Upload, ExternalLink } from 'lucide-react';

// --- Simulation de l'utilisateur connecté ---
const currentUser = {
  role: 'admin' as 'user' | 'moderator' | 'admin',
};
// -----------------------------------------

const createOutingSchema = z.object({
  title: z.string().min(1, "Le titre est requis."),
  mainCategory: z.string().min(1, "Veuillez sélectionner une catégorie."),
  sportSubCategory: z.string().optional(),
  date: z.date({ required_error: 'Veuillez sélectionner une date.' }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM)."),
  endDate: z.date().optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM).").optional().or(z.literal('')),
  duration: z.string().optional(),
  deadline: z.date().optional(),
  photo: z.any().optional(),
  description: z.string().min(1, "La description est requise."),
  participantCount: z.array(z.number()).min(1),
  organizer: z.string().optional(),
  canBeReplaced: z.boolean().default(false),
  theme: z.string().optional(),
  locationName: z.string().min(1, "Le nom du lieu est requis."),
  locationAddress: z.string().min(1, "L'adresse est requise."),
  isOnline: z.boolean().default(false),
  isHybrid: z.boolean().default(false),
  transportInfo: z.string().optional(),
  isFree: z.boolean().default(false),
  repeatEvent: z.boolean().default(false),
  allowGuests: z.boolean().default(false),
  registrationStartDate: z.date().optional(),
  registrationEndDate: z.date().optional(),
});

type CreateOutingFormData = z.infer<typeof createOutingSchema>;

export default function CreateOnlyGirlsOutingPage() {
    const { toast } = useToast();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const form = useForm<CreateOutingFormData>({
        resolver: zodResolver(createOutingSchema),
        defaultValues: {
            participantCount: [20],
            canBeReplaced: false,
            isOnline: false,
            isHybrid: false,
            isFree: false,
            repeatEvent: false,
            allowGuests: false,
        }
    });

    const { watch, control, handleSubmit, formState: { errors } } = form;
    const watchMainCategory = watch('mainCategory');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const onSubmit = (data: CreateOutingFormData) => {
        console.log("New girls only outing created:", data);
        toast({
            title: "òsca !",
            description: "La sortie entre filles a bien été créée !",
        });
        // Here you would typically redirect or clear the form
    };

    const maxParticipants = currentUser.role === 'admin' || currentUser.role === 'moderator' ? 500 : 100;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                 <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/girls-only">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux sorties entre filles
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Créer une sortie entre filles</h1>
                <p className="text-muted-foreground">Proposez une sortie exclusivement pour la communauté féminine.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations principales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" {...form.register('title')} />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Catégorie</Label>
                                <Controller name="mainCategory" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                        <SelectContent>
                                            {outingCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}/>
                                {errors.mainCategory && <p className="text-sm text-destructive">{errors.mainCategory.message}</p>}
                            </div>
                             {watchMainCategory === 'Sport' && (
                                <div className="grid gap-2">
                                    <Label>Sous-catégorie Sport</Label>
                                    <Controller name="sportSubCategory" control={control} render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                            <SelectContent>
                                                {sportSubCategories.map(subCat => <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}/>
                                </div>
                            )}
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                             <div className="grid gap-2">
                                <Label>Date de début</Label>
                                <Controller name="date" control={control} render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={fr} /></PopoverContent>
                                    </Popover>
                                )}/>
                                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="time">Heure de début</Label>
                                <Input id="time" {...form.register('time')} placeholder="Ex: 19:30" />
                                {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                            </div>
                             <div className="grid gap-2">
                                <Label>Date de fin</Label>
                                <Controller name="endDate" control={control} render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Optionnel</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={fr} /></PopoverContent>
                                    </Popover>
                                )}/>
                                {errors.endDate && <p className="text-sm text-destructive">{errors.endDate.message}</p>}
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="endTime">Heure de fin</Label>
                                <Input id="endTime" {...form.register('endTime')} placeholder="Optionnel" />
                                {errors.endTime && <p className="text-sm text-destructive">{errors.endTime.message}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Durée</Label>
                                <Input id="duration" {...form.register('duration')} placeholder="Ex: 2 heures" />
                            </div>
                             <div className="grid gap-2">
                                <Label>Date limite d'annulation</Label>
                                <Controller name="deadline" control={control} render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Optionnel</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={fr} /></PopoverContent>
                                    </Popover>
                                )}/>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Présentation</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Photo de présentation</Label>
                             <div className="flex items-center gap-4">
                                <div className="w-32 h-32 relative border rounded-md flex items-center justify-center bg-muted">
                                    {photoPreview ? 
                                        <Image src={photoPreview} alt="Aperçu" layout="fill" objectFit="cover" className="rounded-md" /> : 
                                        <span className="text-sm text-muted-foreground">Mon évènement</span>
                                    }
                                </div>
                                <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="max-w-xs"/>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...form.register('description')} rows={5} />
                             {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader><CardTitle>Lieu</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="locationName">Nom du lieu</Label>
                                <Input id="locationName" {...form.register('locationName')} />
                                {errors.locationName && <p className="text-sm text-destructive">{errors.locationName.message}</p>}
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="locationAddress">Adresse</Label>
                                <Input id="locationAddress" {...form.register('locationAddress')} />
                                {errors.locationAddress && <p className="text-sm text-destructive">{errors.locationAddress.message}</p>}
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Besoin d'aide ? <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-primary underline">Ouvrir Google Maps <ExternalLink className="inline h-4 w-4"/></a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Controller name="isOnline" control={control} render={({ field }) => <Checkbox id="isOnline" checked={field.value} onCheckedChange={field.onChange} />} />
                            <Label htmlFor="isOnline">En visio</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Controller name="isHybrid" control={control} render={({ field }) => <Checkbox id="isHybrid" checked={field.value} onCheckedChange={field.onChange} />} />
                            <Label htmlFor="isHybrid">Hybride</Label>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="transportInfo">Accès en transports</Label>
                            <Textarea id="transportInfo" {...form.register('transportInfo')} placeholder="Ex: Métro Ligne A - Arrêt Capitole" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Détails et Organisation</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Nombre de participants</Label>
                            <Controller name="participantCount" control={control} render={({ field }) => (
                                <div className="flex items-center gap-4">
                                     <Slider defaultValue={field.value} max={maxParticipants} min={1} step={1} onValueChange={field.onChange} className="flex-1"/>
                                     <span className="w-12 text-center font-bold p-2 border rounded-md">{field.value}</span>
                                </div>
                            )}/>
                            <p className="text-sm text-muted-foreground">A visto de Naz combien penses tu de gens tu vas pouvoir mettre ?</p>
                        </div>
                         <div className="grid md:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="organizer">Intervenant ou organisateur</Label>
                                <Input id="organizer" {...form.register('organizer')} placeholder="Votre nom (par défaut)" />
                            </div>
                             <div className="flex items-end pb-2">
                                <div className="flex items-center space-x-2">
                                    <Controller name="canBeReplaced" control={control} render={({ field }) => <Checkbox id="canBeReplaced" checked={field.value} onCheckedChange={field.onChange} />} />
                                    <Label htmlFor="canBeReplaced">Proposer un autre à ma place si je ne peux pas y aller</Label>
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="theme">Thème (si non listé)</Label>
                            <Input id="theme" {...form.register('theme')} />
                        </div>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader><CardTitle>Inscriptions & options</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label>Date d'ouverture des inscriptions</Label>
                                <Controller name="registrationStartDate" control={control} render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Optionnel</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={fr} /></PopoverContent>
                                    </Popover>
                                )}/>
                            </div>
                            <div className="grid gap-2">
                                <Label>Date de clôture des inscriptions</Label>
                                <Controller name="registrationEndDate" control={control} render={({ field }) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Optionnel</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus locale={fr} /></PopoverContent>
                                    </Popover>
                                )}/>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4">
                             <div className="flex items-center space-x-2">
                                <Controller name="isFree" control={control} render={({ field }) => <Checkbox id="isFree" checked={field.value} onCheckedChange={field.onChange} />} />
                                <Label htmlFor="isFree">Gratuit ?</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Controller name="repeatEvent" control={control} render={({ field }) => <Checkbox id="repeatEvent" checked={field.value} onCheckedChange={field.onChange} />} />
                                <Label htmlFor="repeatEvent">Répéter l'évènement (dupliquer)</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <Controller name="allowGuests" control={control} render={({ field }) => <Checkbox id="allowGuests" checked={field.value} onCheckedChange={field.onChange} />} />
                                <Label htmlFor="allowGuests">Autoriser les invités</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" size="lg">Créer la sortie entre filles</Button>
                </div>
            </form>
        </div>
    );
}
