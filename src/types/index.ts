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
  avatar: string;
  role?: 'user' | 'moderator' | 'admin';
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
