import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogmodifier',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialogmodifier.component.html',
  styleUrl: './dialogmodifier.component.css'
})
export class DialogmodifierComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogmodifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
