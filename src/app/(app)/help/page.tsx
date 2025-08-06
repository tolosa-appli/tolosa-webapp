
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LifeBuoy, BookOpenCheck, Mail, User, CalendarDays, MessageSquare, Megaphone, ShieldCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";

export default function HelpPage() {
    const { toast } = useToast();

    const handleContactSubmit = () => {
        // In a real app, this would submit the form data
        toast({
            title: "Message envoyé !",
            description: "Votre message a été envoyé aux administrateateurs. Atishatz !",
        });
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <Image src="http://bilingue31.free.fr/Aide_mains_250x95.jpg" alt="Aide" width={250} height={95} />
                </div>
                <h1 className="text-3xl font-bold font-headline">Qu'es aquò ? Tu ne sais pas ? Utilise l'Adjuda !</h1>
                <p className="text-muted-foreground mt-2">
                    Retrouvez ici toutes les ressources pour vous aider à utiliser l'application.
                </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <BookOpenCheck className="h-6 w-6 text-primary"/>
                            Base de connaissance
                        </CardTitle>
                        <CardDescription>
                            Consultez nos articles d'aide pour trouver des réponses à vos questions les plus fréquentes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2"><User className="h-5 w-5" /> Gérer mon profil</div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-8">
                                    <p>Votre profil est votre carte de visite ! Pour le modifier, cliquez sur votre avatar en haut à droite, puis sur "Profil".</p>
                                    <p>N'hésitez pas à remplir les différentes sections (goûts, passions, annonces) pour que les autres membres puissent mieux vous connaître. Une présentation complète et sympathique facilite les nouvelles rencontres amicales.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Participer et créer des sorties</div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4 pl-8">
                                    <h4 className="font-semibold">Trouver et rejoindre une sortie</h4>
                                    <p>Allez dans la section "Sorties à Toulouse" pour voir tous les événements à venir. Utilisez les filtres pour affiner votre recherche. Quand une sortie vous intéresse, cliquez sur "Participer".</p>
                                    
                                    <h4 className="font-semibold">Créer une sortie</h4>
                                    <p>Cliquez sur "Proposer une sortie" et remplissez le formulaire. Soyez le plus précis possible dans la description pour donner envie aux autres de vous rejoindre. Vous pouvez aussi créer des sorties exclusives pour les <Link href="/girls-only" className="text-primary underline">filles</Link> ou les <Link href="/students" className="text-primary underline">étudiants</Link>.</p>
                                    
                                    <h4 className="font-semibold">Après la sortie</h4>
                                    <p>Une fois la sortie terminée, vous avez 5 jours pour la noter et donner votre avis sur l'organisation. Vous pouvez aussi partager vos photos dans la galerie de l'événement.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Utiliser le forum</div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-8">
                                    <p>Le forum est l'endroit idéal pour discuter de tout et de rien. Parcourez les thèmes qui vous intéressent.</p>
                                    <p>Pour démarrer une nouvelle conversation, cliquez sur "Créer une discussion", choisissez un thème, donnez un titre et lancez-vous !</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2"><Megaphone className="h-5 w-5" /> Publier une annonce</div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-8">
                                    <p>Vous pouvez poster différents types d'annonces : petites annonces, covoiturage, logement, emploi, stage ou même des questionnaires pour vos études.</p>
                                    <p>Rendez-vous dans la rubrique correspondante et remplissez le formulaire. Vous pouvez gérer toutes vos publications depuis la page <Link href="/my-ads" className="text-primary underline">Mes Annonces</Link>.</p>
                                </AccordionContent>
                            </AccordionItem>

                             <AccordionItem value="item-5">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Sécurité et bonnes pratiques</div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-8">
                                     <p>La convivialité est notre priorité. N'oubliez pas que les sorties de "rencontre amoureuse" sont interdites. Consultez la <Link href="/charter" className="text-primary underline">charte d'utilisation</Link> pour plus de détails.</p>
                                     <p>Si vous voyez un comportement ou un contenu inapproprié, utilisez les boutons de signalement. Ne partagez jamais d'informations trop personnelles publiquement.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Mail className="h-6 w-6 text-primary"/>
                            Contacter les administrateurs
                        </CardTitle>
                        <CardDescription>
                            Vous ne trouvez pas votre réponse ? Envoyez-nous un message directement.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center pt-6">
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button size="lg">Envoyer un message</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Contacter un administrateur</DialogTitle>
                                    <DialogDescription>
                                        Décrivez votre problème ou question. Nous vous répondrons dès que possible.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="help-message">Votre message</Label>
                                        <Textarea id="help-message" placeholder="Bonjour, j'ai une question concernant..." rows={6} />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={handleContactSubmit}>Envoyer</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
