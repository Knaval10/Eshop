import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CartStore } from '../../features/cart/cart';
import { CommentsStore } from '../../core/store/comments-store';
import { AuthStore } from '../../core/auth/auth-store';
import { WishlistStore } from '../../core/store/wishlist-store';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  protected readonly commentsStore = inject(CommentsStore);
  protected readonly cartStore = inject(CartStore);
  protected readonly authStore = inject(AuthStore);
  protected readonly wishlistStore = inject(WishlistStore);

  protected readonly searchVal = signal('');

  constructor() {
    // Keep search query signal in sync with router URL query parameters
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlTree = this.router.parseUrl(this.router.url);
        const search = urlTree.queryParams['search'] || '';
        this.searchVal.set(search);
      });

    // Also initialize from current URL immediately
    const urlTree = this.router.parseUrl(this.router.url);
    const search = urlTree.queryParams['search'] || '';
    this.searchVal.set(search);
  }

  protected onSearch(): void {
    const currentPath = this.router.url.split('?')[0];
    const targetPath = (currentPath === '/' || currentPath === '/products') ? currentPath : '/products';

    this.router.navigate([targetPath], {
      queryParams: { search: this.searchVal().trim() || null },
      queryParamsHandling: 'merge',
    });
  }


  protected logout(): void {
    this.authStore.logout();
    this.cartStore.clear();
    this.router.navigateByUrl('/');
  }
}

