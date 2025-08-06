
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AdminAppearanceSettingsPage() {
    // These would be loaded from a config file or CSS variables
    const currentTheme = {
        background: "354 67% 94%",
        foreground: "342 96% 15%",
        primary: "23 100% 42%",
        secondary: "352 53% 76%",
        accent: "23 100% 45%",
        destructive: "342 95% 33%",
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux paramètres
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Apparence & Thème</h1>
                <p className="text-muted-foreground">Personnalisez les couleurs de l'application (valeurs HSL).</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette />
                        Palette de couleurs principale
                    </CardTitle>
                    <CardDescription>
                        Ces couleurs définissent l'apparence générale de votre application. Les valeurs sont au format HSL (Teinte Saturation Luminosité).
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="primary">Primaire (boutons, liens)</Label>
                        <Input id="primary" defaultValue={currentTheme.primary} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="secondary">Secondaire (badges, fonds)</Label>
                        <Input id="secondary" defaultValue={currentTheme.secondary} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="accent">Accentuation (survol)</Label>
                        <Input id="accent" defaultValue={currentTheme.accent} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="background">Arrière-plan</Label>
                        <Input id="background" defaultValue={currentTheme.background} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="foreground">Texte principal</Label>
                        <Input id="foreground" defaultValue={currentTheme.foreground} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="destructive">Destructif (erreurs, suppression)</Label>
                        <Input id="destructive" defaultValue={currentTheme.destructive} />
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex justify-end">
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder le thème
                </Button>
            </div>
        </div>
    );
}
