export type SnackbarType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type SnackbarPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-center'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface SnackbarConfig {

  title?: string;

  message: string;

  type?: SnackbarType;

  duration?: number;

  enableHtml?: boolean;

  position?: SnackbarPosition;

  horizontalPosition?:
    | 'start'
    | 'center'
    | 'end'
    | 'left'
    | 'right';

  verticalPosition?:
    | 'top'
    | 'bottom';

  panelClass?: string[];

  action?: string;
}