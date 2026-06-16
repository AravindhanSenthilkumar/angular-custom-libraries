import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IoEventContextToken } from 'ng-dynamic-component';
import { IPopupDetails, Justify } from './interfaces/idialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicModule } from 'ng-dynamic-component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PopupBaseComponent } from './class/popup-base.component';

@Component({
  selector: 'lib-dynamic-modal',
  templateUrl: './dynamic-modal.html',
  styleUrls: ['./dynamic-modal.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    DynamicModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: IoEventContextToken,
      useExisting: DynamicModal,
    },
  ],
})
export class DynamicModal {
  /**
   * Desc : title
   */
  public title: string | undefined;
  /**
   * Desc : justification
   */
  public justification: Justify | undefined;
  /**
   * Desc : input from dynamic component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inputs: any = { };
  /**
   * Desc : constructor initialization
   * @param inputData : input to the alert component
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: IPopupDetails,
    private dialog: MatDialog,
  ) {
    this.inputs = { popupContext: this.inputData.ContextData };
    this.title = this.inputData.header?.title;
    this.justification = this.inputData.header?.justification;
  }
  /**
   * Desc : recevie outputs
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onSubmit(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onSubmit();
    }
  }
  /**
   * Desc : recevie outputs
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onClose(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onClose();
    }
  }
}
