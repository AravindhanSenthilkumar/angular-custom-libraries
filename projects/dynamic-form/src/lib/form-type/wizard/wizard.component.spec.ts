import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WizardComponent } from './wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, WizardComponent],
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
    const emitSpy = vi.spyOn(component.onSubmitWizardForm, 'emit');
    component.wizardForm = { wizards: [{ wizardName: 'step1' }] } as any;
    component.formValues = [{ value: { field: 'val' } }] as any;
    component.submitWizardForm();
    expect(emitSpy).toHaveBeenCalledWith({ step1: { field: 'val' } });
  });
  it('should have onCancel', () => {
    const emitSpy = vi.spyOn(component.onCancelWizardForm, 'emit');
    component.onCancel();
    expect(emitSpy).toHaveBeenCalled();
  });
});