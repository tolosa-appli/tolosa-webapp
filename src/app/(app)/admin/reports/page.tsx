
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Archive, ExternalLink, MoreVertical, Trash2, UserX, ShieldOff } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";

export type ReportType = 'Profil' | 'Annonce' | 'Sortie' | 'Discussion' | 'Covoiturage' | 'Logement' | 'Emploi' | 'Stage & Alternance' | 'Questionnaire' | 'Sortie entre filles' | 'Sortie étudiante';

export type Report = {
  id: string;
  type: ReportType;
  content: string; 
  link: string; 
  reportedUser: string;
  reporter: string;
  date: string;
  reason: string;
  status: 'pending' | 'resolved';
};

const reportsData: Report[] = [
  { id: '1', type: 'Annonce', content: 'Donne canapé convertible', link: '/ads', reportedUser: 'Juliette', reporter: 'Mehdi', date: '2024-07-22T10:00:00Z', reason: 'Spam, annonce postée plusieurs fois.', status: 'pending' },
  { id: '2', type: 'Profil', content: 'Alexandre', link: '/members', reportedUser: 'Alexandre', reporter: 'Sophie', date: '2024-07-21T15:30:00Z', reason: 'Comportement inapproprié dans la messagerie.', status: 'pending' },
  { id: '3', type: 'Sortie', content: 'Soirée Tapas', link: '/sorties', reportedUser: 'Admin', reporter: 'Lucas', date: '2024-07-20T11:00:00Z', reason: 'L\'organisateur ne répond pas aux messages.', status: 'resolved' },
  { id: '4', type: 'Discussion', content: 'Quel est votre avis sur... ?', link: '/forum/debat-actualites-opinion', reportedUser: 'Sophie', reporter: 'Chloé', date: '2024-07-19T09:45:00Z', reason: 'Message hors-sujet et insultant.', status: 'pending' },
  { id: '5', type: 'Covoiturage', content: 'Toulouse -> Albi', link: '/carpooling', reportedUser: 'Julien', reporter: 'Lea', date: '2024-07-23T10:00:00Z', reason: 'Trajet annulé sans prévenir.', status: 'pending' },
  { id: '6', type: 'Logement', content: 'T2 Toulouse Centre', link: '/housing', reportedUser: 'Sophie', reporter: 'Bob', date: '2024-07-23T11:00:00Z', reason: 'Annonce frauduleuse.', status: 'pending' },
  { id: '7', type: 'Emploi', content: 'Développeur Full-Stack', link: '/jobs', reportedUser: 'Recruteur Tech', reporter: 'Marc', date: '2024-07-23T12:00:00Z', reason: 'Offre expirée mais toujours visible.', status: 'pending' },
  { id: '8', type: 'Stage & Alternance', content: 'Stage Développeur Web', link: '/internships', reportedUser: 'Web Solutions', reporter: 'Léo', date: '2024-07-24T09:00:00Z', reason: 'Description trompeuse', status: 'pending' },
  { id: '9', type: 'Questionnaire', content: 'Sondage sur les habitudes de transport', link: '/questionnaires', reportedUser: 'Sophie', reporter: 'Dr. Dubois', date: '2024-07-24T10:00:00Z', reason: 'Lien mort', status: 'pending' },
  { id: '10', type: 'Sortie entre filles', content: 'Brunch & Papotage', link: '/girls-only', reportedUser: 'Organisatrice', reporter: 'Alice', date: '2024-07-25T11:00:00Z', reason: 'Description non conforme à la charte.', status: 'pending' },
  { id: '11', type: 'Sortie étudiante', content: 'Soirée intégration BDE', link: '/students', reportedUser: 'BDE Info', reporter: 'Marc', date: '2024-07-25T12:00:00Z', reason: 'Informations incorrectes sur le lieu.', status: 'pending' },
];


