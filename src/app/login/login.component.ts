import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // ✅ Import MatSnackBar

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MatSnackBarModule], // ✅ Import MatSnackBarModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];

  loginObj: any = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {} 

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('signupUsers');
      if (storedUsers) {
        this.signupUsers = JSON.parse(storedUsers);
      }
    }
  }

  onLogin() {
    const userExists = this.signupUsers.find(
      user => user.email === this.loginObj.email && user.password === this.loginObj.password
    );

    if (userExists) {
      this.authService.setEmail(this.loginObj.email); 

      this.snackBar.open('Login successful!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });

      this.router.navigate(['/homepage']); 
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }

    this.loginObj = { email: '', password: '' };
  }
}
