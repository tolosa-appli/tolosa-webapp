
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Upload, User, Briefcase, Car, Heart, Tv, Music, Gamepad2, Utensils, Film, Book, Mountain, Waves, Trees, Building2, Palette, Image as ImageIcon, Leaf, Plane, PawPrint, Lock, Handshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mocked current user data
const currentUser = {
  identifier: 'Sophie',
  firstName: 'Sophie',
  lastName: 'Dupont',
  dob: '25/08/1995',
  city: 'Toulouse',
  department: '31 - Haute-Garonne',
  region: 'Occitanie',
  country: 'France',
  phone: '0612345678',
  email: 'sophie.dupont@email.com',
  sex: 'female' as 'male' | 'female' | 'other',
  role: 'admin' as 'user' | 'moderator' | 'admin',
  presentation: 'Passonnée de randonnée et de culture, j\'aime découvrir de nouveaux endroits et rencontrer de nouvelles personnes !',
  languages: 'Français, Anglais',
  isStudent: false,
  wantsToWelcome: true,
  avatar: 'https://placehold.co/200x200.png',
  dataAiHint: 'woman portrait',
  sport: 'Randonnée, Vélo',
  musique: 'Pop-rock, Musique classique',
  jeux: 'Jeux de société, Echecs',
  cuisine: 'Italienne, Pâtisserie',
  danse: 'Salsa',
  loisirs_divers: 'Jardinage, Bricolage',
  film: 'Science-fiction, Comédies romantiques',
  programmes_tele: 'Documentaires animaliers',
  livres: 'Romans historiques',
  voyages: 'Europe, Asie du Sud-Est',
  animaux: 'Chats, chiens',
  jaime: 'Les voyages, les chats, le chocolat',
  jenaimepas: 'Les araignées, le froid',
  environnement: ['montagne', 'ville'],
  centres_interets: 'Photographie, histoire locale, nouvelles technologies.',
  cherche_logement: true,
  propose_logement: false,
  logement_secteur: 'Centre-ville, Carmes',
  logement_budget: '800€',
  logement_duree: 'Indéterminé',
  logement_quand: 'Dès que possible',
  colocation: true,
  colocation_details: 'Cherche colocataire sympa et non-fumeur pour un appartement T3 près du Capitole.',
  cherche_emploi: false,
  propose_emploi: false,
  emploi_secteur: '',
  emploi_formation: '',
  emploi_experience: '',
  petite_annonce: 'Vends vélo de ville en bon état, peu servi.',
  propose_covoiturage: true,
  cherche_covoiturage: false,
  isVegan: false,
  isVegetarian: true,
  dietary_details: 'Végétarienne depuis 5 ans, ouverte à découvrir de nouvelles recettes !',
  photos: [
      'https://placehold.co/200x200.png',
      'https://placehold.co/200x200.png',
      'https://placehold.co/200x200.png',
      'https://placehold.co/200x200.png',
  ]
};

