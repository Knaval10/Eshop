export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: 'sale' | 'new' | 'out';
  badgeText?: string;
  shipping?: string;
  stockStatus?: 'in' | 'pre-order' | 'contact' | 'out';
  reviewCount?: number;
  gallery?: string[];
  freeGift?: boolean;
}

export interface PopularCategory {
  name: string;
  count: number;
  image: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface CategoryNode {
  name: string;
  count: number;
  children?: { name: string; count: number }[];
}

export interface ColorOption {
  name: string;
  hex: string;
}
