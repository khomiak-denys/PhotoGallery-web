import { Component } from '@angular/core';
import { AlbumsTableComponent } from '../features/albums/albums-table.component';

@Component({
  selector: 'app-albums-page',
  standalone: true,
  imports: [AlbumsTableComponent],
  template: `<app-albums-table></app-albums-table>`
})
export class AlbumsPageComponent {}
