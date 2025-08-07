import { Ad } from '@/types';

export const adCategories: { value: Ad['category']; label: string; description: string }[] = [
  { value: 'sale', label: 'Vente', description: 'Je vends un objet' },
  { value: 'purchase', label: 'Achat', description: 'Je cherche à acheter' },
  { value: 'service', label: 'Service', description: 'Je propose ou cherche un service' },
  { value: 'free', label: 'Gratuit', description: 'Je donne quelque chose' },
  { value: 'exchange', label: 'Échange', description: 'Je propose un échange' },
];

export const adConditions: { value: Ad['condition']; label: string; description: string }[] = [
  { value: 'new', label: 'Neuf', description: 'Jamais utilisé, encore dans son emballage' },
  { value: 'like-new', label: 'Comme neuf', description: 'Utilisé très peu, aucun défaut visible' },
  { value: 'good', label: 'Bon état', description: 'Utilisé mais en bon état de fonctionnement' },
  { value: 'fair', label: 'État correct', description: 'Quelques traces d\'usure mais fonctionnel' },
  { value: 'poor', label: 'Mauvais état', description: 'Usagé, peut nécessiter des réparations' },
];

export const getAdCategoryInfo = (category: Ad['category']) => {
  return adCategories.find(cat => cat.value === category);
};

export const getAdConditionInfo = (condition: Ad['condition']) => {
  return adConditions.find(cond => cond.value === condition);
};

export const formatPrice = (price: number): string => {
  if (price === 0) return 'Gratuit';
  return `${price} €`;
};

export const getContactLabel = (preferredContact: 'phone' | 'email' | 'message'): string => {
  switch (preferredContact) {
    case 'phone':
      return 'Appeler';
    case 'email':
      return 'Email';
    case 'message':
      return 'Message';
    default:
      return 'Contacter';
  }
};

export const getCategoryColor = (category: Ad['category']): string => {
  switch (category) {
    case 'sale':
      return 'bg-blue-100 text-blue-800';
    case 'purchase':
      return 'bg-green-100 text-green-800';
    case 'service':
      return 'bg-purple-100 text-purple-800';
    case 'free':
      return 'bg-orange-100 text-orange-800';
    case 'exchange':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
