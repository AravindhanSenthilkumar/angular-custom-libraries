import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { DynamicSnackbar } from './dynamic-snackbar';
import { SnackbarService } from './dynamic-snackbar.service';

import { vi } from 'vitest';

describe('DynamicSnackbar', () => {
  let fixture: ComponentFixture<DynamicSnackbar>;
  let component: DynamicSnackbar;
  let snackBarRefMock: { dismiss: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    snackBarRefMock = { dismiss: vi.fn() };

    TestBed.configureTestingModule({
      imports: [DynamicSnackbar],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Hello', type: 'success' } },
        { provide: MatSnackBarRef, useValue: snackBarRefMock },
      ],
    });

    fixture = TestBed.createComponent(DynamicSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the snack bar when close is called', () => {
    component.close();
    expect(snackBarRefMock.dismiss).toHaveBeenCalled();
  });

  it('should map the snackbar type to an icon', () => {
    expect(component.icon).toBe('check_circle');
  });
});

describe('SnackbarService Position Options', () => {
  let service: SnackbarService;
  let matSnackBarMock: { openFromComponent: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    matSnackBarMock = { openFromComponent: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: matSnackBarMock }
      ]
    });

    service = TestBed.inject(SnackbarService);
  });

  it('should correctly configure top-left position', () => {
    service.show({ message: 'Test', position: 'top-left' });
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(
      DynamicSnackbar,
      expect.objectContaining({
        verticalPosition: 'top',
        horizontalPosition: 'left'
      })
    );
  });

  it('should correctly configure middle-center position', () => {
    service.show({ message: 'Test', position: 'middle-center' });
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(
      DynamicSnackbar,
      expect.objectContaining({
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: expect.arrayContaining(['ngx-snackbar-middle'])
      })
    );
  });

  it('should correctly configure bottom-right position', () => {
    service.show({ message: 'Test', position: 'bottom-right' });
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(
      DynamicSnackbar,
      expect.objectContaining({
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      })
    );
  });

  it('should support passing position string to helper methods', () => {
    service.success('Success Msg', 'Title', 'middle-left');
    expect(matSnackBarMock.openFromComponent).toHaveBeenCalledWith(
      DynamicSnackbar,
      expect.objectContaining({
        verticalPosition: 'top',
        horizontalPosition: 'left',
        panelClass: expect.arrayContaining(['ngx-snackbar-middle', 'success'])
      })
    );
  });
});
