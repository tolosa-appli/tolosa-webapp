
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft, Archive, AlertTriangle, DatabaseZap, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { initialMembersData, type Member } from '@/app/(app)/members/data';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { cn } from '@/lib/utils';

export default function UserMaintenancePage() {
    const { toast } = useToast();
    const [activeUsers, setActiveUsers] = useState<Member[]>(initialMembersData);
    const [archivedUsers, setArchivedUsers] = useState<Member[]>([]);
    const [isArchiving, setIsArchiving] = useState(false);
    const [inactivityMonths, setInactivityMonths] = useState('3');

    const handleArchiveInactiveUsers = () => {
        setIsArchiving(true);
        const cutOffDate = new Date();
        cutOffDate.setMonth(cutOffDate.getMonth() - parseInt(inactivityMonths, 10));

        const usersToArchive = activeUsers.filter(user => new Date(user.lastSeen) < cutOffDate);
        const usersToKeep = activeUsers.filter(user => new Date(user.lastSeen) >= cutOffDate);
        
        setTimeout(() => {
            if (usersToArchive.length > 0) {
                setActiveUsers(usersToKeep);
                setArchivedUsers(prev => [...prev, ...usersToArchive]);
                toast({
                    title: "Archivage terminé",
                    description: `${usersToArchive.length} utilisateur(s) inactif(s) ont été archivé(s).`,
                });
            } else {
                 toast({
                    title: "Aucun utilisateur à archiver",
                    description: `Aucun utilisateur n'est inactif depuis plus de ${inactivityMonths} mois.`,
                });
            }
            setIsArchiving(false);
        }, 1500);
    };

    const handleReintegrate = (userToReintegrate: Member) => {
        setArchivedUsers(prev => prev.filter(u => u.id !== userToReintegrate.id));
        setActiveUsers(prev => [...prev, { ...userToReintegrate, lastSeen: new Date().toISOString(), status: 'not_connected' }]);
        toast({
            title: "Utilisateur réintégré",
            description: `${userToReintegrate.username} a été restauré et peut de nouveau se connecter.`,
        });
    };

    const handleDeletePermanently = (userToDelete: Member) => {
        setArchivedUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        toast({
            title: "Utilisateur supprimé définitivement",
            description: `Le compte de ${userToDelete.username} a été définitivement supprimé.`,
            variant: "destructive",
        });
    };

    const renderUserTable = (users: Member[], isArchivedList = false) => (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Identifiant</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead>Inscrit le</TableHead>
                        {isArchivedList && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={isArchivedList ? 4 : 3} className="h-24 text-center">
                                {isArchivedList ? "Aucun utilisateur archivé." : "Aucun utilisateur actif."}
                            </TableCell>
                        </TableRow>
                    )}
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar} alt={user.username} data-ai-hint={user.dataAiHint} />
                                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {user.username}
                            </TableCell>
                            <TableCell>{format(new Date(user.lastSeen), 'dd/MM/yyyy', { locale: fr })}</TableCell>
                            <TableCell>{format(new Date(user.joined), 'dd/MM/yyyy', { locale: fr })}</TableCell>
                            {isArchivedList && (
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline" onClick={() => handleReintegrate(user)}>
                                        <DatabaseZap className="mr-2 h-4 w-4" />
                                        Réintégrer
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="sm" variant="destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Supprimer
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action est irréversible et supprimera définitivement le compte et les données de {user.username}.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeletePermanently(user)} className={cn(buttonVariants({ variant: "destructive" }))}>
                                                    Oui, supprimer définitivement
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'administration
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Maintenance des Utilisateurs</h1>
                <p className="text-muted-foreground">Archivez ou supprimez les utilisateurs inactifs pour maintenir la base de données saine.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Processus d'archivage</CardTitle>
                    <CardDescription>
                        Cette action va identifier les utilisateurs inactifs selon le délai choisi, sauvegarder leurs données, puis les archiver.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Action irréversible (simulation)</AlertTitle>
                        <AlertDescription>
                            Dans une application réelle, l'archivage désactive le compte. La suppression supprime définitivement les données de l'utilisateur. Un utilisateur archivé qui se reconnecte sera automatiquement réintégré.
                        </AlertDescription>
                    </Alert>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                         <div className="flex-1 w-full sm:w-auto">
                             <p className="text-sm font-medium mb-2">Archiver les utilisateurs inactifs depuis :</p>
                             <Select value={inactivityMonths} onValueChange={setInactivityMonths}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Délai d'inactivité" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">3 mois</SelectItem>
                                    <SelectItem value="6">6 mois</SelectItem>
                                    <SelectItem value="12">12 mois</SelectItem>
                                    <SelectItem value="18">18 mois</SelectItem>
                                    <SelectItem value="24">24 mois</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                        <Button onClick={handleArchiveInactiveUsers} disabled={isArchiving} className="w-full sm:w-auto self-end">
                            <Archive className="mr-2 h-4 w-4" />
                            {isArchiving ? "Analyse en cours..." : `Archiver les inactifs`}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Utilisateurs Actifs ({activeUsers.length})</CardTitle>
                        <CardDescription>Liste de tous les utilisateurs actuellement actifs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {renderUserTable(activeUsers)}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Utilisateurs Archivés ({archivedUsers.length})</CardTitle>
                        <CardDescription>Utilisateurs inactifs dont les données ont été sauvegardées.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {renderUserTable(archivedUsers, true)}
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
