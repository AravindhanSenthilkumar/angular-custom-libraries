import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WizardTest } from './wizard-test';

describe('WizardTest', () => {
  let component: WizardTest;
  let fixture: ComponentFixture<WizardTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardTest, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WizardTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
