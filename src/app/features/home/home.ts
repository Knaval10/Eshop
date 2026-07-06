import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeroSection } from './components/hero-section/hero-section';
import { BrandBar } from './components/brand-bar/brand-bar';
import { FeaturedProduct } from './components/featured-product/featured-product';
import { ProductRow } from './components/product-row/product-row';
import { PromoBanners } from './components/promo-banners/promo-banners';
import { LaptopsSection } from './components/laptops-section/laptops-section';
import { NewsletterAppPromo } from './components/newsletter-app-promo/newsletter-app-promo';
import { HEADPHONES, TABLETS } from './data';
import { ProductService } from '../../core/services/product.service';
import { mapBackendToHomeProduct } from '../../core/services/product-mapper';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    BrandBar,
    FeaturedProduct,
    ProductRow,
    PromoBanners,
    LaptopsSection,
    NewsletterAppPromo,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  private readonly apiProducts = signal<any[]>([]);
  protected readonly searchQuery = signal('');

  protected readonly apiBanners = signal<any[]>([]);
  protected readonly banners = computed(() => {
    const list = this.apiBanners();
    if (!list || list.length === 0) return [];
    return list.map((b) => ({
      title: b.title,
      subtitle: b.subtitle,
      cta: 'Shop Now',
      image: b.imageUrl,
      bg: 'from-zinc-900 to-zinc-700',
    }));
  });

  protected readonly featuredProduct = signal<any>(null);

  protected readonly headphones = computed(() => {
    const list = this.apiProducts().filter(
      (p) =>
        p.name.toLowerCase().includes('headphone') ||
        p.name.toLowerCase().includes('sony wh') ||
        p.name.toLowerCase().includes('bose') ||
        p.name.toLowerCase().includes('airpods') ||
        p.name.toLowerCase().includes('jbl') ||
        p.name.toLowerCase().includes('audio'),
    );
    const sourceList = list.length > 0 ? list : HEADPHONES;

    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return sourceList;
    }
    return sourceList.filter((p) => p.name.toLowerCase().includes(query));
  });

  protected readonly tablets = computed(() => {
    const list = this.apiProducts().filter(
      (p) =>
        p.name.toLowerCase().includes('tablet') ||
        p.name.toLowerCase().includes('ipad') ||
        p.name.toLowerCase().includes('tab') ||
        p.name.toLowerCase().includes('pad'),
    );
    const sourceList = list.length > 0 ? list : TABLETS;

    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return sourceList;
    }
    return sourceList.filter((p) => p.name.toLowerCase().includes(query));
  });

  constructor() {
    this.loadProducts();
    this.loadHomePromoData();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlTree = this.router.parseUrl(this.router.url);
        const search = urlTree.queryParams['search'] || '';
        this.searchQuery.set(search);
      });

    const urlTree = this.router.parseUrl(this.router.url);
    const search = urlTree.queryParams['search'] || '';
    this.searchQuery.set(search);
  }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.apiProducts.set(data.map(mapBackendToHomeProduct));
        }
      },
    });
  }

  private loadHomePromoData() {
    this.productService.getHomeBanners().subscribe({
      next: (banners) => {
        if (banners && banners.length > 0) {
          this.apiBanners.set(banners);
        }
      },
    });

    this.productService.getHomeSections().subscribe({
      next: (sections) => {
        if (sections && sections.featured && sections.featured.length > 0) {
          this.featuredProduct.set(sections.featured[0]);
        }
      },
    });
  }
}

