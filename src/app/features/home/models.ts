export interface HomeProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  badge?: 'sale' | 'new' | 'hot';
}

export interface SidebarCategory {
  name: string;
  icon: string;
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  bg: string;
}
