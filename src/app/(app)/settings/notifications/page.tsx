'use client';

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Mail, MessageSquare, Users, CalendarPlus, Newspaper, Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function NotificationSettingsPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Paramètres sauvegardés",
            description: "Vos préférences de notification ont été mises à jour.",
        });
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux paramètres
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Préférences de Notification</h1>
                <p className="text-muted-foreground">Choisissez les notifications que vous souhaitez recevoir.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell />
                            Notifications générales
                        </CardTitle>
                        <CardDescription>
                            Gérez les notifications pour l'ensemble de l'application.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="all-notifications" className="text-base">Toutes les notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Activer ou désactiver toutes les notifications de l'application.
                                </p>
                            </div>
                            <Switch id="all-notifications" defaultChecked />
                        </div>

                        <Separator />

                        <h3 className="text-lg font-medium">Notifications par type</h3>
                        
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <div className="space-y-0.5">
                                    <Label htmlFor="messages-notif" className="text-base">Messages privés</Label>
                                    <p className="text-sm text-muted-foreground">
                                       Être notifié(e) à la réception d'un nouveau message privé.
                                    </p>
                                </div>
                            </div>
                            <Switch id="messages-notif" defaultChecked />
                        </div>

                         <div className="flex items-center justify-between rounded-lg border p-4">
                             <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <div className="space-y-0.5">
                                    <Label htmlFor="forum-notif" className="text-base">Forum de discussion</Label>
                                    <p className="text-sm text-muted-foreground">
                                       Messages et nouveaux posts dans les sujets que vous suivez.
                                    </p>
                                </div>
                            </div>
                            <Switch id="forum-notif" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <CalendarPlus className="h-5 w-5 text-primary" />
                                <div className="space-y-0.5">
                                    <Label htmlFor="new-event-notif" className="text-base">Nouvelles sorties</Label>
                                    <p className="text-sm text-muted-foreground">
                                       Être prévenu(e) lorsqu'une nouvelle sortie est créée.
                                    </p>
                                </div>
                            </div>
                            <Switch id="new-event-notif" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <Newspaper className="h-5 w-5 text-primary" />
                                <div className="space-y-0.5">
                                    <Label htmlFor="new-post-notif" className="text-base">Nouveaux posts sur le forum</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recevoir une notification pour chaque nouveau sujet de discussion.
                                    </p>
                                </div>
                            </div>
                            <Switch id="new-post-notif" />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-primary" />
                                <div className="space-y-0.5">
                                    <Label htmlFor="event-subscription-notif" className="text-base">Activité sur vos sorties</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Commentaires, inscriptions et désinscriptions sur vos sorties.
                                    </p>
                                </div>
                            </div>
                            <Switch id="event-subscription-notif" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
                
                <div className="mt-8 flex justify-end">
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer les préférences
                    </Button>
                </div>
            </form>
        </div>
    );
}
