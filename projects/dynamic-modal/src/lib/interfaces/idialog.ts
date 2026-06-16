import { ComponentType } from '@angular/cdk/overlay';
import { PopupBaseComponent } from '../class/popup-base.component';

export interface IPopupDetails {
  component: ComponentType<PopupBaseComponent>;
  header: IPopupHeader;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ContextData?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: Function;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit: Function;
  autoClose: boolean;
  width?: number;
  height?: number;
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