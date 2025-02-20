import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewItemDialogComponent } from '../view-item-dialog/view-item-dialog.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-cart',
  standalone: true, 
  imports: [NgIf, NgFor, FormsModule, RouterModule, MatSnackBarModule, MatDialogModule], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const storedCakes = localStorage.getItem('cakes');
    if (storedCakes) {
      this.cartItems = JSON.parse(storedCakes);
    }
  }

  viewItem(index: number) {
    const selectedItem = this.cartItems[index];
    this.dialog.open(ViewItemDialogComponent, {
      width: '400px',
      data: selectedItem
    });
  }

  editItem(index: number) {
    const cakeToEdit = this.cartItems[index];
    this.router.navigate(['/contact'], { state: { data: cakeToEdit, index: index } });
  }
  
  deleteItem(index: number) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If user clicked "Yes"
        this.cartItems.splice(index, 1);
        localStorage.setItem('cakes', JSON.stringify(this.cartItems));

        this.snackBar.open('Item deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }
    });
  }

  goToContactPage() {
    this.router.navigate(['/contact']);
  }
}
