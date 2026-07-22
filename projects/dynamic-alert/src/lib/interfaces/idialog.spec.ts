import { AlertType, MessageType } from './idialog';

describe('alert dialog interfaces', () => {
  it('should expose alert and message enums', () => {
    expect(MessageType.success).toBe('check_circle');
    expect(MessageType.warning).toBe('warning');
    expect(AlertType.confirmation).toBe('confirmation');
  });
});
