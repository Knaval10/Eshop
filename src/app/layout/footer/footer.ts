import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly http = inject(HttpClient);

  protected readonly email = signal('');
  protected readonly error = signal('');
  protected readonly success = signal('');
  protected readonly loading = signal(false);

  protected subscribeNewsletter(event: Event): void {
    event.preventDefault();
    const emailVal = this.email().trim();
    if (!emailVal) return;

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.post<any>('http://localhost:3001/api/v1/newsletter/subscribe', { email: emailVal }).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.success.set('Thank you for subscribing!');
          this.email.set('');
        } else {
          this.error.set(res.message || 'Failed to subscribe.');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to subscribe', err);
        this.error.set('Failed to subscribe. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
