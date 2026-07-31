import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AlertType, MessageType } from '../interfaces/idialog';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('AlertService', () => {
  let service: AlertService;
  let dialogSpy: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogSpy = {
      open: vi.fn().mockReturnValue({
        afterClosed: () => of(true),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        AlertService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have model width', () => {
    expect(service.widthModel).toBe('400px');
  });

  it('should trigger success alert', () => {
    const message = 'Test success';
    const callback = vi.fn();
    service.success(message, callback);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(callback).toHaveBeenCalled();
  });

  it('should trigger error alert', () => {
    const message = 'Test error';
    service.error(message);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should trigger info alert', () => {
    const message = 'Test info';
    service.info(message);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should trigger warning alert', () => {
    const message = 'Test warning';
    service.warning(message);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should trigger confirmationModel alert', () => {
    const message = 'Test Confirmation';
    const okCallback = vi.fn();
    service.confirmationModel(message, okCallback);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(okCallback).toHaveBeenCalled();
  });

  it('should execute cancelCallback on negative result', () => {
    dialogSpy.open.mockReturnValueOnce({
      afterClosed: () => of(false),
    });
    const cancelCallback = vi.fn();
    service.openDialog(false, '400px', 'Test Dialog', MessageType.info, AlertType.confirmation, undefined, cancelCallback);
    expect(cancelCallback).toHaveBeenCalled();
  });
});
