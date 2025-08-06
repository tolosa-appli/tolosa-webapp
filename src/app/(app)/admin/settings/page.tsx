
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Languages, ToggleRight, Brush } from "lucide-react";

export default function AdminSettingsPage() {
    // In a real app, you'd add a check here to ensure only admins can see this page.
    // This is already handled on the page linking to it, but a direct check is best practice.

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'administration
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Paramètres du Site</h1>
                <p className="text-muted-foreground">Gérez les configurations globales de l'application.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Languages />
                            <span>Contenu & Textes</span>
                        </CardTitle>
                        <CardDescription>
                            Modifier les textes principaux du site (accueil, chartes, etc.).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                           <Link href="/admin/settings/content">Gérer le contenu</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Brush />
                            <span>Apparence & Thème</span>
                        </CardTitle>
                        <CardDescription>
                           Personnaliser les couleurs et le style de l'application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild>
                           <Link href="/admin/settings/appearance">Modifier le thème</Link>
                        </Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ToggleRight />
                            <span>Fonctionnalités</span>
                        </CardTitle>
                        <CardDescription>
                           Activer ou désactiver certaines fonctionnalités de l'application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild>
                           <Link href="/admin/settings/features">Gérer les fonctionnalités</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
