
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
  Handshake,
  ArrowRight,
  Sparkles,
  MapPin,
  Star
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
    gradient: 'from-blue-500 to-purple-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: MessageSquare,
    title: 'Forum de discussion',
    description: 'Participez à des discussions sur divers sujets.',
    href: '/login',
    gradient: 'from-green-500 to-teal-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: CalendarDays,
    title: 'Sorties à Toulouse',
    description: 'Créez et rejoignez des sorties et activités.',
    href: '/login',
    gradient: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Car,
    title: 'Covoiturage',
    description: 'Proposez ou cherchez des trajets.',
    href: '/login',
    gradient: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Home,
    title: 'Logement',
    description: 'Trouvez votre prochain logement ou colocataire.',
    href: '/login',
    gradient: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: Briefcase,
    title: 'Emploi',
    description: 'Découvrez des offres d\'emploi locales.',
    href: '/login',
    gradient: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
  },
  {
    icon: Megaphone,
    title: 'Petites Annonces',
    description: 'Achetez, vendez ou échangez des biens et services.',
    href: '/login',
    gradient: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
  },
  {
    icon: GraduationCap,
    title: 'Stage & Alternance',
    description: 'Opportunités pour les étudiants et jeunes diplômés.',
    href: '/login',
    gradient: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
  },
  {
    icon: Heart,
    title: 'Sorties entre filles',
    description: 'Un espace dédié pour les sorties entre filles.',
    href: '/login',
    gradient: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
  },
  {
    icon: UserCheck,
    title: 'Sorties étudiantes',
    description: 'Rencontrez d\'autres étudiants et participez à des évènements.',
    href: '/login',
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: ClipboardList,
    title: 'Questionnaires & Expériences',
    description: 'Participez à des questionnaires pour des mémoires ou des thèses ou à des expériences',
    href: '/login',
    gradient: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
  },
  {
    icon: Languages,
    title: 'Café des langues',
    description: 'Pratiquez des langues avec d\'autres membres.',
    href: '/login',
    gradient: 'from-lime-500 to-green-600',
    bgColor: 'bg-lime-50',
  },
  {
    icon: ExternalLink,
    title: 'Évènements Meetup',
    description: 'Découvrez les événements du groupe partenaire.',
    href: '/login',
    gradient: 'from-sky-500 to-blue-600',
    bgColor: 'bg-sky-50',
  },
  {
    icon: ThumbsUp,
    title: 'Groupes Facebook',
    description: 'Découvrez les groupes Facebook partenaires.',
    href: '/login',
    gradient: 'from-blue-600 to-indigo-700',
    bgColor: 'bg-blue-50',
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
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpg')",
          opacity: 0.3
        }}
      ></div>
      
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-white/70 via-slate-50/80 to-rose-50/70"></div>

      {/* Content */}
      <div className="relative z-10">
        <GoogleTranslate />
      
        {/* Modern Header with Enhanced Glassmorphism */}
        <header className="sticky top-0 z-50 glass-modern border-b border-white/30 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Mobile Layout: Logo on left, buttons on right */}
              <div className="flex items-center md:hidden">
                <Logo />
              </div>
              
              {/* Desktop Layout: Buttons on left, logo centered, location on right */}
              <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
                <Button asChild variant="destructive" className="rounded-full px-4 lg:px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/login" className="font-medium text-sm lg:text-base">Connexion</Link>
                </Button>
                <Button asChild className="rounded-full px-4 lg:px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/signup" className="font-medium text-sm lg:text-base">Inscription</Link>
                </Button>
              </div>
              
              {/* Desktop: Centered Logo */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <Logo />
              </div>
              
              {/* Right side: Location indicator (desktop) or buttons (mobile) */}
              <div className="flex items-center space-x-2">
                {/* Mobile buttons */}
                <div className="flex md:hidden items-center space-x-2">
                  <Button asChild variant="destructive" className="rounded-full px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Link href="/login" className="font-medium text-xs">Connexion</Link>
                  </Button>
                  <Button asChild className="rounded-full px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Link href="/signup" className="font-medium text-xs">Inscription</Link>
                  </Button>
                </div>
                
                {/* Desktop location indicator */}
                <div className="hidden sm:flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <span className="text-sm font-medium text-gray-600">Toulouse</span>
                </div>
              </div>
            </div>
          </div>
        </header>      <main className="flex-grow">
        {/* Hero Section with Enhanced Modern Design */}
        <section className="parallax-section relative py-16 sm:py-24 lg:py-32 overflow-hidden">
          <div className="parallax-content container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 glass-modern rounded-full px-6 py-3 mb-8 shadow-xl animate-float-enhanced">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Nouvelle application communautaire</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in">
              Cossí va ?
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
              L'application des toulousains pour faire des sorties
            </p>
            
            <p className="text-lg text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Accueil des nouveaux à Toulouse. Sorties, emploi, logement, covoiturage, petites annonces, tandem de langues, sorties entre filles, sorties étudiantes, évènements, idées de sorties, voyage, international.
            </p>
            
            <div className="inline-flex items-center gap-3 text-lg font-semibold text-gray-800 mb-12 glass-modern rounded-full px-8 py-4 shadow-xl">
              <Star className="h-6 w-6 text-yellow-500 fill-current animate-pulse-slow" />
              <span>Rejoignez la communauté des toulousaines et toulousains ! C'est gratuit et sans limite !</span>
            </div>
            
            {/* Welcome Hosts Section */}
            <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl glass-modern shadow-2xl border border-white/50">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 shadow-lg">
                  <Handshake className="h-7 w-7 text-white"/>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                  Découvrez nos Accueillant(e)s
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Ils sont là pour te faire découvrir la ville, les visites, les évènements, la culture locale, les lieux pour sortir, ou pour faire du shopping ! Ils ont un badge sur leur profil, contacte-les !
              </p>
            </div>
          </div>
        </section>

        {/* Image Carousel Section with Modern Glassmorphism */}
        <section className="parallax-section py-12 sm:py-16">
          <div className="parallax-content container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {topCarouselImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 glass-modern">
                        <CardContent className="p-0 relative aspect-square">
                          <Image 
                            src={src} 
                            alt={`Image de sortie ${index + 1}`} 
                            width={600} 
                            height={600} 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 glass-modern shadow-xl border-0 hover:bg-white/90" />
              <CarouselNext className="hidden sm:flex -right-12 glass-modern shadow-xl border-0 hover:bg-white/90" />
            </Carousel>
          </div>
        </section>

        {/* Features Section with Modern Cards */}
        <section id="features" className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Découvrez nos rubriques
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explorez toutes les possibilités qu'offre notre communauté toulousaine
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Link href={feature.href} key={feature.title}>
                  <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <CardHeader className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-rose-600 group-hover:text-rose-700 transition-colors">
                        <span>Découvrir</span>
                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Second Carousel */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {middleCarouselImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0 relative aspect-square">
                          <Image 
                            src={src} 
                            alt={`Image de sortie ${index + 1}`} 
                            width={600} 
                            height={600} 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
              <CarouselNext className="hidden sm:flex -right-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
            </Carousel>
          </div>
        </section>
        
        {/* Partners Section */}
        <section id="partners" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Nos partenaires
              </h3>
              <p className="text-lg text-gray-600">Découvrez nos partenaires qui enrichissent notre communauté</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <a 
                href="http://www.bilingue.fr.nf/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-blue-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Languages className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-blue-800 group-hover:text-blue-900 transition-colors">Bilingue 31</h4>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  Le site pour pratiquer les langues à Toulouse.
                </p>
                <div className="flex items-center mt-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span className="font-medium">Visiter le site</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a 
                href="http://happypeople.fr.nf/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group block p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-rose-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-rose-800 group-hover:text-rose-900 transition-colors">Happy People 31</h4>
                </div>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  Le réseau social pour se faire des amis et sortir à Toulouse.
                </p>
                <div className="flex items-center mt-4 text-rose-600 group-hover:text-rose-700 transition-colors">
                  <span className="font-medium">Visiter le site</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Third Carousel */}
        <section className="py-12 sm:py-16 bg-gradient-to-l from-slate-50 to-gray-50">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {bottomCarouselImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0 relative aspect-square">
                          <Image 
                            src={src} 
                            alt={`Image de sortie ${index + 1}`} 
                            width={600} 
                            height={600} 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
              <CarouselNext className="hidden sm:flex -right-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
            </Carousel>
          </div>
        </section>

        {/* Girls Party Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fce7f3' fill-opacity='0.6'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-white/50">
              <Heart className="h-5 w-5 text-rose-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">Communauté féminine</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Toulousaine Girls Party
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sorties entre toulousaines
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Un espace dédié aux femmes de Toulouse pour créer des liens, partager des moments uniques et découvrir la ville ensemble dans une ambiance conviviale et bienveillante.
            </p>
          </div>
        </section>
        
        {/* Final Carousel */}
        <section className="py-12 sm:py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {finalCarouselImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="group cursor-pointer">
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-0 relative aspect-square">
                          <Image 
                            src={src} 
                            alt={`Image de sortie ${index + 1}`} 
                            width={600} 
                            height={600} 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
              <CarouselNext className="hidden sm:flex -right-12 bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:bg-white" />
            </Carousel>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="mb-6">
              <Logo />
            </div>
            
            <p className="text-gray-300 mb-6">
              &copy; {new Date().getFullYear()} Tolosa. Tous droits réservés.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                À propos
              </Link>
              <Link href="/legal" className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                Mentions légales
              </Link>
              <Link href="/charter" className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                Charte d'utilisation
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 hover:underline">
                Nous contacter
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Fait avec ❤️ pour la communauté toulousaine
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
