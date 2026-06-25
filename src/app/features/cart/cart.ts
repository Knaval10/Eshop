import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  readonly hasItems = computed(() => this.items().length > 0);

  addItem(item: Omit<CartItem, 'quantity'>, quantity = 1): void {
    const safeQuantity = Math.max(1, quantity);
    this.items.update((items) => {
      const index = items.findIndex((cartItem) => cartItem.id === item.id);
      if (index === -1) {
        return [...items, { ...item, quantity: safeQuantity }];
      }

      const next = [...items];
      next[index] = {
        ...next[index],
        quantity: next[index].quantity + safeQuantity,
      };
      return next;
    });
  }

  incrementItem(id: string): void {
    this.items.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }

  decrementItem(id: string): void {
    this.items.update((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  removeItem(id: string): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.items.set([]);
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
