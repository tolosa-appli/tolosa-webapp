import { CarpoolAd } from '@/types';

// Carpool type options
export const carpoolTypes = [
  { value: 'all', label: 'Tous' },
  { value: 'offer', label: 'Proposer un trajet' },
  { value: 'request', label: 'Chercher un trajet' },
] as const;

// Trip type options
export const tripTypes = [
  { value: 'all', label: 'Tous les types' },
  { value: 'regular', label: 'Régulier' },
  { value: 'outing', label: 'Sortie' },
] as const;

// Common locations in Toulouse
export const commonLocations = [
  'Toulouse Centre',
  'Paul Sabatier',
  'Capitole',
  'Rangueil',
  'Mirail',
  'Jean Jaurès',
  'Compans-Caffarelli',
  'Côte Pavée',
  'Les Chalets',
  'Université Toulouse 1',
  'Université Toulouse 2',
  'Université Toulouse 3',
] as const;

// Get carpool type label
export function getCarpoolTypeLabel(type: CarpoolAd['type']): string {
  const option = carpoolTypes.find(t => t.value === type);
  return option?.label || type;
}

// Get trip type label
export function getTripTypeLabel(tripType: CarpoolAd['tripType']): string {
  const option = tripTypes.find(t => t.value === tripType);
  return option?.label || tripType;
}

// Format carpool route
export function formatCarpoolRoute(from: string, to: string): string {
  return `${from} → ${to}`;
}

// Format carpool date
export function formatCarpoolDate(date: string): string {
  const carpoolDate = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const carpoolDay = new Date(carpoolDate.getFullYear(), carpoolDate.getMonth(), carpoolDate.getDate());
  
  const diffTime = carpoolDay.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const timeString = carpoolDate.toLocaleTimeString('fr-FR', { 
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
    const dayName = carpoolDate.toLocaleDateString('fr-FR', { weekday: 'long' });
    return `${dayName} à ${timeString}`;
  } else {
    const dateString = carpoolDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
    return `${dateString} à ${timeString}`;
  }
}

// Get carpool status
export function getCarpoolStatus(carpool: CarpoolAd): 'active' | 'expired' | 'inactive' {
  if (!carpool.isActive) return 'inactive';
  
  const carpoolDate = new Date(carpool.date);
  const now = new Date();
  
  if (carpoolDate < now) return 'expired';
  return 'active';
}

// Filter upcoming carpools
export function filterUpcomingCarpools(carpools: CarpoolAd[]): CarpoolAd[] {
  const now = new Date();
  return carpools.filter(carpool => 
    carpool.isActive && new Date(carpool.date) > now
  );
}

// Group carpools by date
export function groupCarpoolsByDate(carpools: CarpoolAd[]): Record<string, CarpoolAd[]> {
  return carpools.reduce((groups, carpool) => {
    const date = new Date(carpool.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(carpool);
    return groups;
  }, {} as Record<string, CarpoolAd[]>);
}

// Validate carpool form data
export function validateCarpoolData(data: Partial<CarpoolAd>): string[] {
  const errors: string[] = [];
  
  if (!data.type) {
    errors.push('Le type de trajet est requis');
  }
  
  if (!data.tripType) {
    errors.push('Le type de voyage est requis');
  }
  
  if (!data.from?.trim()) {
    errors.push('Le lieu de départ est requis');
  }
  
  if (!data.to?.trim()) {
    errors.push('Le lieu d\'arrivée est requis');
  }
  
  if (!data.date) {
    errors.push('La date est requise');
  } else {
    const carpoolDate = new Date(data.date);
    const now = new Date();
    if (carpoolDate <= now) {
      errors.push('La date doit être dans le futur');
    }
  }
  
  return errors;
}

// Get contact preference label
export function getContactPreferenceLabel(preference: 'phone' | 'email' | 'message'): string {
  const preferences = {
    phone: 'Téléphone',
    email: 'Email',
    message: 'Message'
  };
  return preferences[preference] || preference;
}

// Format contact info for display
export function formatContactInfo(carpool: CarpoolAd): string {
  if (!carpool.contactInfo) return 'Contact via message';
  
  const { preferredContact, phone, email } = carpool.contactInfo;
  
  switch (preferredContact) {
    case 'phone':
      return phone ? `Tél: ${phone}` : 'Contact via message';
    case 'email':
      return email ? `Email: ${email}` : 'Contact via message';
    default:
      return 'Contact via message';
  }
}
