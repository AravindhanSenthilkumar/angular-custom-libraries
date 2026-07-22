import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigTest } from './config-test';

describe('ConfigTest', () => {
  let component: ConfigTest;
  let fixture: ComponentFixture<ConfigTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigTest, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
