import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { IPopupDetails, PopupPosition, PopupPositionType } from '../interfaces/idialog';
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
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Open dynamic component inside popup modal
   * @param inputData : popup configuration details including component, width, height, position, etc.
   */
  public openComponentAsPopup(inputData: IPopupDetails): void {
    const disableCloseOnEventOutsideOfPopup = true;
    const positionKey = inputData.position || PopupPosition.CENTER;
    const pos = String(positionKey);

    const formattedWidth = this.formatDimension(inputData.width);
    const formattedHeight = this.formatDimension(inputData.height);
    const formattedMinWidth = this.formatDimension(inputData.minWidth);
    const formattedMinHeight = this.formatDimension(inputData.minHeight);
    const formattedMaxWidth = this.formatDimension(inputData.maxWidth);
    const formattedMaxHeight = this.formatDimension(inputData.maxHeight);

    let width = formattedWidth;
    if (!width) {
      if (pos === 'right' || pos === 'left') {
        width = '400px';
      } else if (pos === 'bottom' || pos === 'top') {
        width = '600px';
      }
    }

    let height = formattedHeight;
    if (!height) {
      if (pos === 'right' || pos === 'left') {
        height = '100vh';
      }
    }

    const dialogPosition = this.getDialogPosition(positionKey);
    const panelClasses = this.buildPanelClasses(positionKey, inputData.panelClass);

    this.dialog.open(DynamicModal, {
      disableClose: disableCloseOnEventOutsideOfPopup,
      data: inputData,
      width: width,
      height: height,
      minWidth: formattedMinWidth,
      minHeight: formattedMinHeight,
      maxWidth: formattedMaxWidth || (pos === 'center' ? '90vw' : '100vw'),
      maxHeight: formattedMaxHeight || (pos === 'center' ? '85vh' : '100vh'),
      position: dialogPosition,
      panelClass: panelClasses,
      autoFocus: false,
    });
  }

  /**
   * Formats numeric dimensions to px or returns unit strings directly
   */
  public formatDimension(value?: number | string): string | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  }

  /**
   * Maps PopupPosition to Angular Material DialogPosition
   */
  private getDialogPosition(position?: PopupPosition | PopupPositionType): DialogPosition {
    const pos = String(position || 'center');
    switch (pos) {
      case 'right':
        return { right: '0', top: '0', bottom: '0' };
      case 'left':
        return { left: '0', top: '0', bottom: '0' };
      case 'bottom':
        return { bottom: '0' };
      case 'top':
        return { top: '0' };
      case 'center':
      default:
        return {};
    }
  }

  /**
   * Builds panel class array for overlay styling
   */
  private buildPanelClasses(position?: PopupPosition | PopupPositionType, customClasses?: string | string[]): string[] {
    const pos = String(position || 'center');
    const posClass = `dynamic-modal-${pos}`;
    const defaultClasses = ['dynamic-modal-panel', posClass];
    if (!customClasses) {
      return defaultClasses;
    }
    if (Array.isArray(customClasses)) {
      return [...defaultClasses, ...customClasses];
    }
    return [...defaultClasses, customClasses];
  }
}
