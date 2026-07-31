import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPopupDetails } from '../interfaces/idialog';
import { DynamicModal } from '../dynamic-modal';
/********************************************************************** 
  Page : Notification alert service page
  Desc : contain functioanlities of notifcation alert
**********************************************************************/
@Injectable({
  providedIn: 'root',
})
export class ModalService {
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
   * Desc : confirmation alert model
   * @param message : display message
   * @param okCallback : callback function
   */
  public openComponentAsPopup(inputData: IPopupDetails): void {
    const disableCloseOnEventOutsideOfPopup = true;
    const widthInPixel = inputData.width ? (typeof inputData.width === 'number' ? `${inputData.width}px` : inputData.width) : this.widthModel;
    const heightInPixel = inputData.height ? (typeof inputData.height === 'number' ? `${inputData.height}px` : inputData.height) : this.heightModel;
    this.openComponentOnPopup(disableCloseOnEventOutsideOfPopup, widthInPixel, heightInPixel, inputData);
  }
  /**
   * Desc : open existing component in popup
   * @param disabledClose : strict closing
   * @param width : width size of model
   * @param inputData : data for custom model UI
   */
  private openComponentOnPopup(disabledClose: boolean, width: string, height: string, inputData: IPopupDetails): void {
    this.dialog.open(DynamicModal, {
      disableClose: disabledClose,
      data: inputData,
      height: height,
      width: width,
      autoFocus: false,
    });
  }
}
