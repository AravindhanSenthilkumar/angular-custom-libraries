import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

/********************************************************************** 
  Page : drop down page (used by form-index component)
  Desc : contains functionalities of drop down page
**********************************************************************/

@Component({
  selector: 'app-dropdown-field',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    NgxMatSelectSearchModule,
    MatIconModule
  ],
  templateUrl: './dropdown-field.component.html',
  styleUrl: './dropdown-field.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class DropdownFieldComponent {
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
   * Desc :select multiple option event
   */
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  public isValueSelectedInMultiple(option: any, OnChange?: Function) {
    if (OnChange) {
      return OnChange(option, this.field.name);
    } else {
      const fieldVal = this.form?.get(this.field.name)?.value ?? [];
      if (Array.isArray(fieldVal)) {
        return fieldVal.includes(option);
      } else {
        return this.isValueSelectedInSingle(option, OnChange);
      }
    }
  }
  /**
   * Desc : select single option  event
   */
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  public isValueSelectedInSingle(option: any, OnChange?: Function) {
    if (OnChange) {
      return OnChange(option, this.field.name);
    } else {
      const fieldVal = this.form?.get(this.field.name)?.value;
      return fieldVal == option;
    }
  }
}