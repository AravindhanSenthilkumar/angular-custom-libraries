import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AlertService } from 'devlab-one-dynamic-alert';
import { PopupBaseComponent } from 'devlab-one-dynamic-modal';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-alert-test',
  imports: [MatButtonModule, NgxJsonViewerModule, JsonEditorComponent, RouterLink, RouterLinkActive],
  templateUrl: './alert-test.html',
  styleUrl: './alert-test.scss',
})
export class AlertTest extends PopupBaseComponent{

  public jsonData: any;

  public updatedJsonValue: any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  public masterAlertData:any = {
    alertType:'success',
    message:"message to be showed here",
    actionMessage : {
      "yes": "[after click 'yes' clicked message]",
      "ok":"[after clicked 'okay' message]",
      "no":"[after clicked 'no' message]"
    }
  }

  public alertData:any = {
    alertType:'success',
    message:"message to be showed here",
    actionMessage : {
      "yes": "[after click 'yes' clicked message]",
      "ok":"[after clicked 'okay' message]",
      "no":"[after clicked 'no' message]"
    }
  }

  constructor(
    private _cd: ChangeDetectorRef, 
    private alertService: AlertService
  ) {
    super()
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code'];
    this.jsonData = this.alertData;
    this.updatedJsonValue = this.jsonData;
    this.alertData = {
      ...structuredClone(this.alertData),
    };
  }

  changeLog(event: any) {
    if (event && !event.type) {
      setTimeout(() => {
        this.updatedJsonValue = event;
        console.log(this.updatedJsonValue);
        this._cd.detectChanges();
      }, 500);
    }
  }

  public resetJsonData() {
    this.alertData = {
      ...structuredClone(this.masterAlertData),
    };
    this.jsonData = structuredClone(this.masterAlertData);
    this.updatedJsonValue = structuredClone(this.masterAlertData);
  }

  public generateComponent() {
    this.alertData = {
      ...structuredClone(this.updatedJsonValue),
      alerttype : structuredClone(this.updatedJsonValue.alertType),
      actionMessage:structuredClone(this.updatedJsonValue.actionMessage),
      message:structuredClone(this.updatedJsonValue.message)
    };
    this.jsonData = structuredClone(this.updatedJsonValue);
  }

  public openAlert(type: string){
    switch(type){
      case 'success':
        this.alertService.success(this.alertData.message,()=>{
          this.alertService.success(this.alertData.actionMessage.ok);
         })
        break;
      case 'warning':
        this.alertService.warning(this.alertData.message,()=>{
          this.alertService.warning(this.alertData.actionMessage.ok);
         })
        break;
      case 'error':
        this.alertService.error(this.alertData.message,()=>{
          this.alertService.error(this.alertData.actionMessage.ok);
         })
        break;
      case 'info':
         this.alertService.info(this.alertData.message,()=>{
          this.alertService.info(this.alertData.actionMessage.ok);
         });
        break;
      case 'confirm':
        this.alertService.confirmationModel(this.alertData.actionMessage,()=>{
          this.alertService.success(this.alertData.actionMessage.ok);
        },()=>{
           this.alertService.warning(this.alertData.actionMessage.ok);
        });
        break;
      default:
        break;
    }
  }
}
