import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ICountryCode } from '../../model/dynamic-form.model';

export const DEFAULT_COUNTRY_CODES: ICountryCode[] = [
  { code: '+91', country: 'India', label: '+91 (India)' },
  { code: '+1', country: 'United States', label: '+1 (US)' },
  { code: '+44', country: 'United Kingdom', label: '+44 (UK)' },
  { code: '+61', country: 'Australia', label: '+61 (AU)' },
  { code: '+49', country: 'Germany', label: '+49 (DE)' },
  { code: '+33', country: 'France', label: '+33 (FR)' },
  { code: '+971', country: 'UAE', label: '+971 (AE)' },
  { code: '+65', country: 'Singapore', label: '+65 (SG)' },
  { code: '+81', country: 'Japan', label: '+81 (JP)' },
  { code: '+86', country: 'China', label: '+86 (CN)' },
  { code: '+55', country: 'Brazil', label: '+55 (BR)' },
  { code: '+52', country: 'Mexico', label: '+52 (MX)' },
  { code: '+39', country: 'Italy', label: '+39 (IT)' },
  { code: '+34', country: 'Spain', label: '+34 (ES)' },
  { code: '+31', country: 'Netherlands', label: '+31 (NL)' },
  { code: '+966', country: 'Saudi Arabia', label: '+966 (SA)' },
  { code: '+27', country: 'South Africa', label: '+27 (ZA)' },
  { code: '+64', country: 'New Zealand', label: '+64 (NZ)' },
  { code: '+60', country: 'Malaysia', label: '+60 (MY)' },
  { code: '+62', country: 'Indonesia', label: '+62 (ID)' },
  { code: '+84', country: 'Vietnam', label: '+84 (VN)' },
  { code: '+63', country: 'Philippines', label: '+63 (PH)' },
  { code: '+66', country: 'Thailand', label: '+66 (TH)' },
  { code: '+82', country: 'South Korea', label: '+82 (KR)' },
  { code: '+7', country: 'Russia', label: '+7 (RU)' },
  { code: '+20', country: 'Egypt', label: '+20 (EG)' },
  { code: '+234', country: 'Nigeria', label: '+234 (NG)' },
  { code: '+92', country: 'Pakistan', label: '+92 (PK)' },
  { code: '+880', country: 'Bangladesh', label: '+880 (BD)' },
  { code: '+94', country: 'Sri Lanka', label: '+94 (LK)' }
];

