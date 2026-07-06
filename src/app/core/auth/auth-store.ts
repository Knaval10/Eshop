import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

export interface AuthSessionUser {
  name: string;
  email: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResult {
  ok: boolean;
  message: string;
}

const SESSION_KEY = 'eshop_auth_session_v1';
const TOKEN_KEY = 'eshop_jwt_token';
const LEGACY_USERS_KEY = 'eshop_auth_users_v1';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/api/v1';

  readonly currentUser = signal<AuthSessionUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.restoreSession();
  }

  register(payload: RegisterPayload): Observable<AuthResult> {
    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!name || !email || !password) {
      return of({ ok: false, message: 'All fields are required.' });
    }

    return this.http.post<any>(`${this.apiUrl}/auth/register`, { name, email, password }).pipe(
      switchMap(() => this.login({ email, password })),
      catchError((err) => {
        return of({ ok: false, message: err?.error?.message || 'Registration failed.' });
      })
    );
  }

  login(payload: LoginPayload): Observable<AuthResult> {
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      return of({ ok: false, message: 'Email and password are required.' });
    }

    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      map((res) => {
        if (res && res.success && res.token) {
          const sessionUser: AuthSessionUser = {
            name: res.data.name,
            email: res.data.email,
          };
          this.currentUser.set(sessionUser);
          this.persistSession(sessionUser, res.token);
          return { ok: true, message: 'Login successful.' };
        }
        return { ok: false, message: res?.message || 'Invalid response from server.' };
      }),
      catchError((err) => {
        return of({ ok: false, message: err?.error?.message || 'Invalid email or password.' });
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    if (!this.canUseStorage()) {
      return;
    }
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_USERS_KEY);
  }

  private restoreSession(): void {
    if (!this.canUseStorage()) {
      return;
    }

    // Proactively clean up legacy plain-text credentials stored in local storage
    if (localStorage.getItem(LEGACY_USERS_KEY)) {
      localStorage.removeItem(LEGACY_USERS_KEY);
    }

    const token = localStorage.getItem(TOKEN_KEY);
    const serialized = localStorage.getItem(SESSION_KEY);
    if (!token || !serialized) {
      this.logout();
      return;
    }

    try {
      const parsed = JSON.parse(serialized) as AuthSessionUser;
      if (parsed?.email && parsed?.name) {
        this.currentUser.set({ name: parsed.name, email: parsed.email });
      } else {
        this.logout();
      }
    } catch {
      this.logout();
    }
  }

  private persistSession(user: AuthSessionUser, token: string): void {
    if (!this.canUseStorage()) {
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  }

  private canUseStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
