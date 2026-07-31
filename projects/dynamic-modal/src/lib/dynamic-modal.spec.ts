import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DynamicModal } from './dynamic-modal';
import { Justify } from './interfaces/idialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupBaseComponent } from './class/popup-base.component';
import { vi } from 'vitest';

const dialogMock = {
  close: vi.fn(),
  closeAll: vi.fn(),
};

describe('DynamicModal', () => {
  let component: DynamicModal;
  let fixture: ComponentFixture<DynamicModal>;
  const onSubmitSpy = vi.fn();
  const onCloseSpy = vi.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, DynamicModal],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MatDialog, useValue: { closeAll: dialogMock.closeAll, openDialogs: [] } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            component: PopupBaseComponent,
            autoClose: true,
            header: {
              title: 'test',
              justification: Justify.left,
            },
            onClose: onCloseSpy,
            onSubmit: onSubmitSpy,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DynamicModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('test');
    expect(component.justification).toBe(Justify.left);
  });

  it('should handle onSubmit', () => {
    const eventValue = { data: 'test' };
    const closeAllSpy = vi.spyOn(component['dialog'], 'closeAll').mockImplementation(() => {});
    component.onSubmit(eventValue);
    expect(closeAllSpy).toHaveBeenCalled();
    expect(onSubmitSpy).toHaveBeenCalledWith(eventValue);
  });

  it('should handle onClose', () => {
    const closeAllSpy = vi.spyOn(component['dialog'], 'closeAll').mockImplementation(() => {});
    component.onClose();
    expect(closeAllSpy).toHaveBeenCalled();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});