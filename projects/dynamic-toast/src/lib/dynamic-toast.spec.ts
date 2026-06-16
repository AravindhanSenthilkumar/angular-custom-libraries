import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicToast } from './dynamic-toast';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('ToastComponent', () => {
  let component: DynamicToast;
  let fixture: ComponentFixture<DynamicToast>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [DynamicToast],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: [] }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicToast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
