
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, UserX, UserPlus, UserCheck, UserMinus, Ban, MessageSquare, Flag, Search, Handshake } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { initialMembersData, type Member, type MemberRole } from './data';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// --- Simulation de l'utilisateur connecté ---
const currentUser = {
  id: '1', // L'ID de Sophie, qui est admin
  role: 'admin' as MemberRole,
};
// -----------------------------------------


export default function MembersPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState(initialMembersData);
  const [sortOption, setSortOption] = useState('alphabetical');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConnectionAction = (memberId: string, action: 'connect' | 'unfriend' | 'block') => {
    setMembers(prevMembers => prevMembers.map(member => {
      if (member.id === memberId) {
        if (action === 'connect') {
            toast({
                title: "Demande envoyée !",
                description: "Tu as la tchatche, tu veux te faire des amis, alors propose d'être mis en relation.",
            });
            // Simulate accepting the request after 2 seconds for demo purposes
            setTimeout(() => {
                 setMembers(currentMembers => currentMembers.map(m => {
                    if (m.id === memberId) {
                        toast({
                            title: "Connexion établie !",
                            description: "C'est bon, vous êtes maintenant collègue, vous pourrez aller à la baloche la prochaine fois ! Ici la tataragne tisse sa toile.",
                        });
                        return { ...m, status: 'connected' };
                    }
                    return m;
                 }))
            }, 2000);
            return { ...member, status: 'request_sent' };
        }
        if (action === 'unfriend') return { ...member, status: 'not_connected' };
        if (action === 'block') return { ...member, status: 'blocked' };
      }
      return member;
    }));
  };
  
  const handleSendMessage = () => {
    toast({
        title: "messatge mandat",
    });
  }
  
  const handleReportUser = (username: string) => {
    toast({
        title: "Utilisateur signalé",
        description: `Merci d'avoir signalé ${username}. Nous allons examiner son profil.`,
    });
  };

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = [...members];

    if (searchTerm.trim()) {
        const lowercasedTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(member => 
            member.username.toLowerCase().includes(lowercasedTerm) ||
            member.city.toLowerCase().includes(lowercasedTerm) ||
            member.languages.toLowerCase().includes(lowercasedTerm)
        );
    }
    
    switch (sortOption) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
      case 'lastSeen':
        return filtered.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
      case 'alphabetical':
      default:
        return filtered.sort((a, b) => a.username.localeCompare(b.username));
    }
  }, [sortOption, members, searchTerm]);

  const getRoleVariant = (role: Member['role']) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'moderator': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleName = (role: Member['role']) => {
      switch (role) {
          case 'admin': return 'Administrateur';
          case 'moderator': return 'Modérateur';
          default: return 'Utilisateur';
      }
  }

  const getAvatarSrc = (member: Member) => {
    if (member.avatar) return member.avatar;
    if (member.sex === 'male') return 'http://bilingue31.free.fr/avatar_H_OK_40x40.jpg';
    if (member.sex === 'female') return 'http://bilingue31.free.fr/avatar_F_OK_40x40.jpg';
    return 'https://placehold.co/40x40.png'; // Fallback
  };

  const renderActionCell = (member: Member) => {
    if (member.id === currentUser.id) return null; // Can't interact with self

    // Any user can contact an admin or moderator
    if (member.role === 'admin' || member.role === 'moderator') {
        return (
            <Button size="sm" onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
        );
    }
    
    // Admins/mods can contact any user
    if (currentUser.role !== 'user') {
        return (
            <Button size="sm" onClick={handleSendMessage}>
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
        );
    }

    // From here, currentUser is a 'user' and member is a 'user'.
    // Use the existing logic for user-to-user interaction based on connection status.
    switch(member.status) {
        case 'not_connected':
            return <Button size="sm" onClick={() => handleConnectionAction(member.id, 'connect')}><UserPlus className="mr-2 h-4 w-4" />Connecter</Button>;
        case 'request_sent':
            return <Button size="sm" disabled variant="outline">Demande envoyée</Button>;
        case 'connected':
             return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm"><UserCheck className="mr-2 h-4 w-4" />Amis</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleSendMessage}><MessageSquare className="mr-2 h-4 w-4" />Envoyer un message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleConnectionAction(member.id, 'unfriend')}><UserMinus className="mr-2 h-4 w-4" />Retirer de la liste d'amis</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleConnectionAction(member.id, 'block')}><Ban className="mr-2 h-4 w-4" />Bloquer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        case 'blocked':
            return <Badge variant="destructive">Bloqué</Badge>;
        default:
            return null;
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Liste des Membres</CardTitle>
          <CardDescription>
            Découvrez les membres de la communauté Tolosa Amical.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Chercher par nom, ville, langue parlée..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select onValueChange={setSortOption} defaultValue={sortOption}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Ordre alphabétique</SelectItem>
                <SelectItem value="newest">Date d'inscription</SelectItem>
                <SelectItem value="lastSeen">Dernière connexion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Avatar</TableHead>
                  <TableHead>Identifiant</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Langues parlées</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Inscrit(e) depuis</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedMembers.length > 0 ? (
                  filteredAndSortedMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={getAvatarSrc(member)} alt={member.username} data-ai-hint={member.dataAiHint} />
                          <AvatarFallback>{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <span>{member.username}</span>
                             {member.wantsToWelcome && (
                                 <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Handshake className="h-4 w-4 text-primary" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Accueillant(e)</p>
                                        </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                             )}
                        </div>
                      </TableCell>
                      <TableCell>{member.city}</TableCell>
                      <TableCell className="text-muted-foreground">{member.languages}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleVariant(member.role)} className="capitalize">{getRoleName(member.role)}</Badge>
                      </TableCell>
                      <TableCell>{isClient ? formatDistanceToNow(new Date(member.joined), { addSuffix: true, locale: fr }) : '...'}</TableCell>
                      <TableCell>{isClient ? formatDistanceToNow(new Date(member.lastSeen), { addSuffix: true, locale: fr }) : '...'}</TableCell>
                      <TableCell className="text-center">
                          <div className="flex justify-center items-center gap-1">
                             {renderActionCell(member)}
                             {member.id !== currentUser.id && (
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleReportUser(member.username)}>
                                              <Flag className="mr-2 h-4 w-4" />
                                              <span>Signaler le membre</span>
                                          </DropdownMenuItem>
                                          {currentUser.role === 'admin' && member.role !== 'admin' && (
                                              <>
                                                  <DropdownMenuSeparator />
                                                  <DropdownMenuLabel>Actions Admin</DropdownMenuLabel>
                                                  {member.role === 'user' && <DropdownMenuItem>Nommer Modérateur</DropdownMenuItem>}
                                                  {member.role === 'moderator' && <DropdownMenuItem>Retirer Modérateur</DropdownMenuItem>}
                                                  <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                      <UserX className="mr-2 h-4 w-4" />
                                                      Suspendre le membre
                                                  </DropdownMenuItem>
                                              </>
                                          )}
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                             )}
                          </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun membre trouvé.
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
