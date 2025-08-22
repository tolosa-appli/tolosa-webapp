
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Logo } from '@/components/logo';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const formSchema = z.object({
  identifier: z.string().min(3, { message: 'Identifiant trop court (3 lettres minimum)' }),
  firstName: z.string().min(1, { message: 'Prénom requis' }),
  lastName: z.string().min(1, { message: 'Nom requis' }),
  dob_day: z.string().min(1, { message: 'Jour requis' }),
  dob_month: z.string().min(1, { message: 'Mois requis' }),
  dob_year: z.string().min(1, { message: 'Année requise' }),
  city: z.string().min(1, { message: 'Ville requise' }),
  department: z.string().min(1, { message: 'Département requis' }),
  region: z.string().min(1, { message: 'Région requise' }),
  country: z.string().min(1, { message: 'Pays requis' }),
  phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }),
  email: z.string().email({ message: 'Adresse email invalide' }),
  sex: z.string().min(1, { message: 'Sexe requis' }),
  presentation: z.string().optional(),
  languages: z.string().optional(),
  password: z.string().min(8, { message: 'Mot de passe trop court (8 caractères minimum)' }),
  confirmPassword: z.string(),
  isStudent: z.boolean().default(false),
  wantsToWelcome: z.boolean().default(false),
  captcha: z.string().min(1, 'Veuillez répondre à la question de sécurité.'),
  isOfAge: z.boolean().refine(val => val === true, {
    message: "Vous devez certifier être majeur(e).",
  }),
  acceptsCharter: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter la charte.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register: registerUser } = useAuth();
  const signupEnabled = (process.env.NEXT_PUBLIC_SIGNUP_ENABLED ?? 'true').toLowerCase() !== 'false';
  const [formError, setFormError] = useState('');
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  
  useEffect(() => {
    setCaptchaNum1(Math.floor(Math.random() * 10));
    setCaptchaNum2(Math.floor(Math.random() * 10));
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: 'Toulouse',
      department: '31 - Haute-Garonne',
      region: 'Occitanie',
      country: 'France',
      isStudent: false,
      wantsToWelcome: false,
      presentation: '',
      languages: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setFormError('');

    if (parseInt(data.captcha, 10) !== captchaNum1 + captchaNum2) {
        form.setError('captcha', { type: 'manual', message: 'La réponse est incorrecte. Essayez encore.' });
        return;
    }

    if (!data.isOfAge) {
      setFormError("L'application n'est pas autorisée pour les mineurs.");
      return;
    }
    if (!data.acceptsCharter) {
      setFormError("Charte pas acceptée, compte pas créé ! Et alors ? Un patàc pour rien ? Tu ne veux pas sortir avec nous ? Allez, un poutou et revient nous voir !");
      return;
    }
    
    // Build payload for API (strip confirmPassword and captcha)
    const { confirmPassword, captcha, dob_day, dob_month, dob_year, ...rest } = data as any;
    const payload = {
      ...rest,
      dob: `${dob_year}-${dob_month.padStart(2,'0')}-${dob_day.padStart(2,'0')}`,
    };

    const result = await registerUser(payload);
    if (!result.ok) {
      setFormError(result.error || 'Création du compte échouée');
      return;
    }

    toast({
      title: "Compte créé !",
      description: "Merci, ton compte a bien été créé. Vous allez être redirigé.",
    });

    setTimeout(() => {
      router.push('/login');
    }, 1500);
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - 18 - i).toString());

  if (!signupEnabled) {
    return (
      <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background to-card">
        <Card className="mx-auto max-w-md w-full shadow-2xl">
          <CardHeader className="text-center">
            <div className="inline-block mx-auto"><Logo /></div>
            <CardTitle className="text-2xl font-headline">Inscriptions désactivées</CardTitle>
            <CardDescription>Merci de revenir plus tard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background to-card">
      <Card className="mx-auto max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto"><Logo /></div>
          <CardTitle className="text-2xl font-headline">Créer un compte</CardTitle>
          <CardDescription>Rejoignez la communauté Tolosa Amical !</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formError && <Alert variant="destructive"><AlertDescription>{formError}</AlertDescription></Alert>}

            <div>
              <Label htmlFor="identifier">Identifiant</Label>
              <Input id="identifier" {...form.register('identifier')} />
              {form.formState.errors.identifier && <p className="text-sm text-destructive">{form.formState.errors.identifier.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" {...form.register('firstName')} />
                {form.formState.errors.firstName && <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" {...form.register('lastName')} />
                {form.formState.errors.lastName && <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <Label>Date de naissance</Label>
              <div className="grid grid-cols-3 gap-2">
                <Controller name="dob_day" control={form.control} render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Jour" /></SelectTrigger>
                    <SelectContent>{days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
                <Controller name="dob_month" control={form.control} render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Mois" /></SelectTrigger>
                    <SelectContent>{months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
                <Controller name="dob_year" control={form.control} render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger><SelectValue placeholder="Année" /></SelectTrigger>
                    <SelectContent>{years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
              </div>
               {(form.formState.errors.dob_day || form.formState.errors.dob_month || form.formState.errors.dob_year) && <p className="text-sm text-destructive">Date de naissance complète requise.</p>}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ville</Label>
                <Input id="city" {...form.register('city')} />
                {form.formState.errors.city && <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>}
              </div>
              <div>
                <Label htmlFor="department">Département</Label>
                <Input id="department" {...form.register('department')} />
                {form.formState.errors.department && <p className="text-sm text-destructive">{form.formState.errors.department.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="region">Région</Label>
                <Input id="region" {...form.register('region')} />
                {form.formState.errors.region && <p className="text-sm text-destructive">{form.formState.errors.region.message}</p>}
              </div>
              <div>
                <Label htmlFor="country">Pays</Label>
                <Input id="country" {...form.register('country')} />
                {form.formState.errors.country && <p className="text-sm text-destructive">{form.formState.errors.country.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" {...form.register('phone')} />
                {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register('email')} />
                {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="sex">Sexe</Label>
              <Controller name="sex" control={form.control} render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Textarea id="presentation" {...form.register('presentation')} />
            </div>

            <div>
              <Label htmlFor="languages">Langues parlées</Label>
              <Textarea id="languages" placeholder="ex: Français, Anglais, Espagnol..." {...form.register('languages')} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" {...form.register('password')} />
                {form.formState.errors.password && <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
                {form.formState.errors.confirmPassword && <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="grid gap-2 p-4 border rounded-md">
                <Label htmlFor="captcha">Question de sécurité</Label>
                <div className="flex items-center gap-2">
                    <span>Combien font {captchaNum1} + {captchaNum2} ?</span>
                    <Input id="captcha" className="w-24" type="number" {...form.register('captcha')} />
                </div>
                {form.formState.errors.captcha && <p className="text-sm text-destructive">{form.formState.errors.captcha.message}</p>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Controller name="isStudent" control={form.control} render={({ field }) => <Checkbox id="isStudent" checked={field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="isStudent">Je suis étudiant(e)</Label>
                </div>
                <div className="flex items-start space-x-2">
                    <Controller name="wantsToWelcome" control={form.control} render={({ field }) => <Checkbox id="wantsToWelcome" checked={field.value} onCheckedChange={field.onChange} className="mt-1" />} />
                    <div>
                        <Label htmlFor="wantsToWelcome">je veux être accueillant(e)</Label>
                        <p className="text-xs text-muted-foreground">(l'accueillant(e) a pour mission d'accueillir les nouveaux et nouvelles et faire découvrir la ville et les alentours)</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Controller name="isOfAge" control={form.control} render={({ field }) => <Checkbox id="isOfAge" checked={!!field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="isOfAge">Je certifie être majeur(e)</Label>
                </div>
                 {form.formState.errors.isOfAge && <p className="text-sm text-destructive">{form.formState.errors.isOfAge.message}</p>}

                <div className="flex items-start space-x-2">
                     <Controller name="acceptsCharter" control={form.control} render={({ field }) => <Checkbox id="acceptsCharter" className="mt-1" checked={!!field.value} onCheckedChange={field.onChange} />} />
                    <Label htmlFor="acceptsCharter">J'accepte la <Link href="/charter" target="_blank" rel="noopener noreferrer" className="underline text-primary">charte d'utilisation</Link> de l'application.</Label>
                </div>
                {form.formState.errors.acceptsCharter && <p className="text-sm text-destructive">{form.formState.errors.acceptsCharter.message}</p>}
            </div>

            <Button type="submit" className="w-full" variant="destructive">Créer mon compte</Button>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/">Retour à l'accueil</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
