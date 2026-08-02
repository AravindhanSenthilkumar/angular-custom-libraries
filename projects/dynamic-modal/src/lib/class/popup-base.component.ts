import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  template: '',
})
export class PopupBaseComponent {
  /**
   * Desc : input data from popup
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public popupContext: any;
  /**
   * Desc : emit output to popup
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onPopupClose = new EventEmitter<any>();
  /**
   * Desc : emit output to popup
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onPopupSubmit = new EventEmitter<any>();
}
