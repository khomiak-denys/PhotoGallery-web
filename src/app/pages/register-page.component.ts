import { Component } from '@angular/core';
import { RegisterComponent } from '../features/auth/register.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterComponent],
  template: `<app-register></app-register>`
})
export class RegisterPageComponent {}
