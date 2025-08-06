
'use client';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Terminal, Mail, ThumbsUp, ExternalLink, Languages, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function DashboardPage() {
  const unreadMessages = 3; // Simuler des messages non lus

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 flex justify-center">
        <Image src="http://bilingue31.free.fr/tableaudebord_min_OK.jpg" alt="Tableau de bord" width={300} height={84} />
      </div>

      <Alert className="mb-8 border-primary/50 text-primary bg-primary/10">
        <Terminal className="h-4 w-4 !text-primary" />
        <AlertTitle>Benvengut sur notre application ! Mercès.</AlertTitle>
      </Alert>

      {unreadMessages > 0 && (
        <Alert className="mb-8">
            <Mail className="h-4 w-4" />
            <AlertTitle>messatge recebut</AlertTitle>
            <AlertDescription>
                Vous avez {unreadMessages} nouveaux messages. 
                <Button variant="link" asChild className="p-1 h-auto">
                    <Link href="/messages">Voir mes messages</Link>
                </Button>
            </AlertDescription>
        </Alert>
      )}


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>Complétez votre profil pour de meilleures rencontres.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Merci de bien vouloir garnir notre formulaire pour compléter le profil.</p>
             <Button asChild>
                <Link href="/profile">Compléter mon profil</Link>
             </Button>
          </CardContent>
        </Card>
        <Link href="/messages">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Messagerie</CardTitle>
              <CardDescription>Consultez vos messages privés.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Échangez avec vos amis et les membres de la communauté.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/my-outings">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Mes Sorties</CardTitle>
              <CardDescription>Vos sorties inscrites et favorites.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Retrouvez ici toutes vos activités planifiées.</p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/language-tandems/my-tandems">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareText />
                <span>Mes Tandems</span>
              </CardTitle>
              <CardDescription>Gérez vos tandems et réunions de groupe.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Consultez vos propositions et inscriptions.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/my-ads">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Mes Annonces</CardTitle>
              <CardDescription>Gérez toutes vos annonces publiées.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Retrouvez ici toutes vos annonces.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/sorties">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Prochaines Sorties</CardTitle>
              <CardDescription>Découvrez les sorties à venir.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tu as la gnac ? Propose ou rejoins une sortie !</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/forum">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Forum de discussion</CardTitle>
              <CardDescription>Participez aux dernières discussions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tu veux tchatcher ? Lance une discussion dans le forum !</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/language-cafe">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages />
                <span>Café des langues</span>
              </CardTitle>
              <CardDescription>Pratiquez une langue avec d'autres membres.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Rejoignez un tandem linguistique pour progresser.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/meetup-events">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>Évènements Meetup</CardTitle>
              <CardDescription>Découvrez les événements du groupe partenaire.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Retrouvez les sorties organisées sur Meetup.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/facebook-groups">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp />
                <span>Groupes Facebook</span>
              </CardTitle>
              <CardDescription>Découvrez les groupes Facebook partenaires.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Rejoignez les communautés Facebook pour plus d'activités.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
