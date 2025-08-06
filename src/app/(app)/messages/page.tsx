
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Send, User, MessageCircle, Edit, Check } from 'lucide-react';
import { initialMembersData, type Member, type MemberRole } from '@/app/(app)/members/data';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

// --- Simulation de l'utilisateur connecté ---
const currentUser = {
  id: '3', // Chloé (user)
  name: 'Chloé',
  role: 'user' as MemberRole,
};
// Pour tester en tant qu'admin:
// const currentUser = { id: '1', name: 'Sophie', role: 'admin' as MemberRole };
// -----------------------------------------

// Mocked conversations data
const conversationsData: { [key: string]: { id: number; senderId: string; text: string; timestamp: string }[] } = {
  '2': [ // Conversation with Lucas
    { id: 1, senderId: '2', text: "Salut Chloé, tu viens à la soirée Tapas ?", timestamp: "Hier à 18:05" },
    { id: 2, senderId: '3', text: "Hey Lucas ! Oui bien sûr, j'y serai. Tu penses qu'il y aura du monde ?", timestamp: "Hier à 18:10" },
    { id: 3, senderId: '2', text: "Oui, la sortie est complète ! Ça va être sympa.", timestamp: "Hier à 18:12" },
  ],
   '1': [ // Conversation with Sophie (Admin)
    { id: 1, senderId: '1', text: "Bonjour Chloé, bienvenue sur l'application ! N'hésitez pas si vous avez des questions.", timestamp: "Il y a 2 jours" },
    { id: 2, senderId: '3', text: "Bonjour Sophie, merci beaucoup pour l'accueil !", timestamp: "Il y a 2 jours" },
  ]
};

const messageSchema = z.object({
  title: z.string().min(3, { message: 'Le titre doit contenir au moins 3 caractères.' }),
  description: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
  recipients: z.array(z.string()).min(1, { message: 'Veuillez sélectionner au moins un destinataire.' }),
});

type MessageFormData = z.infer<typeof messageSchema>;

