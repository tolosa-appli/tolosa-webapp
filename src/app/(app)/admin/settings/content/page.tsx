
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminContentSettingsPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux paramètres
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Contenu & Textes</h1>
                <p className="text-muted-foreground">Modifiez les textes principaux de l'application.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Page d'accueil</CardTitle>
                    <CardDescription>Textes affichés sur la page d'accueil pour les visiteurs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="welcomeTitle">Titre de bienvenue</Label>
                        <Input id="welcomeTitle" defaultValue="Cossí va ?" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="welcomeSlogan">Slogan</Label>
                        <Input id="welcomeSlogan" defaultValue="l'application des sorties amicales des toulousains" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="welcomeDescription">Description</Label>
                        <Textarea id="welcomeDescription" defaultValue="Accueil des nouveaux à Toulouse. Sorties, Emploi, Logement, Covoiturage, et bien plus. Rejoignez la communauté des toulousaines et toulousains !" />
                    </div>
                </CardContent>
            </Card>

             <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Charte d'utilisation</CardTitle>
                    <CardDescription>Gérez le lien vers la charte d'utilisation de l'application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="charterLink">URL de la charte</Label>
                        <Input id="charterLink" defaultValue="/charter" disabled />
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex justify-end">
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                </Button>
            </div>
        </div>
    );
}
