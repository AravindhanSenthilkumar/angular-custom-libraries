import { AppLiteralConsts } from './consts';

describe('AppLiteralConsts', () => {
  it('should expose form data type literals', () => {
    expect(AppLiteralConsts.dataTypes.string).toBe('string');
    expect(AppLiteralConsts.dataTypes.array).toBe('array');
    expect(AppLiteralConsts.dataTypes.datetimeLocal).toBe('datetime-local');
  });

  it('should expose field types and validators', () => {
    expect(AppLiteralConsts.fieldType.text).toBe('text');
    expect(AppLiteralConsts.fieldType.checkbox).toBe('checkbox');
    expect(AppLiteralConsts.validators.required).toBe('required');
    expect(AppLiteralConsts.validators.jsonValidator).toBe('jsonValidator');
  });

  it('should expose toast and theme constants', () => {
    expect(AppLiteralConsts.toast.success).toBe('success-snackbar');
    expect(AppLiteralConsts.sheet.excel).toBe('xlsx');
    expect(AppLiteralConsts.theme.primary).toBe('primary');
  });
});
