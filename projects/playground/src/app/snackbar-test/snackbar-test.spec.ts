import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarTest } from './snackbar-test';

describe('SnackbarTest', () => {
  let component: SnackbarTest;
  let fixture: ComponentFixture<SnackbarTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarTest],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
