import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = {
    firstName: '',
    lastName: '',
    login: '',
    password: ''
  };

  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.message = '';
    this.error = '';
    this.auth.register(this.form).subscribe({
      next: () => {
        this.message = 'Реєстрація успішна. Тепер увійдіть.';
        this.form = { firstName: '', lastName: '', login: '', password: '' };
        this.router.navigateByUrl('/login');
      },
      error: () => (this.error = 'Не вдалося зареєструватися.')
    });
  }
}
