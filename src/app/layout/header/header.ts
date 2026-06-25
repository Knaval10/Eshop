import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartStore } from '../../features/cart/cart';
import { CommentsStore } from '../../core/store/comments-store';
import { AuthStore } from '../../core/auth/auth-store';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  protected readonly commentsStore = inject(CommentsStore);
  protected readonly cartStore = inject(CartStore);
  protected readonly authStore = inject(AuthStore);

  protected logout(): void {
    this.authStore.logout();
    this.cartStore.clear();
    this.router.navigateByUrl('/');
  }
}
