import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimeFieldComponent } from './time-field.component';

describe('TimeFieldComponent', () => {
  let component: TimeFieldComponent;
  let fixture: ComponentFixture<TimeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeFieldComponent, ReactiveFormsModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeFieldComponent);
    component = fixture.componentInstance;
    component.field = { name: 'preferredTime', label: 'Preferred Time', type: 'time' };
    component.form = new FormGroup({
      preferredTime: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate 12 hour options, 60 minute options, and 60 second options', () => {
    expect(component.hourOptions.length).toBe(12);
    expect(component.minuteOptions.length).toBe(60);
    expect(component.secondOptions.length).toBe(60);
  });

  it('should update form control value when hour, minute, period, or timezone changes', () => {
    component.onHourChange('09');
    component.onMinuteChange('15');
    component.onPeriodChange('PM');
    component.onTimeZoneChange('IST');
    expect(component.form.controls['preferredTime'].value).toBe('09:15 PM IST');
  });

  it('should include seconds when showSeconds is true', () => {
    component.field = { name: 'preferredTime', label: 'Preferred Time', type: 'time', showSeconds: true };
    component.onHourChange('11');
    component.onMinuteChange('45');
    component.onSecondChange('30');
    component.onPeriodChange('AM');
    component.onTimeZoneChange('UTC');
    expect(component.form.controls['preferredTime'].value).toBe('11:45:30 AM UTC');
  });

  it('should load custom timezones from input JSON field.timeZones property', () => {
    component.field = {
      name: 'preferredTime',
      type: 'time',
      timeZones: [
        { code: 'IST', label: 'India (IST)', offset: '+05:30' },
        { code: 'PST', label: 'Pacific (PST)', offset: '-08:00' }
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
    expect(component.timeZones.length).toBe(2);
    expect(component.timeZones[0].code).toBe('IST');
    expect(component.timeZones[1].code).toBe('PST');
  });
});
