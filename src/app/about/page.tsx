import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Heart, GraduationCap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card py-12">
        <div className="container mx-auto p-4 md:p-8">
           <Button asChild variant="ghost" className="mb-4 -ml-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à l'accueil
                </Link>
            </Button>
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Cossí va ?</CardTitle>
              <CardDescription className="text-lg">
                l'application des toulousain(es) pour faire des sorties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <section className="text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                      <Users className="h-5 w-5" />
                      <h2 className="text-xl font-semibold">Accueil des nouveaux à Toulouse</h2>
                  </div>
                  <p className="max-w-2xl mx-auto text-muted-foreground">
                    Que vous soyez nouveau ou nouvelle à Toulouse ou simplement désireux de rencontrer de nouvelles têtes, Tolosa est la plateforme idéale pour tisser des liens.
                  </p>
                  <p className="mt-4 font-medium text-foreground/90">
                    Accueil des nouveaux à Toulouse. Sorties, emploi, logement, covoiturage, petites annonces, tandem de langues, sorties entre filles, sorties étudiantes, évènements, idées de sorties, voyage, international.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Tu trouveras, des accueillants ou accueillantes nommés MeetMyCity Boy ou MeetMyCity Girl, que tu pourras contacter pour visiter la ville, découvrir des lieux où sortir, où faire des achats, des balades autour de la ville.
                  </p>
              </section>
              
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-8 text-center">
                <section>
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-1 rounded-full mb-4">
                        <Heart className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Application des toulousaines</h2>
                    </div>
                     <p className="text-muted-foreground">
                        Un espace dédié et sécurisé pour les femmes. Organisez ou rejoignez des sorties entre filles en toute confiance, comme la fameuse "Toulousaine Girls Party" !
                    </p>
                </section>
                
                <section>
                     <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                         <GraduationCap className="h-5 w-5" />
                        <h2 className="text-xl font-semibold">Application "Study in Toulouse"</h2>
                    </div>
                     <p className="text-muted-foreground">
                        Application des sorties étudiantes, tableau de bord de la vie étudiante dans la ville rose.
                     </p>
                     <p className="mt-2 text-muted-foreground">
                        La vie étudiante est plus riche avec Tolosa. Retrouvez des événements, des bons plans et des opportunités grâce à notre section dédiée aux sorties étudiantes.
                     </p>
                </section>
              </div>

            </CardContent>
          </Card>
        </div>
    </div>
  );
}
