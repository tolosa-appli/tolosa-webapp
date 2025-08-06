
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Chrome, Facebook, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.15,2.52a4.46,4.46,0,0,0-3.3,1.73,4.2,4.2,0,0,0-1.5,3.23,1,1,0,0,0,.21.66,1,1,0,0,0,.69.25,4.32,4.32,0,0,0,3.31-1.74,4.37,4.37,0,0,0,1.51-3.23A1.12,1.12,0,0,0,12.15,2.52Zm4.62,8.42a4.67,4.67,0,0,0-2.31,3.78c0,2.6,2,4.3,4.42,4.3a4.57,4.57,0,0,0,3.32-1.79,4.13,4.13,0,0,0,1.44-3.2A1,1,0,0,0,23,13.56a1,1,0,0,0-1-.66,4.54,4.54,0,0,0-2.91,1.49,3.1,3.1,0,0,1-2.12.87,3,3,0,0,1-2.22-1A4.55,4.55,0,0,0,16.77,10.94Z" />
    </svg>
);

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11.4,11.4H0V0h11.4Zm12.6,0H12.6V0h11.4ZM11.4,24H0V12.6h11.4Zm12.6,0H12.6V12.6h11.4Z" />
    </svg>
);

const YahooIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4c.639 0 1.25.11 1.826.315l-1.57 2.766A3.498 3.498 0 009.6 4.8C9.6 3.475 10.675 2.4 12 2.4zm-4.2 2.4a3.6 3.6 0 110 7.2 3.6 3.6 0 010-7.2zm10.594 2.874a.6.6 0 01-.395.926l-3.32 1.107c.05.29.076.59.076.893a4.8 4.8 0 01-9.6 0c0-.304.025-.603.075-.893l-3.32-1.107a.6.6 0 01-.396-.926L6.96 3.23a.6.6 0 01.926-.395l2.057 1.469a4.782 4.782 0 014.114 0l2.057-1.47a.6.6 0 01.926.396l1.35 6.745z" />
    </svg>
);
const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.004 17.151a.39.39 0 01-.55.084c-2.4-1.48-5.432-1.824-9.012-1.008a.39.39 0 01-.432-.468c.132-1.056.228-2.124.228-3.192 0-1.08-.096-2.16-.228-3.24a.39.39 0 01.432-.468c3.58- .816 6.612-.468 9.012 1.008a.39.39 0 01.084.552l-1.548 2.688a.39.39 0 01-.552.084c-1.5- .9-3.612-1.14-6.012-.66a.39.39 0 00-.324.444c.06.504.096 1.008.096 1.512s-.036 1.008-.096 1.512a.39.39 0 00.324.444c2.4-.48 4.512-.24 6.012.66a.39.39 0 01.084.552l-1.548 2.688z" />
    </svg>
);


export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // This is a mock login flow
    const formData = new FormData(e.target as HTMLFormElement);
    const identifier = formData.get('identifier');
    const password = formData.get('password');

    if (identifier === 'user' && password === 'password') {
      router.push('/dashboard');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setError('Boudu ! ça ne marche pas, est-ce possible de débloquer mon compte ?');
      } else {
        setError('Milodioùs, tu as tapé un mauvais identifiant ou mot de passe !');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-card">
      <Card className="mx-auto max-w-sm w-full shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block mx-auto">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Connexion</CardTitle>
          <CardDescription>Accédez à votre compte pour sortir avec nous !</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="identifier">Identifiant</Label>
              <Input id="identifier" name="identifier" type="text" placeholder="Votre identifiant" required disabled={attempts >= 3}/>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline text-primary">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required disabled={attempts >= 3}/>
            </div>
            <Button type="submit" className="w-full" variant="destructive" disabled={attempts >= 3}>
              Se connecter
            </Button>
          </form>

          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                      Ou continuer avec
                  </span>
              </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button variant="outline"><Chrome className="mr-2 h-4 w-4"/>Google</Button>
              <Button variant="outline"><Facebook className="mr-2 h-4 w-4"/>Facebook</Button>
              <Button variant="outline"><AppleIcon className="mr-2 h-4 w-4"/>Apple</Button>
              <Button variant="outline"><Twitter className="mr-2 h-4 w-4"/>X</Button>
              <Button variant="outline"><Linkedin className="mr-2 h-4 w-4"/>LinkedIn</Button>
              <Button variant="outline"><MicrosoftIcon className="mr-2 h-4 w-4"/>Microsoft</Button>
              <Button variant="outline"><YahooIcon className="mr-2 h-4 w-4"/>Yahoo</Button>
              <Button variant="outline"><SpotifyIcon className="mr-2 h-4 w-4"/>Spotify</Button>
          </div>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full" asChild>
              <Link href="/">Retour à l'accueil</Link>
          </Button>

          <div className="mt-4 text-center text-sm">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="underline text-primary">
              Inscrivez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

    