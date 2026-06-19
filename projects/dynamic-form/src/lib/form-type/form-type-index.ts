import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppLiteralConsts } from '../constant/consts';
import { FieldIndexComponent } from '../fields/field-index.component';
import { ArrayComponent } from '../form-type/array/array.component';
import { GroupComponent } from '../form-type/group/group.component';
import { Form, Field } from '../model/dynamic-form.model';
import { MainValidator } from '../validators/validators-index.component';

@Component({
  selector: 'form-type-index',
  standalone: true,
  imports: [
    CommonModule,
    FieldIndexComponent,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    ArrayComponent,
    GroupComponent
  ],
  templateUrl: './form-type-index.html',
  styleUrl: './form-type-index.scss',
})
export class FormTypeIndex {
  /**
   * Desc : declaring output to emitting values to parent component
   */
  @Output() public onSubmitForm: EventEmitter<any> = new EventEmitter();
  /**
   * Desc : declaring output to emitting values to parent component
   */
  @Output() public onCancelForm: EventEmitter<any> = new EventEmitter();
  /**
   * Desc : declaring output to emitting values to wizard component
   */
  @Output() public onFormValueChange: EventEmitter<any> = new EventEmitter();
  /**
   * Desc : declaring input to receive values from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public fields: Form = {
    controls: [],
    outline: false
  };
  /**
   * Desc : declaring form to initalize the formGroup
   */
  public form: FormGroup = new FormGroup({});
  /**
   * Desc : executes when the component is initiated
   */
  public ngOnInit(): void {
    this.getForm(this.form, this.fields?.controls);
  }
  /**
   * Desc : executes when input changes from child component
   */
  public ngOnChanges(change:SimpleChanges): void {
    this.form.valueChanges.subscribe(() => {
      this.onFormValueChange.emit(this.form);
    });
    if(change['fields']){
       this.getForm(this.form, change['fields'].currentValue.controls);
    }
  }
  /**
   * Desc : emitting the form values to parent component
   * @param value : form values
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public submitForm(value: any) {
    this.onSubmitForm.emit(value);
  }
  /**
   * Desc : emitting the form values to parent component
   * @param value : form values
   */
  public cancelForm() {
    this.onCancelForm.emit();
  }
  /**
   * Desc : Reset full form
   */
  public formReset(): void {
    this.form.reset();
  }
  /**
   * Desc : preparing the form fields
   * @param group : form group details
   * @param fields : field details
   */
  public getForm(group: FormGroup, fields: Array<Field>) {
    if (Array.isArray(fields)) {
      for (const field of fields) {
        switch (field.type) {
          case AppLiteralConsts.dataTypes.group:
            group.addControl(field.name, new FormGroup({}));
            this.getForm(
              group.get(field.name) as FormGroup,
              field.children ?? []
            );
            break;
          case AppLiteralConsts.dataTypes.array:
            group.addControl(
              field.name,
              new FormArray([], MainValidator.getValidators(field))
            );
            // eslint-disable-next-line no-case-declarations
            const array = group.get(field.name) as FormArray;
            if (field.value) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              field.value.forEach((x: any) =>
                array.push(
                  this.addGroupArray(field.children ?? [], x) as FormGroup
                )
              );
            }
            break;
          default:
            // eslint-disable-next-line no-case-declarations
            const val =
              field.value != null && field.value != undefined
                ? field.value
                : '';
            if(group.controls[field.name]){
              group.controls[field.name].setErrors(null);
              group.controls[field.name].clearValidators();
              group.controls[field.name].setValidators(MainValidator.getValidators(field));
              group.controls[field.name].updateValueAndValidity();
            } else{
              group.addControl(
                field.name,
                new FormControl(val, MainValidator.getValidators(field))
              );
            }
            break;
        }
      }
    }
  }
  /**
   * Desc : creating form array
   * @param fields : field details
   * @param value : form values
   * @returns : form Array
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public addGroupArray(fields: Field[], value: any): FormGroup {
    const group: FormGroup = new FormGroup({});
    fields.forEach((field) => {
      let val = null;
      if (value != null) {
        val = value[field.name] ?? null;
      }
      group.addControl(
        field.name,
        new FormControl(val, MainValidator.getValidators(field))
      );
    });
    return group;
  }
  /**
   * Desc : analysing the input columns and round the values
   */
  public roundValues(noOfcolumns: number): number {
    return Math.round(12 / noOfcolumns);
  }
}
