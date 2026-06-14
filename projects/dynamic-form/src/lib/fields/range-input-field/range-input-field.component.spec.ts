import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeInputFieldComponent } from './range-input-field.component';

describe('RangeInputFieldComponent', () => {
  let component: RangeInputFieldComponent;
  let fixture: ComponentFixture<RangeInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
