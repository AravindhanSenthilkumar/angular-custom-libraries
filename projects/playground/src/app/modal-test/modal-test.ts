import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalService, IPopupDetails } from 'devlab-one-dynamic-modal';
import { DummyModalContent } from '../dummy-modal-content/dummy-modal-content';
import { PlaygroundStateService } from '../services/playground-state.service';

export enum Justify {
  left = "left",
  right = "right",
  center = "center"
}

@Component({
  selector: 'app-modal-test',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './modal-test.html',
  styleUrl: './modal-test.scss',
})
export class ModalTest implements OnInit {

  /**
   * Exact fields passed to openComponentAsPopup().
   * component / ContextData / onClose / onSubmit are hardcoded — not shown here.
   * Optional size fields (height, minWidth, minHeight, maxWidth, maxHeight)
   * are omitted by default — add them manually in the editor if needed.
   *
   * position options : "center" | "left" | "right" | "bottom" | "top"
   * justification    : "left"   | "center" | "right"
   */
  public modalData: any = {
    position: 'center',
    width: 700,
    borderRadius: 12,
    autoClose: true,
    panelClass: [],
    header: {
      title: 'Analytics Overview',
      justification: 'left'
    }
  };

  constructor(
    private _cd: ChangeDetectorRef,
    private modelService: ModalService,
    public playgroundState: PlaygroundStateService
  ) {}

  ngOnInit(): void {
    this.playgroundState.setComponentData(this.modalData, (updatedData) => {
      this.modalData = updatedData;
      this._cd.detectChanges();
    });
  }

  /**
   * Passes the JSON data from the left editor directly to openComponentAsPopup().
   * Only defined (non-null) optional size fields are included.
   */
  public openFromJson() {
    const d = this.modalData;
    const model: IPopupDetails = {
      component: DummyModalContent,
      position: d.position ?? 'center',
      width: d.width ?? 700,
      borderRadius: d.borderRadius ?? 12,
      autoClose: d.autoClose ?? true,
      panelClass: d.panelClass ?? [],
      header: {
        title: d.header?.title ?? 'Analytics Overview',
        justification: d.header?.justification ?? Justify.left,
      },
      // Optional size overrides — only forwarded when the user sets them in the editor
      ...(d.height != null    ? { height: d.height }       : {}),
      ...(d.minWidth != null  ? { minWidth: d.minWidth }   : {}),
      ...(d.minHeight != null ? { minHeight: d.minHeight } : {}),
      ...(d.maxWidth != null  ? { maxWidth: d.maxWidth }   : {}),
      ...(d.maxHeight != null ? { maxHeight: d.maxHeight } : {}),
      ContextData: {},
      onClose:  () => { console.log('Modal closed'); },
      onSubmit: (data: any) => { console.log('Modal submitted', data); },
    };
    this.modelService.openComponentAsPopup(model);
  }

  public openCenterModal() {
    this.modalData = { ...this.modalData, position: 'center', width: 700 };
    this.playgroundState.updateJsonViewer(this.modalData);
    this.openFromJson();
  }

  public openRightDrawer() {
    this.modalData = { ...this.modalData, position: 'right', width: 550 };
    this.playgroundState.updateJsonViewer(this.modalData);
    this.openFromJson();
  }

  public openLeftDrawer() {
    this.modalData = { ...this.modalData, position: 'left', width: 550 };
    this.playgroundState.updateJsonViewer(this.modalData);
    this.openFromJson();
  }

  public openBottomSheet() {
    this.modalData = { ...this.modalData, position: 'bottom', width: 650, height: 450 };
    this.playgroundState.updateJsonViewer(this.modalData);
    this.openFromJson();
  }
}

