
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ThumbsUp } from 'lucide-react';

const facebookGroups = [
  { name: 'Happy People Toulouse', url: 'https://www.facebook.com/groups/996796667051330/' },
  { name: 'Toulouse Le Bon Plan', url: 'https://www.facebook.com/groups/550741995050817/' },
  { name: 'Toulouse libre ou gratuit (proposer des sorties gratuit ou à prix libre)', url: 'https://www.facebook.com/groups/651831044888765/' },
  { name: 'Sorties Soirées Toulouse', url: 'https://www.facebook.com/groups/596757027131271/' },
  { name: 'La Carte des Colocs Toulouse', url: 'https://www.facebook.com/groups/1272971156117937/' },
  { name: 'Les Concerts Gratuits de Toulouse', url: 'https://www.facebook.com/groups/221534187648/' },
  { name: 'sorties culturelles à Toulouse', url: 'https://www.facebook.com/groups/513531158446053/' },
  { name: 'Sorties Visite Toulouse, Occitanie et Région Toulousaine', url: 'https://www.facebook.com/groups/546506525504472/' },
  { name: 'Soirées sorties entre filles Toulouse et Occitanie', url: 'https://www.facebook.com/groups/1397077878141492/' },
  { name: 'aller au théâtre, impro, stand up, spectacles, comédie à Toulouse', url: 'https://www.facebook.com/groups/1396560737927890/' },
];

export default function FacebookGroupsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Les meilleurs sites sur Facebook d'accueil et de sorties</h1>
        <p className="text-muted-foreground">Découvrez une sélection de groupes Facebook pour rester connecté et trouver des activités à Toulouse.</p>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              Groupes Facebook recommandés
            </CardTitle>
            <CardDescription>
              Ces groupes sont gérés sur une plateforme externe. Cliquez sur les liens pour les découvrir.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {facebookGroups.map((group) => (
                <li key={group.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="font-medium flex-1 mb-2 sm:mb-0">{group.name}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link href={group.url} target="_blank" rel="noopener noreferrer">
                      Visiter le groupe <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
