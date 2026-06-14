import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

/********************************************************************** 
  Page : file input page (used by field index component)
  Desc : contains functionalities of file input page
**********************************************************************/

@Component({
  selector: 'app-file-input-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FormsModule,DragDropModule],
  templateUrl: './file-input-field.component.html',
  styleUrl: './file-input-field.component.scss'
})

export class FileInputFieldComponent {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() field: any = {};
  /**
   * Desc : declaring form input to receive data from parent component
   */
  @Input() form!: FormGroup;
  /**
   * Desc : check whether the form is valid or not
   */
  get isValid() {
    return this.form?.controls[this.field.name].valid;
  }
  /**
   * Desc : check whether the form is dirty or not
   */
  get isDirty() {
    return this.form?.controls[this.field.name].dirty;
  }
  /**
   * Desc : hovering on the file input
   */
  public isHovering = false;
  /**
   * Desc : executes while hovering on the file input
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public toggleHover(val: any) {}
}