@Component({
  selector: 'app-tel-field',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './tel-field.component.html',
  styleUrl: './tel-field.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class TelFieldComponent implements OnInit, OnChanges, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any = {};
  @Input() public form!: FormGroup;

  public countryCodes: ICountryCode[] = [];
  public selectedCountryCode: string = '';
  public phoneNumber: string = '';
  public countryCodeError: string = '';
  public phoneError: string = '';
  private valueChangesSub?: Subscription;

  get isValid() {
    return this.form?.controls[this.field?.name]?.valid;
  }

  get isDirty() {
    return this.form?.controls[this.field?.name]?.dirty || this.form?.controls[this.field?.name]?.touched;
  }

  get isCountryCodeInvalid(): boolean {
    return !!this.countryCodeError;
  }

  get isPhoneNumberInvalid(): boolean {
    return !!this.phoneError;
  }

  ngOnInit(): void {
    this.initCountryCodes();
    this.initValue();
    this.subscribeToValueChanges();
    this.validateAndSetErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['field'] || changes['form']) {
      this.initCountryCodes();
      this.initValue();
      this.subscribeToValueChanges();
      this.validateAndSetErrors();
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }

  private initCountryCodes(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sourceList: any[] = [];
    if (this.field?.countryCodes && Array.isArray(this.field.countryCodes) && this.field.countryCodes.length > 0) {
      sourceList = this.field.countryCodes;
    } else if (this.field?.options && Array.isArray(this.field.options) && this.field.options.length > 0) {
      sourceList = this.field.options;
    } else {
      sourceList = DEFAULT_COUNTRY_CODES;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.countryCodes = sourceList.map((item: any) => {
      if (typeof item === 'string') {
        return { code: item, label: item, country: '' };
      }
      const codeVal = item.code || item.key || item.value || '';
      const countryVal = item.country || '';
      const labelVal = item.label || (countryVal ? `${codeVal} (${countryVal})` : codeVal);
      return {
        code: String(codeVal),
        country: String(countryVal),
        label: String(labelVal)
      };
    });

    if (this.field?.defaultCountryCode) {
      this.selectedCountryCode = this.field.defaultCountryCode;
    } else if (this.countryCodes.length > 0 && !this.selectedCountryCode) {
      this.selectedCountryCode = this.countryCodes[0].code;
    }
  }

  private initValue(): void {
    const rawVal = this.form?.controls[this.field?.name]?.value || this.field?.value || '';
    if (typeof rawVal === 'string' && rawVal.trim().length > 0) {
      this.parseAndSetPhoneNumber(rawVal.trim());
    } else {
      this.phoneNumber = '';
    }
  }

  private parseAndSetPhoneNumber(val: string): void {
    const sortedCodes = [...this.countryCodes].sort((a, b) => b.code.length - a.code.length);
    let matched = false;
    for (const c of sortedCodes) {
      if (c.code && val.startsWith(c.code)) {
        this.selectedCountryCode = c.code;
        this.phoneNumber = val.slice(c.code.length).trim();
        matched = true;
        break;
      }
    }
    if (!matched) {
      this.phoneNumber = val;
    }
  }

  private subscribeToValueChanges(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
    const control = this.form?.controls[this.field?.name];
    if (control) {
      this.valueChangesSub = control.valueChanges.subscribe((val) => {
        const currentVal = (this.phoneNumber.trim().length > 0 && this.selectedCountryCode)
          ? `${this.selectedCountryCode} ${this.phoneNumber.trim()}`
          : (this.phoneNumber.trim() || '');
        if (val !== currentVal && typeof val === 'string') {
          this.initValue();
          this.validateAndSetErrors();
        }
      });
    }
  }

  public onCountryCodeChange(code: string): void {
    this.selectedCountryCode = code;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onPhoneNumberInput(val: string): void {
    this.phoneNumber = val;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onBlur(): void {
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  private markAsDirtyAndTouched(): void {
    const control = this.form?.controls[this.field?.name];
    if (control) {
      control.markAsDirty();
      control.markAsTouched();
    }
  }

  public updateFormControl(): void {
    this.validateAndSetErrors();
    if (this.field?.OnChange && typeof this.field.OnChange === 'function') {
      const control = this.form?.controls[this.field?.name];
      this.field.OnChange(control?.value, this.field.name);
    }
  }

  private validateAndSetErrors(): void {
    const control = this.form?.controls[this.field?.name];
    const isRequired = !!this.field?.validators?.required;
    const isPhoneEmpty = !this.phoneNumber || this.phoneNumber.trim().length === 0;
    const isCodeEmpty = !this.selectedCountryCode || this.selectedCountryCode.trim().length === 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: Record<string, any> = {};

    // Validate Country Code
    if (isCodeEmpty) {
      if (isRequired || !isPhoneEmpty) {
        errors['countryCodeRequired'] = true;
        this.countryCodeError = 'Country code is required';
      } else {
        this.countryCodeError = '';
      }
    } else {
      this.countryCodeError = '';
    }

    // Validate Phone Number
    if (isPhoneEmpty) {
      if (isRequired) {
        errors['required'] = true;
        this.phoneError = 'Phone number is required';
      } else {
        this.phoneError = '';
      }
    } else {
      const phoneTrimmed = this.phoneNumber.trim();
      const phoneDigitsOnly = phoneTrimmed.replace(/[\s\-\(\)]/g, '');
      const validPhoneFormatRegex = /^[0-9\-\s\(\)\+]+$/;

      if (!validPhoneFormatRegex.test(phoneTrimmed) || phoneDigitsOnly.length === 0) {
        errors['invalidPhoneNumber'] = true;
        this.phoneError = 'Invalid phone number format';
      } else if (this.field?.validators?.minLength && phoneDigitsOnly.length < this.field.validators.minLength) {
        errors['minlength'] = { requiredLength: this.field.validators.minLength, actualLength: phoneDigitsOnly.length };
        this.phoneError = `Minimum ${this.field.validators.minLength} digits required`;
      } else if (this.field?.validators?.maxLength && phoneDigitsOnly.length > this.field.validators.maxLength) {
        errors['maxlength'] = { requiredLength: this.field.validators.maxLength, actualLength: phoneDigitsOnly.length };
        this.phoneError = `Maximum ${this.field.validators.maxLength} digits allowed`;
      } else if (this.field?.validators?.pattern) {
        try {
          const customReg = new RegExp(this.field.validators.pattern);
          if (!customReg.test(phoneTrimmed)) {
            errors['pattern'] = true;
            this.phoneError = 'Phone number does not match pattern';
          } else {
            this.phoneError = '';
          }
        } catch {
          this.phoneError = '';
        }
      } else {
        this.phoneError = '';
      }
    }

    const fullValue = (!isCodeEmpty && !isPhoneEmpty)
      ? `${this.selectedCountryCode} ${this.phoneNumber.trim()}`
      : (this.phoneNumber.trim() || '');

    if (control) {
      control.setValue(fullValue, { emitEvent: false });
      if (Object.keys(errors).length > 0) {
        control.setErrors(errors);
      } else {
        control.setErrors(null);
      }
    }
  }
}
