import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldIndexComponent } from './field-index.component';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

describe('FieldIndexComponent', () => {
  let component: FieldIndexComponent;
  let fixture: ComponentFixture<FieldIndexComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FieldIndexComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(FieldIndexComponent);
    component = fixture.componentInstance;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have is-valid get function', () => {
    const mockField = { type: 'array', name: 'testArray', children: [{ name: 'childField' }] };
    const mockForm = new FormGroup({
      testArray: new FormArray([]),
    });
    component.field = mockField;
    component.form = mockForm;
    expect(component.isValid).toBe(true);
  });

  it('should have is-dirty get function', () => {
    const mockField = { type: 'array', name: 'testArray', children: [{ name: 'childField' }] };
    const mockForm = new FormGroup({
      testArray: new FormArray([]),
    });
    component.field = mockField;
    component.form = mockForm;
    expect(component.isDirty).toBe(false);
  });
  it('should have errorMessage get function', () => {
    const mockField = { type: 'array', name: 'testArray', children: [{ name: 'childField' }] };
    const mockForm = new FormGroup({
      testArray: new FormArray([]),
    });
    component.field = mockField;
    component.form = mockForm;
    expect(component.errorMessage).toEqual('');
  });

  it('should provide correct form group and form array details', () => {
    const mockField = { name: 'testField' };
    const mockForm = new FormGroup({
      testField: new FormControl('value'),
    });
    component.field = mockField;
    component.form = mockForm;
  });
  
  it('should generate validation message correctly', () => {
    const mockField = { name: 'testField' };
    const mockForm = new FormGroup({
      testField: new FormControl('', Validators.required),
    });
    component.field = mockField;
    component.form = mockForm;
    const errorMessage = 'This field is required.';
    expect(errorMessage).toBe('This field is required.');
  });
});