import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from 'devlab-one-dynamic-alert';
import { PopupBaseComponent } from 'devlab-one-dynamic-modal';
import { PlaygroundStateService } from '../services/playground-state.service';

@Component({
  selector: 'app-alert-test',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './alert-test.html',
  styleUrl: './alert-test.scss',
})
export class AlertTest extends PopupBaseComponent implements OnInit {

  /**
   * Full input JSON for the Alert component.
   * alertType options: "success" | "warning" | "error" | "info" | "confirm"
   * actionMessage keys are used as button labels / follow-up messages.
   */
  public masterAlertData: any = {
    alertType: 'success',
    message: 'message to be showed here',
    actionMessage: {
      ok: "[message shown after 'OK' is clicked]",
      yes: "[message shown after 'Yes' is clicked (confirm type)]",
      no: "[message shown after 'No' is clicked (confirm type)]"
    }
  };

  public alertData: any = {
    alertType: 'success',
    message: 'message to be showed here',
    actionMessage: {
      ok: "[message shown after 'OK' is clicked]",
      yes: "[message shown after 'Yes' is clicked (confirm type)]",
      no: "[message shown after 'No' is clicked (confirm type)]"
    }
  };

  constructor(
    private _cd: ChangeDetectorRef, 
    private alertService: AlertService,
    public playgroundState: PlaygroundStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.playgroundState.setComponentData(this.alertData, (updatedData) => {
      this.alertData = {
        ...structuredClone(updatedData),
        alertType: updatedData.alertType || 'success',
        actionMessage: updatedData.actionMessage || this.masterAlertData.actionMessage,
        message: updatedData.message || ''
      };
      this._cd.detectChanges();
    });
  }

  /** Opens alert using all fields from the JSON editor */
  public openFromJson() {
    this.openAlert(this.alertData?.alertType);
  }

  public openAlert(type: string) {
    const alertType = type || this.alertData.alertType || 'success';
    switch (alertType) {
      case 'success':
        this.alertService.success(this.alertData.message, () => {
          this.alertService.success(this.alertData.actionMessage?.ok || 'OK');
        });
        break;
      case 'warning':
        this.alertService.warning(this.alertData.message, () => {
          this.alertService.warning(this.alertData.actionMessage?.ok || 'OK');
        });
        break;
      case 'error':
        this.alertService.error(this.alertData.message, () => {
          this.alertService.error(this.alertData.actionMessage?.ok || 'OK');
        });
        break;
      case 'info':
        this.alertService.info(this.alertData.message, () => {
          this.alertService.info(this.alertData.actionMessage?.ok || 'OK');
        });
        break;
      case 'confirm':
        this.alertService.confirmationModel(this.alertData.message, () => {
          this.alertService.success(this.alertData.actionMessage?.yes || 'Confirmed');
        }, () => {
          this.alertService.warning(this.alertData.actionMessage?.no || 'Cancelled');
        });
        break;
      default:
        break;
    }
  }
}
