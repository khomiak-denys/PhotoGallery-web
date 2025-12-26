import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from './core/services/auth.service';
import { UserProfile } from './shared/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profile: UserProfile | null = this.auth.getProfile();
  role = this.auth.getRole();

  constructor(private auth: AuthService, private router: Router, destroyRef: DestroyRef) {
    this.auth.profile$.pipe(takeUntilDestroyed(destroyRef)).subscribe((profile) => {
      this.profile = profile;
      this.role = this.auth.getRole();
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
