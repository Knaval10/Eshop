import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

type PaymentMethod = 'bank' | 'cod' | 'paypal';

interface OrderItem {
  readonly name: string;
  readonly variant: string;
  readonly quantity: number;
  readonly price: number;
  readonly image: string;
}

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
  protected readonly showLogin = signal(false);
  protected readonly showCoupon = signal(false);
  protected readonly createAccount = signal(false);
  protected readonly payment = signal<PaymentMethod>('bank');

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

  protected readonly items = signal<OrderItem[]>([
    {
      name: 'Pinnapple Macbook Pro 2022',
      variant: 'M1 / 512GB',
      quantity: 3,
      price: 582.17,
      image:
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=60',
    },
  ]);

  protected readonly shipping = signal(9.5);

  protected readonly subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0),
  );

  protected readonly total = computed(() => this.subtotal() + this.shipping());

  protected setPayment(method: PaymentMethod): void {
    this.payment.set(method);
  }

  protected placeOrder(): void {
    // wiring point for the order service
    console.log('Placing order', {
      billing: this.billing(),
      payment: this.payment(),
      total: this.total(),
    });
  }
}
