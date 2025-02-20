import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupObj = {
    userName: '',
    email: '',
    password: ''
  };

  signupUsers: any[] = [];

  constructor(private router: Router, private snackBar: MatSnackBar) {}  // ✅ Inject MatSnackBar

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSignup() {
    if (!this.signupObj.userName || !this.signupObj.email || !this.signupObj.password) {
      this.snackBar.open('Please fill in all fields!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'], // ✅ Styling
      });
      return;
    }

    // Retrieve existing users from localStorage
    const storedUsers = localStorage.getItem('signupUsers');
    this.signupUsers = storedUsers ? JSON.parse(storedUsers) : [];

    // Check if email is already registered
    const userExists = this.signupUsers.find(user => user.email === this.signupObj.email);
    if (userExists) {
      this.snackBar.open('Email already exists! Use a different email.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      return;
    }

    // Save new user
    this.signupUsers.push({ ...this.signupObj });
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));

    this.snackBar.open('Sign-up successful! Redirecting to login...', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });

    // Reset form
    this.signupObj = { userName: '', email: '', password: '' };

    // Navigate to login page after a short delay
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
