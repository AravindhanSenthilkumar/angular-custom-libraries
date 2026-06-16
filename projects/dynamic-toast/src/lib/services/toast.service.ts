/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { ErrorHelper } from '../class/error-helper';
import { ToastrService } from 'ngx-toastr';
import { AppLiteralConsts } from '../constant/consts';
import { IConfig } from '../interfaces/iconfig';
/********************************************************************** 
  Page : Toast-alert service page
  Desc : contain functioanlities of toast alert UI
**********************************************************************/
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Desc : declared the variable for storing the condition for toast auto closing
   */
  public duration = 4000;
  /**
   * Desc : declared the variable for storing the condition for toast auto closing
   */
  public disableTimeOut = true;
  /**
   * Desc : Constructor initialization
   * @param toastr : consumed angular ngx toaster
   */
  constructor(private toastr: ToastrService) {}
  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   */
  public success(message: string | IConfig | Array<IConfig> | any) {
    let messageContent = '';
    messageContent = ErrorHelper.prepareErrorMessage(message);
    this.toastr.success(messageContent, '', {
      toastClass:'ngx-toastr success-snackbar-toast',
      tapToDismiss: false,
      enableHtml: true,
      closeButton: true,
      positionClass: AppLiteralConsts.toast.toastPostionBottomCenter,
      timeOut: this.duration,
      disableTimeOut: this.disableTimeOut,
    });
  }
  /**
   * Presents a toast displaying the message with a yellow background
   * @param message Message to display
   */
  public warning(message: string | IConfig | Array<IConfig> | any) {
    let messageContent = '';
    messageContent = ErrorHelper.prepareErrorMessage(message);
    this.toastr.warning(messageContent, '', {
      toastClass:'ngx-toastr warning-snackbar-toast',
      tapToDismiss: false,
      enableHtml: true,
      closeButton: true,
      positionClass: AppLiteralConsts.toast.toastPostionBottomCenter,
      timeOut: this.duration,
      disableTimeOut: this.disableTimeOut,
    });
  }
  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   */
  public error(message: string | IConfig | Array<IConfig> | any) {
    let messageContent = '';
    messageContent = ErrorHelper.prepareErrorMessage(message);
    this.toastr.error(messageContent, '', {
      toastClass:'ngx-toastr error-snackbar-toast',
      tapToDismiss: false,
      enableHtml: true,
      closeButton: true,
      positionClass: AppLiteralConsts.toast.toastPostionBottomCenter,
      timeOut: this.duration,
      disableTimeOut: this.disableTimeOut,
    });
  }
}