import { Component } from '@angular/core';
import { AuthComponent } from '../features/auth/auth.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AuthComponent],
  template: `<app-auth></app-auth>`
})
export class LoginPageComponent {}
