import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextFieldComponent, ReactiveFormsModule],
    });
    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      type: 'datetime-local',
      name: 'fieldName',
      value: '',
    };
    component.form = formBuilder.group({
      fieldName: null,
    });
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have isValid', () => {
    expect(component.isValid).toBe(true);
  });
});
