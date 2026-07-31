import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppLiteralConsts } from '../../constant/consts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-date-time-field',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatTooltipModule
  ],
  templateUrl: './date-time-field.component.html',
  styleUrl: './date-time-field.component.scss',
  providers: [
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class DateTimeFieldComponent implements OnInit{
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
   * Desc: executes when component is initialized
   */
  public ngOnInit(): void {
    if (
      this.field[AppLiteralConsts.dataTypes.type] == AppLiteralConsts.dataTypes.datetimeLocal ||
      this.field[AppLiteralConsts.dataTypes.type] == AppLiteralConsts.dataTypes.date
    ) {
      this.form?.controls[this.field.name].setValue(this.field.value ? new Date(this.field.value) : null);
    }
  }
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
