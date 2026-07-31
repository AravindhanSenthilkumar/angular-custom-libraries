import { Validators } from '@angular/forms';
import { Field } from '../model/dynamic-form.model';
import { JsonValidator } from '../validators/json-validator/json-validator.component';
import { DuplicateValidator } from '../validators/duplicate-validator/duplicate-validator.component';
import { AppLiteralConsts } from '../constant/consts';

/********************************************************************** 
  Page : form helpers component (re-usable)
  Desc : contains validation for forms
**********************************************************************/

export class MainValidator {
  public static getValidators(control: Field) {
    const validatorsToAdd = [];
    for (const [key, value] of Object.entries(control.validators ?? {})) {
      switch (key) {
        case AppLiteralConsts.validators.min:
          validatorsToAdd.push(Validators.min(value as number));
          break;
        case AppLiteralConsts.validators.max:
          validatorsToAdd.push(Validators.max(value as number));
          break;
        case AppLiteralConsts.validators.required:
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case AppLiteralConsts.validators.requiredTrue:
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case AppLiteralConsts.validators.email:
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case AppLiteralConsts.validators.minLength:
          validatorsToAdd.push(Validators.minLength(value as number));
          break;
        case AppLiteralConsts.validators.maxLength:
          validatorsToAdd.push(Validators.maxLength(value as number));
          break;
        case AppLiteralConsts.validators.pattern:
          validatorsToAdd.push(Validators.pattern(value as string));
          break;
        case AppLiteralConsts.validators.nullValidator:
          if (value) {
            validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        case AppLiteralConsts.validators.jsonValidator:
          validatorsToAdd.push(JsonValidator());
          break;
        case AppLiteralConsts.validators.duplicateValidator:
          if (value) {
            validatorsToAdd.push(DuplicateValidator());
          }
          break;
        default:
          break;
      }
    }
    return validatorsToAdd;
  }
  /**
   * Desc : generate error message
   */
  public static getErrorMessage(ctrl: any, model: any): string {
    const isValid = ctrl?.valid;
    const isDirty = ctrl?.dirty;
    if (!isValid && isDirty) {
      const finalName = model.label ?? model.name;
      const errors: any = ctrl.errors ?? [];
      if (errors['required']) {
        return `${finalName} is required.`;
      }
      if (errors['countryCodeRequired']) {
        return `Country code is required for ${finalName}.`;
      }
      if (errors['invalidPhoneNumber']) {
        return `Please provide a valid phone number.`;
      }
      if (errors['min']) {
        return `${finalName} should be greater than ${model.validators?.min ?? 0}.`;
      }
      if (errors['max']) {
        return `${finalName} should be less than ${model.validators?.max ?? 0}.`;
      }
      if (errors['requiredTrue']) {
        return `${finalName} should be true.`;
      }
      if (errors['email']) {
        return `Please provide valid email.`;
      }
      if (errors['minlength']) {
        return `Minimum atleast ${model.validators?.minLength ?? 0} is required.`;
      }
      if (errors['maxlength']) {
        return `Maximum characters is  ${model.validators?.maxLength ?? 0} only.`;
      }
      if (errors['pattern']) {
        return `${finalName} should be valid.`;
      }
      if (errors['nullValidator'] || errors['nullvalidator']) {
        return `${finalName} should not be null.`;
      }
      if (errors['jsonValidator'] || errors['jsonvalidator']) {
        return `${finalName} should not be valid Json.`;
      }
      if (errors['duplicateValidator']) {
        return `${finalName} combination is already been selected, please correct!`;
      }
      return `${finalName} has errors.`;
    }
    return '';
  }
}