
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function CharterPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-card py-12">
            <div className="container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    <Button variant="ghost" className="mb-4 -ml-4" onClick={() => router.back()}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                    </Button>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl">
                                <Shield className="h-6 w-6"/>
                                Charte d'utilisation de Tolosa
                            </CardTitle>
                            <CardDescription>
                                Règles de bonne conduite et conditions d'utilisation de notre service.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 text-sm">
                            <p>
                                Bienvenue sur Tolosa ! Pour que notre communauté reste un espace convivial, sûr et respectueux, nous vous demandons de lire et d'accepter les règles suivantes.
                            </p>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">1. Respect et bienveillance</h3>
                                <p>
                                    Chaque membre s'engage à faire preuve de courtoisie, de respect et de tolérance envers les autres utilisateurs. Les propos haineux, discriminatoires, injurieux, ou toute forme de harcèlement sont strictement interdits et entraîneront une suspension immédiate du compte.
                                </p>

                                <h3 className="font-semibold text-lg">2. Sécurité et données personnelles</h3>
                                <p>
                                    Ne partagez jamais d'informations personnelles sensibles (numéro de téléphone, adresse exacte, informations bancaires) dans les espaces publics de l'application. Utilisez la messagerie privée pour des échanges plus personnels, mais restez vigilant.
                                </p>

                                <h3 className="font-semibold text-lg">3. Contenu des publications</h3>
                                <p>
                                    Toute publication (annonces, discussions, événements) doit être légale et conforme aux bonnes mœurs. Les contenus à caractère pornographique, violent, illégal ou faisant l'apologie d'activités illicites sont proscrits.
                                </p>

                                <h3 className="font-semibold text-lg text-destructive">4. Interdiction des sorties de rencontre amoureuse ou entre célibataires</h3>
                                <p className="text-destructive-foreground bg-destructive/10 p-4 rounded-md border border-destructive/50">
                                    <strong>Etant donné les problèmes provoqués par les évènements de rencontre, les sorties de rencontre sont prohibées sur notre application.</strong>
                                    <br />
                                    Tolosa est une plateforme dédiée aux sorties amicales et à l'entraide. Les événements organisés dans le but explicite de faire des rencontres amoureuses ou "dating" ne sont pas autorisés.
                                    <br />
                                    Toute publication de ce type sera supprimée. Tout contrevenant pourra faire l'objet d'une suspension de son compte.
                                </p>

                                <h3 className="font-semibold text-lg">5. Signalements</h3>
                                <p>
                                    Si vous constatez un comportement ou un contenu qui enfreint cette charte, utilisez les outils de signalement mis à votre disposition. Notre équipe de modération examinera chaque signalement avec attention.
                                </p>

                                <h3 className="font-semibold text-lg">6. Responsabilité</h3>
                                <p>
                                    Les organisateurs de sorties sont responsables du bon déroulement de leurs événements. Tolosa agit comme une plateforme de mise en relation et ne peut être tenu responsable des incidents survenant lors des activités organisées par ses membres.
                                </p>
                                
                                <h3 className="font-semibold text-lg">7. Sorties payantes</h3>
                                <p>
                                    En ce qui concerne les sorties payantes ou qui contiennent des activités payantes ou vente de produits à côté, elles doivent être signalées au moins dans la description de la sortie. La transparence est essentielle pour que les membres puissent participer en toute connaissance de cause.
                                </p>

                                <h3 className="font-semibold text-lg">8. Concurrence</h3>
                                <p>
                                    L'utilisation de cette application ne doit pas donner lieu à la promotion d'une autre application de même type que celle-ci.
                                </p>
                            </div>

                            <p className="font-semibold pt-4 border-t mt-6">
                                En vous inscrivant, vous confirmez avoir lu et accepté l'ensemble de cette charte. Merci de contribuer à faire de Tolosa un espace positif et accueillant pour tous !
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
