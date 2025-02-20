import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

interface Cake {
  name: string;
  description: string;
  price: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  
  cakeDetails: Cake = {
    name: '',
    description: '',
    price: ''
  };
  cakeIndex: number | null = null; 

  constructor(private router: Router) {}

  ngOnInit() {
   
    const cakeData = history.state.data;
    const index = history.state.index;
    
    if (cakeData && index !== undefined) {
      this.cakeDetails = cakeData; 
      this.cakeIndex = index; 
    }
  }

 
  saveDetails() {
   
    if (!this.cakeDetails.name || !this.cakeDetails.description || !this.cakeDetails.price) {
      alert('Please fill in all fields before proceeding.');
      return;
    }


    let storedCakes: Cake[] = JSON.parse(localStorage.getItem('cakes') || '[]');

    
    if (this.cakeIndex !== null) {
      storedCakes[this.cakeIndex] = this.cakeDetails; 
    } else {
      storedCakes.push(this.cakeDetails); 
    }


    localStorage.setItem('cakes', JSON.stringify(storedCakes));


    this.router.navigate(['/cart']);
  }
}
