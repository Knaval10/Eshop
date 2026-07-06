# E-Shop Backend Remaining APIs Contract (v1)

This document specifies the remaining backend APIs required to support the various sections and pages of the E-Shop frontend. This contract serves as a development specification for building the remaining endpoints.

---

## Endpoint Index

### 1. Home Page Section
* [GET /api/v1/home/banners](#11-get-home-banners)
* [GET /api/v1/home/sections](#12-get-home-sections-featured--trending)

### 2. About Page Section
* [GET /api/v1/about](#21-get-about-page-data)

### 3. Wishlist Management
* [GET /api/v1/wishlist](#31-get-user-wishlist)
* [POST /api/v1/wishlist](#32-add-to-wishlist)
* [DELETE /api/v1/wishlist/:productId](#33-remove-from-wishlist)

### 4. Product Reviews & Ratings
* [GET /api/v1/products/:id/reviews](#41-get-product-reviews)
* [POST /api/v1/products/:id/reviews](#42-add-product-review)

### 5. Advanced Checkout & Payments
* [POST /api/v1/checkout/validate-coupon](#51-validate-coupon-code)
* [POST /api/v1/checkout/shipping-methods](#52-get-shipping-methods-and-rates)
* [POST /api/v1/checkout/create-payment-intent](#53-create-payment-intent-stripe-integration)
* [POST /api/v1/checkout/webhook](#54-payment-gateway-webhook-stripe)

### 6. User Address & Password Recovery
* [GET /api/v1/users/addresses](#61-get-saved-addresses)
* [POST /api/v1/users/addresses](#62-save-new-address)
* [DELETE /api/v1/users/addresses/:id](#63-delete-saved-address)
* [POST /api/v1/auth/forgot-password](#64-forgot-password)
* [POST /api/v1/auth/reset-password/:token](#65-reset-password-with-token)

### 7. Support & Newsletter
* [POST /api/v1/contact](#71-submit-contact-form)
* [POST /api/v1/newsletter/subscribe](#72-newsletter-subscription)

---

## 1. Home Page Section

### 1.1 Get Home Banners
* **Method**: `GET`
* **Route**: `/api/v1/home/banners`
* **Headers**: `None`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "banner-001",
      "imageUrl": "https://example.com/images/banner1.jpg",
      "title": "Summer Collection 2026",
      "subtitle": "Get up to 50% off on all summer essentials",
      "link": "/products?category=summer-collection"
    }
  ]
}
```

### 1.2 Get Home Sections (Featured & Trending)
* **Method**: `GET`
* **Route**: `/api/v1/home/sections`
* **Headers**: `None`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "featured": [
      {
        "_id": "6a38cee1d7034eb72fb71359",
        "name": "PlayStation 5",
        "price": 599,
        "imageUrl": "https://example.com/images/ps5.jpg"
      }
    ],
    "newArrivals": [],
    "bestSellers": []
  }
}
```

---

## 2. About Page Section

### 2.1 Get About Page Data
* **Method**: `GET`
* **Route**: `/api/v1/about`
* **Headers**: `None`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "story": "Founded in 2024, E-Shop has been committed to providing premium products globally...",
    "stats": {
      "happyCustomers": "100k+",
      "productsSold": "1M+",
      "countriesServed": "50+"
    },
    "team": [
      {
        "name": "Jane Doe",
        "role": "CEO & Founder",
        "imageUrl": "https://example.com/images/jane.jpg"
      }
    ]
  }
}
```

---

## 3. Wishlist Management

### 3.1 Get User Wishlist
* **Method**: `GET`
* **Route**: `/api/v1/wishlist`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a38cee1d7034eb72fb71359",
      "name": "PlayStation 5",
      "price": 599
    }
  ]
}
```

### 3.2 Add to Wishlist
* **Method**: `POST`
* **Route**: `/api/v1/wishlist`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "productId": "6a38cee1d7034eb72fb71359"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Product added to wishlist"
}
```

### 3.3 Remove from Wishlist
* **Method**: `DELETE`
* **Route**: `/api/v1/wishlist/:productId`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Product removed from wishlist"
}
```

---

## 4. Product Reviews & Ratings

### 4.1 Get Product Reviews
* **Method**: `GET`
* **Route**: `/api/v1/products/:id/reviews`
* **Headers**: `None`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "averageRating": 4.5,
  "totalReviews": 12,
  "data": [
    {
      "_id": "rev-001",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Amazing quality, highly recommend!",
      "createdAt": "2026-07-02T10:00:00.000Z"
    }
  ]
}
```

### 4.2 Add Product Review
* **Method**: `POST`
* **Route**: `/api/v1/products/:id/reviews`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "rating": 5,
  "comment": "Incredible value for the price!"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "rev-002",
    "user": "6a45f1779b12bc448d1261e3",
    "product": "6a38cee1d7034eb72fb71359",
    "rating": 5,
    "comment": "Incredible value for the price!",
    "createdAt": "2026-07-03T10:00:00.000Z"
  }
}
```

---

## 5. Advanced Checkout & Payments

### 5.1 Validate Coupon Code
* **Method**: `POST`
* **Route**: `/api/v1/checkout/validate-coupon`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "code": "SUMMER50"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "code": "SUMMER50",
    "discountType": "percentage",
    "discountValue": 50,
    "minPurchase": 100
  }
}
```

### 5.2 Get Shipping Methods and Rates
* **Method**: `POST`
* **Route**: `/api/v1/checkout/shipping-methods`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "shippingAddress": {
    "city": "Metropolis",
    "country": "USA",
    "zipCode": "12345"
  }
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "ship-std",
      "name": "Standard Shipping",
      "price": 5.99,
      "estimatedDays": "3-5 business days"
    },
    {
      "id": "ship-exp",
      "name": "Express Shipping",
      "price": 15.00,
      "estimatedDays": "1-2 business days"
    }
  ]
}
```

### 5.3 Create Payment Intent (Stripe Integration)
* **Method**: `POST`
* **Route**: `/api/v1/checkout/create-payment-intent`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "couponCode": "SUMMER50",
  "shippingMethodId": "ship-std"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "clientSecret": "pi_1Gux2y2eZvKYlo2C7Y..."
}
```

### 5.4 Payment Gateway Webhook (Stripe)
* **Method**: `POST`
* **Route**: `/api/v1/checkout/webhook`
* **Headers**: `Stripe-Signature: t=1492...,v1=...`
* **Request Body**: `Stripe Event Object (raw binary buffer)`
* **Success Response (200 OK)**:
```json
{
  "received": true
}
```

---

## 6. User Address & Password Recovery

### 6.1 Get Saved Addresses
* **Method**: `GET`
* **Route**: `/api/v1/users/addresses`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "addr-001",
      "street": "123 Main St",
      "city": "Metropolis",
      "country": "USA",
      "zipCode": "12345",
      "isDefault": true
    }
  ]
}
```

### 6.2 Save New Address
* **Method**: `POST`
* **Route**: `/api/v1/users/addresses`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "street": "456 Oak St",
  "city": "Metropolis",
  "country": "USA",
  "zipCode": "12345",
  "isDefault": false
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "addr-002",
    "street": "456 Oak St",
    "city": "Metropolis",
    "country": "USA",
    "zipCode": "12345",
    "isDefault": false
  }
}
```

### 6.3 Delete Saved Address
* **Method**: `DELETE`
* **Route**: `/api/v1/users/addresses/:id`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

### 6.4 Forgot Password
* **Method**: `POST`
* **Route**: `/api/v1/auth/forgot-password`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "email": "john@example.com"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password reset token sent to your email"
}
```

### 6.5 Reset Password with Token
* **Method**: `POST`
* **Route**: `/api/v1/auth/reset-password/:token`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "password": "newSecurePassword123"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## 7. Support & Newsletter

### 7.1 Submit Contact Form
* **Method**: `POST`
* **Route**: `/api/v1/contact`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Bulk order inquiry",
  "message": "Hello, I would like to inquire about placing a bulk order for..."
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### 7.2 Newsletter Subscription
* **Method**: `POST`
* **Route**: `/api/v1/newsletter/subscribe`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "email": "jane@example.com"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Subscribed to newsletter successfully."
}
```
