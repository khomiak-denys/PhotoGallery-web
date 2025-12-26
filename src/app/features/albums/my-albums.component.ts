import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Album } from '../../shared/models';

@Component({
  selector: 'app-my-albums',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent {
  albums: Album[] = [];
  error = '';
  message = '';
  page = 1;
  readonly pageSize = 5;
  canNext = true;
  newAlbumName = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.error = '';
    this.api.getMyAlbums({ page: this.page, pageSize: this.pageSize }).subscribe({
      next: (albums) => {
        this.albums = albums;
        this.canNext = albums.length === this.pageSize;
      },
      error: () => (this.error = 'Не вдалося завантажити ваші альбоми.')
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

  create(): void {
    this.error = '';
    this.message = '';
    if (!this.newAlbumName.trim()) {
      this.error = 'Назва альбому обов\'язкова.';
      return;
    }
    this.api.createAlbum(this.newAlbumName.trim()).subscribe({
      next: () => {
        this.message = 'Альбом створено.';
        this.newAlbumName = '';
        this.load();
      },
      error: () => (this.error = 'Не вдалося створити альбом.')
    });
  }

  deleteAlbum(id: string): void {
    this.error = '';
    this.message = '';
    this.api.deleteAlbum(id).subscribe({
      next: () => {
        this.message = 'Альбом видалено.';
        this.load();
      },
      error: () => (this.error = 'Не вдалося видалити альбом.')
    });
  }
}
