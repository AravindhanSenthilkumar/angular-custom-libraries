import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dynamic-toast.html',
  styleUrl: './dynamic-toast.scss'
})
export class DynamicToast {
  /**
   * Desc : constructor initialization
   * @param data : input data to snack bar
   * @param snackBar : snack bar module
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBar: MatSnackBar,
  ) {}
}

