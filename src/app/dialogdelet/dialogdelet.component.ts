import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogdelet',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialogdelet.component.html',
  styleUrl: './dialogdelet.component.css'
})
export class DialogdeletComponent {
  constructor(private dialogRef: MatDialogRef<DialogdeletComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false); // Ferme le dialog avec un retour "false"
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Ferme le dialog avec un retour "true"
  }
}
