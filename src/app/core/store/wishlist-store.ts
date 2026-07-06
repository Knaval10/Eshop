import { Injectable, computed, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '../auth/auth-store';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

@Injectable({ providedIn: 'root' })
export class WishlistStore {
  private readonly http = inject(HttpClient);
  private readonly authStore = inject(AuthStore);
  private readonly apiUrl = 'http://localhost:3001/api/v1/wishlist';

  readonly items = signal<WishlistItem[]>([]);
  readonly count = computed(() => this.items().length);
  readonly hasItems = computed(() => this.items().length > 0);

  constructor() {
    effect(() => {
      if (this.authStore.isAuthenticated()) {
        this.loadWishlist();
      } else {
        this.items.set([]);
      }
    });
  }

  loadWishlist(): void {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          const mapped = res.data.map((item: any) => ({
            id: item._id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=500',
            stock: item.stock ?? 10,
          }));
          this.items.set(mapped);
        }
      },
      error: (err) => console.error('Failed to load wishlist', err),
    });
  }

  addToWishlist(productId: string | number): void {
    if (!this.authStore.isAuthenticated()) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    const idStr = String(productId);
    // Optimistic UI update
    const alreadyIn = this.items().some((item) => String(item.id) === idStr);
    if (alreadyIn) return;

    this.http.post<any>(this.apiUrl, { productId: idStr }).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.loadWishlist();
        }
      },
      error: (err) => console.error('Failed to add item to wishlist', err),
    });
  }

  removeFromWishlist(productId: string | number): void {
    if (!this.authStore.isAuthenticated()) return;
    const idStr = String(productId);

    this.http.delete<any>(`${this.apiUrl}/${idStr}`).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.loadWishlist();
        }
      },
      error: (err) => console.error('Failed to remove item from wishlist', err),
    });
  }

  toggleWishlist(productId: string | number): void {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  isInWishlist(productId: string | number): boolean {
    const idStr = String(productId);
    return this.items().some((item) => String(item.id) === idStr);
  }

  clear(): void {
    this.items.set([]);
  }
}
