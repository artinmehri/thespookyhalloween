import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showPassword = false;
  email = '';
  password = '';
  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  constructor(private authService: AuthService) {}

  isFormValid(): boolean {
    return (
      this.email.trim() !== '' &&
      this.password.trim() !== ''
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  async onLogin() {
    if (!this.emailRegex.test(this.email)) {
      alert('Invalid email format.');
      return;
    }


    if (!this.isFormValid()) {
      return;
    }

    try {
      await this.authService.login(
        this.email,
        this.password
      );
      // Optionally navigate or show success notification here
    } catch (e) {
      // Errors are already alerted in the service; keep here for potential future handling
      console.error(e);
    }
  }


}
