import { Justify } from './idialog';

describe('popup dialog interfaces', () => {
  it('should expose popup justification values', () => {
    expect(Justify.left).toBe('left');
    expect(Justify.center).toBe('center');
  });
});
