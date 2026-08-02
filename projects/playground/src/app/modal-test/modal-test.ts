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

  public modalData: any = {
    position: 'center',
    width: 700,
    title: 'Analytics Overview'
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

  public openModal(position: 'center' | 'right' | 'left' | 'bottom' = 'center', width: number | string = 700, height?: number | string) {
    const model: IPopupDetails = {
      width: width,
      height: height,
      position: position,
      borderRadius: 12,
      component: DummyModalContent,
      header: {
        title: this.modalData.title ? `${this.modalData.title} (${position.toUpperCase()})` : `Analytics Overview (${position.toUpperCase()})`,
        justification: Justify.left,
      },
      ContextData: {},
      autoClose: true,
      onClose: () => {
        console.log('Modal closed');
      },
      onSubmit: (data: any) => {
        console.log('Modal submitted', data);
      },
    };
    this.modelService.openComponentAsPopup(model);
  }

  public openCenterModal() {
    this.openModal('center', this.modalData.width || 700);
  }

  public openRightDrawer() {
    this.openModal('right', 550);
  }

  public openLeftDrawer() {
    this.openModal('left', 550);
  }

  public openBottomSheet() {
    this.openModal('bottom', 650, 450);
  }
}
