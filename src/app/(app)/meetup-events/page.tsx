
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

export default function MeetupEventsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Événements Meetup</h1>
        <p className="text-muted-foreground">Découvrez les événements organisés par le groupe "Expats in Toulouse" sur Meetup.</p>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Lien vers Meetup.com
            </CardTitle>
            <CardDescription>
              Les événements de ce groupe sont gérés sur une plateforme externe. Cliquez sur le bouton ci-dessous pour voir la liste complète et vous inscrire.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg">
              <Link href="https://www.meetup.com/fr-FR/expats-in-toulouse/events/" target="_blank" rel="noopener noreferrer">
                Voir les événements sur Meetup
              </Link>
            </Button>
          </CardContent>
        </Card>
    </div>
  );
}
