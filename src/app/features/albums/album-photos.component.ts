import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Album, AlbumPhoto } from '../../shared/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-album-photos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent {
  album: Album | null = null;
  photos: AlbumPhoto[] = [];
  error = '';
  page = 1;
  readonly pageSize = 5;
  canNext = true;
  selectedUrl: string | null = null;

  constructor(private api: ApiService, private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAlbum(id);
      this.loadPhotos(id);
    } else {
      this.error = 'Невірний ідентифікатор альбому.';
    }
  }

  get canReact(): boolean {
    return this.auth.isLoggedIn();
  }

  get canDelete(): boolean {
    return this.auth.isLoggedIn();
  }

  get albumId(): string {
    return this.route.snapshot.paramMap.get('id') ?? '';
  }

  loadAlbum(id: string): void {
    this.api.getAlbumById(id).subscribe({
      next: (album) => (this.album = album),
      error: () => (this.error = 'Не вдалося завантажити альбом.')
    });
  }

  loadPhotos(id: string): void {
    this.error = '';
    this.api.getAlbumPhotos(id, { page: this.page, pageSize: this.pageSize }).subscribe({
      next: (photos) => {
        this.photos = photos;
        this.canNext = photos.length === this.pageSize;
      },
      error: () => (this.error = 'Не вдалося завантажити фото.')
    });
  }

  prev(): void {
    if (this.page > 1) {
      this.page -= 1;
      this.loadPhotos(this.albumId);
    }
  }

  next(): void {
    if (this.canNext) {
      this.page += 1;
      this.loadPhotos(this.albumId);
    }
  }

  react(photoId: string, isPositive: boolean): void {
    if (!this.canReact) {
      return;
    }
    this.api.likePhoto(photoId, isPositive).subscribe({
      next: () => this.loadPhotos(this.albumId),
      error: () => (this.error = 'Не вдалося зберегти реакцію.')
    });
  }

  deletePhoto(photoId: string): void {
    if (!this.canDelete) {
      return;
    }
    this.api.deletePhoto(photoId).subscribe({
      next: () => this.loadPhotos(this.albumId),
      error: () => (this.error = 'Не вдалося видалити фото.')
    });
  }

  openPreview(url: string): void {
    this.selectedUrl = url;
  }

  closePreview(): void {
    this.selectedUrl = null;
  }
}
