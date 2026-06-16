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
});
