import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { SnackbarService } from 'devlab-one-dynamic-toast';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@Component({
  selector: 'app-snackbar-test',
  imports: [ NgxJsonViewerModule, JsonEditorComponent, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './snackbar-test.html',
  styleUrl: './snackbar-test.scss',
})
export class SnackbarTest {

  public jsonData: any;

  public updatedJsonValue: any;

  public masterToastData:any = {
    toastType:'success',
    messageTitle: "Title Success",
    message:"message to be showed here",
  }

  public toastData:any = {
    toastType:'success',
    messageTitle: "Title Success",
    message:"message to be showed here",
  }

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
    this.jsonData = this.toastData;
    this.updatedJsonValue = this.jsonData;
    this.toastData = {
      ...structuredClone(this.toastData)
    };
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
    this.toastData = {
      ...structuredClone(this.masterToastData)
    };
    this.jsonData = structuredClone(this.masterToastData);
    this.updatedJsonValue = structuredClone(this.masterToastData);
  }

  public generateComponent() {
    this.toastData = {
      ...this.updatedJsonValue,
      toastType : structuredClone(this.updatedJsonValue.toastType),
      messageTitle: structuredClone(this.updatedJsonValue.messageTitle),
      message :structuredClone(this.updatedJsonValue.message)
    };
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

  public openSnackBar(type:string){
    switch(type){
      case 'success':
        if(this.toastData.messageTitle){
           this.snackbar.success(this.toastData.message,this.toastData.messageTitle);
        }else{
          this.snackbar.success(this.toastData.message)
        }
        break;
      case 'error':
        if(this.toastData.messageTitle){
           this.snackbar.error(this.toastData.message,this.toastData.messageTitle);
        }else{
          this.snackbar.error(this.toastData.message)
        }
        break;
      case 'warning':
        if(this.toastData.messageTitle){
           this.snackbar.warning(this.toastData.message,this.toastData.messageTitle);
        }else{
          this.snackbar.warning(this.toastData.message)
        }
        break;
      case 'info':
        if(this.toastData.messageTitle){
           this.snackbar.info(this.toastData.message,this.toastData.messageTitle);
        }else{
          this.snackbar.info(this.toastData.message)
        }
        break;
      default:
        break;
    }
  }
}
