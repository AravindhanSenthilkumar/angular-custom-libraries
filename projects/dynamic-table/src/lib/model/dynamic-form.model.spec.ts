import { FieldType } from '../enum/field-type.enum';
import { FloatLabel } from '../enum/float-label.enum';
import { Field, Form } from './dynamic-form.model';

describe('dynamic-table form model shape', () => {
  it('should allow runtime form objects to be created from the exported interfaces', () => {
    const field: Field = {
      name: 'status',
      type: FieldType.dropdown,
      label: 'Status',
      floatLabel: FloatLabel.auto,
      validators: {
        required: true,
      },
    };

    const form: Form = {
      controls: [field],
      outline: false,
    };

    expect(form.controls[0].name).toBe('status');
    expect(form.controls[0].validators?.required).toBe(true);
    expect(form.outline).toBe(false);
  });
});
