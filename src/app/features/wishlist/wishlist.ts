import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistStore } from '../../core/store/wishlist-store';
import { CartStore } from '../cart/cart';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Wishlist {
  protected readonly wishlistStore = inject(WishlistStore);
  private readonly cartStore = inject(CartStore);

  protected addToCart(item: any): void {
    this.cartStore.addItem({
      id: item.id,
      name: item.name,
      image: item.imageUrl,
      price: item.price,
    }, 1);
    // Optionally remove from wishlist after adding to cart
    // this.wishlistStore.removeFromWishlist(item.id);
  }

  protected remove(id: string): void {
    this.wishlistStore.removeFromWishlist(id);
  }

  protected clear(): void {
    this.wishlistStore.items().forEach(item => {
      this.wishlistStore.removeFromWishlist(item.id);
    });
  }
}
