import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IDialogData } from './interfaces/idialog';

@Component({
  selector: 'lib-dynamic-alert',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './dynamic-alert.html',
  styleUrl: './dynamic-alert.scss'
})

export class DynamicAlert {
   /**
   * Desc : constructor initialization
   * @param dialogRef : alert component
   * @param data : input to the alert component
   */
  constructor(
    public dialogRef: MatDialogRef<DynamicAlert>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
  ) {}
  /**
   * Desc : executes while click on yes button
   */
  onYesClick(): void {
    this.dialogRef.close(true);
  }
  /**
   * Desc : executes while click on no button
   */
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
