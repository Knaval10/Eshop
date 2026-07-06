import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly http = inject(HttpClient);

  protected readonly form = signal({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  protected readonly error = signal('');
  protected readonly success = signal('');
  protected readonly loading = signal(false);

  protected submit(event: Event): void {
    event.preventDefault();
    const data = this.form();
    if (!data.name || !data.email || !data.subject || !data.message) {
      this.error.set('Please fill out all required fields.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.post<any>('http://localhost:3001/api/v1/contact', data).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.success.set('Your message has been sent successfully. We will get back to you soon!');
          this.form.set({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          this.error.set(res.message || 'Failed to send message.');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to send contact form', err);
        this.error.set('Failed to send message. Please try again later.');
        this.loading.set(false);
      },
    });
  }
}
