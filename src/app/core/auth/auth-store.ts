import { Injectable, computed, signal } from '@angular/core';

interface AuthUserRecord {
  name: string;
  email: string;
  password: string;
}

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

const USERS_KEY = 'eshop_auth_users_v1';
const SESSION_KEY = 'eshop_auth_session_v1';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly currentUser = signal<AuthSessionUser | null>(null);
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.restoreSession();
  }

  register(payload: RegisterPayload): AuthResult {
    const name = payload.name.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!name || !email || !password) {
      return { ok: false, message: 'All fields are required.' };
    }

    const users = this.readUsers();
    if (users.some((user) => user.email === email)) {
      return { ok: false, message: 'Email is already registered.' };
    }

    users.push({ name, email, password });
    this.writeUsers(users);

    const sessionUser: AuthSessionUser = { name, email };
    this.currentUser.set(sessionUser);
    this.persistSession(sessionUser);

    return { ok: true, message: 'Registration successful.' };
  }

  login(payload: LoginPayload): AuthResult {
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password) {
      return { ok: false, message: 'Email and password are required.' };
    }

    const users = this.readUsers();
    const match = users.find((user) => user.email === email && user.password === password);
    if (!match) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    const sessionUser: AuthSessionUser = {
      name: match.name,
      email: match.email,
    };
    this.currentUser.set(sessionUser);
    this.persistSession(sessionUser);

    return { ok: true, message: 'Login successful.' };
  }

  logout(): void {
    this.currentUser.set(null);
    if (!this.canUseStorage()) {
      return;
    }
    localStorage.removeItem(SESSION_KEY);
  }

  private restoreSession(): void {
    if (!this.canUseStorage()) {
      return;
    }

    const serialized = localStorage.getItem(SESSION_KEY);
    if (!serialized) {
      return;
    }

    try {
      const parsed = JSON.parse(serialized) as AuthSessionUser;
      if (parsed?.email && parsed?.name) {
        this.currentUser.set({ name: parsed.name, email: parsed.email });
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  private readUsers(): AuthUserRecord[] {
    if (!this.canUseStorage()) {
      return [];
    }

    const serialized = localStorage.getItem(USERS_KEY);
    if (!serialized) {
      return [];
    }

    try {
      const parsed = JSON.parse(serialized) as AuthUserRecord[];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter((user) => Boolean(user?.email && user?.password && user?.name));
    } catch {
      return [];
    }
  }

  private writeUsers(users: AuthUserRecord[]): void {
    if (!this.canUseStorage()) {
      return;
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private persistSession(user: AuthSessionUser): void {
    if (!this.canUseStorage()) {
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  private canUseStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
