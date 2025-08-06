
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, PlusCircle, Sparkles } from 'lucide-react';
import { forumCategories } from '../data';
import { notFound } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateDiscussionStarter, type GenerateDiscussionStarterInput } from '@/ai/flows/generate-discussion-starter';

const newDiscussionSchema = z.object({
  title: z.string().min(5, { message: 'Le titre doit contenir au moins 5 caractères.' }),
  description: z.string().min(10, { message: 'La description doit contenir au moins 10 caractères.' }),
});
type NewDiscussionFormData = z.infer<typeof newDiscussionSchema>;

// Dummy data for discussions
const initialDiscussions = [
  { id: '1', title: `Bienvenue dans cette section`, author: 'Admin', replies: 5, lastReply: 'il y a 2 heures', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'robot portrait' },
  { id: '2', title: 'Quel est votre avis sur... ?', author: 'Sophie', replies: 12, lastReply: 'il y a 30 minutes', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'woman portrait' },
  { id: '3', title: 'Partage de ressources', author: 'Lucas', replies: 8, lastReply: 'il y a 5 heures', avatar: 'https://placehold.co/40x40.png', dataAiHint: 'man portrait' },
];

export default function ThemePage({ params: { theme: themeSlug } }: { params: { theme: string } }) {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [isGenerating, setIsGenerating] = useState(false);

  const theme = forumCategories
    .flatMap(c => c.themes)
    .find(t => t.slug === themeSlug);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<NewDiscussionFormData>({
    resolver: zodResolver(newDiscussionSchema),
  });

  if (!theme) {
    notFound();
  }
  
  const handleGenerateStarter = async () => {
    if (!theme) return; // Guard clause to prevent error
    setIsGenerating(true);
    try {
        const input: GenerateDiscussionStarterInput = { topic: theme.name };
        const result = await generateDiscussionStarter(input);
        if (result.starter) {
            setValue('description', result.starter);
        }
    } catch (error) {
        console.error("Error generating discussion starter:", error);
        toast({
            variant: "destructive",
            title: "Erreur de l'IA",
            description: "Impossible de générer une amorce de discussion pour le moment.",
        });
    } finally {
        setIsGenerating(false);
    }
  };


  const onSubmit = (data: NewDiscussionFormData) => {
    console.log("New discussion created:", data);
    
    // Add the new discussion to the list (for demonstration)
    const newDiscussion = {
      id: (discussions.length + 1).toString(),
      title: data.title,
      author: 'Vous', // Assuming current user
      replies: 0,
      lastReply: "à l'instant",
      avatar: 'https://placehold.co/40x40.png',
      dataAiHint: 'user portrait',
    };
    setDiscussions(prev => [newDiscussion, ...prev]);
    
    toast({
      title: "Discussion créée !",
      description: "Votre sujet a été publié avec succès.",
    });
    
    reset();
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-4 -ml-4">
            <Link href="/forum">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au forum
            </Link>
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold font-headline">{theme.name}</h1>
                <p className="text-muted-foreground">Discussions sur le thème de {theme.name.toLowerCase()}.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Créer une discussion
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nouvelle discussion sur "{theme.name}"</DialogTitle>
                        <DialogDescription>
                            Lancez un nouveau sujet pour que la communauté puisse y participer.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input id="title" {...register('title')} />
                            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Votre message</Label>
                            <Textarea id="description" {...register('description')} rows={5} />
                             {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={handleGenerateStarter} disabled={isGenerating}>
                            <Sparkles className="mr-2 h-4 w-4" />
                            {isGenerating ? 'Génération en cours...' : 'IA : Suggérer une amorce'}
                        </Button>
                        <DialogFooter>
                            <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                            <Button type="submit">Publier</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Discussions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {discussions.map(discussion => (
              <li key={discussion.id}>
                <Link href="#" className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={discussion.avatar} alt={discussion.author} data-ai-hint={discussion.dataAiHint} />
                        <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-base ">{discussion.title}</p>
                        <p className="text-sm text-muted-foreground">par {discussion.author}</p>
                    </div>
                    </div>
                    <div className="hidden md:flex flex-col text-right text-sm">
                    <span className="font-medium">{discussion.replies} réponses</span>
                    <span className="text-muted-foreground">{discussion.lastReply}</span>
                    </div>
                </Link>
              </li>
            ))}
             {discussions.length === 0 && (
                <li className="p-4 text-center text-muted-foreground">
                    Aucune discussion dans ce thème pour le moment. Soyez le premier à en lancer une !
                </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
