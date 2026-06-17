export type SnackbarType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface SnackbarConfig {

  title?: string;

  message: string;

  type?: SnackbarType;

  duration?: number;

  enableHtml?: boolean;

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