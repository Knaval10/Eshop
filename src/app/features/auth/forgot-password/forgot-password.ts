import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassword {
  private readonly http = inject(HttpClient);

  protected readonly email = signal('');
  protected readonly error = signal('');
  protected readonly success = signal('');

  protected submit(): void {
    this.error.set('');
    this.success.set('');
    const emailVal = this.email().trim();
    if (!emailVal) return;

    this.http.post<any>('http://localhost:3001/api/v1/auth/forgot-password', { email: emailVal }).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.success.set('Reset link sent to your email! Please check your inbox.');
          this.email.set('');
        } else {
          this.error.set(res.message || 'Failed to send reset link.');
        }
      },
      error: (err) => {
        console.error('Failed to request password reset', err);
        this.error.set(err.error?.message || 'Failed to send reset link.');
      },
    });
  }
}
