import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BEST_SELLERS } from '../../data';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products-best-seller-carousel',
  imports: [ProductCard],
  templateUrl: './best-seller-carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BestSellerCarousel {
  protected readonly bestSellers = BEST_SELLERS;
  protected readonly carouselIndex = signal(0);
  protected readonly carouselPageSize = 4;

  protected readonly visible = computed(() => {
    const start = this.carouselIndex();
    return this.bestSellers.slice(start, start + this.carouselPageSize);
  });

  prev() {
    this.carouselIndex.update((i) => Math.max(0, i - 1));
  }
  next() {
    this.carouselIndex.update((i) =>
      Math.min(this.bestSellers.length - this.carouselPageSize, i + 1),
    );
  }
}
