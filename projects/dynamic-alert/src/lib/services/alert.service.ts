import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHelper } from '../class/error-helper';
import { IErrorMessage } from '../interfaces/idialog';
import { AlertType, MessageType } from '../interfaces/idialog';
import { DynamicAlert } from '../dynamic-alert';
/********************************************************************** 
  Page : Notification alert service page
  Desc : contain functioanlities of notifcation alert
**********************************************************************/
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Desc : declaring variable for storing width size of alert modal
   */
  public widthModel = '400px';
  /**
   * Desc : declaring variable for storing height of alert modal
   */
  public heightModel = '650px';
  /**
   * Desc : constructor initialization
   * @param dialog : consumed angular material mat dialog
   * @param utility : consumed utility service
   */
  constructor(
    public dialog: MatDialog
  ) {}
  /**
   * Desc : success alert
   * @param message : display message
   */
  public success(message: string | IErrorMessage, okCallback?: () => void): void {
    const disabledClose = false;
    const widthModel = this.widthModel;
    const messageConent = typeof message == 'string' ? message : ErrorHelper.prepareErrorMessage(message);
    this.openDialog(disabledClose, widthModel, messageConent, MessageType.success, AlertType.notification, okCallback);
  }
  /**
   * Desc : error alert
   * @param message : display message
   */
  public error(message: string | IErrorMessage, okCallback?: () => void): void {
    const disabledClose = false;
    const widthModel = this.widthModel;
    const messageConent = typeof message == 'string' ? message : ErrorHelper.prepareErrorMessage(message);
    this.openDialog(disabledClose, widthModel, messageConent, MessageType.error, AlertType.notification, okCallback);
  }
  /**
   * Desc : info alert
   * @param message : display message
   */
  public info(message: string | IErrorMessage, okCallback?: () => void): void {
    const disabledClose = false;
    const widthModel = this.widthModel;
    const messageConent = typeof message == 'string' ? message : ErrorHelper.prepareErrorMessage(message);
    this.openDialog(disabledClose, widthModel, messageConent, MessageType.info, AlertType.notification, okCallback);
  }
  /**
   * Desc : warning alert
   * @param message : display message
   */
  public warning(message: string | IErrorMessage, okCallback?: () => void): void {
    const disabledClose = false;
    const widthModel = this.widthModel;
    const messageConent = typeof message == 'string' ? message : ErrorHelper.prepareErrorMessage(message);
    this.openDialog(disabledClose, widthModel, messageConent, MessageType.warning, AlertType.notification, okCallback);
  }
  /**
   * Desc : confirmation alert model
   * @param message : display message
   * @param okCallback : callback function
   */
  public confirmationModel(
    message: string | IErrorMessage,
    okCallback?: () => void,
    CancelCallback?: () => void,
  ): void {
    const disabledClose = false;
    const widthModel = this.widthModel;
    const messageConent = typeof message == 'string' ? message : ErrorHelper.prepareErrorMessage(message);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.openDialog(
      disabledClose,
      widthModel,
      messageConent,
      MessageType.info,
      AlertType.confirmation,
      okCallback,
      CancelCallback,
    );
  }
  /**
   *
   * @param disabledClose : strict closing
   * @param widthModel : width size of model
   * @param messageContent : full message content to be displayed in dialog
   * @param typeOfMessage : message type
   * @param alertType :  alert type
   * @param okCallback : callback function
   * @param cancelCallback : callback function
   */
  public openDialog(
    disabledClose: boolean,
    widthModel: string,
    messageContent: string,
    typeOfMessage: MessageType,
    alertType: AlertType,
    okCallback?: () => void,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any
    cancelCallback: () => any = () => {},
  ): void {
    this.dialog
      .open(DynamicAlert, {
        width: widthModel,
        data: { message: messageContent, type: typeOfMessage, alertType: alertType },
        disableClose: disabledClose,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result && okCallback) {
          okCallback();
        }
        if (!result && cancelCallback) {
          cancelCallback();
        }
      });
  }
}
