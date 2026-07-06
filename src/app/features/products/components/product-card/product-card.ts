import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models';
import { WishlistStore } from '../../../../core/store/wishlist-store';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  protected readonly wishlistStore = inject(WishlistStore);

  readonly product = input.required<Product>();
  readonly compact = input<boolean>(false);
}
