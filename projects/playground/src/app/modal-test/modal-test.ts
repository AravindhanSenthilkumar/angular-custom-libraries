import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ModalService, IPopupDetails, PopupBaseComponent } from 'devlab-one-dynamic-modal';
import { FormTest } from '../form-test/form-test';
import { DummyModalContent } from '../dummy-modal-content/dummy-modal-content';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum Justify {
  left = "left",
  right = "right",
  center = "center"
}

@Component({
  selector: 'app-modal-test',
  imports: [MatButtonModule, NgxJsonViewerModule, JsonEditorComponent, RouterLink, RouterLinkActive],
  templateUrl: './modal-test.html',
  styleUrl: './modal-test.scss',
})
export class ModalTest {

  public jsonData: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  constructor(
    private _cd: ChangeDetectorRef,
    private modelService: ModalService
  ) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code'];
    // this.jsonData = this.formData;
    // this.updatedJsonValue = this.jsonData;
    // this.dynamicFormDetails = {
    //   ...this.dynamicFormDetails,
    //   formComponent: structuredClone(this.formData)
    // };
  }

  changeLog(event: any) {
    if (event && !event.type) {
      setTimeout(() => {
        this.updatedJsonValue = event;
        this._cd.detectChanges();
      }, 500);
    }
  }

  public resetJsonData() {
    // this.dynamicFormDetails = {
    //   ...this.dynamicFormDetails,
    //   formComponent: structuredClone(this.formData)
    // };
    // this.jsonData = structuredClone(this.formData);
    // this.updatedJsonValue = structuredClone(this.formData);
  }

  public generateComponent() {
    // this.dynamicFormDetails = {
    //   ...this.dynamicFormDetails,
    //   formComponent: structuredClone(this.updatedJsonValue)
    // };
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

  public openModal(position: 'center' | 'right' | 'left' | 'bottom' = 'center', width: number | string = 700, height?: number | string) {
    const model: IPopupDetails = {
      width: width,
      height: height,
      position: position,
      borderRadius: 12,
      component: DummyModalContent,
      header: {
        title: `Analytics Overview (${position.toUpperCase()})`,
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
    this.openModal('center', 700);
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
