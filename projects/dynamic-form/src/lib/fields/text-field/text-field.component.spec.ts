import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TextFieldComponent } from './text-field.component';
import { FormBuilder } from '@angular/forms';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextFieldComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(TextFieldComponent);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.field = {
      type: 'datetime-local',
      name: 'fieldName',
      value: '',
    };
    component.form = formBuilder?.group({
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
  it('should have ngOnInit', () => {
    component.ngOnInit();
    expect(component.form.value).toEqual({ fieldName: null });
  });
});
