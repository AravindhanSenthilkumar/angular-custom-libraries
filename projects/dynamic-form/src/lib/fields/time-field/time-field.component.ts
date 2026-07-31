import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { ITimeZone } from '../../model/dynamic-form.model';
import { FloatLabel } from '../../enum/float-label.enum';

export const DEFAULT_TIME_ZONES: ITimeZone[] = [
  { code: 'IST', label: 'IST (UTC+05:30)', offset: '+05:30' },
  { code: 'ET', label: 'ET / EST (UTC-05:00)', offset: '-05:00' },
  { code: 'CT', label: 'CT / CST (UTC-06:00)', offset: '-06:00' },
  { code: 'MT', label: 'MT / MST (UTC-07:00)', offset: '-07:00' },
  { code: 'PT', label: 'PT / PST (UTC-08:00)', offset: '-08:00' },
  { code: 'UTC', label: 'UTC (UTC+00:00)', offset: '+00:00' },
  { code: 'GMT', label: 'GMT (UTC+00:00)', offset: '+00:00' },
  { code: 'BST', label: 'BST (UTC+01:00)', offset: '+01:00' },
  { code: 'CET', label: 'CET (UTC+01:00)', offset: '+01:00' },
  { code: 'JST', label: 'JST (UTC+09:00)', offset: '+09:00' },
  { code: 'SGT', label: 'SGT (UTC+08:00)', offset: '+08:00' },
  { code: 'AEST', label: 'AEST (UTC+10:00)', offset: '+10:00' },
  { code: 'GST', label: 'GST (UTC+04:00)', offset: '+04:00' }
];

@Component({
  selector: 'app-time-field',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  templateUrl: './time-field.component.html',
  styleUrl: './time-field.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class TimeFieldComponent implements OnInit, OnChanges, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any = {};
  @Input() public form!: FormGroup;

  public hourOptions: string[] = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  public minuteOptions: string[] = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  public secondOptions: string[] = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  public timeZones: ITimeZone[] = [];
  public selectedHour: string = '10';
  public selectedMinute: string = '00';
  public selectedSecond: string = '00';
  public selectedPeriod: string = 'AM';
  public selectedTimeZone: string = 'IST';
  public timeError: string = '';
  private valueChangesSub?: Subscription;

  get isValid() {
    return this.form?.controls[this.field?.name]?.valid;
  }

  get isDirty() {
    return this.form?.controls[this.field?.name]?.dirty || this.form?.controls[this.field?.name]?.touched;
  }

  get floatLabelClass(): string {
    const fl = this.field?.floatLabel;
    if (fl === 'always' || fl === FloatLabel.always) {
      return 'floating-always';
    }
    if (fl === 'never' || fl === FloatLabel.never) {
      return 'floating-never';
    }
    return 'floating-auto';
  }

  ngOnInit(): void {
    this.initTimeZones();
    this.initValue();
    this.subscribeToValueChanges();
    this.validateAndSetErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['field'] || changes['form']) {
      this.initTimeZones();
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

  private initTimeZones(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sourceList: any[] = [];
    if (this.field?.timeZones && Array.isArray(this.field.timeZones) && this.field.timeZones.length > 0) {
      sourceList = this.field.timeZones;
    } else if (this.field?.options && Array.isArray(this.field.options) && this.field.options.length > 0 && !this.field?.timeOptions) {
      sourceList = this.field.options;
    } else {
      sourceList = DEFAULT_TIME_ZONES;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.timeZones = sourceList.map((item: any) => {
      if (typeof item === 'string') {
        return { code: item, label: item, offset: '' };
      }
      const codeVal = item.code || item.key || item.value || '';
      const offsetVal = item.offset || '';
      const labelVal = item.label || (offsetVal ? `${codeVal} (${offsetVal})` : codeVal);
      return {
        code: String(codeVal),
        label: String(labelVal),
        offset: String(offsetVal)
      };
    });

    if (this.field?.defaultTimeZone) {
      this.selectedTimeZone = this.field.defaultTimeZone;
    } else if (this.timeZones.length > 0) {
      const exists = this.timeZones.some(tz => tz.code === this.selectedTimeZone);
      if (!exists) {
        this.selectedTimeZone = this.timeZones[0].code;
      }
    }
  }

  private initValue(): void {
    const rawVal = this.form?.controls[this.field?.name]?.value || this.field?.value || '';
    if (typeof rawVal === 'string' && rawVal.trim().length > 0) {
      this.parseAndSetTime(rawVal.trim());
    }
  }

  private parseAndSetTime(val: string): void {
    const sortedTz = [...this.timeZones].sort((a, b) => b.code.length - a.code.length);
    let timePart = val;

    for (const tz of sortedTz) {
      if (tz.code && val.endsWith(tz.code)) {
        this.selectedTimeZone = tz.code;
        timePart = val.slice(0, val.length - tz.code.length).trim();
        break;
      }
    }

    if (timePart.includes('PM')) {
      this.selectedPeriod = 'PM';
      timePart = timePart.replace(/PM/gi, '').trim();
    } else if (timePart.includes('AM')) {
      this.selectedPeriod = 'AM';
      timePart = timePart.replace(/AM/gi, '').trim();
    }

    const parts = timePart.split(':');
    if (parts.length >= 1 && parts[0]) {
      let h = parseInt(parts[0], 10);
      if (!isNaN(h)) {
        if (h > 12) {
          h = h - 12;
          this.selectedPeriod = 'PM';
        } else if (h === 0) {
          h = 12;
        }
        this.selectedHour = String(h).padStart(2, '0');
      }
    }

    if (parts.length >= 2 && parts[1]) {
      const m = parseInt(parts[1], 10);
      if (!isNaN(m) && m >= 0 && m < 60) {
        this.selectedMinute = String(m).padStart(2, '0');
      }
    }

    if (parts.length >= 3 && parts[2]) {
      const s = parseInt(parts[2], 10);
      if (!isNaN(s) && s >= 0 && s < 60) {
        this.selectedSecond = String(s).padStart(2, '0');
      }
    }
  }

  private subscribeToValueChanges(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
    const control = this.form?.controls[this.field?.name];
    if (control) {
      this.valueChangesSub = control.valueChanges.subscribe((val) => {
        const currentVal = this.getCombinedValue();
        if (val !== currentVal && typeof val === 'string') {
          this.initValue();
          this.validateAndSetErrors();
        }
      });
    }
  }

  public onHourChange(h: string): void {
    this.selectedHour = h;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onMinuteChange(m: string): void {
    this.selectedMinute = m;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onSecondChange(s: string): void {
    this.selectedSecond = s;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onPeriodChange(p: string): void {
    this.selectedPeriod = p;
    this.markAsDirtyAndTouched();
    this.updateFormControl();
  }

  public onTimeZoneChange(tz: string): void {
    this.selectedTimeZone = tz;
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

  public getCombinedValue(): string {
    const showSec = !!this.field?.showSeconds;
    const timeStr = showSec
      ? `${this.selectedHour}:${this.selectedMinute}:${this.selectedSecond} ${this.selectedPeriod}`
      : `${this.selectedHour}:${this.selectedMinute} ${this.selectedPeriod}`;

    return this.selectedTimeZone ? `${timeStr} ${this.selectedTimeZone}` : timeStr;
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
    const isTimeEmpty = !this.selectedHour || !this.selectedMinute;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: Record<string, any> = {};

    if (isTimeEmpty && isRequired) {
      errors['required'] = true;
      this.timeError = `${this.field?.label || 'Time'} is required`;
    } else {
      this.timeError = '';
    }

    const fullValue = this.getCombinedValue();

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
