import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ToastService } from 'dynamic-toast';

@Component({
  selector: 'app-toast-test',
  standalone:true,
  imports: [MatButtonModule, NgxJsonViewerModule, JsonEditorComponent],
  templateUrl: './toast-test.html',
  styleUrl: './toast-test.scss',
})
export class ToastTest {

  public jsonData: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  constructor(
    private _cd: ChangeDetectorRef,
    private toastService: ToastService
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

  public openToast(){
    this.toastService.success('Lorem  printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged');
    this.toastService.warning('rd dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged');
    this.toastService.error('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged');
  }

}
