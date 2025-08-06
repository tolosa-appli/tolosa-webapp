
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Check, X, Trash2, Edit, Users } from 'lucide-react';
import { tandemOffers as allTandemOffers, type TandemOffer } from '../data';
import { initialMembersData, type Member } from '@/app/(app)/members/data';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// Mocked current user - In a real app, this would come from an auth context
const currentUser = { id: '1', name: 'Sophie' };

const TandemList = ({ 
    tandems, 
    listType,
    onCancel,
    onModify,
    onManage,
}: { 
    tandems: TandemOffer[], 
    listType: 'created' | 'registered',
    onCancel?: (id: string, title: string) => void,
    onModify?: (id: string, title: string) => void,
    onManage?: (tandem: TandemOffer) => void,
}) => {
    
    if (tandems.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-10">
                <p>{listType === 'created' ? "Vous n'avez créé aucun tandem." : "Vous n'êtes inscrit à aucun tandem."}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tandems.map(tandem => (
                <Card key={tandem.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle>{tandem.offeredLanguage.name} / {tandem.soughtLanguage.name}</CardTitle>
                                <CardDescription>Organisé par {tandem.user.username}</CardDescription>
                            </div>
                            {listType === 'created' && (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => onModify?.(tandem.id, `${tandem.offeredLanguage.name} / ${tandem.soughtLanguage.name}`)}><Edit className="mr-2 h-4 w-4"/>Modifier</Button>
                                    <Button variant="destructive" size="sm" onClick={() => onCancel?.(tandem.id, `${tandem.offeredLanguage.name} / ${tandem.soughtLanguage.name}`)}><Trash2 className="mr-2 h-4 w-4"/>Annuler</Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    
                     <CardContent className="pt-0">
                           {listType === 'created' && (
                                <Button variant="outline" onClick={() => onManage?.(tandem)}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Gérer les inscriptions ({tandem.participants.length})
                                </Button>
                           )}
                           {listType === 'registered' && (
                                <Button><MessageSquare className="mr-2 h-4 w-4"/>Contacter l'organisateur</Button>
                           )}
                     </CardContent>
                </Card>
            ))}
        </div>
    );
};


export default function MyTandemsPage() {
    const { toast } = useToast();
    const [managingTandem, setManagingTandem] = useState<TandemOffer | null>(null);

    // Mocked data for demonstration
    const [tandemOffers, setTandemOffers] = useState(allTandemOffers);
    const [pendingRequests, setPendingRequests] = useState<Record<string, Member[]>>({
        't2': [initialMembersData.find(m => m.username === 'Chloé')!]
    });

    // Filter tandems for the current user
    const myCreatedTandems = tandemOffers.filter(t => t.user.id === currentUser.id);
    const myRegisteredTandems = tandemOffers.filter(t => t.participants.includes(currentUser.id));
    
    const handleCancel = (id: string, title: string) => {
        toast({
            title: "Événement annulé",
            description: `Le tandem "${title}" a été annulé. Les inscrits ont été prévenus.`,
            variant: "destructive"
        });
        setTandemOffers(prev => prev.filter(t => t.id !== id));
    };

    const handleModify = (id: string, title: string) => {
        toast({
            title: "Redirection vers la modification...",
            description: `Vous modifiez le tandem "${title}".`
        });
        // In a real app, router.push(`/language-tandems/edit/${id}`)
    };

    const handleManage = (tandem: TandemOffer) => {
        setManagingTandem(tandem);
    };
    
    const handleAcceptRequest = (tandemId: string, userId: string, username: string) => {
        // Add user to participants
        setTandemOffers(prev => prev.map(t => t.id === tandemId ? { ...t, participants: [...t.participants, userId] } : t));
        // Remove user from pending
        setPendingRequests(prev => ({ ...prev, [tandemId]: (prev[tandemId] || []).filter(u => u.id !== userId) }));
        
        toast({
            title: "Inscription acceptée",
            description: `${username} a été ajouté(e) à l'événement.`,
        });
        // Update the state of the dialog immediately
        const updatedTandem = tandemOffers.find(t => t.id === tandemId);
        if (updatedTandem) {
            setManagingTandem({ ...updatedTandem, participants: [...updatedTandem.participants, userId] });
        }
    };

    const handleDeclineRequest = (tandemId: string, userId: string, username: string) => {
         // Remove user from pending
        setPendingRequests(prev => ({ ...prev, [tandemId]: (prev[tandemId] || []).filter(u => u.id !== userId) }));

        toast({
            title: "Inscription refusée",
            description: `La demande de ${username} a été refusée.`,
            variant: "destructive"
        });
    };

    const handleExcludeParticipant = (tandemId: string, userId: string, username: string) => {
        setTandemOffers(prev => prev.map(t => t.id === tandemId ? { ...t, participants: t.participants.filter(pId => pId !== userId) } : t));
        
        toast({
            title: "Participant exclu",
            description: `${username} a été retiré(e) de l'événement.`,
            variant: "destructive"
        });
        // Update the state of the dialog immediately
        const updatedTandem = tandemOffers.find(t => t.id === tandemId);
        if (updatedTandem) {
            setManagingTandem({ ...updatedTandem, participants: updatedTandem.participants.filter(pId => pId !== userId) });
        }
    };

    const getMemberById = (id: string) => initialMembersData.find(m => m.id === id);
    
    // Find the currently managed tandem in the latest state to reflect UI changes
    const currentManagingTandem = managingTandem ? tandemOffers.find(t => t.id === managingTandem.id) : null;
    const currentPendingRequests = currentManagingTandem ? pendingRequests[currentManagingTandem.id] || [] : [];


    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex flex-col items-start mb-6 gap-2">
                <h1 className="text-3xl font-bold font-headline">Mes Tandems</h1>
                <p className="text-muted-foreground">Retrouvez ici les tandems et réunions de groupe que vous organisez ou auxquels vous participez.</p>
            </div>

            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="created" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="created">Mes créations</TabsTrigger>
                            <TabsTrigger value="registered">Mes inscriptions</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="created" className="pt-6">
                             <TandemList 
                                tandems={myCreatedTandems} 
                                listType="created"
                                onCancel={handleCancel}
                                onModify={handleModify}
                                onManage={handleManage}
                            />
                        </TabsContent>

                        <TabsContent value="registered" className="pt-6">
                            <TandemList 
                                tandems={myRegisteredTandems} 
                                listType="registered"
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Dialog open={!!managingTandem} onOpenChange={(open) => !open && setManagingTandem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Gérer les inscriptions pour "{currentManagingTandem?.offeredLanguage.name} / {currentManagingTandem?.soughtLanguage.name}"</DialogTitle>
                        <DialogDescription>
                           Validez les demandes en attente et gérez la liste des participants.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {!currentManagingTandem?.isAutomatic && currentPendingRequests.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2">Demandes en attente ({currentPendingRequests.length})</h3>
                                <Separator />
                                <ul className="pt-2 space-y-2">
                                    {currentPendingRequests.map(user => (
                                        <li key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatar} alt={user.username} data-ai-hint={user.dataAiHint} />
                                                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.username}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="icon" className="h-8 w-8 bg-green-600 hover:bg-green-700" onClick={() => handleAcceptRequest(currentManagingTandem!.id, user.id, user.username)}><Check className="h-4 w-4"/></Button>
                                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDeclineRequest(currentManagingTandem!.id, user.id, user.username)}><X className="h-4 w-4"/></Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {!currentManagingTandem?.isAutomatic && currentPendingRequests.length === 0 && (
                             <div>
                                <h3 className="font-semibold mb-2">Demandes en attente (0)</h3>
                                <Separator />
                                <p className="text-sm text-muted-foreground pt-2">Aucune demande en attente.</p>
                            </div>
                        )}

                        <div>
                             <h3 className="font-semibold mb-2">Participants inscrits ({currentManagingTandem?.participants.length || 0})</h3>
                             <Separator />
                             {currentManagingTandem && currentManagingTandem.participants.length > 0 ? (
                                <ul className="pt-2 space-y-2">
                                    {currentManagingTandem.participants.map(userId => {
                                        const user = getMemberById(userId);
                                        if (!user) return null;
                                        return (
                                            <li key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={user.avatar} alt={user.username} data-ai-hint={user.dataAiHint} />
                                                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{user.username}</span>
                                                </div>
                                                <Button variant="destructive" size="sm" onClick={() => handleExcludeParticipant(currentManagingTandem!.id, user.id, user.username)}>
                                                    <X className="mr-2 h-4 w-4" />Exclure
                                                </Button>
                                            </li>
                                        )
                                    })}
                                </ul>
                             ) : (
                                <p className="text-sm text-muted-foreground pt-2">Aucun participant inscrit pour le moment.</p>
                             )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