export default function AdminReportsPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);
    
    const [reports, setReports] = useState<Report[]>(reportsData);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleResolve = (reportId: string) => {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
        toast({
            title: "Signalement traité",
            description: "Le signalement a été marqué comme résolu.",
        });
    };
    
    const handleDeleteContent = (type: string, content: string, reportId: string) => {
        toast({
            title: `${type} supprimé(e)`,
            description: `Le contenu "${content}" a été supprimé.`,
        });
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    };

    const handleSuspendUser = (username: string, reportId: string) => {
        toast({
            title: "Utilisateur suspendu",
            description: `${username} a été suspendu temporairement.`,
            variant: "destructive"
        });
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    };

    const handleDeleteUser = (username: string, reportId: string) => {
        toast({
            title: "Utilisateur supprimé",
            description: `${username} a été supprimé définitivement.`,
            variant: "destructive"
        });
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    };

    const getStatusVariant = (status: Report['status']) => {
        return status === 'pending' ? 'destructive' : 'secondary';
    };

     const getStatusName = (status: Report['status']) => {
        return status === 'pending' ? 'En attente' : 'Résolu';
    };

    const renderActionMenu = (report: Report) => {
        const contentDeletionMapping: { [K in ReportType]?: string } = {
            'Annonce': 'Supprimer la petite annonce',
            'Discussion': 'Supprimer la discussion/commentaire',
            'Sortie': 'Supprimer la sortie',
            'Sortie entre filles': 'Supprimer la sortie entre filles',
            'Sortie étudiante': 'Supprimer la sortie étudiante',
            'Covoiturage': 'Supprimer le covoiturage',
            'Logement': 'Supprimer le logement',
            'Emploi': 'Supprimer l\'emploi',
            'Stage & Alternance': 'Supprimer le stage/alternance',
            'Questionnaire': 'Supprimer le questionnaire',
        };

        const deletionText = contentDeletionMapping[report.type];

        return (
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions de modération</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {deletionText && (
                        <DropdownMenuItem onClick={() => handleDeleteContent(report.type, report.content, report.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />{deletionText}
                        </DropdownMenuItem>
                    )}
                    
                    {report.type !== 'Profil' && <DropdownMenuSeparator />}
                    
                    <DropdownMenuItem onClick={() => handleSuspendUser(report.reportedUser, report.id)} className="text-destructive focus:text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        Suspendre l'utilisateur
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteUser(report.reportedUser, report.id)} className="text-destructive focus:text-destructive">
                        <ShieldOff className="mr-2 h-4 w-4" />
                        Supprimer l'utilisateur
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleResolve(report.id)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Marquer comme résolu
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <Button asChild variant="ghost" className="mb-4 -ml-4">
                    <Link href="/admin">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'administration
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Gestion des Signalements</h1>
                <p className="text-muted-foreground">Examinez et traitez les signalements envoyés par les utilisateurs.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Signalements en attente</CardTitle>
                    <CardDescription>
                        Ces signalements requièrent votre attention.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Contenu signalé</TableHead>
                                    <TableHead>Signalé par</TableHead>
                                    <TableHead>Raison</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.filter(r => r.status === 'pending').map(report => (
                                    <TableRow key={report.id}>
                                        <TableCell>
                                            {isClient ? formatDistanceToNow(new Date(report.date), { addSuffix: true, locale: fr }) : '...'}
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{report.type}</Badge></TableCell>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            {report.content} 
                                            <Button asChild variant="ghost" size="icon" className="h-6 w-6">
                                                <Link href={report.link} target="_blank">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                        <TableCell>{report.reporter}</TableCell>
                                        <TableCell>{report.reason}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(report.status)}>{getStatusName(report.status)}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {renderActionMenu(report)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {reports.filter(r => r.status === 'pending').length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            Aucun signalement en attente.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Signalements résolus</CardTitle>
                    <CardDescription>
                        Historique des signalements qui ont déjà été traités.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Contenu signalé</TableHead>
                                    <TableHead>Signalé par</TableHead>
                                    <TableHead>Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.filter(r => r.status === 'resolved').map(report => (
                                    <TableRow key={report.id} className="text-muted-foreground">
                                        <TableCell>{isClient ? format(new Date(report.date), 'dd/MM/yyyy', { locale: fr }) : '...'}</TableCell>
                                        <TableCell><Badge variant="outline">{report.type}</Badge></TableCell>
                                        <TableCell>{report.content}</TableCell>
                                        <TableCell>{report.reporter}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(report.status)}>{getStatusName(report.status)}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {reports.filter(r => r.status === 'resolved').length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            Aucun signalement résolu.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
