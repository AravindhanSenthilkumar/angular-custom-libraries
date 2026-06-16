import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-toast-test',
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

  constructor(private _cd: ChangeDetectorRef) {
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

}
