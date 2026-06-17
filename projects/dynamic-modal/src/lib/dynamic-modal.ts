import { AfterViewInit, Component, ComponentRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Justify } from './interfaces/idialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'lib-dynamic-modal',
  templateUrl: './dynamic-modal.html',
  styleUrls: ['./dynamic-modal.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgComponentOutlet
  ]
})
export class DynamicModal implements AfterViewInit {
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
  
  @ViewChild('dynamicContainer', {
    read: ViewContainerRef
  })
  container!: ViewContainerRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private dialog: MatDialog
  ) {
    this.inputs = { popupContext: this.inputData.ContextData };
    this.title = this.inputData.header?.title;
    this.justification = this.inputData.header?.justification;
  }

  ngAfterViewInit(): void {
    const componentRef: ComponentRef<any> =
      this.container.createComponent(
        this.inputData.component
      );

    // Pass Inputs
    componentRef.setInput(
      'popupContext',
      this.inputData.ContextData
    );

    // Subscribe Outputs
    componentRef.instance.onPopupSubmit?.subscribe(
      (value: any) => this.onSubmit(value)
    );

    componentRef.instance.onPopupClose?.subscribe(
      (value: any) => this.onClose(value)
    );
  }

  onSubmit(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onSubmit();
    }
  }

  onClose(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
      this.inputData.onClose();
    }
  }
}

