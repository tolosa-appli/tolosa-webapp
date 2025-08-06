
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Languages, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const languageLinksRaw = [
    '/forum/cafe-des-langues',
    '/forum/cafe-des-langues-en-visio',
    '/forum/conversation-en-francais',
    '/forum/cours-de-langues',
    '/forum/echange-cours-de-langues',
    '/forum/echange-francais-albanais',
    '/forum/echange-francais-allemand',
    '/forum/echange-francais-anglais',
    '/forum/echange-francais-arabe',
    '/forum/echange-francais-aragonais',
    '/forum/echange-francais-armenien',
    '/forum/echange-francais-azerbaidjanais',
    '/forum/echange-francais-basque',
    '/forum/echange-francais-berbere',
    '/forum/echange-francais-bulgare',
    '/forum/echange-francais-catalan',
    '/forum/echange-francais-chinois',
    '/forum/echange-francais-coreen',
    '/forum/echange-francais-creole',
    '/forum/echange-francais-danois-norvegien-suedois',
    '/forum/echange-francais-espagnol',
    '/forum/echange-francais-esperanto',
    '/forum/echange-francais-farci-perse',
    '/forum/echange-francais-finois-estonien',
    '/forum/echange-francais-georgien',
    '/forum/echange-francais-grec',
    '/forum/echange-francais-hebreu',
    '/forum/echange-francais-hindi-tamoul',
    '/forum/echange-francais-hongrois',
    '/forum/echange-francais-indonesien',
    '/forum/echange-francais-italien',
    '/forum/echange-francais-japonais',
    '/forum/echange-francais-langue-des-signes',
    '/forum/echange-francais-langue-etrangere-fle',
    '/forum/echange-francais-neerlandais',
    '/forum/echange-francais-occitan',
    '/forum/echange-francais-polonais',
    '/forum/echange-francais-portugais-bresilien',
    '/forum/echange-francais-roumain',
    '/forum/echange-francais-russe',
    '/forum/echange-francais-serbe-croate',
    '/forum/echange-francais-slovaque-tcheque',
    '/forum/echange-francais-turc',
    '/forum/echange-francais-ukrainien',
    '/forum/echange-francais-vietnamien',
];

const formatLink = (url: string) => {
    const title = url
        .replace('/forum/', '')
        .replace(/echange-francais-/g, 'Français / ')
        .replace(/-/g, ' ')
        .replace('danois norvegien suedois', 'Danois, Norvégien, Suédois')
        .replace('hindi tamoul', 'Hindi, Tamoul')
        .replace('finois estonien', 'Finois, Estonien')
        .replace('portugais bresilien', 'Portugais, Brésilien')
        .replace('serbe croate', 'Serbe, Croate')
        .replace('slovaque tcheque', 'Slovaque, Tchèque')
        .replace('farci perse', 'Farci, Perse')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    return { href: url, title };
};

const languageLinks = languageLinksRaw.map(formatLink);

export default function LanguageCafePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Café linguistique et tandems</h1>
        <p className="text-muted-foreground">Trouvez un partenaire pour pratiquer une langue étrangère.</p>
        <div className="p-4 mt-4 border rounded-lg bg-muted/50 text-center space-y-2">
            <p className="text-sm">Si tu veux faire un tandem ou une réunion de groupe de conversation, clique sur le bouton :</p>
            <Button asChild>
                <Link href="/language-tandems">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Tandem ou rendez-vous de groupe
                </Link>
            </Button>
        </div>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Forums d'échanges linguistiques
            </CardTitle>
            <CardDescription>
              Utilisez les forums pour trouver des partenaires d'échange ou créez un évènement pour organiser une rencontre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />

            <ul className="space-y-2">
              {languageLinks.map((link) => (
                <li key={link.href}>
                    <Button asChild variant="ghost" className="w-full justify-start text-base p-6">
                         <Link href={link.href} className="flex justify-between items-center w-full">
                            <span>{link.title}</span>
                            <ArrowRight className="h-4 w-4" />
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
