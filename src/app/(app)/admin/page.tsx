
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock, Users, FileText, Settings, ShieldAlert, Archive } from 'lucide-react';
import Link from "next/link";

// --- Simulation de l'utilisateur connecté ---
// Dans une application réelle, ces données proviendraient de votre système d'authentification.
const currentUser = {
  role: 'admin' as 'user' | 'moderator' | 'admin',
};
// Pour tester en tant que modérateur : const currentUser = { role: 'moderator' };
// Pour tester en tant qu'utilisateur : const currentUser = { role: 'user' };
// -----------------------------------------

export default function AdminPage() {
  if (currentUser.role !== 'admin' && currentUser.role !== 'moderator') {
    return (
        <div className="container mx-auto p-4 md:p-8 flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center">Accès Restreint</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <Lock className="h-4 w-4" />
                        <AlertTitle>Section privée</AlertTitle>
                        <AlertDescription>
                            Vous devez être administrateur ou modérateur pour accéder à cette page.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="mb-6">
          <h1 className="text-3xl font-bold font-headline">Panneau d'administration</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs et le contenu de l'application.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/members">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users />
                        <span>Gestion des membres</span>
                    </CardTitle>
                    <CardDescription>
                        Voir la liste des membres, gérer les rôles et les suspensions.
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href="/admin/reports">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldAlert />
                        <span>Gestion des signalements</span>
                    </CardTitle>
                    <CardDescription>
                       Traiter les contenus et profils signalés par les utilisateurs.
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Link href="/admin/user-maintenance">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Archive />
                        <span>Maintenance Utilisateurs</span>
                    </CardTitle>
                    <CardDescription>
                       Archiver les utilisateurs inactifs et gérer la base de données.
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
        <Card className="h-full opacity-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText />
                    <span>Modération de contenu</span>
                </CardTitle>
                <CardDescription>
                   Bientôt disponible : supprimer des annonces, des discussions, etc.
                </CardDescription>
            </CardHeader>
        </Card>
        {currentUser.role === 'admin' ? (
          <Link href="/admin/settings" className="h-full">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings />
                        <span>Paramètres du site</span>
                    </CardTitle>
                    <CardDescription>
                       Gérer les options globales de l'application.
                    </CardDescription>
                </CardHeader>
            </Card>
          </Link>
        ) : (
          <Card className="h-full opacity-50 cursor-not-allowed">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings />
                    <span>Paramètres du site</span>
                </CardTitle>
                <CardDescription>
                    Réservé aux administrateurs.
                </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
