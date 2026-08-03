import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { IDialogData } from './interfaces/idialog';

import { applyLibraryTheme } from './utils/library-theme-engine';

@Component({
  selector: 'lib-dynamic-alert',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ) {
    if (data?.theme) {
      applyLibraryTheme(data.theme);
    }
  }
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
