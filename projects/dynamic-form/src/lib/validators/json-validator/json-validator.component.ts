import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/********************************************************************** 
  Page : json validation (re-usable)
  Desc : contains validation for json 
**********************************************************************/

export function JsonValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error: ValidationErrors = { jsonValidator: true };
    try {
      JSON.parse(control.value);
    } catch (e) {
      control.setErrors(error);
      return error;
    }
    control.setErrors(null);
    return null;
  };
}