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

  /**
   * Exact SnackbarConfig passed to snackbar.show().
   *
   * type     : "success" | "error" | "warning" | "info"
   * position : "top-left" | "top-center" | "top-right"
   *          | "middle-left" | "middle-center" | "middle-right"
   *          | "bottom-left" | "bottom-center" | "bottom-right"
   * duration : milliseconds (default 4000)
   * action   : optional action button label string
   */
  public masterToastData: any = {
    type: 'success',
    title: 'Title Success',
    message: 'message to be showed here',
    position: 'top-right',
    duration: 4000,
    action: '',
    enableHtml: false,
    panelClass: []
  };

  public toastData: any = {
    type: 'success',
    title: 'Title Success',
    message: 'message to be showed here',
    position: 'top-right',
    duration: 4000,
    action: '',
    enableHtml: false,
    panelClass: []
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

  /**
   * Opens toast using the exact SnackbarConfig from the left JSON editor.
   * Every field maps 1-to-1 with what snackbar.show() receives.
   */
  public openFromJson() {
    const d = this.toastData;
    this.snackbar.show({
      type:        d.type       ?? 'success',
      title:       d.title,
      message:     d.message    ?? '',
      position:    d.position   ?? 'top-right',
      duration:    d.duration   ?? 4000,
      action:      d.action     || undefined,
      enableHtml:  d.enableHtml ?? false,
      panelClass:  d.panelClass ?? []
    });
  }

  /**
   * Position-grid shortcut: updates position in JSON viewer then fires.
   */
  public triggerToastAt(pos: string) {
    this.toastData = { ...this.toastData, position: pos };
    this.playgroundState.updateJsonViewer(this.toastData);
    this._cd.detectChanges();
    this.openFromJson();
  }

  /**
   * Type-shortcut buttons: updates type in JSON viewer then fires.
   */
  public openSnackBar(type: string) {
    this.toastData = { ...this.toastData, type };
    this.playgroundState.updateJsonViewer(this.toastData);
    this._cd.detectChanges();
    this.openFromJson();
  }
}
