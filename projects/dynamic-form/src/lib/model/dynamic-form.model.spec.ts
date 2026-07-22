import { FieldType } from '../enum/field-type.enum';
import { FloatLabel } from '../enum/float-label.enum';
import { Field, Form } from './dynamic-form.model';

describe('dynamic-form model shape', () => {
  it('should allow runtime form objects to be created from the exported interfaces', () => {
    const field: Field = {
      name: 'email',
      type: FieldType.text,
      label: 'Email',
      floatLabel: FloatLabel.auto,
      validators: {
        required: true,
        email: true,
      },
    };

    const form: Form = {
      controls: [field],
      outline: true,
    };

    expect(form.controls[0].name).toBe('email');
    expect(form.controls[0].validators?.required).toBe(true);
    expect(form.outline).toBe(true);
  });
});
