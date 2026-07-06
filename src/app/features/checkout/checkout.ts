import { ChangeDetectionStrategy, Component, computed, inject, signal, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartStore } from '../cart/cart';

type PaymentMethod = 'bank' | 'cod' | 'paypal';

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout implements OnInit {
  private readonly cartStore = inject(CartStore);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  protected readonly showLogin = signal(false);
  protected readonly showCoupon = signal(false);
  protected readonly createAccount = signal(false);
  protected readonly payment = signal<PaymentMethod>('bank');

  // Coupon state
  protected readonly couponInput = signal('');
  protected readonly appliedCoupon = signal<any>(null);
  protected readonly couponError = signal('');
  protected readonly couponSuccess = signal('');

  protected readonly billing = signal({
    firstName: '',
    lastName: '',
    company: '',
    country: 'US',
    street1: '',
    street2: '',
    city: '',
    state: 'WA',
    zip: '',
    phone: '',
    email: '',
    notes: '',
  });

  protected readonly items = computed(() => this.cartStore.items());

  // Shipping methods
  protected readonly shippingMethods = signal<ShippingMethod[]>([
    { id: 'ship-std', name: 'Standard Shipping', price: 5.99, estimatedDays: '3-5 business days' },
    { id: 'ship-exp', name: 'Express Shipping', price: 15.00, estimatedDays: '1-2 business days' },
  ]);
  protected readonly selectedShippingMethod = signal<ShippingMethod>(this.shippingMethods()[0]);

  protected readonly subtotal = computed(() => this.cartStore.subtotal());

  protected readonly discountAmount = computed(() => {
    const coupon = this.appliedCoupon();
    if (!coupon) return 0;
    if (coupon.discountType === 'percentage') {
      return (this.subtotal() * coupon.discountValue) / 100;
    }
    return coupon.discountValue || 0;
  });

  protected readonly shipping = computed(() => this.selectedShippingMethod().price);
  protected readonly total = computed(() => Math.max(0, this.subtotal() - this.discountAmount() + this.shipping()));

  constructor() {
    // Automatically load shipping methods when address elements change
    effect(() => {
      const bill = this.billing();
      if (bill.street1 && bill.city && bill.zip) {
        this.fetchShippingMethods();
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    // Optionally pre-validate or fetch initial settings
  }

  protected setPayment(method: PaymentMethod): void {
    this.payment.set(method);
  }

  protected applyCoupon(): void {
    const code = this.couponInput().trim();
    if (!code) {
      this.couponError.set('Please enter a coupon code.');
      this.couponSuccess.set('');
      return;
    }

    this.http.post<any>('http://localhost:3001/api/v1/checkout/validate-coupon', { code }).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.appliedCoupon.set(res.data);
          this.couponSuccess.set(`Coupon "${res.data.code}" applied successfully!`);
          this.couponError.set('');
        } else {
          this.couponError.set('Invalid coupon code.');
          this.couponSuccess.set('');
          this.appliedCoupon.set(null);
        }
      },
      error: (err) => {
        console.error('Failed to validate coupon', err);
        this.couponError.set('Invalid or expired coupon.');
        this.couponSuccess.set('');
        this.appliedCoupon.set(null);
      },
    });
  }

  protected fetchShippingMethods(): void {
    const bill = this.billing();
    const payload = {
      shippingAddress: {
        street: bill.street1 + (bill.street2 ? ', ' + bill.street2 : ''),
        city: bill.city,
        country: bill.country,
        zipCode: bill.zip,
      },
    };

    this.http.post<any>('http://localhost:3001/api/v1/checkout/shipping-methods', payload).subscribe({
      next: (res) => {
        if (res && res.success && res.data && res.data.length > 0) {
          this.shippingMethods.set(res.data);
          // Auto select first method if current one isn't in new list
          const currentId = this.selectedShippingMethod().id;
          const found = res.data.find((m: any) => m.id === currentId);
          if (found) {
            this.selectedShippingMethod.set(found);
          } else {
            this.selectedShippingMethod.set(res.data[0]);
          }
        }
      },
      error: (err) => console.error('Failed to fetch shipping methods', err),
    });
  }

  protected placeOrder(): void {
    const billingData = this.billing();
    const street = billingData.street1 + (billingData.street2 ? ', ' + billingData.street2 : '');
    const shippingAddress = {
      street: street || '123 Main St',
      city: billingData.city || 'Metropolis',
      country: billingData.country || 'USA',
      zipCode: billingData.zip || '12345',
    };

    // First call create payment intent to verify payment/price
    const paymentPayload = {
      couponCode: this.appliedCoupon()?.code || null,
      shippingMethodId: this.selectedShippingMethod().id,
    };

    this.http.post<any>('http://localhost:3001/api/v1/checkout/create-payment-intent', paymentPayload).subscribe({
      next: (paymentRes) => {
        // Payment intent created successfully, proceed to place order
        const orderPayload = {
          shippingAddress,
          couponCode: paymentPayload.couponCode,
          shippingMethodId: paymentPayload.shippingMethodId,
          paymentIntentId: paymentRes.clientSecret || 'mock_secret',
        };

        this.http.post<any>('http://localhost:3001/api/v1/orders', orderPayload).subscribe({
          next: () => {
            alert('Order placed successfully! Thank you for shopping with Eshop.');
            this.cartStore.clear();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Failed to place order', err);
            alert('Failed to place order. Please try again.');
          },
        });
      },
      error: (err) => {
        console.error('Failed to create payment intent', err);
        // Fallback directly to ordering if payment intent fails (e.g. for COD/bank)
        this.http.post<any>('http://localhost:3001/api/v1/orders', { shippingAddress }).subscribe({
          next: () => {
            alert('Order placed successfully! Thank you for shopping with Eshop.');
            this.cartStore.clear();
            this.router.navigate(['/']);
          },
          error: (err2) => {
            console.error('Failed to place order on fallback', err2);
            alert('Failed to place order. Please check that you are logged in.');
          },
        });
      },
    });
  }
}
