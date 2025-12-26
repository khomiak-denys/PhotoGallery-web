import { Component } from '@angular/core';
import { AlbumPhotosComponent } from '../features/albums/album-photos.component';

@Component({
  selector: 'app-album-view-page',
  standalone: true,
  imports: [AlbumPhotosComponent],
  template: `<app-album-photos></app-album-photos>`
})
export class AlbumViewPageComponent {}
