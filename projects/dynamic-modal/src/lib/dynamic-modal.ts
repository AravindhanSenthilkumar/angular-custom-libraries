import { AfterViewInit, Component, ChangeDetectionStrategy, ElementRef, HostBinding, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Justify } from './interfaces/idialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DynamicLoaderComponent } from './dynamic-loader';

@Component({
  selector: 'lib-dynamic-modal',
  templateUrl: './dynamic-modal.html',
  styleUrls: ['./dynamic-modal.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    DynamicLoaderComponent
  ]
})
export class DynamicModal implements OnInit, AfterViewInit {
  @HostBinding('style.--modal-border-radius')
  get borderRadiusCss(): string {
    return this.getFormattedBorderRadius();
  }

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
    private dialog: MatDialog,
    private elementRef: ElementRef
  ) {
    this.inputs = { popupContext : {} , ...this.inputData.ContextData };
    this.title = this.inputData.header?.title;
    this.justification = this.inputData.header?.justification;
  }

  ngOnInit(): void {
    this.applyBorderRadius();
  }

  ngAfterViewInit(): void {
    this.applyBorderRadius();
  }

  private getFormattedBorderRadius(): string {
    const val = this.inputData?.borderRadius;
    if (val === undefined || val === null || val === '') {
      return '8px';
    }
    return typeof val === 'number' ? `${val}px` : val;
  }

  private applyBorderRadius(): void {
    const formattedRadius = this.getFormattedBorderRadius();
    const hostElement = this.elementRef.nativeElement as HTMLElement;
    if (hostElement) {
      hostElement.style.setProperty('--modal-border-radius', formattedRadius);
      const overlayPane = hostElement.closest('.cdk-overlay-pane') as HTMLElement;
      if (overlayPane) {
        overlayPane.style.setProperty('--modal-border-radius', formattedRadius);
      }
      const dialogSurface = (hostElement.closest('.mdc-dialog__surface') || hostElement.closest('.mat-mdc-dialog-container')) as HTMLElement;
      if (dialogSurface) {
        dialogSurface.style.setProperty('--modal-border-radius', formattedRadius);
      }
    }
  }

  onSubmit(eventValue: any): void {
    if (eventValue && this.inputData.autoClose) {
      this.dialog.closeAll();
    }
    if (this.inputData?.onSubmit) {
      this.inputData.onSubmit(eventValue);
    }
  }

  onClose(): void {
    this.dialog.closeAll();
    if (this.inputData?.onClose) {
      this.inputData.onClose();
    }
  }
}

