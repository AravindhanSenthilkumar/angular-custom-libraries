import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormDetails } from './model/dynamic-form.model';
import { WizardComponent } from './form-type/wizard/wizard.component';
import { FormTypeIndex } from './form-type/form-type-index';
import { PopupBaseComponent } from 'devlab-one-dynamic-modal';
import { applyLibraryTheme } from './utils/library-theme-engine';

@Component({
  selector: 'lib-dynamic-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    WizardComponent,
    FormTypeIndex
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm extends PopupBaseComponent implements OnInit, OnChanges {
  /**
   * Desc : input form data from consumer component
   */
  @Input() public dynamicFormDetails: DynamicFormDetails = {};

  ngOnInit(): void {
    this.checkAndApplyTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dynamicFormDetails']) {
      this.checkAndApplyTheme();
    }
  }

  private checkAndApplyTheme(): void {
    const theme = this.dynamicFormDetails?.theme ||
                  this.dynamicFormDetails?.formComponent?.theme ||
                  this.dynamicFormDetails?.wizardComponent?.theme;
    if (theme) {
      applyLibraryTheme(theme);
    }
  }

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
