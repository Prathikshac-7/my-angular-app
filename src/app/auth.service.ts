import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail: string = ''; // Store the email

  setEmail(email: string) {
    this.userEmail = email;
  }

  getEmail(): string {
    return this.userEmail;
  }
}
