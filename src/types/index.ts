// Common types for the application

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  slug: string; // Used to construct URLs like /app/${slug}
  color: string; // Base color name like 'blue', 'green', 'rose'
  isActive: boolean;
  order: number;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  website: string;
  icon: string;
  color: string; // Base color name like 'blue', 'rose'
  isActive: boolean;
}

export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  section: 'top' | 'middle' | 'bottom' | 'final';
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  role?: 'user' | 'moderator' | 'admin';
  verified?: boolean;
  joinedAt?: string;
  isActive?: boolean;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  category: 'sale' | 'purchase' | 'service' | 'free' | 'exchange';
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  userId: string;
  user: User;
  images: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
    preferredContact: 'phone' | 'email' | 'message';
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  tags?: string[];
}

export interface CreateAdData {
  title: string;
  description: string;
  location: string;
  price: number;
  category: Ad['category'];
  condition?: Ad['condition'];
  images?: string[];
  contactInfo?: Ad['contactInfo'];
  tags?: string[];
  expiresAt?: string;
}

export interface AdsFilters {
  search?: string;
  category?: Ad['category'];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: Ad['condition'];
  tags?: string[];
}

export interface AdsSortOptions {
  field: 'createdAt' | 'price' | 'title' | 'location';
  direction: 'asc' | 'desc';
}

export interface CarpoolAd {
  id: string;
  type: 'offer' | 'request';
  tripType: 'regular' | 'outing';
  from: string;
  to: string;
  date: string;
  userId: string;
  user: User;
  contactInfo?: {
    phone?: string;
    email?: string;
    preferredContact: 'phone' | 'email' | 'message';
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarpoolData {
  type: CarpoolAd['type'];
  tripType: CarpoolAd['tripType'];
  from: string;
  to: string;
  date: string;
  contactInfo?: CarpoolAd['contactInfo'];
}

export interface FacebookGroup {
  id: string;
  name: string;
  description?: string;
  url: string;
  category: 'general' | 'events' | 'housing' | 'culture' | 'women' | 'professional';
  isActive: boolean;
  order: number;
}

export interface ForumTheme {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  categoryId: string;
  isActive: boolean;
  order: number;
  messageCount: number;
  lastActivity?: string;
}

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  order: number;
  themes: ForumTheme[];
}

export interface ForumMessage {
  id: string;
  title: string;
  content: string;
  themeId: string;
  theme?: ForumTheme;
  userId: string;
  user: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
}

export interface CreateForumMessageData {
  title: string;
  content: string;
  themeId: string;
}

export interface GirlsEvent {
  id: string;
  title: string;
  description: string;
  theme: string;
  date: string;
  location: string;
  maxParticipants?: number;
  currentParticipants: number;
  images: string[];
  organizerId: string;
  organizer: User;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGirlsEventData {
  title: string;
  description: string;
  theme: string;
  date: string;
  location: string;
  maxParticipants?: number;
  images?: string[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
