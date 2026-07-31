import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateTimeFieldComponent } from './date-time-field.component';

describe('DateTimeFieldComponent', () => {
  let component: DateTimeFieldComponent;
  let fixture: ComponentFixture<DateTimeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeFieldComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimeFieldComponent);
    component = fixture.componentInstance;
    component.field = { name: 'dateField', type: 'date' } as any;
    component.form = new FormGroup({ dateField: new FormControl('') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
