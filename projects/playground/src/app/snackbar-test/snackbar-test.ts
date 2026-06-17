import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { SnackbarService } from 'dynamic-toast';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-snackbar-test',
  imports: [ NgxJsonViewerModule, JsonEditorComponent, MatButtonModule],
  templateUrl: './snackbar-test.html',
  styleUrl: './snackbar-test.scss',
})
export class SnackbarTest {

  public jsonData: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  constructor(
    private _cd: ChangeDetectorRef, 
    private snackbar: SnackbarService
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

  public openSnackBar(){
   this.snackbar.success('User saved successfully');
  }
}
