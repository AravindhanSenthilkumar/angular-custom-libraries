import { SnackbarConfig } from './dynamic-snackbar.modal';

describe('SnackbarConfig', () => {
  it('should allow a config object with all supported fields', () => {
    const config: SnackbarConfig = {
      title: 'Saved',
      message: 'Updated successfully',
      type: 'success',
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-class'],
      action: 'Undo',
    };

    expect(config.type).toBe('success');
    expect(config.panelClass).toEqual(['custom-class']);
    expect(config.action).toBe('Undo');
  });
});
