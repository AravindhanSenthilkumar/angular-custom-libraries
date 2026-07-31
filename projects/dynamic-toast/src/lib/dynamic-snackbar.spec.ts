import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { DynamicSnackbar } from './dynamic-snackbar';

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
