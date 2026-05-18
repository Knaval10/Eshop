import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class CommentsStore {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/comments';

  readonly comments = signal<Comment[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string>('');

  readonly count = computed(() => this.comments().length);
  readonly hasData = computed(() => this.comments().length > 0);

  /** Loads comments once. Pass `force = true` to refetch. */
  load(force = false): void {
    if (!force && (this.hasData() || this.loading())) {
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.http.get<Comment[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.comments.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load comments. Please try again.');
        this.loading.set(false);
      },
    });
  }

  getById(id: number): Comment | undefined {
    return this.comments().find((c) => c.id === id);
  }

  getByPostId(postId: number): Comment[] {
    return this.comments().filter((c) => c.postId === postId);
  }

  clear(): void {
    this.comments.set([]);
    this.error.set('');
  }
}
