import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { AlbumsPageComponent } from './pages/albums-page.component';
import { MyAlbumsPageComponent } from './pages/my-albums-page.component';
import { AlbumViewPageComponent } from './pages/album-view-page.component';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'albums', component: AlbumsPageComponent },
  { path: 'albums/:id', component: AlbumViewPageComponent },
  { path: 'my-albums', component: MyAlbumsPageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'albums' }
];