const profileSchema = z.object({
  city: z.string().min(1, 'Ville requise'),
  department: z.string().min(1, 'Département requis'),
  region: z.string().min(1, 'Région requise'),
  country: z.string().min(1, 'Pays requis'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
  sex: z.string().min(1, 'Sexe requis'),
  presentation: z.string().optional(),
  languages: z.string().optional(),
  isStudent: z.boolean().default(false),
  wantsToWelcome: z.boolean().default(false),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),

  sport: z.string().optional(),
  musique: z.string().optional(),
  jeux: z.string().optional(),
  cuisine: z.string().optional(),
  danse: z.string().optional(),
  loisirs_divers: z.string().optional(),
  film: z.string().optional(),
  programmes_tele: z.string().optional(),
  livres: z.string().optional(),
  voyages: z.string().optional(),
  animaux: z.string().optional(),
  jaime: z.string().optional(),
  jenaimepas: z.string().optional(),
  environnement: z.array(z.string()).optional(),
  centres_interets: z.string().optional(),

  cherche_logement: z.boolean().default(false),
  propose_logement: z.boolean().default(false),
  logement_secteur: z.string().optional(),
  logement_budget: z.string().optional(),
  logement_duree: z.string().optional(),
  logement_quand: z.string().optional(),
  colocation: z.boolean().default(false),
  colocation_details: z.string().optional(),
  
  cherche_emploi: z.boolean().default(false),
  propose_emploi: z.boolean().default(false),
  emploi_secteur: z.string().optional(),
  emploi_formation: z.string().optional(),
  emploi_experience: z.string().optional(),

  petite_annonce: z.string().optional(),
  
  propose_covoiturage: z.boolean().default(false),
  cherche_covoiturage: z.boolean().default(false),
  
  isVegan: z.boolean().default(false),
  isVegetarian: z.boolean().default(false),
  dietary_details: z.string().optional(),

}).refine(data => {
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [photoError, setPhotoError] = useState('');
    
    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            ...currentUser,
        },
    });

    const { watch } = form;
    const watchChercheLogement = watch('cherche_logement');
    const watchProposeLogement = watch('propose_logement');
    const watchColocation = watch('colocation');
    const watchChercheEmploi = watch('cherche_emploi');
    const watchProposeEmploi = watch('propose_emploi');
    const watchIsVegan = watch('isVegan');
    const watchIsVegetarian = watch('isVegetarian');
    const [avatarSrc, setAvatarSrc] = useState(currentUser.avatar);

    const onSubmit = (data: ProfileFormData) => {
        console.log("Profile updated:", data);
        toast({
            title: "òsca !",
            description: "profil modifié avec succès !",
        });
        setIsEditing(false);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.onload = () => {
                    if (img.height < 200) {
                        setPhotoError('Elle est pitchoun ta photo, prends une photo plus gròs (hauteur min 200px)');
                    } else {
                        setPhotoError('');
                        setAvatarSrc(event.target?.result as string);
                        console.log("Photo ready to be uploaded");
                    }
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    }
    
    const getAvatarSrc = () => {
        if (avatarSrc && !avatarSrc.includes('placehold.co')) {
            return avatarSrc;
        }
        if (currentUser.sex === 'male') {
            return 'http://bilingue31.free.fr/avatar_H_OK_200x200.jpg';
        }
        if (currentUser.sex === 'female') {
            return 'http://bilingue31.free.fr/avatar_F_OK_200x200.jpg';
        }
        return currentUser.avatar; // Fallback to original placeholder
    };


    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Mon Profil</h1>
                <p className="text-muted-foreground">Consultez et modifiez vos informations personnelles.</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                 <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="items-center text-center">
                                <div className="relative group w-32 h-32">
                                    <Image src={getAvatarSrc()} alt={currentUser.identifier} width={128} height={128} className="rounded-full object-cover" data-ai-hint={currentUser.dataAiHint}/>
                                    {isEditing && (
                                        <label htmlFor="photo-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="h-8 w-8 text-white" />
                                            <input id="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange}/>
                                        </label>
                                    )}
                                </div>
                                {isEditing && photoError && <p className="text-sm text-destructive mt-2 text-center">{photoError}</p>}
                                <CardTitle>{currentUser.identifier}</CardTitle>
                                <CardDescription>{currentUser.firstName} {currentUser.lastName}</CardDescription>
                                <CardDescription className="flex flex-wrap justify-center gap-2">
                                    <Badge variant={currentUser.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">{currentUser.role}</Badge>
                                    {currentUser.wantsToWelcome && (
                                        <Badge variant="outline" className="border-primary text-primary">
                                            <Handshake className="mr-1 h-3 w-3"/>
                                            Accueillant(e)
                                        </Badge>
                                    )}
                                </CardDescription>
                                <CardDescription>{currentUser.dob}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-center">
                                <p>{currentUser.presentation}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Informations du compte</CardTitle>
                                            <CardDescription>
                                                {isEditing ? "Modifiez vos informations ci-dessous." : "Certaines informations ne sont pas modifiables."}
                                            </CardDescription>
                                        </div>
                                        {!isEditing && <Button type="button" onClick={() => setIsEditing(true)}>Modifier</Button>}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">Ville</Label>
                                            <Input id="city" {...form.register('city')} disabled={!isEditing} />
                                            {form.formState.errors.city && <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="department">Département</Label>
                                            <Input id="department" {...form.register('department')} disabled={!isEditing} />
                                            {form.formState.errors.department && <p className="text-sm text-destructive">{form.formState.errors.department.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="region">Région</Label>
                                            <Input id="region" {...form.register('region')} disabled={!isEditing} />
                                            {form.formState.errors.region && <p className="text-sm text-destructive">{form.formState.errors.region.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Pays</Label>
                                            <Input id="country" {...form.register('country')} disabled={!isEditing} />
                                            {form.formState.errors.country && <p className="text-sm text-destructive">{form.formState.errors.country.message}</p>}
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="phone">Téléphone</Label>
                                            <Input id="phone" {...form.register('phone')} disabled={!isEditing} />
                                            {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" {...form.register('email')} disabled={!isEditing} />
                                            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="sex">Sexe</Label>
                                        <Controller name="sex" control={form.control} render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={true}>
                                            <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="female">Féminin</SelectItem>
                                                <SelectItem value="male">Masculin</SelectItem>
                                                <SelectItem value="other">Autre</SelectItem>
                                            </SelectContent>
                                            </Select>
                                        )} />
                                        {form.formState.errors.sex && <p className="text-sm text-destructive">{form.formState.errors.sex.message}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="presentation">Présentation</Label>
                                        <Textarea id="presentation" {...form.register('presentation')} disabled={!isEditing} />
                                    </div>
                                    <div>
                                        <Label htmlFor="languages">Langues parlées</Label>
                                        <Textarea id="languages" {...form.register('languages')} disabled={!isEditing} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Controller name="isStudent" control={form.control} render={({ field }) => <Checkbox id="isStudent" checked={field.value} onCheckedChange={field.onChange} disabled={!isEditing}/>} />
                                            <Label htmlFor="isStudent">Je suis étudiant(e)</Label>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <Controller name="wantsToWelcome" control={form.control} render={({ field }) => <Checkbox id="wantsToWelcome" checked={!!field.value} onCheckedChange={field.onChange} disabled={!isEditing} className="mt-1" />} />
                                            <div>
                                                <Label htmlFor="wantsToWelcome">je veux être accueillant(e)</Label>
                                                <p className="text-xs text-muted-foreground">(l'accueillant(e) a pour mission d'accueillir les nouveaux et nouvelles et faire découvrir la ville et les alentours)</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                    </div>
                 </div>
                 
                <Card className="mt-8">
                    <CardContent className="p-0">
                         <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><Heart/>Mes goûts et passions</div></AccordionTrigger>
                                <AccordionContent className="px-6 space-y-4">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div><Label>Sport</Label><Textarea placeholder="Vos sports favoris..." {...form.register('sport')} disabled={!isEditing} /></div>
                                        <div><Label>Musique</Label><Textarea placeholder="Vos genres musicaux..." {...form.register('musique')} disabled={!isEditing} /></div>
                                        <div><Label>Jeux</Label><Textarea placeholder="Vos jeux préférés..." {...form.register('jeux')} disabled={!isEditing} /></div>
                                        <div><Label>Cuisine</Label><Textarea placeholder="Vos plats et types de cuisine..." {...form.register('cuisine')} disabled={!isEditing} /></div>
                                        <div><Label>Danse</Label><Textarea placeholder="Les danses que vous aimez..." {...form.register('danse')} disabled={!isEditing} /></div>
                                        <div><Label>Loisirs divers</Label><Textarea placeholder="Autres loisirs..." {...form.register('loisirs_divers')} disabled={!isEditing} /></div>
                                        <div><Label>Film</Label><Textarea placeholder="Vos films ou genres de films..." {...form.register('film')} disabled={!isEditing} /></div>
                                        <div><Label>Programmes télé</Label><Textarea placeholder="Vos émissions favorites..." {...form.register('programmes_tele')} disabled={!isEditing} /></div>
                                        <div><Label>Livres</Label><Textarea placeholder="Vos lectures..." {...form.register('livres')} disabled={!isEditing} /></div>
                                        <div><Label>Voyages</Label><Textarea placeholder="Vos destinations de rêve..." {...form.register('voyages')} disabled={!isEditing} /></div>
                                        <div><Label>Animaux</Label><Textarea placeholder="Vos animaux préférés..." {...form.register('animaux')} disabled={!isEditing} /></div>
                                        <div><Label>J'aime</Label><Textarea placeholder="Ce que vous aimez en général..." {...form.register('jaime')} disabled={!isEditing} /></div>
                                        <div><Label>Je n'aime pas</Label><Textarea placeholder="Ce que vous n'aimez pas..." {...form.register('jenaimepas')} disabled={!isEditing} /></div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><Palette/>Mes centres d'intérêts</div></AccordionTrigger>
                                <AccordionContent className="px-6 space-y-4">
                                    <div>
                                        <Label>Qu'est-ce que tu aimes ?</Label>
                                        <Controller
                                            name="environnement"
                                            control={form.control}
                                            render={({ field }) => (
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    {(['mer', 'montagne', 'campagne', 'ville'] as const).map((item) => (
                                                        <div key={item} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`env_${item}`}
                                                                checked={field.value?.includes(item)}
                                                                onCheckedChange={(checked) => {
                                                                    const newValue = checked
                                                                        ? [...(field.value || []), item]
                                                                        : (field.value || []).filter((v) => v !== item);
                                                                    field.onChange(newValue);
                                                                }}
                                                                disabled={!isEditing}
                                                            />
                                                            <Label htmlFor={`env_${item}`} className="capitalize">{item}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <div><Label>Autres centres d'intérêts</Label><Textarea placeholder="Décrivez ici vos autres centres d'intérêts..." {...form.register('centres_interets')} disabled={!isEditing} /></div>
                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-3">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><Briefcase/>Mes annonces</div></AccordionTrigger>
                                <AccordionContent className="px-6 space-y-6">
                                   {/* Housing */}
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Logement & Colocation</h4>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="cherche_logement" control={form.control} render={({ field }) => <Checkbox id="cherche_logement" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="cherche_logement">Je cherche un logement</Label>
                                        </div>
                                         <div className="flex items-center space-x-2">
                                            <Controller name="propose_logement" control={form.control} render={({ field }) => <Checkbox id="propose_logement" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="propose_logement">Je propose un logement</Label>
                                        </div>
                                        {(watchChercheLogement || watchProposeLogement) && (
                                            <div className="grid md:grid-cols-2 gap-4 pl-6 pt-2">
                                                <div><Label>Secteur</Label><Input placeholder="Quartier, ville..." {...form.register('logement_secteur')} disabled={!isEditing} /></div>
                                                <div><Label>Budget</Label><Input placeholder="en €" {...form.register('logement_budget')} disabled={!isEditing} /></div>
                                                <div><Label>Durée</Label><Input placeholder="ex: 3 mois, 1 an..." {...form.register('logement_duree')} disabled={!isEditing} /></div>
                                                <div><Label>Pour quand?</Label><Input placeholder="ex: Dès que possible" {...form.register('logement_quand')} disabled={!isEditing} /></div>
                                            </div>
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <Controller name="colocation" control={form.control} render={({ field }) => <Checkbox id="colocation" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="colocation">Je cherche/propose une colocation</Label>
                                        </div>
                                        {watchColocation && (
                                             <div className="pl-6 pt-2">
                                                <Label>Détails sur la colocation</Label>
                                                <Textarea placeholder="Décrivez votre recherche ou offre de colocation..." {...form.register('colocation_details')} disabled={!isEditing} />
                                             </div>
                                        )}
                                    </div>
                                    <Separator/>
                                    {/* Job */}
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Emploi</h4>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="cherche_emploi" control={form.control} render={({ field }) => <Checkbox id="cherche_emploi" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="cherche_emploi">Je cherche un emploi</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="propose_emploi" control={form.control} render={({ field }) => <Checkbox id="propose_emploi" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="propose_emploi">Je propose un emploi</Label>
                                        </div>
                                        {(watchChercheEmploi || watchProposeEmploi) && (
                                            <div className="grid md:grid-cols-3 gap-4 pl-6 pt-2">
                                                <div><Label>Secteur</Label><Input placeholder="ex: Informatique, Vente..." {...form.register('emploi_secteur')} disabled={!isEditing} /></div>
                                                <div><Label>Formation</Label><Input placeholder="ex: Bac+5, autodidacte..." {...form.register('emploi_formation')} disabled={!isEditing} /></div>
                                                <div><Label>Expérience</Label><Input placeholder="ex: 2 ans, débutant..." {...form.register('emploi_experience')} disabled={!isEditing} /></div>
                                            </div>
                                        )}
                                    </div>
                                    <Separator/>
                                    {/* Carpooling */}
                                    <div className="space-y-2">
                                        <h4 className="font-medium">Covoiturage</h4>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="cherche_covoiturage" control={form.control} render={({ field }) => <Checkbox id="cherche_covoiturage" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="cherche_covoiturage">Je cherche du covoiturage</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="propose_covoiturage" control={form.control} render={({ field }) => <Checkbox id="propose_covoiturage" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="propose_covoiturage">Je propose du covoiturage</Label>
                                        </div>
                                    </div>
                                     <Separator/>
                                    {/* Small Ad */}
                                    <div>
                                        <h4 className="font-medium">Petite annonce / Entraide</h4>
                                        <Textarea placeholder="Écrivez ici votre petite annonce ou demande d'entraide..." {...form.register('petite_annonce')} disabled={!isEditing} />
                                    </div>

                                </AccordionContent>
                            </AccordionItem>
                             <AccordionItem value="item-4">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><ImageIcon/>Ma galerie photo</div></AccordionTrigger>
                                <AccordionContent className="px-6 space-y-4">
                                     <p className="text-sm text-muted-foreground">Ajoutez des photos de vous ou de ce que vous aimez.</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {currentUser.photos.map((photo, index) => (
                                            <div key={index} className="relative aspect-square">
                                                <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="woman portrait" />
                                            </div>
                                        ))}
                                        {isEditing && (
                                            <div className="relative aspect-square flex items-center justify-center border-2 border-dashed rounded-md">
                                                <label htmlFor="gallery-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-muted/50">
                                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                                    <span className="text-sm text-muted-foreground mt-1">Ajouter</span>
                                                    <input id="gallery-upload" type="file" className="sr-only" accept="image/*" />
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><Leaf />Mon régime alimentaire</div></AccordionTrigger>
                                <AccordionContent className="px-6 space-y-4">
                                     <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Controller name="isVegan" control={form.control} render={({ field }) => <Checkbox id="isVegan" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="isVegan">Je suis végan</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Controller name="isVegetarian" control={form.control} render={({ field }) => <Checkbox id="isVegetarian" disabled={!isEditing} checked={!!field.value} onCheckedChange={field.onChange} />} />
                                            <Label htmlFor="isVegetarian">Je suis végétarien</Label>
                                        </div>
                                        {(watchIsVegan || watchIsVegetarian) && (
                                            <div className="pl-6 pt-2">
                                                <Label>Détails sur mon régime alimentaire</Label>
                                                <Textarea placeholder="Précisez ici vos habitudes, allergies, etc." {...form.register('dietary_details')} disabled={!isEditing} />
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger className="px-6"><div className="flex items-center gap-2"><Lock />Changer le mot de passe</div></AccordionTrigger>
                                <AccordionContent className="px-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="password">Nouveau mot de passe</Label>
                                            <Input id="password" type="password" {...form.register('password')} disabled={!isEditing} />
                                            {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                                            <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} disabled={!isEditing} />
                                            {form.formState.errors.confirmPassword && <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                         </Accordion>
                    </CardContent>
                </Card>
                
                 {isEditing && (
                    <div className="mt-8 flex justify-end space-x-2">
                        <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); form.reset(currentUser); }}>Annuler</Button>
                        <Button type="submit">Enregistrer les modifications</Button>
                    </div>
                )}
            </form>
        </div>
    );
}
