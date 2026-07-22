import { FloatLabel } from './float-label.enum';

describe('FloatLabel', () => {
  it('should expose the expected values', () => {
    expect(FloatLabel.always).toBe('always');
    expect(FloatLabel.auto).toBe('auto');
    expect(FloatLabel.never).toBe('never');
  });
});
