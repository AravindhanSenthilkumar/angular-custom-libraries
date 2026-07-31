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

  const fieldTypesToTest = [
    { type: 'text', value: 'John' },
    { type: 'password', value: 'secret123' },
    { type: 'email', value: 'user@test.com' },
    { type: 'number', value: 42 },
    { type: 'tel', value: '+123456789' },
    { type: 'url', value: 'https://example.com' },
    { type: 'color', value: '#ff0000' },
    { type: 'range', value: 50 },
    { type: 'text-area', value: 'Sample long bio text' },
    { type: 'date', value: '2026-01-01' },
    { type: 'time', value: '14:30' },
    { type: 'drop-down', value: 'IND', options: [{ key: 'IND', label: 'India' }] },
    { type: 'slide-toggle', value: true },
    { type: 'file', value: null },
    { type: 'checkbox', value: true },
    { type: 'radio', value: 'Option1', options: [{ key: 'Option1', label: 'Option 1' }] }
  ];

  fieldTypesToTest.forEach(({ type, value, options }) => {
    it(`should correctly bind and validate field type "${type}"`, () => {
      const fieldName = `field_${type.replace('-', '_')}`;
      const mockField = {
        name: fieldName,
        type: type as any,
        label: `Test ${type}`,
        value: value,
        options: options || []
      };
      const mockForm = new FormGroup({
        [fieldName]: new FormControl(value)
      });

      component.field = mockField;
      component.form = mockForm;

      expect(component.isValid).toBe(true);
      expect(component.isDirty).toBe(false);
      expect(component.form.controls[fieldName].value).toEqual(value);
    });
  });

  it('should correctly bind and validate field type "group"', () => {
    const mockField = {
      name: 'groupField',
      type: 'group' as any,
      children: [{ name: 'subField', type: 'text' }]
    };
    const mockForm = new FormGroup({
      groupField: new FormGroup({
        subField: new FormControl('subValue')
      })
    });

    component.field = mockField;
    component.form = mockForm;

    expect(component.isValid).toBe(true);
    expect(component.isDirty).toBe(false);
  });

  it('should correctly bind and validate field type "array"', () => {
    const mockField = {
      name: 'arrayField',
      type: 'array' as any,
      children: [{ name: 'itemField', type: 'text' }]
    };
    const mockForm = new FormGroup({
      arrayField: new FormArray([
        new FormGroup({ itemField: new FormControl('itemValue') })
      ])
    });

    component.field = mockField;
    component.form = mockForm;

    expect(component.isValid).toBe(true);
    expect(component.isDirty).toBe(false);
  });
});