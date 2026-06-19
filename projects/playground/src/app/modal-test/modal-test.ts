import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ModalService, IPopupDetails, PopupBaseComponent } from 'dynamic-modal';
import { FormTest } from '../form-test/form-test';
import { RouterLink, RouterLinkActive } from '@angular/router';

export  enum Justify {
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
export class ModalTest{

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

  public openModal(){
    const model : IPopupDetails = {
      width: 800,
      component: FormTest ,
      header:{
        title:'Form test page',
        justification: Justify.left
      },
      ContextData:{},
      autoClose: true,
      onClose:()=>{},
      onSubmit:()=>{}
    }
    this.modelService.openComponentAsPopup(model);
  }

}
