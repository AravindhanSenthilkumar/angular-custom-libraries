import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CheckBoxFieldComponent } from './check-box-field.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('CheckBoxComponent', () => {
  let component: CheckBoxFieldComponent;
  let fixture: ComponentFixture<CheckBoxFieldComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CheckBoxFieldComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    formBuilder = TestBed.inject(FormBuilder);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      name: 'fieldName',
      options: [
        {
          key: '1',
          value: 'Option 1',
        },
        {
          key: '2',
          value: 'Option 2',
        },
      ],
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
  it('should have isValid get function', () => {
    expect(component.isValid).toBe(true);
  });
  it('should have isDirty get function', () => {
    expect(component.isDirty).toBe(false);
  });
  it('should have value get function', () => {
    expect(component.value).toEqual(null);
  });
  it('should set value to key when old value is null', () => {
    const checkEvent = { checked: true };
    const key = '1';
    component.toggle(checkEvent, key);
    expect(component.form?.get('fieldName')?.value).toBe(key);
  });
  it('should set value based on checked state and filter options', () => {
    component.form?.get('fieldName')?.setValue('1,2');
    const checkEvent = { checked: false };
    const key = '1';
    component.toggle(checkEvent, key);
    expect(component.form?.get('fieldName')?.value).toBe('2');
  });
  it('should set value to true when options are not available', () => {
    component.field.options = null;
    const checkEvent = { checked: true };
    component.toggle(checkEvent, '');
    expect(component.form?.get('fieldName')?.value).toBe(true);
  });
  it('should set value to false when options are not available', () => {
    component.field.options = null;
    const checkEvent = { checked: false };
    component.toggle(checkEvent, '');
    expect(component.form?.get('fieldName')?.value).toBe(false);
  });
});