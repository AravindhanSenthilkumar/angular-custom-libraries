import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IPopupDetails, Justify, PopupPosition } from '../interfaces/idialog';
import { PopupBaseComponent } from '../class/popup-base.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ModalService', () => {
  let service: ModalService;
  let dialogSpy: { open: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    dialogSpy = {
      open: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        ModalService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format dimensions correctly', () => {
    expect(service.formatDimension(800)).toBe('800px');
    expect(service.formatDimension('800px')).toBe('800px');
    expect(service.formatDimension('80vw')).toBe('80vw');
    expect(service.formatDimension('50%')).toBe('50%');
    expect(service.formatDimension(undefined)).toBeUndefined();
    expect(service.formatDimension('')).toBeUndefined();
  });

  it('should call dialog.open with default center position when position is not specified', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: {
        title: 'test',
        justification: Justify.left,
      },
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        disableClose: true,
        position: {},
        panelClass: ['dynamic-modal-panel', 'dynamic-modal-center'],
      })
    );
  });

  it('should call dialog.open with custom numeric width and height', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: {
        title: 'test custom width',
        justification: Justify.right,
      },
      width: 800,
      height: 600,
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '800px',
        height: '600px',
        disableClose: true,
      })
    );
  });

  it('should call dialog.open with right position (right drawer)', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: { title: 'Right Drawer' },
      position: 'right',
      width: 500,
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '500px',
        height: '100vh',
        position: { right: '0', top: '0', bottom: '0' },
        panelClass: ['dynamic-modal-panel', 'dynamic-modal-right'],
      })
    );
  });

  it('should call dialog.open with left position (left drawer)', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: { title: 'Left Drawer' },
      position: PopupPosition.LEFT,
      width: '450px',
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '450px',
        height: '100vh',
        position: { left: '0', top: '0', bottom: '0' },
        panelClass: ['dynamic-modal-panel', 'dynamic-modal-left'],
      })
    );
  });

  it('should call dialog.open with bottom position (bottom sheet)', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: { title: 'Bottom Sheet' },
      position: 'bottom',
      height: '400px',
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '600px',
        height: '400px',
        position: { bottom: '0' },
        panelClass: ['dynamic-modal-panel', 'dynamic-modal-bottom'],
      })
    );
  });
});
