import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FormTypeIndex } from '../form-type-index';
import { FormGroup } from '@angular/forms';
import { AppLiteralConsts } from '../../constant/consts';
import { Wizards, WizardForm } from '../../model/dynamic-form.model';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wizard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormTypeIndex, MatStepperModule,MatButtonModule, MatIconModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss',
})
export class WizardComponent {
  /**
   * Desc : validation
   */
  public isValidWizard = false;
  /**
   * Desc : form values
   */
  public formValues: Array<FormGroup> = [];
  /**
   * Desc : declaring input to receive values from parent component
   */
  @Input() public wizardForm: Wizards = {
    wizards: [
      {
        form : {
          controls: [],
          outline: false
        },
        wizardName:''
      }
    ],
  };
  /**
   * Desc : emit wizard from value
   */
  @Output() public onSubmitWizardForm = new EventEmitter();
  /**
   * Desc : close wizard
   */
  @Output() public onCancelWizardForm = new EventEmitter();
  /**
   * Desc : emit values to parent component when form value changes
   */
  @Output() public wizardFormValueChange = new EventEmitter<any>();
  /**
   * Desc : receive form values from dynamic form component
   * @param event : form values
   */
  public formGroupValues(wizardIndex: number, formGroup: FormGroup) {
    this.formValues[wizardIndex] = formGroup;

    formGroup.valueChanges.subscribe(() => {
      const wizardValues: any = {};

      this.wizardForm.wizards?.forEach((wizard, index) => {
        wizardValues[wizard.wizardName] = this.formValues[index]?.value;
      });

      this.wizardFormValueChange.emit(wizardValues);
    });

    this.isValidWizard = this.formValues.every(
      (form) => form?.valid
    );
  } 
  /**
   * Desc : submit wizard form
   */
  public submitWizardForm() {
    const formArrayValues: any = {};
    this.wizardForm.wizards?.forEach((wizard, index) => {
      formArrayValues[wizard.wizardName] = this.formValues[index].value;
    });
    this.onSubmitWizardForm.emit(formArrayValues);
  }
  /**
   * Desc : close wizard
   */
  public onCancel() {
    this.onCancelWizardForm.emit();
  }
}
