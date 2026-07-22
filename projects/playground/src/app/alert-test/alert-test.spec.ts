import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertTest } from './alert-test';

describe('AlertTest', () => {
  let component: AlertTest;
  let fixture: ComponentFixture<AlertTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertTest, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
