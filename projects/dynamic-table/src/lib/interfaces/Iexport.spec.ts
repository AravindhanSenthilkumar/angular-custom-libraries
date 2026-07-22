import { ExportType } from './Iexport';

describe('ExportType', () => {
  it('should expose supported export formats', () => {
    expect(ExportType.excel).toBe('xlsx');
    expect(ExportType.csv).toBe('csv');
    expect(ExportType.pdf).toBe('pdf');
  });
});
