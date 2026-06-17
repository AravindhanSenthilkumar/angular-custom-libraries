import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDataTable } from './dynamic-data-table';

describe('DynamicDataTable', () => {
  let component: DynamicDataTable;
  let fixture: ComponentFixture<DynamicDataTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDataTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicDataTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
