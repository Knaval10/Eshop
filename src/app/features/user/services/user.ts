// features/user/services/user.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient); // Angular 21 uses inject() instead of constructor injection
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // GET all users
  private users$?: Observable<User[]>;

  // GET all users (cached)
  getUsers(): Observable<User[]> {
    if (!this.users$) {
      this.users$ = this.http.get<User[]>(`${this.apiUrl}/users`).pipe(shareReplay(1));
    }
    return this.users$;
  }

  // GET single user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // POST create new user
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // PUT update user
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user);
  }

  // DELETE user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
