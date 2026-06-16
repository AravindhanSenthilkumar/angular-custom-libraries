import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTest } from './form-test';

describe('FormTest', () => {
  let component: FormTest;
  let fixture: ComponentFixture<FormTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTest],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
