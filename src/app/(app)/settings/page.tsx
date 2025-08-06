'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Shield, User, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteAccount = () => {
    // In a real app, you would call your backend to delete the user data.
    console.log("Account deletion requested.");

    toast({
      title: "Compte supprimé",
      description: "Votre compte a été supprimé avec succès. Vous allez être redirigé vers la page d'accueil.",
      variant: "destructive",
    });

    // Redirect to home page after deletion
    setTimeout(() => {
        router.push('/');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
          <h1 className="text-3xl font-bold font-headline">Paramètres</h1>
          <p className="text-muted-foreground">Gérez vos préférences de notification et de compte.</p>
      </div>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choisissez comment vous souhaitez être notifié.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
                <Link href="/settings/notifications">Gérer les notifications</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compte
            </CardTitle>
            <CardDescription>
              Gérez les informations de votre compte et les actions irréversibles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Button asChild>
                <Link href="/profile" className="flex items-center w-fit">
                    <User className="mr-2 h-4 w-4" />
                    Modifier mon profil
                </Link>
            </Button>
            <Separator />
            <div className="p-4 border border-destructive/50 rounded-lg space-y-3 bg-destructive/5">
                <h4 className="font-semibold text-destructive">Zone de danger</h4>
                <p className="text-sm text-muted-foreground">
                    La suppression de votre compte est une action irréversible. Toutes vos données seront définitivement perdues.
                </p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer mon compte
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous absolument sûr(e) ?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. Votre profil, vos messages, vos annonces et toutes vos contributions seront supprimés définitivement.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className={buttonVariants({ variant: "destructive" })}>
                                Oui, supprimer mon compte
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
