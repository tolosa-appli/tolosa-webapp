
// This represents the layout for the authenticated part of the app.
"use client"

import React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import {
  Users,
  MessageSquare,
  Car,
  Home as HomeIcon,
  Briefcase,
  Megaphone,
  GraduationCap,
  Heart,
  UserCheck,
  Settings,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  Bookmark,
  Archive,
  User as UserIcon,
  Shield,
  Mail,
  ExternalLink,
  ThumbsUp,
  LifeBuoy,
  Languages,
  MessageSquareText,
  Gamepad2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import GoogleTranslate from '@/components/google-translate';

const topItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { href: '/profile', icon: UserIcon, label: 'Mon Profil' },
  { href: '/messages', icon: Mail, label: 'Messagerie' },
  { href: '/members', icon: Users, label: 'Membres' },
  { href: '/', icon: LogOut, label: 'Déconnexion' },
];

const rubriquesItems = [
    { href: '/sorties', icon: CalendarDays, label: 'Sorties à Toulouse' },
    { href: '/forum', icon: MessageSquare, label: 'Forum de discussion' },
    { href: '/carpooling', icon: Car, label: 'Covoiturage' },
    { href: '/housing', icon: HomeIcon, label: 'Logement' },
    { href: '/jobs', icon: Briefcase, label: 'Emploi' },
    { href: '/ads', icon: Megaphone, label: 'Petites Annonces' },
    { href: '/internships', icon: GraduationCap, label: 'Stage & Alternance' },
    { href: '/questionnaires', icon: ClipboardList, label: 'Questionnaires & Expériences' },
    { href: '/language-cafe', icon: Languages, label: 'Café des langues' },
    { href: '/network-games', icon: Gamepad2, label: 'Jeux en réseau' },
    { href: '/meetup-events', icon: ExternalLink, label: 'Evènements Meetup' },
    { href: '/facebook-groups', icon: ThumbsUp, label: 'Groupes Facebook' },
    { href: '/help', icon: LifeBuoy, label: 'Aide' },
]

const mesItems = [
    { href: '/my-outings', icon: Bookmark, label: 'Mes Sorties' },
    { href: '/my-ads', icon: Archive, label: 'Mes Annonces' },
    { href: '/language-tandems/my-tandems', icon: MessageSquareText, label: 'Mes Tandems' },
]

const communautesItems = [
    { href: '/girls-only', icon: Heart, label: 'Sorties entre filles' },
    { href: '/students', icon: UserCheck, label: 'Sorties étudiantes' },
]


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // --- Simulation de l'utilisateur connecté ---
  // Dans une application réelle, ces données proviendraient de votre système d'authentification.
  const currentUser = {
    role: 'admin' as 'user' | 'moderator' | 'admin',
    unreadMessages: 3,
    sex: 'female' as 'male' | 'female',
    avatar: '',
  };
  // -----------------------------------------

  const allTopItems = [...topItems];
  if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
    const dashboardIndex = allTopItems.findIndex(item => item.href === '/dashboard');
    if (dashboardIndex !== -1) {
      allTopItems.splice(dashboardIndex + 1, 0, {
        href: '/admin',
        icon: Shield,
        label: 'Administration'
      });
    }
  }

  const getAvatarSrc = () => {
    if (currentUser.avatar && currentUser.avatar.trim() !== '') return currentUser.avatar;
    if (currentUser.sex === 'male') return 'http://bilingue31.free.fr/avatar_H_OK_40x40.jpg';
    if (currentUser.sex === 'female') return 'http://bilingue31.free.fr/avatar_F_OK_40x40.jpg';
    return ''; // Return empty string if no specific avatar to show fallback
  };


  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="bg-card">
        <SidebarHeader className="pt-20 sm:pt-8" />
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <SidebarMenu>
                {allTopItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                      <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                      </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Mon Espace</SidebarGroupLabel>
                 <SidebarMenu>
                    {mesItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Rubriques</SidebarGroupLabel>
                 <SidebarMenu>
                    {rubriquesItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>Communautés</SidebarGroupLabel>
                 <SidebarMenu>
                    {communautesItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>

          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/* Footer content if any */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="pt-12 sm:pt-0">
             <GoogleTranslate />
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-3">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="sm:hidden"/>
                    <div className="hidden sm:block ml-24">
                        <Logo />
                    </div>
                </div>
                
                <div className="sm:hidden">
                  <Logo />
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/messages" className="relative">
                            <Mail />
                            {currentUser.unreadMessages > 0 && (
                                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-0">{currentUser.unreadMessages}</Badge>
                            )}
                            <span className="sr-only">Messages</span>
                        </Link>
                    </Button>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                        <Avatar>
                            <AvatarImage src={getAvatarSrc()} alt="Avatar de l'utilisateur" data-ai-hint="female portrait" />
                            <AvatarFallback>Moi</AvatarFallback>
                        </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="flex items-center w-full">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profil</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings" className="flex items-center w-full">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Paramètres</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                        <Link href="/" className='text-destructive focus:text-destructive w-full'>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Déconnexion</span>
                        </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">
            {children}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
