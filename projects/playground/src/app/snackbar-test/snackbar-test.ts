import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from 'devlab-one-dynamic-toast';
import { PlaygroundStateService } from '../services/playground-state.service';

@Component({
  selector: 'app-snackbar-test',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './snackbar-test.html',
  styleUrl: './snackbar-test.scss',
})
export class SnackbarTest implements OnInit {

  public masterToastData: any = {
    toastType: 'success',
    messageTitle: "Title Success",
    message: "message to be showed here",
    position: "top-right"
  };

  public toastData: any = {
    toastType: 'success',
    messageTitle: "Title Success",
    message: "message to be showed here",
    position: "top-right"
  };

  public positions = [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right'
  ];

  constructor(
    private _cd: ChangeDetectorRef, 
    private snackbar: SnackbarService,
    public playgroundState: PlaygroundStateService
  ) {}

  ngOnInit(): void {
    this.playgroundState.setComponentData(this.toastData, (updatedData) => {
      this.toastData = updatedData;
      this._cd.detectChanges();
    });
  }

  public triggerToastAt(pos: string) {
    this.toastData.position = pos;
    this.playgroundState.setComponentData(this.toastData, (updatedData) => {
      this.toastData = updatedData;
      this._cd.detectChanges();
    });
    this.openSnackBar(this.toastData.toastType || 'success', pos);
  }

  public openSnackBar(type: string, position?: any) {
    const pos = position ?? this.toastData.position ?? 'top-right';
    switch (type) {
      case 'success':
        this.snackbar.success(this.toastData.message, this.toastData.messageTitle, pos);
        break;
      case 'error':
        this.snackbar.error(this.toastData.message, this.toastData.messageTitle, pos);
        break;
      case 'warning':
        this.snackbar.warning(this.toastData.message, this.toastData.messageTitle, pos);
        break;
      case 'info':
        this.snackbar.info(this.toastData.message, this.toastData.messageTitle, pos);
        break;
      default:
        break;
    }
  }
}
