/* eslint-disable @typescript-eslint/ban-types */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropdownFieldComponent } from './dropdown-field.component';
import { FormBuilder } from '@angular/forms';

describe('DropdownFieldComponent', () => {
  let component: DropdownFieldComponent;
  let fixture: ComponentFixture<DropdownFieldComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownFieldComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [FormBuilder],
    }).compileComponents();
    formBuilder = TestBed.inject(FormBuilder);
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      name: 'fieldName',
    };
    component.form = formBuilder.group({
      fieldName: [],
    });
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return result from OnChange when OnChange is provided', () => {
    const mockOnChange = jest.fn((option, fieldName) => {
      expect(option).toBe('selectedOption');
      expect(fieldName).toBe('fieldName');
      return true;
    });
    const result = component.isValueSelectedInMultiple('selectedOption', mockOnChange);
    expect(mockOnChange).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('should return true when option is in the form control value (array)', () => {
    component.form.get('fieldName')?.setValue(['option1', 'option2', 'option3']);
    const result = component.isValueSelectedInMultiple('option2');
    expect(result).toBe(true);
  });
  it('should return false when option is not in the form control value (array)', () => {
    component.form.get('fieldName')?.setValue(['option1', 'option3']);
    const result = component.isValueSelectedInMultiple('option2');
    expect(result).toBe(false);
  });
  it('should return result from isValueSelectedInSingle when form control value is not an array', () => {
    const mockIsValueSelectedInSingle = jest.fn(() => true);
    component.form.get('fieldName')?.setValue('singleOption');
    component.isValueSelectedInSingle = mockIsValueSelectedInSingle;
    const result = component.isValueSelectedInMultiple('selectedOption');
    expect(mockIsValueSelectedInSingle).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('should return result from OnChange when OnChange is provided', () => {
    const mockOnChange = jest.fn((option, fieldName) => {
      expect(option).toBe('selectedOption');
      expect(fieldName).toBe('fieldName');
      return true;
    });
    const result = component.isValueSelectedInSingle('selectedOption', mockOnChange);
    expect(mockOnChange).toHaveBeenCalled();
    expect(result).toBe(true);
  });
  it('should return true when option is equal to the form control value', () => {
    component.form.get('fieldName')?.setValue('selectedOption');
    const result = component.isValueSelectedInSingle('selectedOption');
    expect(result).toBe(true);
  });
  it('should return false when option is not equal to the form control value', () => {
    component.form.get('fieldName')?.setValue('otherOption');
    const result = component.isValueSelectedInSingle('selectedOption');
    expect(result).toBe(false);
  });
  it('should return false when option is not provided and form control value is not equal', () => {
    component.form.get('fieldName')?.setValue('selectedOption');
    const result = component.isValueSelectedInSingle(undefined);
    expect(result).toBe(false);
  });
  it('should have isValueSelectedInMultiple', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const option: any = {};
    let OnChange: Function | undefined;
    component.isValueSelectedInMultiple(option, OnChange);
  });
  it('should have isValueSelectedInSingle', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const option: any = {};
    let OnChange: Function | undefined;
    component.isValueSelectedInSingle(option, OnChange);
  });
});