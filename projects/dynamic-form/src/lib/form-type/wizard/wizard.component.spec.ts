import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from './wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [WizardComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have submitWizardForm', () => {
    component.submitWizardForm();
  });
  it('should have onCancel', () => {
    component.onCancel();
  });
});