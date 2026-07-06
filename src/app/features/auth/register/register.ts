import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth-store';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = signal({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  protected readonly error = signal('');

  protected submit(): void {
    this.error.set('');

    if (this.form().password !== this.form().confirmPassword) {
      this.error.set('Passwords do not match.');
      return;
    }

    this.authStore
      .register({
        name: this.form().name,
        email: this.form().email,
        password: this.form().password,
      })
      .subscribe({
        next: (result) => {
          if (!result.ok) {
            this.error.set(result.message);
            return;
          }

          const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/';
          this.router.navigateByUrl(redirect);
        },
        error: () => {
          this.error.set('Registration failed. Please try again.');
        },
      });
  }
}
