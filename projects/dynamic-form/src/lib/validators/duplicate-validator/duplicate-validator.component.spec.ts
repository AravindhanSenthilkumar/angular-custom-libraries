import { FormControl, ValidatorFn } from '@angular/forms';
import { DuplicateValidator } from './duplicate-validator.component';

describe('DuplicateValidator', () => {
  let validator: ValidatorFn;
  beforeEach(() => {
    validator = DuplicateValidator();
  });
  it('should return null for valid', () => {
    const control = new FormControl([
      { id: 1, name: 'test 1' },
      { id: 2, name: 'test 2' },
    ]);
    const result = validator(control);
    expect(result).toBeNull();
    expect(control.hasError('duplicateValidator')).toBeFalsy();
  });
  it('should return an error for invalid', () => {
    const control = new FormControl([
      { id: 1, name: 'test 1' },
      { id: 1, name: 'test 1' },
    ]);
    const result = validator(control);
    expect(result).toEqual({ duplicateValidator: true });
    expect(control.hasError('duplicateValidator')).toBeTruthy();
  });
});