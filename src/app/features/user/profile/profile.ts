import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthStore } from '../../../core/auth/auth-store';

interface Address {
  _id: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  protected readonly authStore = inject(AuthStore);

  protected readonly addresses = signal<Address[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly success = signal('');

  // Add address form state
  protected readonly newAddress = signal({
    street: '',
    city: '',
    country: 'USA',
    zipCode: '',
  });

  ngOnInit(): void {
    if (!this.authStore.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/profile' } });
      return;
    }
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.loading.set(true);
    this.error.set('');
    this.http.get<any>('http://localhost:3001/api/v1/users/addresses').subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.addresses.set(res.data);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load addresses', err);
        this.error.set('Failed to load saved addresses.');
        this.loading.set(false);
      },
    });
  }

  addAddress(event: Event): void {
    event.preventDefault();
    const addr = this.newAddress();
    if (!addr.street || !addr.city || !addr.zipCode) {
      this.error.set('Please fill out all required fields.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.post<any>('http://localhost:3001/api/v1/users/addresses', addr).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.addresses.update((list) => [...list, res.data]);
          this.success.set('Address added successfully!');
          this.newAddress.set({
            street: '',
            city: '',
            country: 'USA',
            zipCode: '',
          });
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to add address', err);
        this.error.set('Failed to save address.');
        this.loading.set(false);
      },
    });
  }

  deleteAddress(id: string): void {
    if (!confirm('Are you sure you want to delete this address?')) return;

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    this.http.delete<any>(`http://localhost:3001/api/v1/users/addresses/${id}`).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.addresses.update((list) => list.filter((a) => a._id !== id));
          this.success.set('Address deleted successfully.');
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to delete address', err);
        this.error.set('Failed to delete address.');
        this.loading.set(false);
      },
    });
  }
}
