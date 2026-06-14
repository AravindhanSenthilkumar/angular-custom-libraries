import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/********************************************************************** 
  Page : radio input page (used by field index component)
  Desc : contains functionalities of radio input page
**********************************************************************/

@Component({
  selector: 'app-radio-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatSlideToggleModule],
  templateUrl: './radio-field.component.html',
  styleUrl: './radio-field.component.scss'
})
export class RadioFieldComponent {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any = {};
  /**
   * Desc : declaring form input to receive data from parent component
   */
  @Input() public form!: FormGroup;
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
}