import { ComponentType } from '@angular/cdk/overlay';
import { PopupBaseComponent } from '../class/popup-base.component';

export type PopupPositionType = 'center' | 'right' | 'left' | 'bottom' | 'top';

export enum PopupPosition {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
  TOP = 'top',
}

import { ITheme } from '../utils/library-theme-engine';

export interface IPopupDetails {
  component: ComponentType<PopupBaseComponent>;
  header: IPopupHeader;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextData?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose?: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit?: Function;
  autoClose?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  borderRadius?: number | string;
  position?: PopupPosition | PopupPositionType;
  panelClass?: string | string[];
  theme?: ITheme;
}


export interface IPopupHeader {
  title?: string;
  justification?: Justify;
}


export enum Justify {
  left = 'left',
  right = 'right',
  center = 'center',
}

export interface IErrorMessage {
  code: string;
  info?: Array<IErrorInfo>;
  message: string;
}

export interface IErrorInfo {
  code: string;
  message: string;
}