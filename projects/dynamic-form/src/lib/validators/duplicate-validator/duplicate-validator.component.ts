import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/********************************************************************** 
  Page : duplication validation (re-usable)
  Desc : contains validation for array values 
**********************************************************************/

export function DuplicateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error: ValidationErrors = { duplicateValidator: true };
    if (control.value) {
      const seen = new Set();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const duplicates = control.value.some((item: any) => {
        const key = JSON.stringify(item);
        if (seen.has(key)) {
          return true;
        } else {
          seen.add(key);
          return false;
        }
      });
      duplicates ? control.setErrors(error) : control.setErrors(null);
      return duplicates ? error : null;
    } else {
      return null;
    }
  };
}