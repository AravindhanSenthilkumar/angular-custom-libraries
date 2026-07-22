import { defaultPageSize, OrderBy, SearchAt, SearchOn } from './table.model';

describe('table model enums', () => {
  it('should expose the expected default values and enums', () => {
    expect(defaultPageSize).toBe(5);
    expect(SearchOn.AllColumns).toBe(1);
    expect(SearchAt.ServerSide).toBe(2);
    expect(OrderBy.asc).toBe('asc');
  });
});
