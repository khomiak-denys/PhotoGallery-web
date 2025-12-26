import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Album } from '../../shared/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-albums-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './albums-table.component.html',
  styleUrls: ['./albums-table.component.css']
})
export class AlbumsTableComponent {
  albums: Album[] = [];
  error = '';
  page = 1;
  readonly pageSize = 5;
  canNext = true;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit(): void {
    this.load();
  }

  get isAdmin(): boolean {
    return this.auth.getRole().toLowerCase() === 'admin';
  }

  load(): void {
    this.error = '';
    this.api.getAlbums({ page: this.page, pageSize: this.pageSize }).subscribe({
      next: (albums) => {
        this.albums = albums;
        this.canNext = albums.length === this.pageSize;
      },
      error: () => (this.error = 'Не вдалося завантажити альбоми.')
    });
  }

  prev(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.load();
    }
  }

  next(): void {
    if (this.canNext) {
      this.page += 1;
      this.load();
    }
  }

  deleteAlbum(id: string): void {
    if (!this.isAdmin) {
      return;
    }
    this.api.deleteAlbum(id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Не вдалося видалити альбом.')
    });
  }
}
