
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, ToggleRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminFeaturesSettingsPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux paramètres
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Gestion des Fonctionnalités</h1>
                <p className="text-muted-foreground">Activez ou désactivez certaines fonctionnalités de l'application.</p>
            </div>

            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <ToggleRight />
                        Fonctionnalités principales
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="signup-enabled" className="text-base">Inscriptions des utilisateurs</Label>
                            <p className="text-sm text-muted-foreground">
                                Permettre à de nouveaux utilisateurs de créer un compte.
                            </p>
                        </div>
                        <Switch id="signup-enabled" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="ads-enabled" className="text-base">Module de petites annonces</Label>
                            <p className="text-sm text-muted-foreground">
                                Activer ou désactiver complètement la section des petites annonces.
                            </p>
                        </div>
                        <Switch id="ads-enabled" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="maintenance-mode" className="text-base">Mode maintenance</Label>
                             <p className="text-sm text-muted-foreground">
                                Afficher une page de maintenance pour tous les utilisateurs non-administrateurs.
                            </p>
                        </div>
                        <Switch id="maintenance-mode" />
                    </div>
                </CardContent>
            </Card>
            
            <div className="mt-8 flex justify-end">
                <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les changements
                </Button>
            </div>

        </div>
    );
}
