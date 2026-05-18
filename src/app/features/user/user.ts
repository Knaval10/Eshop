import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentsStore } from '../../core/store/comments-store';
import { UserService } from './services/user';
import { User as UserModel } from './models/user';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class User implements OnInit {
  private readonly userService = inject(UserService);
  protected readonly commentsStore = inject(CommentsStore);

  protected readonly users = signal<UserModel[]>([]);
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string>('');

  /**
   * Comment counts keyed by userId. JSONPlaceholder convention:
   * userId N owns posts ((N-1)*10 + 1) .. (N*10).
   */
  protected readonly commentsByUserId = computed(() => {
    const map = new Map<number, number>();
    for (const c of this.commentsStore.comments()) {
      const userId = Math.ceil(c.postId / 10);
      map.set(userId, (map.get(userId) ?? 0) + 1);
    }
    return map;
  });

  protected readonly latestComments = computed(() => this.commentsStore.comments().slice(0, 5));

  ngOnInit() {
    this.fetchUsers();
    // Pulls from the shared store; no-op if another component already loaded it.
    this.commentsStore.load();
  }

  fetchUsers() {
    this.loading.set(true);
    this.error.set('');
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to fetch users');
        this.loading.set(false);
      },
    });
  }

  commentCountFor(userId: number): number {
    return this.commentsByUserId().get(userId) ?? 0;
  }
}
