import { TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { DynamicSnackbar } from './dynamic-snackbar';

describe('DynamicSnackbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Hello', type: 'success' } },
        { provide: MatSnackBarRef, useValue: { dismiss: jasmine.createSpy('dismiss') } },
      ],
    });
  });

  it('should create', () => {
    const component = TestBed.inject(DynamicSnackbar);
    expect(component).toBeTruthy();
  });

  it('should dismiss the snack bar when close is called', () => {
    const snackBarRef = TestBed.inject(MatSnackBarRef);
    const component = TestBed.inject(DynamicSnackbar);

    component.close();

    expect(snackBarRef.dismiss).toHaveBeenCalled();
  });

  it('should map the snackbar type to an icon', () => {
    const component = TestBed.inject(DynamicSnackbar);

    expect(component.icon).toBe('check_circle');
  });
});
