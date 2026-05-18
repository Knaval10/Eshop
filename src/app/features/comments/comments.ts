import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsStore } from '../../core/store/comments-store';

@Component({
  selector: 'app-comments',
  imports: [FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comments implements OnInit {
  protected readonly store = inject(CommentsStore);

  protected readonly search = signal('');
  protected readonly pageSize = 12;
  protected readonly currentPage = signal(1);

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const all = this.store.comments();
    if (!q) return all;
    return all.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q),
    );
  });

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize)),
  );

  protected readonly visible = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
    this.store.load();
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.currentPage.set(1);
  }

  prevPage(): void {
    this.currentPage.update((p) => Math.max(1, p - 1));
  }
  nextPage(): void {
    this.currentPage.update((p) => Math.min(this.pageCount(), p + 1));
  }
}
