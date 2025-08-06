
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  MessageSquare,
  CalendarDays,
  Car,
  Home,
  Briefcase,
  Megaphone,
  GraduationCap,
  Heart,
  UserCheck,
  ClipboardList,
  Languages,
  ExternalLink,
  ThumbsUp,
  Handshake
} from 'lucide-react';
import { Logo } from '@/components/logo';
import GoogleTranslate from '@/components/google-translate';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const features = [
  {
    icon: Users,
    title: 'Membres',
    description: 'Trouvez et connectez-vous avec de nouveaux amis.',
    href: '/login',
  },
  {
    icon: MessageSquare,
    title: 'Forum de discussion',
    description: 'Participez à des discussions sur divers sujets.',
    href: '/login',
  },
  {
    icon: CalendarDays,
    title: 'Sorties à Toulouse',
    description: 'Créez et rejoignez des sorties et activités.',
    href: '/login',
  },
  {
    icon: Car,
    title: 'Covoiturage',
    description: 'Proposez ou cherchez des trajets.',
    href: '/login',
  },
  {
    icon: Home,
    title: 'Logement',
    description: 'Trouvez votre prochain logement ou colocataire.',
    href: '/login',
  },
  {
    icon: Briefcase,
    title: 'Emploi',
    description: 'Découvrez des offres d\'emploi locales.',
    href: '/login',
  },
  {
    icon: Megaphone,
    title: 'Petites Annonces',
    description: 'Achetez, vendez ou échangez des biens et services.',
    href: '/login',
  },
  {
    icon: GraduationCap,
    title: 'Stage & Alternance',
    description: 'Opportunités pour les étudiants et jeunes diplômés.',
    href: '/login',
  },
  {
    icon: Heart,
    title: 'Sorties entre filles',
    description: 'Un espace dédié pour les sorties entre filles.',
    href: '/login',
  },
  {
    icon: UserCheck,
    title: 'Sorties étudiantes',
    description: 'Rencontrez d\'autres étudiants et participez à des évènements.',
    href: '/login',
  },
  {
    icon: ClipboardList,
    title: 'Questionnaires & Expériences',
    description: 'Participez à des questionnaires pour des mémoires ou des thèses ou à des expériences',
    href: '/login',
  },
  {
    icon: Languages,
    title: 'Café des langues',
    description: 'Pratiquez des langues avec d\'autres membres.',
    href: '/login',
  },
  {
    icon: ExternalLink,
    title: 'Évènements Meetup',
    description: 'Découvrez les événements du groupe partenaire.',
    href: '/login',
  },
  {
    icon: ThumbsUp,
    title: 'Groupes Facebook',
    description: 'Découvrez les groupes Facebook partenaires.',
    href: '/login',
  },
];

const topCarouselImages = [
  'http://bilingue31.free.fr/Accueil_afterwork_224.jpg',
  'http://bilingue31.free.fr/Accueil_rando_224.jpg',
  'http://bilingue31.free.fr/Accueil_danse_224.jpg',
];

const middleCarouselImages = [
  'http://bilingue31.free.fr/Accueil_concert_224.jpg',
  'http://bilingue31.free.fr/Accueil_jeux1_224.jpg',
  'http://bilingue31.free.fr/Accueil_lecture3_224.jpg',
];

const bottomCarouselImages = [
    'http://bilingue31.free.fr/Accueil_musee2_224.jpg',
    'http://bilingue31.free.fr/Accueil_piquenique2_224.jpg',
    'http://bilingue31.free.fr/Accueil_restaurant_224.jpg',
];

const finalCarouselImages = [
    'http://bilingue31.free.fr/Accueil_theatre_224.jpg',
    'http://bilingue31.free.fr/Accueil_visite_224.jpg',
    'http://bilingue31.free.fr/Accueil_yoga_224.jpg',
];


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
       <GoogleTranslate />
      <header className="bg-header-bg shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-24">
            <div className="flex-1 flex justify-start">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button asChild variant="destructive">
                  <Link href="/login">Connexion</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Inscription</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Logo />
            </div>
            <div className="flex-1" />
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-12 md:py-20 text-center bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold font-headline text-foreground">
              Cossí va ?
            </h1>
            <p className="mt-2 text-lg md:text-xl text-muted-foreground">
              L'application des toulousains pour faire des sorties. Accueil des nouveaux à Toulouse.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-gray-400">
              Accueil des nouveaux à Toulouse. Sorties, emploi, logement, covoiturage, petites annonces, tandem de langues, sorties entre filles, sorties étudiantes, évènements, idées de sorties, voyage, international.
              <br />
              <span className="text-foreground">Rejoignez la communauté des toulousaines et toulousains ! C'est gratuit et sans limite !</span>
            </p>
             <div className="mt-8 max-w-3xl mx-auto p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h3 className="font-semibold text-primary flex items-center justify-center gap-2">
                    <Handshake className="h-5 w-5"/>
                    Découvrez nos Accueillant(e)s
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                    Ils sont là pour te faire découvrir la ville, les visites, les évènements, la culture locale, les lieux pour sortir, ou pour faire du shopping ! Ils ont un badge sur leur profil, contacte-les !
                </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-card">
            <div className="container mx-auto px-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {topCarouselImages.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-0">
                                             <Image src={src} alt={`Image de sortie ${index + 1}`} width={600} height={600} className="rounded-lg object-cover w-full h-full" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

        <section id="features" className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center font-headline text-foreground">
              Découvrez nos rubriques
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {features.map((feature) => (
                <Link href={feature.href} key={feature.title}>
                  <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer bg-card/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-card">
            <div className="container mx-auto px-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {middleCarouselImages.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-0">
                                             <Image src={src} alt={`Image de sortie ${index + 1}`} width={600} height={600} className="rounded-lg object-cover w-full h-full" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
        
        <section id="ads" className="py-12 bg-card/30">
          <div className="container mx-auto px-4">
            <h3 className="text-xl md:text-2xl font-bold text-center font-headline text-foreground mb-6">
              Nos partenaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="http://www.bilingue.fr.nf/" target="_blank" rel="noopener noreferrer" className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg text-primary">Bilingue 31</h4>
                <p className="text-muted-foreground mt-2">Le site pour pratiquer les langues à Toulouse.</p>
              </a>
              <a href="http://happypeople.fr.nf/" target="_blank" rel="noopener noreferrer" className="block p-6 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg text-primary">Happy People 31</h4>
                <p className="text-muted-foreground mt-2">Le réseau social pour se faire des amis et sortir à Toulouse.</p>
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {bottomCarouselImages.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-0">
                                             <Image src={src} alt={`Image de sortie ${index + 1}`} width={600} height={600} className="rounded-lg object-cover w-full h-full" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

        <section className="py-12 md:py-20 text-center bg-gradient-to-b from-card to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
              Toulousaine Girls Party
            </h2>
            <p className="mt-2 text-lg md:text-xl text-muted-foreground">
              Sorties entre toulousaines
            </p>
          </div>
        </section>
        
        <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {finalCarouselImages.map((src, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-0">
                                             <Image src={src} alt={`Image de sortie ${index + 1}`} width={600} height={600} className="rounded-lg object-cover w-full h-full" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
      </main>

      <footer className="bg-footer-bg text-primary-foreground py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Tolosa. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <Link href="/about" className="hover:underline">À propos</Link>
            <Link href="/legal" className="hover:underline">Mentions légales</Link>
            <Link href="/charter" className="hover:underline">Charte d'utilisation</Link>
            <Link href="/contact" className="hover:underline">Nous contacter</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
