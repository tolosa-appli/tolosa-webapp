
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, MapPin, Edit, Trash2, Cookie, Circle, Upload, ImageIcon, MessageSquare, Send, Copy } from 'lucide-react';
import { format, isPast, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";


// --- Simulation de l'utilisateur connecté ---
const currentUser = {
  id: 'user123',
  name: 'Sophie',
  sex: 'female',
  isStudent: true,
  role: 'user', 
};
// -----------------------------------------

type Sortie = {
  id: string;
  title: string;
  theme: string;
  date: string;
  location: string;
  description: string;
  participants: number;
  maxParticipants: number;
  image: string;
  dataAiHint?: string;
  photos?: string[];
};

// Dummy data for outings
const initialCreatedOutings: Sortie[] = [
    { id: 'c1', title: 'Atelier Photo Urbaine', theme: 'Photographie', date: '2024-08-28T10:00:00Z', location: 'Quartier Saint-Aubin', description: 'Explorons les rues de Toulouse pour capturer des clichés uniques.', participants: 10, maxParticipants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'city photography' },
];

const registeredOutings: Sortie[] = [
  { id: '1', title: 'Pique-nique au Jardin des Plantes', theme: 'Plein air', date: '2024-08-10T12:00:00Z', location: 'Jardin des Plantes, Toulouse', description: 'Rejoignez-nous pour un pique-nique convivial et des jeux en plein air.', participants: 12, maxParticipants: 20, image: 'https://placehold.co/600x400.png', dataAiHint: 'picnic park' },
  { id: '3', title: 'Soirée Tapas', theme: 'Gastronomie', date: '2024-08-22T19:00:00Z', location: 'Quartier Saint-Cyprien', description: 'Dégustation de tapas dans les meilleurs bars du quartier.', participants: 20, maxParticipants: 20, image: 'https://placehold.co/600x400.png', dataAiHint: 'tapas food' },
];

const favoriteOutings: Sortie[] = [
  { id: '2', title: 'Visite du Musée des Augustins', theme: 'Culture', date: '2024-08-17T14:30:00Z', location: 'Musée des Augustins, Toulouse', description: 'Découverte des collections de peintures et sculptures du musée.', participants: 8, maxParticipants: 10, image: 'https://placehold.co/600x400.png', dataAiHint: 'museum art' },
  { id: '4', title: 'Randonnée le long du Canal du Midi', theme: 'Sport', date: '2024-09-01T09:30:00Z', location: 'Canal du Midi', description: 'Une belle randonnée de 10km accessible à tous les niveaux.', participants: 15, maxParticipants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'canal nature' },
];

const registeredGirlsOutings: Sortie[] = [
    { id: 'g1', title: 'Brunch & Papotage', theme: 'Gastronomie', date: '2024-08-11T11:00:00Z', location: 'Café des Rêves, Toulouse', description: 'Un moment convivial entre filles autour d\'un délicieux brunch.', participants: 8, maxParticipants: 8, image: 'https://placehold.co/600x400.png', dataAiHint: 'brunch cafe' },
];

const registeredStudentOutings: Sortie[] = [
    { id: 's1', title: 'Soirée intégration BDE', theme: 'Fête', date: '2024-09-12T21:00:00Z', location: 'Salle Le Phare, Tournefeuille', description: 'La plus grosse soirée de l\'année pour bien commencer !', participants: 250, maxParticipants: 300, image: 'https://placehold.co/600x400.png', dataAiHint: 'student party' },
];

const pastOutingsData: Sortie[] = [
    { id: 'p1', title: 'Soirée Jeux de société', theme: 'Jeux', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(), location: 'Bar Le Central', description: 'Soirée jeux de société pour tous les niveaux.', participants: 15, maxParticipants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'board games', photos: ['https://placehold.co/400x400.png', 'https://placehold.co/400x400.png'] },
    { id: 'p2', title: 'Balade à vélo le long de la Garonne', theme: 'Sport', date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(), location: 'Bords de Garonne', description: 'Une balade tranquille pour profiter du soleil.', participants: 10, maxParticipants: 15, image: 'https://placehold.co/600x400.png', dataAiHint: 'bicycle river', photos: [] },
];


const RatingDialog = ({ outing, onClose, onRate }: { outing: Sortie; onClose: () => void; onRate: (outingId: string) => void; }) => {
    const { toast } = useToast();
    const [organizerRating, setOrganizerRating] = useState(0);
    const [outingRating, setOutingRating] = useState(0);

    const ratingLabels = ["pastròp", "un pauc", "mejan", "molt", "tròp"];
    
    const handleRatingSubmit = () => {
        if (organizerRating > 0) {
            if (organizerRating <= 2) toast({ title: "Le cachou que tu lui as mis !" });
            else if (organizerRating === 3) toast({ title: "on est mejan !" });
            else toast({ title: "tu lui as mis une belle mirgue" });
        }

        if (outingRating > 0) {
            setTimeout(() => {
                if (outingRating <= 2) toast({ title: "Mercès, mais pas de quoi faire un cassoulet !" });
                else if (outingRating === 3) toast({ title: "Mercès, tu lui a mis de quoi faire un cassoulet de gafet" });
                else toast({ title: "Mercès, il va pouvoir faire un bon cassoulet avec cela !", description: "c'est bòn pòt de far un caçolet !" });
            }, 500);
        }

        onRate(outing.id);
        onClose();
    };

    return (
        <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Noter la sortie: {outing.title}</AlertDialogTitle>
                </AlertDialogHeader>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="font-medium">Allez ! mets ta poche dans la malle et note-le :</p>
                        <div className="flex justify-around items-center p-2 border rounded-md">
                            {[1, 2, 3, 4, 5].map(value => (
                                <div key={value} className="text-center">
                                    <Button variant={organizerRating === value ? "default" : "ghost"} size="icon" onClick={() => setOrganizerRating(value)}>
                                        <Cookie className="h-6 w-6" />
                                    </Button>
                                    <p className="text-xs mt-1 text-muted-foreground">{value} - {ratingLabels[value-1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="font-medium">allez ! mets ta poche dans la malle et note-le :</p>
                        <div className="flex justify-around items-center p-2 border rounded-md">
                           {[1, 2, 3, 4, 5].map(value => (
                                <div key={value} className="text-center">
                                    <Button variant={outingRating === value ? "default" : "ghost"} size="icon" onClick={() => setOutingRating(value)}>
                                        <Circle className="h-5 w-5 fill-amber-200 stroke-amber-400" />
                                    </Button>
                                    <p className="text-xs mt-1 text-muted-foreground">{value} - {ratingLabels[value-1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Plus tard</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRatingSubmit} disabled={!organizerRating && !outingRating}>Valider mes notes</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const PhotoGalleryDialog = ({ outing, open, onOpenChange }: { outing: Sortie; open: boolean; onOpenChange: (open: boolean) => void; }) => {
    const { toast } = useToast();
    const [photos, setPhotos] = useState(outing.photos || []);
    const [photoError, setPhotoError] = useState('');

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (photos.length + files.length > 10) {
            toast({
                variant: "destructive",
                title: "Limite de photos atteinte",
                description: "Vous ne pouvez pas ajouter plus de 10 photos au total.",
            });
            return;
        }

        const newPhotos: string[] = [];
        const filePromises: Promise<void>[] = [];
        let errorsFound = false;

        Array.from(files).forEach(file => {
            const promise = new Promise<void>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.onload = () => {
                        if (img.height > 900) {
                            setPhotoError(`La hauteur de "${file.name}" dépasse 900px. Veuillez la réduire.`);
                            errorsFound = true;
                            reject(new Error('Image too tall'));
                        } else {
                            newPhotos.push(event.target?.result as string);
                            resolve();
                        }
                    };
                    img.onerror = () => reject(new Error('Failed to load image'));
                    img.src = event.target?.result as string;
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsDataURL(file);
            });
            filePromises.push(promise);
        });
        
        Promise.all(filePromises.map(p => p.catch(e => e)))
            .then(() => {
                if (newPhotos.length > 0) {
                    setPhotos(prev => [...prev, ...newPhotos]);
                    toast({ title: "Photos ajoutées !", description: `${newPhotos.length} photo(s) ont été ajoutées à la galerie.` });
                }
                if (!errorsFound) {
                    setPhotoError('');
                }
            });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Galerie photo : {outing.title}</DialogTitle>
                    <DialogDescription>
                        Ajoutez ou visionnez les photos de la sortie. Limite de 10 photos au total.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    {photos.map((photo, index) => (
                        <div key={index} className="relative aspect-square">
                             <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                        </div>
                    ))}
                    {photos.length < 10 && (
                        <div className="relative aspect-square flex items-center justify-center border-2 border-dashed rounded-md">
                            <label htmlFor="gallery-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-muted/50">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground mt-1 text-center">Ajouter ({photos.length}/10)</span>
                                <input id="gallery-upload" type="file" multiple className="sr-only" accept="image/*" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                    )}
                </div>
                {photoError && <Alert variant="destructive"><AlertDescription>{photoError}</AlertDescription></Alert>}
                <DialogFooter>
                    <Button type="button" onClick={() => onOpenChange(false)}>Fermer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const ChatDialog = ({ outing, open, onOpenChange }: { outing: Sortie; open: boolean; onOpenChange: (open: boolean) => void; }) => {
    const { toast } = useToast();
    
    // Mocked messages for demonstration
    const [messages, setMessages] = useState([
        { id: 1, user: { name: 'Lucas', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' }, text: 'Salut tout le monde ! J\'ai hâte d\'y être.', timestamp: 'il y a 2h' },
        { id: 2, user: { name: 'Chloé', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'female portrait' }, text: 'Moi aussi ! On se retrouve directement là-bas ?', timestamp: 'il y a 1h' },
        { id: 3, user: { name: 'Sophie', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, text: 'Oui, c\'est ça. Rendez-vous devant l\'entrée principale. 😊', timestamp: 'il y a 30min' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        // In a real app, this would be sent to a server. Here, we just update local state.
        setMessages(prev => [...prev, {
            id: Date.now(),
            user: { name: currentUser.name, avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' }, // Using current user
            text: newMessage,
            timestamp: 'à l\'instant'
        }]);
        setNewMessage('');
        toast({ title: 'Message envoyé !' });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg flex flex-col h-[70vh]">
                <DialogHeader>
                    <DialogTitle>Discussion : {outing.title}</DialogTitle>
                    <DialogDescription>
                        Échangez avec les autres participants inscrits à la sortie.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto pr-4 space-y-4">
                    {messages.map(message => (
                        <div key={message.id} className="flex items-start gap-3">
                            <Avatar>
                                <AvatarImage src={message.user.avatar} alt={message.user.name} data-ai-hint={message.user.dataAiHint}/>
                                <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-baseline gap-2">
                                    <p className="font-semibold">{message.user.name}</p>
                                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                                </div>
                                <div className="p-2 bg-muted rounded-lg mt-1">
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <form onSubmit={handleSendMessage} className="flex w-full items-start gap-2">
                        <Textarea
                            placeholder="Écrivez votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={1}
                            className="flex-1 resize-none"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Envoyer</span>
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const OutingList = ({ 
    outings, 
    emptyMessage, 
    listType,
    onDelete,
    onModify,
    onRateClick,
    onGalleryClick,
    onChatClick,
    ratedOutings
}: { 
    outings: Sortie[], 
    emptyMessage: string, 
    listType?: 'registered' | 'created' | 'past',
    onDelete?: (id: string, title: string) => void,
    onModify?: (id: string, title: string) => void,
    onRateClick?: (outing: Sortie) => void,
    onGalleryClick?: (outing: Sortie) => void,
    onChatClick?: (outing: Sortie) => void,
    ratedOutings?: Set<string>
}) => {
    const [isClient, setIsClient] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isRateable = (date: string) => {
        const outingDate = new Date(date);
        return isPast(outingDate) && differenceInDays(new Date(), outingDate) <= 5;
    }

    if (outings.length === 0) {
        return (
            <div className="col-span-full text-center text-muted-foreground py-10">
                <p>{emptyMessage}</p>
            </div>
        );
    }
    
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {outings.map((sortie) => (
              <Card key={sortie.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={sortie.image} alt={sortie.title} layout="fill" objectFit="cover" data-ai-hint={sortie.dataAiHint} />
                  <Badge variant="secondary" className="absolute top-2 right-2">{sortie.theme}</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{sortie.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm mb-4">{sortie.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{isClient ? format(new Date(sortie.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr }) : '...'}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{sortie.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                   <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{sortie.participants} / {sortie.maxParticipants} participants</span>
                  </div>
                   {listType === 'created' ? (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => onModify?.(sortie.id, sortie.title)}><Edit className="mr-2 h-4 w-4" />Modifier</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4" />Supprimer</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Es-tu sûr de bien vouloir mettre le message à la corbeille ?</AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => toast({ title: "Ouf, sauvé, merci, avec plaisir !" })}>Non</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => onDelete?.(sortie.id, sortie.title)}>Oui</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    ) : listType === 'past' ? (
                        <div className="flex items-center gap-2">
                            <Button asChild variant="default" size="sm">
                                <Link href={`/sorties/create?duplicate=${sortie.id}`}>
                                    <Copy className="mr-2 h-4 w-4"/>
                                    Dupliquer
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onRateClick?.(sortie)}
                                disabled={ratedOutings?.has(sortie.id) || !isRateable(sortie.date)}
                            >
                                {ratedOutings?.has(sortie.id) ? "Noté" : "Noter"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onGalleryClick?.(sortie)}
                            >
                                <ImageIcon className="mr-2 h-4 w-4"/>
                                Galerie
                            </Button>
                        </div>
                    ) : listType === 'registered' ? (
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" size="sm">Détails</Button>
                             <Button variant="outline" size="sm" onClick={() => onChatClick?.(sortie)}>
                                <MessageSquare className="mr-2 h-4 w-4"/>
                                Discuter
                            </Button>
                        </div>
                    ) : (
                        <Button variant="secondary" size="sm">Détails</Button>
                    )}
                </CardFooter>
              </Card>
            ))}
          </div>
    );
};


export default function MyOutingsPage() {
  const [isClient, setIsClient] = useState(false);
  const [myCreatedOutings, setMyCreatedOutings] = useState(initialCreatedOutings);
  const [ratingOuting, setRatingOuting] = useState<Sortie | null>(null);
  const [galleryOuting, setGalleryOuting] = useState<Sortie | null>(null);
  const [chatOuting, setChatOuting] = useState<Sortie | null>(null);
  const [ratedOutings, setRatedOutings] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDelete = (id: string, title: string) => {
    setMyCreatedOutings(prev => prev.filter(sortie => sortie.id !== id));
    toast({
        title: "mis à la bedoucette.",
        description: `La sortie "${title}" a été annulée. Les membres inscrits ont été prévenus.`,
    });
  }

  const handleModify = (id: string, title: string) => {
    toast({
        title: "Sortie modifiée",
        description: `Les membres inscrits à la sortie "${title}" ont été notifiés des changements.`,
    });
  }
  
  const handleRateClick = (outing: Sortie) => {
      setRatingOuting(outing);
  }

  const handleCloseDialog = () => {
      setRatingOuting(null);
  }

  const handleOutingRated = (outingId: string) => {
      setRatedOutings(prev => new Set(prev).add(outingId));
  }
  
  const handleGalleryClick = (outing: Sortie) => {
      setGalleryOuting(outing);
  };

  const handleCloseGallery = () => {
      setGalleryOuting(null);
  };

  const handleChatClick = (outing: Sortie) => {
    setChatOuting(outing);
  };

  const handleCloseChat = () => {
    setChatOuting(null);
  };


  if (!isClient) {
    return null; // ou un spinner de chargement
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="flex flex-col items-start mb-6 gap-2">
          <h1 className="text-3xl font-bold font-headline">Mes Sorties</h1>
          <p className="text-muted-foreground">Retrouvez ici toutes vos sorties à venir et vos favoris.</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="created" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="created">Mes Créations</TabsTrigger>
                <TabsTrigger value="registered">Inscrit(e)</TabsTrigger>
                <TabsTrigger value="favorites">Favoris</TabsTrigger>
                <TabsTrigger value="past">Sorties Passées</TabsTrigger>
                {currentUser.sex === 'female' && <TabsTrigger value="girls">Entre Filles</TabsTrigger>}
                {currentUser.isStudent && <TabsTrigger value="students">Étudiant(e)</TabsTrigger>}
            </TabsList>
            <TabsContent value="created" className="pt-6">
                <h2 className="text-2xl font-bold font-headline mb-4">Sorties que j'organise</h2>
                <OutingList 
                    listType="created" 
                    outings={myCreatedOutings} 
                    emptyMessage="Vous n'avez créé aucune sortie pour le moment." 
                    onDelete={handleDelete}
                    onModify={handleModify}
                />
            </TabsContent>
            <TabsContent value="registered" className="pt-6">
                <h2 className="text-2xl font-bold font-headline mb-4">Sorties où je suis inscrit(e)</h2>
                <OutingList listType="registered" outings={registeredOutings} emptyMessage="Vous n'êtes inscrit(e) à aucune sortie pour le moment." onChatClick={handleChatClick}/>
            </TabsContent>
            <TabsContent value="favorites" className="pt-6">
                <h2 className="text-2xl font-bold font-headline mb-4">Sorties mises en favoris</h2>
                 <OutingList outings={favoriteOutings} emptyMessage="Vous n'avez aucune sortie en favoris pour le moment." />
            </TabsContent>
             <TabsContent value="past" className="pt-6">
                <h2 className="text-2xl font-bold font-headline mb-4">Sorties auxquelles j'ai participé</h2>
                <OutingList 
                    listType="past" 
                    outings={pastOutingsData} 
                    emptyMessage="Vous n'avez pas de sorties passées récentes à noter."
                    onRateClick={handleRateClick}
                    onGalleryClick={handleGalleryClick}
                    ratedOutings={ratedOutings}
                />
            </TabsContent>
            {currentUser.sex === 'female' && (
                <TabsContent value="girls" className="pt-6">
                    <h2 className="text-2xl font-bold font-headline mb-4">Sorties entre filles où je suis inscrit(e)</h2>
                    <OutingList listType="registered" outings={registeredGirlsOutings} emptyMessage="Vous n'êtes inscrite à aucune sortie entre filles." onChatClick={handleChatClick}/>
                </TabsContent>
            )}
            {currentUser.isStudent && (
                 <TabsContent value="students" className="pt-6">
                    <h2 className="text-2xl font-bold font-headline mb-4">Sorties étudiantes où je suis inscrit(e)</h2>
                    <OutingList listType="registered" outings={registeredStudentOutings} emptyMessage="Vous n'êtes inscrit(e) à aucune sortie étudiante." onChatClick={handleChatClick}/>
                </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>

      {ratingOuting && (
        <RatingDialog
            outing={ratingOuting}
            onClose={handleCloseDialog}
            onRate={handleOutingRated}
        />
      )}

      {galleryOuting && (
        <PhotoGalleryDialog 
            outing={galleryOuting} 
            open={!!galleryOuting}
            onOpenChange={(open) => !open && handleCloseGallery()}
        />
      )}

      {chatOuting && (
        <ChatDialog 
            outing={chatOuting} 
            open={!!chatOuting}
            onOpenChange={(open) => !open && handleCloseChat()}
        />
      )}
    </div>
  );
}
