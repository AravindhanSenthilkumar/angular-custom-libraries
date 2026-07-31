import { AfterViewInit, Component, ComponentRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Justify } from './interfaces/idialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IoEventContextToken } from 'ng-dynamic-component';
import { DynamicModule } from 'ng-dynamic-component';
import { DynamicLoaderComponent } from './dynamic-loader';
@Component({
  selector: 'lib-dynamic-modal',
  templateUrl: './dynamic-modal.html',
  styleUrls: ['./dynamic-modal.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    DynamicLoaderComponent
  ]
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

  public outputs = {
    onPopupSubmit: (event: any) => {
      this.onSubmit(event);
    },

    onPopupClose: () => {
      this.onClose();
    }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private dialog: MatDialog
  ) {
    this.inputs = { popupContext : {} , ...this.inputData.ContextData };
    this.title = this.inputData.header?.title;
    this.justification = this.inputData.header?.justification;
  }

  onSubmit(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onSubmit(eventValue);
    }
  }

  onClose(): void {
    // if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onClose();
    // }
  }
}

