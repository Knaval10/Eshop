import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RELATED_PRODUCTS } from '../../data';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-detail-related-products',
  imports: [ProductCard],
  templateUrl: './related-products.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedProducts {
  protected readonly relatedProducts = RELATED_PRODUCTS;
  protected readonly carouselIndex = signal(0);
  protected readonly carouselPageSize = 4;

  protected readonly visible = computed(() =>
    this.relatedProducts.slice(this.carouselIndex(), this.carouselIndex() + this.carouselPageSize),
  );

  prev() {
    this.carouselIndex.update((i) => Math.max(0, i - 1));
  }
  next() {
    this.carouselIndex.update((i) =>
      Math.min(this.relatedProducts.length - this.carouselPageSize, i + 1),
    );
  }
}
