import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDialogModule} from "@angular/material/dialog";
@Component({
  selector: 'app-dialgosucss',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './dialgosucss.component.html',
  styleUrl: './dialgosucss.component.css'
})
export class DialgosucssComponent {

  constructor(
    public dialogRef: MatDialogRef<DialgosucssComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
