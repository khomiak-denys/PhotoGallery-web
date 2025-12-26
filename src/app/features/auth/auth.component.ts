import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../shared/models';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  profile: UserProfile | null = this.auth.getProfile();
  role = this.auth.getRole();

  loginForm = {
    login: '',
    password: ''
  };

  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router, destroyRef: DestroyRef) {
    this.auth.profile$.pipe(takeUntilDestroyed(destroyRef)).subscribe((profile) => {
      this.profile = profile;
      this.role = this.auth.getRole();
    });
  }

  login(): void {
    this.clearFeedback();
    this.auth.login(this.loginForm).subscribe({
      next: (response) => {
        this.profile = response;
        this.role = this.auth.getRole();
        this.message = 'Успішний вхід.';
        this.loginForm = { login: '', password: '' };
        this.router.navigateByUrl('/albums');
      },
      error: (err) => this.handleError(err)
    });
  }

  logout(): void {
    this.auth.logout();
    this.profile = null;
    this.role = '';
    this.message = 'Ви вийшли.';
  }

  private clearFeedback(): void {
    this.message = '';
    this.error = '';
  }

  private handleError(err: unknown): void {
    const message = err && typeof err === 'object' && 'message' in err ? String(err['message']) : '';
    this.error = message || 'Сталася помилка при запиті.';
  }
}
