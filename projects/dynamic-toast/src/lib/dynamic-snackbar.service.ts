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
  SnackbarConfig,
  SnackbarPosition,
  SnackbarType
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

    let horizontalPos: 'start' | 'center' | 'end' | 'left' | 'right' =
      config.horizontalPosition ?? 'right';

    let verticalPos: 'top' | 'bottom' =
      config.verticalPosition ?? 'top';

    const extraClasses: string[] = [];

    if (config.position) {
      switch (config.position) {
        case 'top-left':
          verticalPos = 'top';
          horizontalPos = 'left';
          break;
        case 'top-center':
          verticalPos = 'top';
          horizontalPos = 'center';
          break;
        case 'top-right':
          verticalPos = 'top';
          horizontalPos = 'right';
          break;
        case 'middle-left':
          verticalPos = 'top';
          horizontalPos = 'left';
          extraClasses.push('ngx-snackbar-middle');
          break;
        case 'middle-center':
          verticalPos = 'top';
          horizontalPos = 'center';
          extraClasses.push('ngx-snackbar-middle');
          break;
        case 'middle-right':
          verticalPos = 'top';
          horizontalPos = 'right';
          extraClasses.push('ngx-snackbar-middle');
          break;
        case 'bottom-left':
          verticalPos = 'bottom';
          horizontalPos = 'left';
          break;
        case 'bottom-center':
          verticalPos = 'bottom';
          horizontalPos = 'center';
          break;
        case 'bottom-right':
          verticalPos = 'bottom';
          horizontalPos = 'right';
          break;
      }
    }

    this.snackBar.openFromComponent(
      DynamicSnackbar,
      {
        duration:
          config.duration ?? 4000,

        horizontalPosition: horizontalPos,

        verticalPosition: verticalPos,

        panelClass: [
          'ngx-snackbar',
          config.type ?? 'info',
          ...extraClasses,
          ...(config.panelClass ?? [])
        ],

        data: config
      }
    );
  }

  private buildConfig(
    type: SnackbarType,
    message: string,
    title?: string,
    positionOrConfig?: SnackbarPosition | Partial<SnackbarConfig>
  ): SnackbarConfig {

    if (typeof positionOrConfig === 'string') {
      return {
        type,
        title,
        message,
        position: positionOrConfig
      };
    }

    return {
      type,
      title,
      message,
      ...(positionOrConfig ?? {})
    };
  }

  public success(
    message: string,
    title?: string,
    positionOrConfig?: SnackbarPosition | Partial<SnackbarConfig>
  ): void {

    this.show(this.buildConfig('success', message, title, positionOrConfig));
  }

  public error(
    message: string,
    title?: string,
    positionOrConfig?: SnackbarPosition | Partial<SnackbarConfig>
  ): void {

    this.show(this.buildConfig('error', message, title, positionOrConfig));
  }

  public warning(
    message: string,
    title?: string,
    positionOrConfig?: SnackbarPosition | Partial<SnackbarConfig>
  ): void {

    this.show(this.buildConfig('warning', message, title, positionOrConfig));
  }

  public info(
    message: string,
    title?: string,
    positionOrConfig?: SnackbarPosition | Partial<SnackbarConfig>
  ): void {

    this.show(this.buildConfig('info', message, title, positionOrConfig));
  }
}