import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastTest } from './toast-test';

describe('ToastTest', () => {
  let component: ToastTest;
  let fixture: ComponentFixture<ToastTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastTest],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
