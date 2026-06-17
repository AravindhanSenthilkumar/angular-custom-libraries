import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FieldIndexComponent } from './fields/field-index.component';
import { ArrayComponent } from './form-type/array/array.component';
import { GroupComponent } from './form-type/group/group.component';
import { DynamicFormDetails } from './model/dynamic-form.model';
import { WizardComponent } from './form-type/wizard/wizard.component';
import { FormTypeIndex } from './form-type/form-type-index';
import { PopupBaseComponent } from 'dynamic-modal'

@Component({
  selector: 'lib-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    FieldIndexComponent,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    ArrayComponent,
    GroupComponent,
    WizardComponent,
    FormTypeIndex
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm extends PopupBaseComponent {
  /**
   * Desc : input form data from consumer component
   */
  @Input() public dynamicFormDetails: DynamicFormDetails = {};
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
   * Desc : emit values to parent component when form value changes
   */
  public valueChanges(event: any){
    this.onFormValueChange.emit(event);
  }
  /**
   * Desc : emitting the form values to parent component
   * @param value : form values
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public submitForm(value: any) {
    if(this.popupContext){
          this.onPopupSubmit.emit(value);
    }else {
        this.onSubmitForm.emit(value);
    }
  }
  /**
   * Desc : emitting the form values to parent component
   * @param value : form values
   */
  public cancelForm() {
    if(this.popupContext){
       this.onPopupClose.emit();
    }else{
        this.onCancelForm.emit();
    }
  }
}
