import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  ViewEncapsulation
} from '@angular/core';

import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef
} from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {
  SnackbarConfig
} from './dynamic-snackbar.modal';

@Component({
  selector: 'lib-snackbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './dynamic-snackbar.html',
  styleUrls: ['./dynamic-snackbar.scss']
})
export class DynamicSnackbar {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: SnackbarConfig,

    private snackBarRef:
    MatSnackBarRef<DynamicSnackbar>
  ) {}

  public close(): void {

    this.snackBarRef.dismiss();
  }

  public get icon(): string {

    switch (this.data.type) {

      case 'success':
        return 'check_circle';

      case 'error':
        return 'error';

      case 'warning':
        return 'warning';

      case 'info':
        return 'info';

      default:
        return 'notifications';
    }
  }
}