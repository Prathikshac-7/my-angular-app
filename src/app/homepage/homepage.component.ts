import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-homepage',
    imports: [FormsModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  userEmail: string = ''; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userEmail = this.authService.getEmail(); 
  }
}
