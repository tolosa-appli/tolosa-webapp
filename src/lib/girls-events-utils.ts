import { GirlsEvent } from '@/types';

// Common event themes
export const eventThemes = [
  'Soirée détente',
  'Sport & Nature',
  'Sport & Bien-être',
  'Cuisine',
  'Culture',
  'Shopping',
  'Café & Discussion',
  'Atelier créatif',
  'Sortie culturelle',
  'Picnic',
  'Randonnée',
  'Fitness',
  'Yoga',
  'Méditation',
  'Lecture',
  'Cinéma',
  'Musique',
  'Danse',
  'Art',
  'Photographie',
] as const;

// Format event date
export function formatEventDate(date: string): string {
  const eventDate = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  
  const diffTime = eventDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const timeString = eventDate.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  if (diffDays === 0) {
    return `Aujourd'hui à ${timeString}`;
  } else if (diffDays === 1) {
    return `Demain à ${timeString}`;
  } else if (diffDays === -1) {
    return `Hier à ${timeString}`;
  } else if (diffDays > 0 && diffDays <= 7) {
    const dayName = eventDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    return `${dayName} à ${timeString}`;
  } else {
    const dateString = eventDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
    return `${dateString} à ${timeString}`;
  }
}

// Format event date short
export function formatEventDateShort(date: string): string {
  const eventDate = new Date(date);
  return eventDate.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Get event status
export function getEventStatus(event: GirlsEvent): 'upcoming' | 'today' | 'ongoing' | 'past' | 'full' | 'inactive' {
  if (!event.isActive) return 'inactive';
  
  const eventDate = new Date(event.date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  
  // Check if event is full
  if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
    return 'full';
  }
  
  // Check event timing
  if (eventDay.getTime() < today.getTime()) {
    return 'past';
  } else if (eventDay.getTime() === today.getTime()) {
    if (eventDate.getTime() < now.getTime()) {
      return 'ongoing';
    } else {
      return 'today';
    }
  } else {
    return 'upcoming';
  }
}

// Get event status label
export function getEventStatusLabel(status: ReturnType<typeof getEventStatus>): string {
  const labels = {
    upcoming: 'À venir',
    today: 'Aujourd\'hui',
    ongoing: 'En cours',
    past: 'Terminé',
    full: 'Complet',
    inactive: 'Inactif'
  };
  return labels[status];
}

// Get event status color
export function getEventStatusColor(status: ReturnType<typeof getEventStatus>): string {
  const colors = {
    upcoming: 'blue',
    today: 'green',
    ongoing: 'orange',
    past: 'gray',
    full: 'red',
    inactive: 'gray'
  };
  return colors[status];
}

// Format participants count
export function formatParticipantsCount(current: number, max?: number): string {
  if (max) {
    return `${current}/${max} participantes`;
  }
  return `${current} participante${current > 1 ? 's' : ''}`;
}

// Get availability status
export function getAvailabilityStatus(event: GirlsEvent): 'available' | 'few-spots' | 'full' {
  if (!event.maxParticipants) return 'available';
  
  const remaining = event.maxParticipants - event.currentParticipants;
  const percentage = (event.currentParticipants / event.maxParticipants) * 100;
  
  if (remaining === 0) return 'full';
  if (percentage >= 80) return 'few-spots';
  return 'available';
}

// Get availability label
export function getAvailabilityLabel(status: ReturnType<typeof getAvailabilityStatus>): string {
  const labels = {
    available: 'Places disponibles',
    'few-spots': 'Dernières places',
    full: 'Complet'
  };
  return labels[status];
}

// Filter upcoming events
export function filterUpcomingEvents(events: GirlsEvent[]): GirlsEvent[] {
  const now = new Date();
  return events.filter(event => 
    event.isActive && new Date(event.date) > now
  );
}

// Filter events by date range
export function filterEventsByDateRange(
  events: GirlsEvent[], 
  startDate: Date, 
  endDate: Date
): GirlsEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
}

// Group events by date
export function groupEventsByDate(events: GirlsEvent[]): Record<string, GirlsEvent[]> {
  return events.reduce((groups, event) => {
    const date = new Date(event.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, GirlsEvent[]>);
}

// Sort events by date
export function sortEventsByDate(events: GirlsEvent[], order: 'asc' | 'desc' = 'asc'): GirlsEvent[] {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
}

// Get theme emoji
export function getThemeEmoji(theme: string): string {
  const themeEmojis: Record<string, string> = {
    'Soirée détente': '🌙',
    'Sport & Nature': '🏃‍♀️',
    'Sport & Bien-être': '🧘‍♀️',
    'Cuisine': '👩‍🍳',
    'Culture': '🎭',
    'Shopping': '🛍️',
    'Café & Discussion': '☕',
    'Atelier créatif': '🎨',
    'Sortie culturelle': '🏛️',
    'Picnic': '🧺',
    'Randonnée': '🥾',
    'Fitness': '💪',
    'Yoga': '🧘‍♀️',
    'Méditation': '🧘‍♀️',
    'Lecture': '📚',
    'Cinéma': '🎬',
    'Musique': '🎵',
    'Danse': '💃',
    'Art': '🎨',
    'Photographie': '📸'
  };
  return themeEmojis[theme] || '🎉';
}

// Validate event data
export function validateEventData(data: Partial<GirlsEvent>): string[] {
  const errors: string[] = [];
  
  if (!data.title?.trim()) {
    errors.push('Le titre est requis');
  } else if (data.title.length < 5) {
    errors.push('Le titre doit contenir au moins 5 caractères');
  } else if (data.title.length > 100) {
    errors.push('Le titre ne peut pas dépasser 100 caractères');
  }
  
  if (!data.description?.trim()) {
    errors.push('La description est requise');
  } else if (data.description.length < 20) {
    errors.push('La description doit contenir au moins 20 caractères');
  } else if (data.description.length > 1000) {
    errors.push('La description ne peut pas dépasser 1000 caractères');
  }
  
  if (!data.theme?.trim()) {
    errors.push('Le thème est requis');
  }
  
  if (!data.date) {
    errors.push('La date est requise');
  } else {
    const eventDate = new Date(data.date);
    const now = new Date();
    if (eventDate <= now) {
      errors.push('La date doit être dans le futur');
    }
  }
  
  if (!data.location?.trim()) {
    errors.push('Le lieu est requis');
  }
  
  if (data.maxParticipants && data.maxParticipants < 1) {
    errors.push('Le nombre maximum de participantes doit être au moins 1');
  }
  
  return errors;
}

// Check if user can join event
export function canJoinEvent(event: GirlsEvent, userId?: string): boolean {
  if (!event.isActive) return false;
  if (new Date(event.date) <= new Date()) return false;
  if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) return false;
  // Additional check: user shouldn't already be joined (would need participant list)
  return true;
}

// Check if user can edit event
export function canEditEvent(event: GirlsEvent, currentUserId: string): boolean {
  return event.organizerId === currentUserId;
}

// Generate event share text
export function generateEventShareText(event: GirlsEvent): string {
  return `🎉 ${event.title}\n\n📅 ${formatEventDate(event.date)}\n📍 ${event.location}\n\n${event.description}\n\n👥 ${formatParticipantsCount(event.currentParticipants, event.maxParticipants)}`;
}

// Extract location city
export function extractLocationCity(location: string): string {
  // Try to extract city from location string
  const parts = location.split(',');
  return parts[parts.length - 1].trim() || location;
}

// Check if event is happening soon (within 2 hours)
export function isEventSoon(event: GirlsEvent): boolean {
  const eventDate = new Date(event.date);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  return diffHours > 0 && diffHours <= 2;
}
