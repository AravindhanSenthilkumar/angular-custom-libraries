import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-text-area-field',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class TextAreaFieldComponent {
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
   * Desc: executes when component is initialized
   */
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
