import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ModalTest } from './modal-test';

describe('ModalTest', () => {
  let component: ModalTest;
  let fixture: ComponentFixture<ModalTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTest, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
