import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RangeInputFieldComponent } from './range-input-field.component';

describe('RangeInputFieldComponent', () => {
  let component: RangeInputFieldComponent;
  let fixture: ComponentFixture<RangeInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeInputFieldComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeInputFieldComponent);
    component = fixture.componentInstance;
    component.field = { name: 'rangeField', type: 'range' } as any;
    component.form = new FormGroup({ rangeField: new FormControl(0) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
