import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupBaseComponent } from 'devlab-one-dynamic-modal';

@Component({
  selector: 'app-dummy-modal-content',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './dummy-modal-content.html',
  styleUrl: './dummy-modal-content.scss',
})
export class DummyModalContent extends PopupBaseComponent {
  public onSave() {
    this.onPopupSubmit.emit({ action: 'save', timestamp: new Date() });
  }

  public onCancel() {
    this.onPopupClose.emit();
  }
}
