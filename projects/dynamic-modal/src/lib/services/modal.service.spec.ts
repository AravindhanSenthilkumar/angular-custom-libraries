import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IPopupDetails, Justify } from '../interfaces/idialog';
import { PopupBaseComponent } from '../class/popup-base.component';
import { vi } from 'vitest';

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

  it('should have default model dimensions', () => {
    expect(service.widthModel).toBe('400px');
    expect(service.heightModel).toBe('650px');
  });

  it('should call dialog.open when openComponentAsPopup is invoked without width/height', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: {
        title: 'test',
        justification: Justify.left,
      },
      onClose: vi.fn(),
      onSubmit: vi.fn(),
      autoClose: false,
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '400px',
        height: '650px',
        disableClose: true,
      })
    );
  });

  it('should call dialog.open with custom width and height if provided', () => {
    const inputData: IPopupDetails = {
      component: PopupBaseComponent,
      header: {
        title: 'test custom',
        justification: Justify.right,
      },
      onClose: vi.fn(),
      onSubmit: vi.fn(),
      autoClose: true,
      width: 500,
      height: 700,
    };
    service.openComponentAsPopup(inputData);
    expect(dialogSpy.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        width: '500px',
        height: '700px',
        disableClose: true,
      })
    );
  });
});
