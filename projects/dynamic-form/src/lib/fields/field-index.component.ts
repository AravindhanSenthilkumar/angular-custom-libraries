import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainValidator } from '../validators/validators-index.component';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field/text-field.component';
import { DropdownFieldComponent } from './dropdown-field/dropdown-field.component';
import { RadioFieldComponent } from './radio-field/radio-field.component';
import { CheckBoxFieldComponent } from './check-box-field/check-box-field.component';
import { FileInputFieldComponent } from './file-input-field/file-input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TextAreaFieldComponent } from './text-area-field/text-area-field.component';
import { DateTimeFieldComponent } from './date-time-field/date-time-field.component';
import { MatButtonModule } from '@angular/material/button';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { PasswordFieldComponent } from './password-field/password-field.component';
import { RangeInputFieldComponent } from './range-input-field/range-input-field.component';

/********************************************************************** 
  Page : field index page (used by form builder compoent and by itself(rescursive))
  Desc : contains functionalities of field index page
**********************************************************************/

@Component({
  selector: 'app-field-index',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    FormsModule, 
    TextFieldComponent, 
    DropdownFieldComponent, 
    RadioFieldComponent, 
    CheckBoxFieldComponent, 
    FileInputFieldComponent, 
    TextAreaFieldComponent, 
    DateTimeFieldComponent, 
    SlideToggleComponent,
    PasswordFieldComponent,
    RangeInputFieldComponent
  ],
  templateUrl: './field-index.component.html',
  styleUrl: './field-index.component.scss'
})

export class FieldIndexComponent {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any;
  /**
   * Desc : declaring form input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public form: any;
  /**
   * Desc : indicate whether the form is valid or not
   */
  get isValid() {
    return this.form?.controls[this.field.name].valid;
  }
  /**
   * Desc : indicate whether the form is dirty or not
   */
  get isDirty() {
    return this.form?.controls[this.field.name].dirty;
  }
  /**
   * Desc :  generate validation message dynamically
   */
  get errorMessage() {
    return MainValidator.getErrorMessage(this.form?.controls[this.field.name], this.field);
  }
}
