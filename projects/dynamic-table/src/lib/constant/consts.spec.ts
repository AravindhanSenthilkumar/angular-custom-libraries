import { AppLiteralConsts } from './consts';

describe('AppLiteralConsts', () => {
  it('should expose table action constants', () => {
    expect(AppLiteralConsts.actionButton.create).toBe('create');
    expect(AppLiteralConsts.actionButton.export).toBe('export');
  });

  it('should expose sheet and date constants', () => {
    expect(AppLiteralConsts.sheet.excel).toBe('xlsx');
    expect(AppLiteralConsts.dateFormat.yearMonthDay).toBe('yyyy-MM-dd HH:mm');
  });
});
