import {
  Injectable
} from '@angular/core';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  DynamicSnackbar
} from './dynamic-snackbar';

import {
  SnackbarConfig
} from './dynamic-snackbar.modal';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public show(
    config: SnackbarConfig
  ): void {

    this.snackBar.openFromComponent(
      DynamicSnackbar,
      {
        duration:
          config.duration ?? 4000,

        horizontalPosition:
          config.horizontalPosition ??
          'right',

        verticalPosition:
          config.verticalPosition ??
          'top',

        panelClass: [
          'ngx-snackbar',
          config.type ?? 'info',
          ...(config.panelClass ?? [])
        ],

        data: config
      }
    );
  }

  public success(
    message: string,
    title?: string
  ): void {

    this.show({
      type: 'success',
      title,
      message
    });
  }

  public error(
    message: string,
    title?: string
  ): void {

    this.show({
      type: 'error',
      title,
      message
    });
  }

  public warning(
    message: string,
    title?: string
  ): void {

    this.show({
      type: 'warning',
      title,
      message
    });
  }

  public info(
    message: string,
    title?: string
  ): void {

    this.show({
      type: 'info',
      title,
      message
    });
  }
}