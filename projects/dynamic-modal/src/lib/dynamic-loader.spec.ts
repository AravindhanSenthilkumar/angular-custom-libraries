import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Type } from '@angular/core';
import { DynamicLoaderComponent } from './dynamic-loader';

@Component({ template: '<div>Loaded</div>' })
class TestHostComponent {}

describe('DynamicLoaderComponent', () => {
  let component: DynamicLoaderComponent;
  let fixture: ComponentFixture<DynamicLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicLoaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a child component when component input changes', () => {
    component.component = TestHostComponent as Type<any>;
    component.ngOnChanges({
      component: {
        currentValue: TestHostComponent,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as any);

    fixture.detectChanges();
    expect(component['container'].length).toBe(1);
  });

  it('should update inputs and bind outputs when child component exists', () => {
    component.component = TestHostComponent as Type<any>;
    component.inputs = { testInput: 'value' };
    component.outputs = {};
    component.ngOnChanges({
      component: {
        currentValue: TestHostComponent,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    } as any);

    fixture.detectChanges();
    expect(component['componentRef']).toBeDefined();
  });
});
