import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  badge?: 'sale' | 'new' | 'hot';
}

interface Category {
  name: string;
  icon: string;
}

interface Slide {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  bg: string;
}

@Component({
  selector: 'app-home',
  imports: [NgTemplateOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly currentSlide = signal(0);

  protected readonly sidebarCategories: Category[] = [
    { name: 'Laptops', icon: '💻' },
    { name: 'Headphones', icon: '🎧' },
    { name: 'Smartwatches', icon: '⌚' },
    { name: 'Smartphones', icon: '📱' },
    { name: 'Tablets', icon: '📲' },
    { name: 'Cameras', icon: '📷' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'TV & Audio', icon: '📺' },
    { name: 'Accessories', icon: '🔌' },
  ];

  protected readonly slides: Slide[] = [
    {
      title: 'Noise Canceling Headphones',
      subtitle: 'Immersive sound. Total silence. Pure focus.',
      cta: 'Shop Now',
      image:
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop',
      bg: 'from-zinc-900 to-zinc-700',
    },
    {
      title: 'Next-Gen Smartphones',
      subtitle: 'Power, design, and innovation in your pocket.',
      cta: 'Discover',
      image:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
      bg: 'from-emerald-900 to-emerald-600',
    },
    {
      title: 'Ultra-Slim Laptops',
      subtitle: 'Lightweight power for work and play.',
      cta: 'Browse',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
      bg: 'from-slate-900 to-slate-600',
    },
  ];

  protected readonly brands: string[] = [
    'HP',
    'Samsung',
    'Apple',
    'Sony',
    'Dell',
    'Asus',
    'Lenovo',
    'LG',
    'Canon',
    'Bose',
  ];

  protected readonly headphones: Product[] = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Wireless',
      brand: 'Sony',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&auto=format&fit=crop',
      price: 349,
      oldPrice: 399,
      tag: 'Free Shipping',
      badge: 'sale',
    },
    {
      id: 2,
      name: 'Bose QuietComfort Ultra',
      brand: 'Bose',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop',
      price: 429,
      oldPrice: 499,
      tag: 'Flash Sale',
      badge: 'hot',
    },
    {
      id: 3,
      name: 'Apple AirPods Max',
      brand: 'Apple',
      image:
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop',
      price: 549,
      tag: 'Free Shipping',
    },
    {
      id: 4,
      name: 'JBL Tune 760NC',
      brand: 'JBL',
      image:
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop',
      price: 129,
      oldPrice: 179,
      badge: 'sale',
    },
    {
      id: 5,
      name: 'Sennheiser Momentum 4',
      brand: 'Sennheiser',
      image:
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop',
      price: 379,
      tag: 'Free Shipping',
    },
  ];

  protected readonly tablets: Product[] = [
    {
      id: 11,
      name: 'iPad Pro 12.9" M2',
      brand: 'Apple',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&auto=format&fit=crop',
      price: 1099,
      oldPrice: 1299,
      badge: 'sale',
    },
    {
      id: 12,
      name: 'Galaxy Tab S9 Ultra',
      brand: 'Samsung',
      image:
        'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=400&auto=format&fit=crop',
      price: 999,
      tag: 'Free Shipping',
    },
    {
      id: 13,
      name: 'Surface Pro 9',
      brand: 'Microsoft',
      image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&auto=format&fit=crop',
      price: 899,
      oldPrice: 1099,
      badge: 'hot',
    },
    {
      id: 14,
      name: 'Lenovo Tab P12 Pro',
      brand: 'Lenovo',
      image:
        'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&auto=format&fit=crop',
      price: 499,
      tag: 'Free Shipping',
    },
    {
      id: 15,
      name: 'Xiaomi Pad 6',
      brand: 'Xiaomi',
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&auto=format&fit=crop',
      price: 349,
      badge: 'new',
    },
  ];

  protected readonly laptops: Product[] = [
    {
      id: 21,
      name: 'MacBook Pro 14" M3',
      brand: 'Apple',
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop',
      price: 1999,
      oldPrice: 2199,
    },
    {
      id: 22,
      name: 'Dell XPS 15',
      brand: 'Dell',
      image:
        'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&auto=format&fit=crop',
      price: 1599,
    },
    {
      id: 23,
      name: 'ASUS ROG Zephyrus',
      brand: 'Asus',
      image:
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop',
      price: 1799,
      oldPrice: 1999,
      badge: 'hot',
    },
    {
      id: 24,
      name: 'HP Spectre x360',
      brand: 'HP',
      image:
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&auto=format&fit=crop',
      price: 1299,
    },
  ];

  protected readonly laptopCategories = [
    'Macbook',
    'Gaming Laptop',
    'Ultrabook',
    'Chromebook',
    '2-in-1',
    'Workstation',
  ];

  protected readonly currentHeroSlide = computed(() => this.slides[this.currentSlide()]);

  nextSlide() {
    this.currentSlide.update((i) => (i + 1) % this.slides.length);
  }

  prevSlide() {
    this.currentSlide.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(i: number) {
    this.currentSlide.set(i);
  }
}
