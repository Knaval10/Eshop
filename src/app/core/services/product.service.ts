import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/v1';

  getProducts(): Observable<BackendProduct[]> {
    return this.http.get<{ success: boolean; data: BackendProduct[] }>(`${this.apiUrl}/products`).pipe(
      map((res) => res.data || [])
    );
  }

  getProductById(id: string): Observable<BackendProduct> {
    return this.http.get<{ success: boolean; data: BackendProduct }>(`${this.apiUrl}/products/${id}`).pipe(
      map((res) => res.data)
    );
  }

  getCategories(): Observable<any[]> {
    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/categories`).pipe(
      map((res) => res.data || [])
    );
  }

  getHomeBanners(): Observable<any[]> {
    return this.http.get<{ success: boolean; data: any[] }>(`${this.apiUrl}/home/banners`).pipe(
      map((res) => res.data || [])
    );
  }

  getHomeSections(): Observable<any> {
    return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/home/sections`).pipe(
      map((res) => res.data || { featured: [], newArrivals: [], bestSellers: [] })
    );
  }

  getAboutData(): Observable<any> {
    return this.http.get<{ success: boolean; data: any }>(`${this.apiUrl}/about`).pipe(
      map((res) => res.data)
    );
  }

  getProductReviews(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}/reviews`);
  }

  addProductReview(productId: string, rating: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/products/${productId}/reviews`, { rating, comment });
  }
}
