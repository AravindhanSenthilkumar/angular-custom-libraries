import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainValidator } from '../../validators/validators-index.component';
import { AppLiteralConsts } from '../../constant/consts';
import { FieldIndexComponent } from '../../fields/field-index.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-array',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    FormsModule, 
    FieldIndexComponent
  ],
  templateUrl: './array.component.html',
  styleUrl: './array.component.scss',
})
export class ArrayComponent implements OnInit {
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
   * Desc : executes when the component is initialized
   */
  public ngOnInit() {
    if (this.field?.type == AppLiteralConsts.dataTypes.array) {
      if (this.getFormArray(this.field?.name)?.length == 0) {
        this.getFormArray(this.field?.name).push(
          this.addGroupArray(this.field?.children)
        );
      }
    }
  }
  /**
   * Desc :  generate validation message dynamically
   */
  get errorMessage() {
    return MainValidator.getErrorMessage(this.form?.controls[this.field.name], this.field);
  }
  /**
   * Desc : get the form array details
   * @param field : target field
   * @returns : form array details
   */
  public getFormArray(field: string): FormArray {
    return this.form?.get(field) as FormArray;
  }
  /**
   * Desc : create form group array
   * @param fields : target field
   * @returns form group array details
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addGroupArray(fields: any[]): FormGroup {
    const group: FormGroup = new FormGroup({});
    fields.forEach((field) => {
      group.addControl(
        field.name,
        new FormControl('', MainValidator.getValidators(field))
      );
    });
    return group;
  }
}
