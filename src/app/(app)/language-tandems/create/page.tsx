
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const languageList = [
    'Albanais', 'Allemand', 'Anglais', 'Arabe', 'Aragonais', 'Arménien', 'Azéri', 'Basque', 'Berbère', 
    'Bulgare', 'Catalan', 'Chinois', 'Coréen', 'Créole', 'Danois', 'Espagnol', 'Espéranto', 'Estonien', 
    'Farci', 'Finnois', 'Français', 'Géorgien', 'Grec', 'Hébreu', 'Hindi', 'Hongrois', 'Indonésien', 'Italien', 
    'Japonais', 'Langue des signes', 'Néerlandais', 'Norvégien', 'Occitan', 'Persan', 
    'Polonais', 'Portugais', 'Roumain', 'Russe', 'Serbe/Croate', 'Slovaque/Tchèque', 
    'Suédois', 'Tamoul', 'Turc', 'Ukrainien', 'Vietnamien'
].sort();

const createTandemSchema = z.object({
  day: z.string().min(1, "Veuillez sélectionner un jour."),
  month: z.string().min(1, "Veuillez sélectionner un mois."),
  year: z.string().min(1, "Veuillez sélectionner une année."),
  time: z.string().min(1, "Veuillez sélectionner une heure."),
  offeredLanguage: z.string().min(1, "Veuillez sélectionner la langue proposée."),
  soughtLanguage: z.string().min(1, "Veuillez sélectionner la langue recherchée."),
  locationName: z.string().min(3, "Le nom du lieu doit contenir au moins 3 caractères."),
  locationAddress: z.string().min(5, "L'adresse doit contenir au moins 5 caractères."),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  participantCount: z.array(z.number()).min(1, "Veuillez définir le nombre de participants."),
  manualValidation: z.boolean().default(false),
  isOnline: z.boolean().default(false),
});

type CreateTandemFormData = z.infer<typeof createTandemSchema>;

// Generate time slots (e.g., from 08:00 to 22:00 every 30 mins)
const timeSlots = Array.from({ length: (22 - 8) * 2 + 1 }, (_, i) => {
    const hours = 8 + Math.floor(i / 2);
    const minutes = (i % 2) * 30;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString());

export default function CreateTandemPage() {
    const { toast } = useToast();

    const form = useForm<CreateTandemFormData>({
        resolver: zodResolver(createTandemSchema),
        defaultValues: {
            participantCount: [10],
            manualValidation: false,
            isOnline: false,
        }
    });

    const { control, handleSubmit, formState: { errors }, watch } = form;
    const isOnline = watch('isOnline');

    const onSubmit = (data: CreateTandemFormData) => {
        console.log("New tandem/meeting created:", data);
        toast({
            title: "Proposition créée !",
            description: "Votre tandem ou réunion de groupe a été publié(e).",
        });
        form.reset();
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                 <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/language-tandems">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux tandems
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Proposer un Tandem ou une Réunion de Groupe</h1>
                <p className="text-muted-foreground">Remplissez le formulaire pour organiser votre échange linguistique.</p>
            </div>

            <Card className="max-w-2xl mx-auto">
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Détails de l'événement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-2">
                             <Label>Date de l'événement</Label>
                             <div className="grid grid-cols-3 gap-2">
                                <Controller name="day" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Jour" /></SelectTrigger><SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
                                )}/>
                                 <Controller name="month" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Mois" /></SelectTrigger><SelectContent>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                                )}/>
                                 <Controller name="year" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Année" /></SelectTrigger><SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent></Select>
                                )}/>
                             </div>
                             {(errors.day || errors.month || errors.year) && <p className="text-sm text-destructive">Une date complète est requise.</p>}
                        </div>

                         <div className="grid gap-2">
                            <Label htmlFor="time">Heure de l'événement</Label>
                             <Controller name="time" control={control} render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger><SelectValue placeholder="Sélectionnez une heure" /></SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}/>
                            {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label>Langue proposée</Label>
                                <Controller name="offeredLanguage" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                        <SelectContent>
                                            {languageList.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}/>
                                {errors.offeredLanguage && <p className="text-sm text-destructive">{errors.offeredLanguage.message}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label>Langue recherchée</Label>
                                <Controller name="soughtLanguage" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                        <SelectContent>
                                            {languageList.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )}/>
                                {errors.soughtLanguage && <p className="text-sm text-destructive">{errors.soughtLanguage.message}</p>}
                            </div>
                        </div>
                        
                         <div className="flex items-center space-x-2">
                            <Controller name="isOnline" control={control} render={({ field }) => <Checkbox id="isOnline" checked={field.value} onCheckedChange={field.onChange} />} />
                            <Label htmlFor="isOnline">L'événement est en visio (en ligne)</Label>
                        </div>
                        
                        {!isOnline && (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="locationName">Nom du lieu de rendez-vous</Label>
                                    <Input id="locationName" {...form.register('locationName')} placeholder="Ex: Café Fika" />
                                    {errors.locationName && <p className="text-sm text-destructive">{errors.locationName.message}</p>}
                                </div>
                                 <div className="grid gap-2">
                                    <Label htmlFor="locationAddress">Adresse du rendez-vous</Label>
                                    <Input id="locationAddress" {...form.register('locationAddress')} placeholder="Ex: 5 Rue du Taur, Toulouse" />
                                    {errors.locationAddress && <p className="text-sm text-destructive">{errors.locationAddress.message}</p>}
                                </div>
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" {...form.register('description')} rows={5} placeholder="Décrivez le déroulement, le thème de discussion, etc." />
                             {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>

                         <div className="grid gap-2">
                            <Label>Nombre de participants souhaités</Label>
                            <Controller name="participantCount" control={control} render={({ field }) => (
                                <div className="flex items-center gap-4">
                                     <Slider defaultValue={field.value} max={50} min={2} step={1} onValueChange={field.onChange} className="flex-1"/>
                                     <span className="w-12 text-center font-bold p-2 border rounded-md">{field.value}</span>
                                </div>
                            )}/>
                            {errors.participantCount && <p className="text-sm text-destructive">{errors.participantCount.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Controller name="manualValidation" control={control} render={({ field }) => <Checkbox id="manualValidation" checked={field.value} onCheckedChange={field.onChange} />} />
                            <Label htmlFor="manualValidation">Je souhaite valider manuellement chaque inscription</Label>
                        </div>

                    </CardContent>
                    <CardFooter>
                         <Button type="submit" size="lg" className="w-full">Publier la proposition</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
