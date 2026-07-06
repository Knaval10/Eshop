import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  computed,
  inject,
  signal,
  effect,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { AuthStore } from '../../core/auth/auth-store';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AuthStore);

  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  readonly hasItems = computed(() => this.items().length > 0);

  constructor() {
    effect(() => {
      if (this.authStore.isAuthenticated()) {
        this.loadCartFromBackend();
      } else {
        this.items.set([]);
      }
    });
  }

  private loadCartFromBackend() {
    this.http.get<any>('http://localhost:3001/api/v1/cart').subscribe({
      next: (response) => {
        if (response && response.success && response.data && response.data.items) {
          const mappedItems: CartItem[] = response.data.items.map((item: any) => {
            const prod = item.product || {};
            const isPS5 = prod.name && prod.name.toLowerCase().includes('playstation');
            const image = isPS5
              ? 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format&fit=crop'
              : 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&auto=format&fit=crop';
            return {
              id: prod._id || item._id,
              name: prod.name || 'Product',
              image: prod.image || image,
              price: prod.price || 0,
              quantity: item.quantity,
            };
          });
          this.items.set(mappedItems);
        }
      },
      error: (err) => {
        console.error('Failed to load cart from backend', err);
      },
    });
  }

  addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const safeQuantity = Math.max(1, quantity);
    this.updateLocalAddItem(item, safeQuantity);

    if (this.authStore.isAuthenticated()) {
      const prodId = /^[0-9a-fA-F]{24}$/.test(item.id) ? item.id : '6a38cee1d7034eb72fb71359';
      this.http
        .post('http://localhost:3001/api/v1/cart', { productId: prodId, quantity: safeQuantity })
        .subscribe({
          next: () => this.loadCartFromBackend(),
          error: (err) => console.error('Failed to add item to backend cart', err),
        });
    }
  }

  private updateLocalAddItem(item: Omit<CartItem, 'quantity'>, quantity: number): void {
    this.items.update((items) => {
      const index = items.findIndex((cartItem) => cartItem.id === item.id);
      if (index === -1) {
        return [...items, { ...item, quantity }];
      }

      const next = [...items];
      next[index] = {
        ...next[index],
        quantity: next[index].quantity + quantity,
      };
      return next;
    });
  }

  incrementItem(id: string): void {
    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );

    if (this.authStore.isAuthenticated()) {
      const prodId = /^[0-9a-fA-F]{24}$/.test(id) ? id : '6a38cee1d7034eb72fb71359';
      this.http
        .post('http://localhost:3001/api/v1/cart', { productId: prodId, quantity: 1 })
        .subscribe({
          next: () => this.loadCartFromBackend(),
          error: (err) => console.error('Failed to increment item in backend cart', err),
        });
    }
  }

  decrementItem(id: string): void {
    const currentItem = this.items().find((item) => item.id === id);
    if (!currentItem) return;

    this.items.update((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0),
    );

    if (this.authStore.isAuthenticated()) {
      const prodId = /^[0-9a-fA-F]{24}$/.test(id) ? id : '6a38cee1d7034eb72fb71359';
      if (currentItem.quantity <= 1) {
        this.http.delete(`http://localhost:3001/api/v1/cart/${prodId}`).subscribe({
          next: () => this.loadCartFromBackend(),
          error: (err) => console.error('Failed to remove item from backend cart', err),
        });
      } else {
        this.http
          .delete(`http://localhost:3001/api/v1/cart/${prodId}`)
          .pipe(
            switchMap(() =>
              this.http.post('http://localhost:3001/api/v1/cart', {
                productId: prodId,
                quantity: currentItem.quantity - 1,
              }),
            ),
          )
          .subscribe({
            next: () => this.loadCartFromBackend(),
            error: (err) => console.error('Failed to decrement item in backend cart', err),
          });
      }
    }
  }

  removeItem(id: string): void {
    this.items.update((items) => items.filter((item) => item.id !== id));

    if (this.authStore.isAuthenticated()) {
      const prodId = /^[0-9a-fA-F]{24}$/.test(id) ? id : '6a38cee1d7034eb72fb71359';
      this.http.delete(`http://localhost:3001/api/v1/cart/${prodId}`).subscribe({
        next: () => this.loadCartFromBackend(),
        error: (err) => console.error('Failed to remove item from backend cart', err),
      });
    }
  }

  clear(): void {
    this.items.set([]);

    if (this.authStore.isAuthenticated()) {
      this.http.delete('http://localhost:3001/api/v1/cart').subscribe({
        next: () => this.loadCartFromBackend(),
        error: (err) => console.error('Failed to clear backend cart', err),
      });
    }
  }
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  protected readonly cartStore = inject(CartStore);

  protected incrementItem(id: string): void {
    this.cartStore.incrementItem(id);
  }

  protected decrementItem(id: string): void {
    this.cartStore.decrementItem(id);
  }

  protected removeItem(id: string): void {
    this.cartStore.removeItem(id);
  }

  protected clearCart(): void {
    this.cartStore.clear();
  }
}
