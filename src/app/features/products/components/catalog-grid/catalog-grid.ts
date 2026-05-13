import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PRODUCTS } from '../../data';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-catalog-grid',
  imports: [ProductCard],
  templateUrl: './catalog-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogGrid {
  protected readonly products = PRODUCTS;
  protected readonly perPageOptions = [24, 48, 72];
  protected readonly perPage = signal(24);
  protected readonly currentPage = signal(1);
  protected readonly totalResults = 120;

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.totalResults / this.perPage())),
  );
  protected readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i + 1),
  );
  protected readonly resultRange = computed(() => {
    const start = (this.currentPage() - 1) * this.perPage() + 1;
    const end = Math.min(this.currentPage() * this.perPage(), this.totalResults);
    return `${start}–${end} of ${this.totalResults}`;
  });

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
