import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private signupService: SignupService) {}
  showPassword = false;
  showConfirm = false;
  
  // Form fields
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreeToTerms = false;
  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm(): void {
    this.showConfirm = !this.showConfirm;
  }

  // Check if all required fields are filled
  isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.agreeToTerms
    );
  }

  // Handle form submission
  async onSignup() {
    if (!this.isFormValid()) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (!this.emailRegex.test(this.email)) {
      alert('Invalid email format.');
      return;
    }

    try {
      await this.signupService.submitSignupData(
        this.username,
        this.firstName,
        this.lastName,
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
