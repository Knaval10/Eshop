import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PRODUCTS } from '../../data';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../../../../core/services/product.service';
import { mapBackendToProduct } from '../../../../core/services/product-mapper';

@Component({
  selector: 'app-products-catalog-grid',
  imports: [ProductCard],
  templateUrl: './catalog-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogGrid {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  private readonly apiProducts = signal<any[]>([]);
  protected readonly searchQuery = signal('');

  protected readonly perPageOptions = [24, 48, 72];
  protected readonly perPage = signal(24);
  protected readonly currentPage = signal(1);

  protected readonly products = computed(() => {
    const list = this.apiProducts();
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return list;
    }
    return list.filter((p) => p.name.toLowerCase().includes(query));
  });

  protected readonly totalResults = computed(() => this.products().length);

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.totalResults() / this.perPage())),
  );
  protected readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i + 1),
  );
  protected readonly resultRange = computed(() => {
    const total = this.totalResults();
    if (total === 0) {
      return '0 of 0';
    }
    const start = (this.currentPage() - 1) * this.perPage() + 1;
    const end = Math.min(this.currentPage() * this.perPage(), total);
    return `${start}–${end} of ${total}`;
  });

  constructor() {
    this.loadBackendProducts();

    // Keep search query signal in sync with router URL query parameters
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlTree = this.router.parseUrl(this.router.url);
        const search = urlTree.queryParams['search'] || '';
        this.searchQuery.set(search);
        this.currentPage.set(1);
      });

    // Initialize from current URL immediately
    const urlTree = this.router.parseUrl(this.router.url);
    const search = urlTree.queryParams['search'] || '';
    this.searchQuery.set(search);
    this.currentPage.set(1);
  }

  private loadBackendProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.apiProducts.set(data.map(mapBackendToProduct));
        } else {
          this.apiProducts.set(PRODUCTS);
        }
      },
      error: () => {
        this.apiProducts.set(PRODUCTS);
      },
    });
  }



  goToPage(p: number) {
    this.currentPage.set(p);
  }
  prevPage() {
    this.currentPage.update((p) => Math.max(1, p - 1));
  }
  nextPage() {
    this.currentPage.update((p) => Math.min(this.pageCount(), p + 1));
  }
}

