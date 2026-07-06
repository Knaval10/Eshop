import { ChangeDetectionStrategy, Component, OnInit, inject, input, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { REVIEWS, TABS } from '../../data';
import { ProductService } from '../../../../core/services/product.service';
import { AuthStore } from '../../../../core/auth/auth-store';

@Component({
  selector: 'app-detail-product-tabs',
  imports: [DatePipe, RouterLink],
  templateUrl: './product-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTabs implements OnInit {
  readonly productId = input.required<string>();
  readonly productDescription = input<string>();

  private readonly productService = inject(ProductService);
  protected readonly authStore = inject(AuthStore);

  protected readonly tabs = TABS;
  protected readonly reviewsList = signal<any[]>([]);
  protected readonly activeTab = signal(0);

  // Form fields
  protected readonly selectedRating = signal(5);
  protected readonly newComment = signal('');

  constructor() {
    effect(() => {
      const id = this.productId();
      if (id) {
        this.loadReviews();
      }
    });
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    const id = this.productId();
    if (!id || id === 'mock') {
      // Set mock reviews if it's the mock product
      this.reviewsList.set(REVIEWS.map((r: any) => ({
        _id: r.author,
        userName: r.author,
        rating: r.rating,
        comment: r.body,
        createdAt: new Date().toISOString(),
      })));
      return;
    }
    this.productService.getProductReviews(id).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.reviewsList.set(res.data);
        }
      },
      error: (err) => console.error('Failed to load reviews', err),
    });
  }

  onCommentInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.newComment.set(target.value);
  }

  submitReview(event: Event): void {
    event.preventDefault();
    const id = this.productId();
    if (!id || id === 'mock') {
      alert('Cannot review mock product.');
      return;
    }
    const rating = this.selectedRating();
    const comment = this.newComment().trim();
    if (!comment) return;

    this.productService.addProductReview(id, rating, comment).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.newComment.set('');
          this.selectedRating.set(5);
          this.loadReviews();
        }
      },
      error: (err) => console.error('Failed to submit review', err),
    });
  }
}
