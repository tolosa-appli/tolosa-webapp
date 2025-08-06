
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Mail, User, Server } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
            </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle>Mentions Légales</CardTitle>
          <CardDescription>
            Informations légales concernant Tolosa Amical.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2"><Building className="h-5 w-5 text-primary" /> Éditeur du site</h2>
            <p><strong>Association Happy People 31</strong></p>
            <p>13, bd Lascrosses</p>
            <p>31000 Toulouse</p>
            <p>France</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2"><User className="h-5 w-5 text-primary" /> Directeur de la publication</h2>
            <p>Le représentant légal de l'association Happy People 31.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2"><Mail className="h-5 w-5 text-primary" /> Contact</h2>
            <p>Pour toute question, vous pouvez nous contacter à l'adresse email suivante : <a href="mailto:tolosa31@free.fr" className="text-primary hover:underline">tolosa31@free.fr</a>.</p>
          </section>
          
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2"><Server className="h-5 w-5 text-primary" /> Hébergeur du site</h2>
            <p>Ce site est hébergé par Firebase, un service de Google LLC.</p>
            <p>Google LLC</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>Mountain View, CA 94043, USA</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Propriété intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Données personnelles</h2>
            <p>Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des comptes utilisateurs et à la mise en relation des membres. Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent, que vous pouvez exercer en nous contactant à l'adresse email mentionnée ci-dessus.</p>
          </section>
           
          <section>
            <h2 className="text-lg font-semibold">Responsabilité</h2>
            <p>Tolosa Amical met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des fonctionnalités ou de la présence de virus sur son site. Les événements et annonces sont publiés sous la seule responsabilité de leurs auteurs.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
