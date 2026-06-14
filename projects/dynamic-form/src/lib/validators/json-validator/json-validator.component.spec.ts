import { JsonValidator } from './json-validator.component';
import { FormControl, ValidatorFn } from '@angular/forms';

describe('jsonValidator', () => {
  let validator: ValidatorFn;
  beforeEach(() => {
    validator = JsonValidator();
  });
  it('should return null for valid JSON', () => {
    const control = new FormControl('{"key": "value"}');
    const result = validator(control);
    expect(result).toBeNull();
    expect(control.hasError('jsonValidator')).toBeFalsy();
  });
  it('should return an error for invalid JSON', () => {
    const control = new FormControl('invalid JSON');
    const result = validator(control);
    expect(result).toEqual({ jsonValidator: true });
    expect(control.hasError('jsonValidator')).toBeTruthy();
  });
});