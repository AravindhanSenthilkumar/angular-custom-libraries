import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TelFieldComponent } from './tel-field.component';

describe('TelFieldComponent', () => {
  let component: TelFieldComponent;
  let fixture: ComponentFixture<TelFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelFieldComponent, ReactiveFormsModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TelFieldComponent);
    component = fixture.componentInstance;
    component.field = {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      validators: { required: true }
    };
    component.form = new FormGroup({
      phone: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load country code dropdown values from input JSON countryCodes property', () => {
    component.field = {
      name: 'phone',
      type: 'tel',
      countryCodes: [
        { code: '+91', country: 'India', label: '+91 (India)' },
        { code: '+1', country: 'USA', label: '+1 (USA)' }
      ]
    };
    component.ngOnChanges({
      field: {
        currentValue: component.field,
        previousValue: null,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.countryCodes.length).toBe(2);
    expect(component.countryCodes[0].code).toBe('+91');
    expect(component.countryCodes[1].code).toBe('+1');
  });

  it('should load country code dropdown values from input JSON options property if countryCodes is not provided', () => {
    component.field = {
      name: 'phone',
      type: 'tel',
      options: [
        { key: '+44', label: '+44 (UK)' },
        { key: '+61', label: '+61 (AU)' }
      ]
    };
    component.ngOnChanges({
      field: {
        currentValue: component.field,
        previousValue: null,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    expect(component.countryCodes.length).toBe(2);
    expect(component.countryCodes[0].code).toBe('+44');
    expect(component.countryCodes[1].code).toBe('+61');
  });

  it('should set required error when required and phone number is empty', () => {
    component.onPhoneNumberInput('');
    expect(component.form.controls['phone'].hasError('required')).toBe(true);
    expect(component.phoneError).toBe('Phone number is required');
  });

  it('should set invalidPhoneNumber error when non-digit characters are typed', () => {
    component.onPhoneNumberInput('abcde123');
    expect(component.form.controls['phone'].hasError('invalidPhoneNumber')).toBe(true);
    expect(component.phoneError).toBe('Invalid phone number format');
  });

  it('should set minlength error when typed phone digits are less than minLength validator', () => {
    component.field = {
      name: 'phone',
      type: 'tel',
      validators: { required: true, minLength: 10 }
    };
    component.onPhoneNumberInput('98765');
    expect(component.form.controls['phone'].hasError('minlength')).toBe(true);
    expect(component.phoneError).toBe('Minimum 10 digits required');
  });

  it('should validate cleanly and set combined value when valid country code and phone number are entered', () => {
    component.field = {
      name: 'phone',
      type: 'tel',
      validators: { required: true, minLength: 10, maxLength: 10 }
    };
    component.onCountryCodeChange('+91');
    component.onPhoneNumberInput('9876543210');
    expect(component.form.controls['phone'].valid).toBe(true);
    expect(component.form.controls['phone'].value).toBe('+91 9876543210');
    expect(component.phoneError).toBe('');
    expect(component.countryCodeError).toBe('');
  });
});
