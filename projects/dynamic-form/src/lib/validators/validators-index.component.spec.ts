import { MainValidator } from './validators-index.component';
import { Field } from '../model/dynamic-form.model';
describe('MainValidator', () => {
  const mockControl: Field = {
    validators: {
      min: 5,
      max: 10,
      email: true,
      minLength: 2,
      maxLength: 20,
      pattern: /^[A-Za-z]+$/.source,
      nullValidator: true,
      jsonValidator: true,
      required: true,
      requiredTrue: true,
    },
    name: '',
    type: 'text' as any,
  };
  it('should have array of validators', () => {
    MainValidator.getValidators(mockControl);
  });
  it('should return an empty string for a valid control', () => {
    const mockFormControl = {
      valid: true,
      dirty: true,
      errors: null,
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample Label',
      name: 'sampleName',
    });
    expect(errorMessage).toEqual('');
  });
  it('should return an error message for a given control 1', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        required: true,
        min: true,
        max: true,
        email: true,
        minlength: true,
        maxlength: true,
        pattern: true,
        nullValidator: true,
        jsonValidator: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample Label',
      name: 'sampleName',
      validators: {
        min: 5,
        max: 10,
        minLength: 2,
        maxLength: 20,
      },
    });
    expect(errorMessage).toEqual('Sample Label is required.');
  });
  it('should return an error message for a given control 2', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        min: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        min: 5,
      },
    });
    expect(errorMessage).toEqual('Sample should be greater than 5.');
  });
  it('should return an error message for a given control 3', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        max: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        max: 5,
      },
    });
    expect(errorMessage).toEqual('Sample should be less than 5.');
  });
  it('should return an error message for a given control 4', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        requiredTrue: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        requiredTrue: true,
      },
    });
    expect(errorMessage).toEqual('Sample should be true.');
  });
  it('should return an error message for a given control 5', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        email: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        email: true,
      },
    });
    expect(errorMessage).toEqual('Sample should be valid email.');
  });
  it('should return an error message for a given control 6', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        minlength: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        minLength: 5,
      },
    });
    expect(errorMessage).toEqual('Enter more than 5');
  });
  it('should return an error message for a given control 7', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        maxlength: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        maxLength: 5,
      },
    });
    expect(errorMessage).toEqual('Enter less than 5');
  });
  it('should return an error message for a given control 8', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        pattern: /^[A-Za-z]+$/.source,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        pattern: /^[A-Za-z]+$/.source,
      },
    });
    expect(errorMessage).toEqual('Sample should be valid value.');
  });
  it('should return an error message for a given control 9', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        nullValidator: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        nullValidator: true,
      },
    });
    expect(errorMessage).toEqual('Sample should not be null.');
  });
  it('should return an error message for a given control 10', () => {
    const mockFormControl = {
      valid: false,
      dirty: true,
      errors: {
        jsonValidator: true,
      },
    };
    const errorMessage = MainValidator.getErrorMessage(mockFormControl, {
      label: 'Sample',
      name: 'sample',
      validators: {
        jsonValidator: true,
      },
    });
    expect(errorMessage).toEqual('Sample should not be valid Json.');
  });
});
