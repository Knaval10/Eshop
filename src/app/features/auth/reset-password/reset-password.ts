import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPassword {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly password = signal('');
  protected readonly error = signal('');
  protected readonly success = signal('');

  protected submit(): void {
    this.error.set('');
    this.success.set('');
    const passwordVal = this.password().trim();
    if (!passwordVal) return;

    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.error.set('Invalid or expired reset token.');
      return;
    }

    this.http.post<any>(`http://localhost:3001/api/v1/auth/reset-password/${token}`, { password: passwordVal }).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.success.set('Password reset successfully! Redirecting to login page...');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.error.set(res.message || 'Failed to reset password.');
        }
      },
      error: (err) => {
        console.error('Failed to reset password', err);
        this.error.set(err.error?.message || 'Failed to reset password.');
      },
    });
  }
}
