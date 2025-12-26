import { Component } from '@angular/core';
import { MyAlbumsComponent } from '../features/albums/my-albums.component';

@Component({
  selector: 'app-my-albums-page',
  standalone: true,
  imports: [MyAlbumsComponent],
  template: `<app-my-albums></app-my-albums>`
})
export class MyAlbumsPageComponent {}
