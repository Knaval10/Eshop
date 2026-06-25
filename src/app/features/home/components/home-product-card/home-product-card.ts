import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../core/auth/auth-store';
import { CartStore } from '../../../cart/cart';
import type { HomeProduct } from '../../models';

@Component({
  selector: 'app-home-product-card',
  templateUrl: './home-product-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProductCard {
  readonly product = input.required<HomeProduct>();
  private readonly authStore = inject(AuthStore);
  private readonly cartStore = inject(CartStore);
  private readonly router = inject(Router);

  protected addToCart(): void {
    if (!this.authStore.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/cart' } });
      return;
    }

    const product = this.product();
    this.cartStore.addItem({
      id: `home-${product.id}`,
      name: product.name,
      image: product.image,
      price: product.price,
    });
  }
}
