import { ForumCategory, ForumTheme, ForumMessage } from '@/types';

// Format message creation date
export function formatMessageDate(date: string): string {
  const messageDate = new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - messageDate.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMinutes < 1) {
    return 'À l\'instant';
  } else if (diffMinutes < 60) {
    return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
  } else if (diffDays < 7) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  } else {
    return messageDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: messageDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

// Format last activity date
export function formatLastActivity(date: string): string {
  const activityDate = new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - activityDate.getTime();
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMinutes < 60) {
    return 'Récent';
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays < 7) {
    return `${diffDays}j`;
  } else {
    return activityDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  }
}

// Get theme emoji or default
export function getThemeEmoji(theme: ForumTheme): string {
  return theme.image || '💬';
}

// Format message count
export function formatMessageCount(count: number): string {
  if (count === 0) return 'Aucun message';
  if (count === 1) return '1 message';
  if (count < 1000) return `${count} messages`;
  if (count < 1000000) return `${(count / 1000).toFixed(1)}k messages`;
  return `${(count / 1000000).toFixed(1)}M messages`;
}

// Format reply count
export function formatReplyCount(count: number): string {
  if (count === 0) return 'Aucune réponse';
  if (count === 1) return '1 réponse';
  return `${count} réponses`;
}

// Get category color
export function getCategoryColor(categoryId: string): string {
  const colors: Record<string, string> = {
    general: 'blue',
    academic: 'green',
    professional: 'purple',
    social: 'orange',
    housing: 'rose',
    culture: 'teal',
  };
  return colors[categoryId] || 'gray';
}

// Generate forum URL
export function generateForumUrl(category?: ForumCategory, theme?: ForumTheme): string {
  let url = '/app/forum';
  
  if (category) {
    url += `/${category.slug}`;
    if (theme) {
      url += `/${theme.slug}`;
    }
  }
  
  return url;
}

// Extract preview from content
export function extractPreview(content: string, maxLength: number = 150): string {
  // Remove HTML tags if any
  const textContent = content.replace(/<[^>]*>/g, '');
  
  if (textContent.length <= maxLength) {
    return textContent;
  }
  
  return textContent.substring(0, maxLength).trim() + '...';
}

// Validate forum message data
export function validateForumMessageData(data: Partial<ForumMessage>): string[] {
  const errors: string[] = [];
  
  if (!data.title?.trim()) {
    errors.push('Le titre est requis');
  } else if (data.title.length < 5) {
    errors.push('Le titre doit contenir au moins 5 caractères');
  } else if (data.title.length > 100) {
    errors.push('Le titre ne peut pas dépasser 100 caractères');
  }
  
  if (!data.content?.trim()) {
    errors.push('Le contenu est requis');
  } else if (data.content.length < 10) {
    errors.push('Le contenu doit contenir au moins 10 caractères');
  } else if (data.content.length > 5000) {
    errors.push('Le contenu ne peut pas dépasser 5000 caractères');
  }
  
  if (!data.themeId) {
    errors.push('Le thème est requis');
  }
  
  return errors;
}

// Check if user can edit message
export function canEditMessage(message: ForumMessage, currentUserId: string): boolean {
  // User can edit their own messages within 24 hours
  if (message.userId !== currentUserId) return false;
  
  const messageDate = new Date(message.createdAt);
  const now = new Date();
  const diffHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
  
  return diffHours < 24;
}

// Check if user can delete message
export function canDeleteMessage(message: ForumMessage, currentUserId: string, userRole?: string): boolean {
  // Admins and moderators can delete any message
  if (userRole === 'admin' || userRole === 'moderator') return true;
  
  // Users can delete their own messages
  return message.userId === currentUserId;
}

// Sort themes by activity
export function sortThemesByActivity(themes: ForumTheme[]): ForumTheme[] {
  return [...themes].sort((a, b) => {
    if (!a.lastActivity && !b.lastActivity) return 0;
    if (!a.lastActivity) return 1;
    if (!b.lastActivity) return -1;
    
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });
}

// Sort themes by popularity (message count)
export function sortThemesByPopularity(themes: ForumTheme[]): ForumTheme[] {
  return [...themes].sort((a, b) => b.messageCount - a.messageCount);
}

// Get theme activity status
export function getThemeActivityStatus(theme: ForumTheme): 'very-active' | 'active' | 'moderate' | 'low' {
  if (!theme.lastActivity) return 'low';
  
  const lastActivity = new Date(theme.lastActivity);
  const now = new Date();
  const diffHours = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
  
  if (diffHours < 24) return 'very-active';
  if (diffHours < 72) return 'active';
  if (diffHours < 168) return 'moderate'; // 1 week
  return 'low';
}

// Search within content
export function searchInContent(content: string, searchTerm: string): boolean {
  if (!searchTerm.trim()) return true;
  
  const normalizedContent = content.toLowerCase();
  const normalizedSearch = searchTerm.toLowerCase();
  
  return normalizedContent.includes(normalizedSearch);
}

// Highlight search term in text
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
