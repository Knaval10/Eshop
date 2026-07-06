# E-Shop Backend API Contract (v1)

This document contains the API contract for the E-Shop platform backend (version 1) to assist in frontend integration.

## Base URL
* **Development**: `http://localhost:3001`
* **API Namespace**: `/api/v1`

---

## Authentication & Headers
For protected endpoints, include the JWT token in the `Authorization` header as a Bearer token:
```http
Authorization: Bearer <your_jwt_token_here>
```

---

## Endpoint Index

### 1. Authentication
* [POST /api/v1/auth/register](#11-register-user)
* [POST /api/v1/auth/login](#12-login-user)
* [POST /api/v1/auth/forgot-password](#13-forgot-password)
* [POST /api/v1/auth/reset-password/:token](#14-reset-password-with-token)

### 2. Users
* [GET /api/v1/users/profile](#21-get-profile)
* [GET /api/v1/users](#22-get-all-users)
* [GET /api/v1/users/addresses](#23-get-saved-addresses)
* [POST /api/v1/users/addresses](#24-save-new-address)
* [DELETE /api/v1/users/addresses/:id](#25-delete-saved-address)

### 3. Products
* [GET /api/v1/products](#31-get-all-products)
* [GET /api/v1/products/:id](#32-get-product-by-id)
* [POST /api/v1/products](#33-create-product)
* [PATCH /api/v1/products/:id](#34-update-product)
* [DELETE /api/v1/products/:id](#35-delete-product)
* [GET /api/v1/products/:id/reviews](#36-get-product-reviews)
* [POST /api/v1/products/:id/reviews](#37-add-product-review)

### 4. Categories
* [GET /api/v1/categories](#41-get-all-categories)
* [POST /api/v1/categories](#42-create-category)
* [PATCH /api/v1/categories/:id](#43-update-category)
* [DELETE /api/v1/categories/:id](#44-delete-category)

### 5. Shopping Cart
* [GET /api/v1/cart](#51-get-cart)
* [POST /api/v1/cart](#52-add-to-cart)
* [DELETE /api/v1/cart/:productId](#53-remove-from-cart)
* [DELETE /api/v1/cart](#54-clear-cart)

### 6. Orders
* [POST /api/v1/orders](#61-place-order)
* [GET /api/v1/orders](#62-get-my-orders)
* [GET /api/v1/orders/:id](#63-get-order-by-id)
* [PATCH /api/v1/orders/:id/status](#64-update-order-status)

### 7. Home Page Section
* [GET /api/v1/home/banners](#71-get-home-banners)
* [GET /api/v1/home/sections](#72-get-home-sections-featured--trending)

### 8. About Page Section
* [GET /api/v1/about](#81-get-about-page-data)

### 9. Wishlist Management
* [GET /api/v1/wishlist](#91-get-user-wishlist)
* [POST /api/v1/wishlist](#92-add-to-wishlist)
* [DELETE /api/v1/wishlist/:productId](#93-remove-from-wishlist)

### 10. Advanced Checkout & Payments
* [POST /api/v1/checkout/validate-coupon](#101-validate-coupon-code)
* [POST /api/v1/checkout/shipping-methods](#102-get-shipping-methods-and-rates)
* [POST /api/v1/checkout/create-payment-intent](#103-create-payment-intent-stripe-integration)
* [POST /api/v1/checkout/webhook](#104-payment-gateway-webhook-stripe)

### 11. Support & Newsletter
* [POST /api/v1/contact](#111-submit-contact-form)
* [POST /api/v1/newsletter/subscribe](#112-newsletter-subscription)

---

## 1. Authentication

### 1.1 Register User
* **Method**: `POST`
* **Route**: `/api/v1/auth/register`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45f1779b12bc448d1261e3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-07-02T05:04:55.360Z",
    "updatedAt": "2026-07-02T05:04:55.360Z"
  }
}
```

### 1.2 Login User
* **Method**: `POST`
* **Route**: `/api/v1/auth/login`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "6a45f1779b12bc448d1261e3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 1.3 Forgot Password
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
  "message": "Password reset token sent to your email",
  "token": "39475e8aab2e25ca87f6dfabdabda4f73732ddce"
}
```

### 1.4 Reset Password with Token
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

## 2. Users

### 2.1 Get Profile
* **Method**: `GET`
* **Route**: `/api/v1/users/profile`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45f1779b12bc448d1261e3",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-07-02T05:04:55.360Z",
    "updatedAt": "2026-07-02T05:04:55.360Z"
  }
}
```

### 2.2 Get All Users
* **Method**: `GET`
* **Route**: `/api/v1/users`
* **Headers**: `Authorization: Bearer <token>` (Admin authorization required)
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a45f1779b12bc448d1261e3",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  ]
}
```

### 2.3 Get Saved Addresses
* **Method**: `GET`
* **Route**: `/api/v1/users/addresses`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a4790426c5709dc4788b3dd",
      "street": "123 Test St",
      "city": "Testerville",
      "country": "Testland",
      "zipCode": "98765",
      "isDefault": true
    }
  ]
}
```

### 2.4 Save New Address
* **Method**: `POST`
* **Route**: `/api/v1/users/addresses`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "street": "123 Test St",
  "city": "Testerville",
  "country": "Testland",
  "zipCode": "98765",
  "isDefault": true
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a4790426c5709dc4788b3dd",
    "street": "123 Test St",
    "city": "Testerville",
    "country": "Testland",
    "zipCode": "98765",
    "isDefault": true
  }
}
```

### 2.5 Delete Saved Address
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

---

## 3. Products

### 3.1 Get All Products
* **Method**: `GET`
* **Route**: `/api/v1/products`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a38cee1d7034eb72fb71359",
      "name": "PlayStation 5",
      "price": 599,
      "description": "Sony gaming console",
      "stock": 10,
      "createdAt": "2026-07-03T04:05:39.865Z",
      "updatedAt": "2026-07-03T04:05:39.865Z"
    }
  ]
}
```

### 3.2 Get Product by ID
* **Method**: `GET`
* **Route**: `/api/v1/products/:id`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a38cee1d7034eb72fb71359",
    "name": "PlayStation 5",
    "price": 599,
    "description": "Sony gaming console",
    "stock": 10,
    "createdAt": "2026-07-03T04:05:39.865Z",
    "updatedAt": "2026-07-03T04:05:39.865Z"
  }
}
```

### 3.3 Create Product
* **Method**: `POST`
* **Route**: `/api/v1/products`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "name": "Nintendo Switch",
  "price": 299,
  "description": "Hybrid game console",
  "stock": 15
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45ecccc2d9e6e4b58a1111",
    "name": "Nintendo Switch",
    "price": 299,
    "description": "Hybrid game console",
    "stock": 15,
    "createdAt": "2026-07-03T05:00:00.000Z",
    "updatedAt": "2026-07-03T05:00:00.000Z"
  }
}
```

### 3.4 Update Product
* **Method**: `PATCH`
* **Route**: `/api/v1/products/:id`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**: (all fields optional)
```json
{
  "price": 279,
  "stock": 12
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45ecccc2d9e6e4b58a1111",
    "name": "Nintendo Switch",
    "price": 279,
    "description": "Hybrid game console",
    "stock": 12,
    "createdAt": "2026-07-03T05:00:00.000Z",
    "updatedAt": "2026-07-03T05:10:00.000Z"
  }
}
```

### 3.5 Delete Product
* **Method**: `DELETE`
* **Route**: `/api/v1/products/:id`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Product deleted"
}
```

### 3.6 Get Product Reviews
* **Method**: `GET`
* **Route**: `/api/v1/products/:id/reviews`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "averageRating": 4.5,
  "totalReviews": 12,
  "data": [
    {
      "_id": "6a489111b2f70a99c71a3de5",
      "userName": "John Doe",
      "rating": 5,
      "comment": "Excellent value for money!",
      "createdAt": "2026-07-03T10:15:30.000Z"
    }
  ]
}
```

### 3.7 Add Product Review
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
    "_id": "6a489111b2f70a99c71a3de5",
    "user": "6a45f1779b12bc448d1261e3",
    "product": "6a45ecccc2d9e6e4b58a1111",
    "rating": 5,
    "comment": "Incredible value for the price!",
    "createdAt": "2026-07-03T10:15:30.000Z"
  }
}
```

---

## 4. Categories

### 4.1 Get All Categories
* **Method**: `GET`
* **Route**: `/api/v1/categories`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a45ecccc2d9e6e4b58a0fb5",
      "name": "Electronics",
      "description": "Devices and gadgets"
    }
  ]
}
```

### 4.2 Create Category
* **Method**: `POST`
* **Route**: `/api/v1/categories`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "name": "Home Appliances",
  "description": "Kitchen and cleaning appliances"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45ecccc2d9e6e4b58a2222",
    "name": "Home Appliances",
    "description": "Kitchen and cleaning appliances",
    "createdAt": "2026-07-03T05:00:00.000Z",
    "updatedAt": "2026-07-03T05:00:00.000Z"
  }
}
```

### 4.3 Update Category
* **Method**: `PATCH`
* **Route**: `/api/v1/categories/:id`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "description": "Kitchen, cleaning, and cooling devices"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6a45ecccc2d9e6e4b58a2222",
    "name": "Home Appliances",
    "description": "Kitchen, cleaning, and cooling devices",
    "createdAt": "2026-07-03T05:00:00.000Z",
    "updatedAt": "2026-07-03T05:15:00.000Z"
  }
}
```

### 4.4 Delete Category
* **Method**: `DELETE`
* **Route**: `/api/v1/categories/:id`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Category deleted"
}
```

---

## 5. Shopping Cart

### 5.1 Get Cart
* **Method**: `GET`
* **Route**: `/api/v1/cart`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d1234",
    "user": "6a45f1779b12bc448d1261e3",
    "items": [
      {
        "_id": "6a47350ee16bd275a01d4dc3",
        "product": {
          "_id": "6a38cee1d7034eb72fb71359",
          "name": "PlayStation 5",
          "price": 599,
          "description": "Sony gaming console",
          "stock": 10
        },
        "quantity": 2
      }
    ],
    "createdAt": "2026-07-02T10:00:00.000Z",
    "updatedAt": "2026-07-03T05:00:00.000Z"
  }
}
```

### 5.2 Add to Cart
* **Method**: `POST`
* **Route**: `/api/v1/cart`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "productId": "6a38cee1d7034eb72fb71359",
  "quantity": 1
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d1234",
    "user": "6a45f1779b12bc448d1261e3",
    "items": [
      {
        "_id": "6a47350ee16bd275a01d4dc3",
        "product": "6a38cee1d7034eb72fb71359",
        "quantity": 3
      }
    ]
  }
}
```

### 5.3 Remove from Cart
* **Method**: `DELETE`
* **Route**: `/api/v1/cart/:productId`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d1234",
    "user": "6a45f1779b12bc448d1261e3",
    "items": []
  }
}
```

### 5.4 Clear Cart
* **Method**: `DELETE`
* **Route**: `/api/v1/cart`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## 6. Orders

### 6.1 Place Order
* **Method**: `POST`
* **Route**: `/api/v1/orders`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Metropolis",
    "country": "USA"
  }
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d9999",
    "user": "6a45f1779b12bc448d1261e3",
    "items": [
      {
        "product": "6a38cee1d7034eb72fb71359",
        "quantity": 2,
        "price": 599
      }
    ],
    "totalAmount": 1198,
    "status": "pending",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Metropolis",
      "country": "USA"
    },
    "createdAt": "2026-07-03T05:30:00.000Z",
    "updatedAt": "2026-07-03T05:30:00.000Z"
  }
}
```

### 6.2 Get My Orders
* **Method**: `GET`
* **Route**: `/api/v1/orders`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6864f8c4e93d71d48c7d9999",
      "user": "6a45f1779b12bc448d1261e3",
      "items": [
        {
          "product": "6a38cee1d7034eb72fb71359",
          "quantity": 2,
          "price": 599
        }
      ],
      "totalAmount": 1198,
      "status": "pending",
      "shippingAddress": {
        "street": "123 Main St",
        "city": "Metropolis",
        "country": "USA"
      },
      "createdAt": "2026-07-03T05:30:00.000Z"
    }
  ]
}
```

### 6.3 Get Order by ID
* **Method**: `GET`
* **Route**: `/api/v1/orders/:id`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d9999",
    "user": "6a45f1779b12bc448d1261e3",
    "items": [
      {
        "product": "6a38cee1d7034eb72fb71359",
        "quantity": 2,
        "price": 599
      }
    ],
    "totalAmount": 1198,
    "status": "pending",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Metropolis",
      "country": "USA"
    },
    "createdAt": "2026-07-03T05:30:00.000Z"
  }
}
```

### 6.4 Update Order Status
* **Method**: `PATCH`
* **Route**: `/api/v1/orders/:id/status`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json` (Admin authorization required)
* **Request Body**:
```json
{
  "status": "processing"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "6864f8c4e93d71d48c7d9999",
    "user": "6a45f1779b12bc448d1261e3",
    "items": [
      {
        "product": "6a38cee1d7034eb72fb71359",
        "quantity": 2,
        "price": 599
      }
    ],
    "totalAmount": 1198,
    "status": "processing",
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Metropolis",
      "country": "USA"
    },
    "createdAt": "2026-07-03T05:30:00.000Z",
    "updatedAt": "2026-07-03T05:45:00.000Z"
  }
}
```

---

## 7. Home Page Section

### 7.1 Get Home Banners
* **Method**: `GET`
* **Route**: `/api/v1/home/banners`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "banner-001",
      "imageUrl": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070",
      "title": "Summer Collection 2026",
      "subtitle": "Get up to 50% off on all summer essentials",
      "link": "/products?category=summer-collection"
    },
    {
      "id": "banner-002",
      "imageUrl": "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070",
      "title": "Tech Clearance Sale",
      "subtitle": "Unbelievable discounts on premium electronics",
      "link": "/products?category=electronics"
    }
  ]
}
```

### 7.2 Get Home Sections (Featured & Trending)
* **Method**: `GET`
* **Route**: `/api/v1/home/sections`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "featured": [
      {
        "_id": "6a45ecccc2d9e6e4b58a1111",
        "name": "Nintendo Switch",
        "price": 299,
        "description": "Hybrid game console",
        "stock": 15,
        "imageUrl": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
        "isFeatured": true
      }
    ],
    "newArrivals": [],
    "bestSellers": []
  }
}
```

---

## 8. About Page Section

### 8.1 Get About Page Data
* **Method**: `GET`
* **Route**: `/api/v1/about`
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
        "imageUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
      }
    ]
  }
}
```

---

## 9. Wishlist Management

### 9.1 Get User Wishlist
* **Method**: `GET`
* **Route**: `/api/v1/wishlist`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "6a45ecccc2d9e6e4b58a1111",
      "name": "Nintendo Switch",
      "price": 299,
      "stock": 15,
      "imageUrl": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
    }
  ]
}
```

### 9.2 Add to Wishlist
* **Method**: `POST`
* **Route**: `/api/v1/wishlist`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "productId": "6a45ecccc2d9e6e4b58a1111"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Product added to wishlist"
}
```

### 9.3 Remove from Wishlist
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

## 10. Advanced Checkout & Payments

### 10.1 Validate Coupon Code
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
    "minPurchase": 10
  }
}
```

### 10.2 Get Shipping Methods and Rates
* **Method**: `POST`
* **Route**: `/api/v1/checkout/shipping-methods`
* **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
* **Request Body**:
```json
{
  "shippingAddress": {
    "street": "123 Main St",
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
      "price": 15,
      "estimatedDays": "1-2 business days"
    }
  ]
}
```

### 10.3 Create Payment Intent (Stripe Integration)
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
  "clientSecret": "mock_pi_secret_2le2vadgl24_hs8dv06qux",
  "totalAmount": 305.49
}
```

### 10.4 Payment Gateway Webhook (Stripe)
* **Method**: `POST`
* **Route**: `/api/v1/checkout/webhook`
* **Request Body**: (Standard Stripe event JSON payload)
* **Success Response (200 OK)**:
```json
{
  "received": true
}
```

---

## 11. Support & Newsletter

### 11.1 Submit Contact Form
* **Method**: `POST`
* **Route**: `/api/v1/contact`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Bulk order inquiry",
  "message": "Hello, I would like to purchase in bulk. Do you offer additional discounts?"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Your message has been sent successfully."
}
```

### 11.2 Newsletter Subscription
* **Method**: `POST`
* **Route**: `/api/v1/newsletter/subscribe`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
```json
{
  "email": "subscriber@example.com"
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Subscribed to newsletter successfully."
}
```


