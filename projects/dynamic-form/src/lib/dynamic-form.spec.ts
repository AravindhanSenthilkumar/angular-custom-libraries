/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicForm } from './dynamic-form';
import { Field } from '../lib/model/dynamic-form.model';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType } from '../lib/enum/field-type.enum';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicForm],
    });
    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have ngOnInit', () => {
    component.ngOnInit();
  });
  it('should have submitForm', () => {
    let value: any;
    component.submitForm(value);
  });
  it('should have formReset', () => {
    component.formReset();
  });
  it('should initialize the form with controls', () => {
    const fields: Array<Field> = [
      { 
        name: 'field1', 
        type: FieldType.text, 
        value: 'initialValue' 
      },
      {
        name: 'field2',
        type: FieldType.group,
        children: [
          { 
            name: 'nestedField', 
            type: FieldType.text, 
            value: 'nestedValue' 
          }
        ],
      },
    ];
    component.getForm(component.form, fields);
    expect(component.form.get('field1')).toBeTruthy();
    expect(component.form.get('field2')).toBeTruthy();
  });
  it('should initialize a FormArray with values', () => {
    const fields: Array<Field> = [
      {
        name: 'arrayField',
        type: FieldType.array,
        children: [
          { 
            name: 'nestedField', 
            type: FieldType.text, 
            value: 'nestedValue' 
          }
        ],
        value: [
          { nestedField: 'value1' }, 
          { nestedField: 'value2' }
        ],
      },
    ];
    component.getForm(component.form, fields);
    const array = component.form.get('arrayField') as FormArray;
    expect(array).toBeTruthy();
    expect(array.length).toBe(2);
    const nestedFormGroup = array.at(0) as FormGroup;
    expect(nestedFormGroup.get('nestedField')?.value).toEqual('value1');
  });
  it('should initialize a FormArray without values', () => {
    const fields: Array<Field> = [
      {
        name: 'arrayField',
        type: FieldType.array,
        children: [
          { 
            name: 'nestedField', 
            type: FieldType.text, 
            value: 'nestedValue' 
          }
        ],
      },
    ];
    component.getForm(component.form, fields);
    const array = component.form.get('arrayField') as FormArray;
    expect(array).toBeTruthy();
    expect(array.length).toBe(0);
  });
  it('should have roundValues', () => {
    const noOfcolumns = 1;
    component.roundValues(noOfcolumns);
  });
});
