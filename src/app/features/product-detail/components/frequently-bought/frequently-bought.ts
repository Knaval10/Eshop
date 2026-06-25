import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../core/auth/auth-store';
import { CartStore } from '../../../cart/cart';
import { BUNDLE_DEFAULTS } from '../../data';

@Component({
  selector: 'app-detail-frequently-bought',
  imports: [],
  templateUrl: './frequently-bought.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentlyBought {
  protected readonly bundleItems = signal(BUNDLE_DEFAULTS);
  private readonly authStore = inject(AuthStore);
  private readonly cartStore = inject(CartStore);
  private readonly router = inject(Router);

  protected readonly bundleTotal = computed(() =>
    this.bundleItems().reduce((sum, i) => sum + (i.selected ? i.price : 0), 0),
  );

  toggle(id: number) {
    this.bundleItems.update((items) =>
      items.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)),
    );
  }

  protected addBundleToCart(): void {
    if (!this.authStore.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/cart' } });
      return;
    }

    const selected = this.bundleItems().filter((item) => item.selected);
    selected.forEach((item) => {
      this.cartStore.addItem({
        id: `bundle-${item.id}`,
        name: item.name,
        image: item.image,
        price: item.price,
      });
    });
  }
}
