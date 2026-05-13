export interface ProductVariant {
  color: string;
  hex: string;
  image: string;
  price: number;
}

export interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: 'sale' | 'new';
  badgeText?: string;
  shipping?: string;
  stockStatus?: 'in' | 'pre-order' | 'out';
}

export interface BundleItem {
  id: number;
  name: string;
  image: string;
  price: number;
  selected: boolean;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}
