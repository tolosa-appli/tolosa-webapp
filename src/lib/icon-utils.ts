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
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
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
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Users; // fallback to Users icon
};
