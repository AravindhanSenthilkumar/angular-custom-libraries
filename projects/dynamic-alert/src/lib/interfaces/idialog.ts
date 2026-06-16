import { ComponentType } from '@angular/cdk/overlay';
import { DynamicAlert } from '../dynamic-alert';

export interface IDialogData {
  message: string;
  title: string;
  type: string;
  alertType: AlertType;
}

export enum MessageType {
  success = 'check_circle',
  error = 'cancel',
  info = 'info',
  warning = 'warning',
}


export enum AlertType {
  confirmation = 'confirmation',
  notification = 'notification',
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