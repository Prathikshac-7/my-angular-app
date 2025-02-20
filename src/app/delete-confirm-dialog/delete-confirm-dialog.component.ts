import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true); // User confirmed deletion
  }

  closeDialog() {
    this.dialogRef.close(false); // User canceled deletion
  }
}
