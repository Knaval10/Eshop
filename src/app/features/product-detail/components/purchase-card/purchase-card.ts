import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../core/auth/auth-store';
import { CartStore } from '../../../cart/cart';
import { ProductVariant } from '../../models';

@Component({
  selector: 'app-detail-purchase-card',
  imports: [],
  templateUrl: './purchase-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseCard {
  readonly productName = input.required<string>();
  readonly activeVariant = input.required<ProductVariant>();
  private readonly authStore = inject(AuthStore);
  private readonly cartStore = inject(CartStore);
  private readonly router = inject(Router);

  protected readonly quantity = signal(1);
  increment() {
    this.quantity.update((q) => q + 1);
  }
  decrement() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  protected addToCart(): void {
    if (!this.authStore.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/cart' } });
      return;
    }

    const variant = this.activeVariant();
    this.cartStore.addItem(
      {
        id: `detail-${this.productName()}-${variant.color}`,
        name: `${this.productName()} (${variant.color})`,
        image: variant.image,
        price: variant.price,
      },
      this.quantity(),
    );
    this.quantity.set(1);
  }
}
