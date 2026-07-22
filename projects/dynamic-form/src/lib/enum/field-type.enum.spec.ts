import { FieldType } from './field-type.enum';

describe('FieldType', () => {
  it('should expose the expected values', () => {
    expect(FieldType.text).toBe('text');
    expect(FieldType.dropdown).toBe('drop-down');
    expect(FieldType.checkbox).toBe('checkbox');
  });
});
