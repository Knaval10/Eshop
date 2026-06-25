import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth-store';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = signal({
    email: '',
    password: '',
  });
  protected readonly error = signal('');

  protected submit(): void {
    this.error.set('');
    const result = this.authStore.login(this.form());

    if (!result.ok) {
      this.error.set(result.message);
      return;
    }

    const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/';
    this.router.navigateByUrl(redirect);
  }
}
