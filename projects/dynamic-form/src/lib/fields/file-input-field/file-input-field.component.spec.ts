import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileInputFieldComponent } from './file-input-field.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('FileInputFieldComponent', () => {
  let component: FileInputFieldComponent;
  let fixture: ComponentFixture<FileInputFieldComponent>;
  let formBuilder: FormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FileInputFieldComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(FileInputFieldComponent);
    formBuilder = TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.field = {
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
  it('should have is-valid get function', () => {
    expect(component.isValid).toBe(true);
  });
  it('should have is-dirty get function', () => {
    expect(component.isDirty).toBe(false);
  });
  it('should have toggleHover', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val: any = {};
    component.toggleHover(val);
  });
});