const MultiSelect = ({
    options,
    selected,
    onChange,
    placeholder = "Sélectionnez des destinataires..."
}: {
    options: { value: string; label: string; }[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    const selectedLabels = options
        .filter(option => selected.includes(option.value))
        .map(option => option.label);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-auto">
                    <div className="flex flex-wrap gap-1">
                        {selectedLabels.length > 0 ? (
                            selectedLabels.map(label => <Badge key={label} variant="secondary">{label}</Badge>)
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Rechercher un membre..." />
                    <CommandList>
                        <CommandEmpty>Aucun membre trouvé.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        handleSelect(option.value);
                                        setOpen(true); // Keep popover open after selection
                                    }}
                                >
                                    <Check className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")} />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


export default function MessagesPage() {
    const { toast } = useToast();
    const [selectedContact, setSelectedContact] = useState<Member | null>(null);
    const [messages, setMessages] = useState<{ id: number; senderId: string; text: string; timestamp: string }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    
    // Admins/Mods can message anyone, regular users only connected friends + staff
    const messageableContacts = initialMembersData.filter(member => {
        if (member.id === currentUser.id) return false;
        if (currentUser.role !== 'user') return true; // Admins/mods see everyone
        return member.status === 'connected' || member.role === 'admin' || member.role === 'moderator';
    });
    
    const messageableOptions = messageableContacts.map(c => ({ value: c.id, label: c.username }));

    const form = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
        defaultValues: { recipients: [] },
    });

    const handleSelectContact = (contact: Member) => {
        setSelectedContact(contact);
        setMessages(conversationsData[contact.id] || []);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedContact) return;

        const messageToSend = {
            id: Date.now(),
            senderId: currentUser.id,
            text: newMessage,
            timestamp: "À l'instant",
        };

        setMessages(prev => [...prev, messageToSend]);
        setNewMessage('');

        toast({
            title: "Message envoyé !",
            description: `Votre message a été envoyé à ${selectedContact.username}.`,
        });
        
        if (!conversationsData[selectedContact.id]) {
            conversationsData[selectedContact.id] = [];
        }
        conversationsData[selectedContact.id].push(messageToSend);
    };
    
    const onComposeSubmit = (data: MessageFormData) => {
        console.log('Group message submitted:', data);
        toast({
            title: `Message envoyé à ${data.recipients.length} destinataire(s)`,
            description: `Titre : ${data.title}`,
        });
        form.reset();
        setIsComposeOpen(false);
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold font-headline">Messagerie</h1>
                <p className="text-muted-foreground">Consultez et envoyez vos messages privés.</p>
            </div>
            
            <Card className="h-[75vh] flex">
                <div className="w-1/3 border-r">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="flex items-center gap-2">
                               <User className="w-5 h-5"/> Contacts
                            </CardTitle>
                             <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4"/>Écrire</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Écrire un nouveau message</DialogTitle>
                                        <DialogDescription>
                                            Rédigez votre message et sélectionnez les destinataires.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={form.handleSubmit(onComposeSubmit)} className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Titre</Label>
                                            <Input id="title" {...form.register('title')} />
                                            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
                                        </div>
                                         <div className="grid gap-2">
                                            <Label htmlFor="description">Message</Label>
                                            <Textarea id="description" {...form.register('description')} rows={5} />
                                            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Destinataires</Label>
                                            <Controller
                                                name="recipients"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <MultiSelect
                                                        options={messageableOptions}
                                                        selected={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            {form.formState.errors.recipients && <p className="text-sm text-destructive">{form.formState.errors.recipients.message}</p>}
                                        </div>
                                        <DialogFooter>
                                            <Button type="button" variant="secondary" onClick={() => setIsComposeOpen(false)}>Annuler</Button>
                                            <Button type="submit">Envoyer le message</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <ScrollArea className="h-[calc(75vh-110px)]">
                        <CardContent className="p-2">
                            {messageableContacts.map(contact => {
                                const conversation = conversationsData[contact.id] || [];
                                const lastMessage = conversation.length > 0 ? conversation[conversation.length - 1] : null;
                                
                                let preview;
                                if (lastMessage) {
                                    const prefix = lastMessage.senderId === currentUser.id ? "Vous: " : "";
                                    preview = `${prefix}${lastMessage.text}`;
                                } else {
                                    preview = contact.role === 'admin' 
                                        ? 'Administrateur' 
                                        : contact.role === 'moderator' 
                                        ? 'Modérateur' 
                                        : "Commencez la conversation";
                                }

                                return (
                                    <button
                                        key={contact.id}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors",
                                            selectedContact?.id === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                                        )}
                                        onClick={() => handleSelectContact(contact)}
                                    >
                                        <Avatar>
                                            <AvatarImage src={contact.avatar} alt={contact.username} data-ai-hint={contact.dataAiHint} />
                                            <AvatarFallback>{contact.username.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 truncate">
                                            <p className="font-semibold">{contact.username}</p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {preview}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </ScrollArea>
                </div>
                <div className="w-2/3 flex flex-col">
                    {selectedContact ? (
                        <>
                            <CardHeader className="flex flex-row items-center gap-3 border-b">
                                 <Avatar>
                                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.username} data-ai-hint={selectedContact.dataAiHint} />
                                    <AvatarFallback>{selectedContact.username.charAt(0)}</AvatarFallback>
                                 </Avatar>
                                <div>
                                    <CardTitle>{selectedContact.username}</CardTitle>
                                    <CardDescription>
                                        {selectedContact.role === 'admin' ? 'Administrateur' : selectedContact.role === 'moderator' ? 'Modérateur' : 'En ligne'}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div
                                            key={msg.id}
                                            className={cn(
                                                "flex items-end gap-2 max-w-[80%]",
                                                msg.senderId === currentUser.id ? "ml-auto flex-row-reverse" : "mr-auto"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-3 rounded-lg",
                                                msg.senderId === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted"
                                            )}>
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                            <CardContent className="p-4 border-t">
                                <form onSubmit={handleSendMessage} className="flex items-start gap-2">
                                    <Textarea
                                        placeholder={`Écrire un message à ${selectedContact.username}...`}
                                        className="flex-1 resize-none"
                                        rows={1}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                    />
                                    <Button type="submit" size="icon">
                                        <Send className="h-4 w-4"/>
                                        <span className="sr-only">Envoyer</span>
                                    </Button>
                                </form>
                            </CardContent>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                            <MessageCircle className="h-16 w-16 mb-4" />
                            <h3 className="text-lg font-semibold">Votre messagerie</h3>
                            <p className="max-w-xs">Sélectionnez une conversation dans le panneau de gauche pour commencer à discuter, ou écrivez un nouveau message de groupe.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
