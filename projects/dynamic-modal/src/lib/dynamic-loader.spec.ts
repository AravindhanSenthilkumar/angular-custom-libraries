import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { DynamicLoaderComponent } from './dynamic-loader';

@Component({
  template: '<div>Loaded</div>',
  standalone: true,
})
class TestHostComponent {
  @Input() testInput?: string;
  @Output() testOutput = new EventEmitter<any>();
}

describe('DynamicLoaderComponent', () => {
  let component: DynamicLoaderComponent;
  let fixture: ComponentFixture<DynamicLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLoaderComponent, TestHostComponent],
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

  it('should update inputs and bind outputs when inputs change', () => {
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

    component.inputs = { testInput: 'newValue' };
    component.ngOnChanges({
      inputs: {
        currentValue: component.inputs,
        previousValue: { testInput: 'value' },
        firstChange: false,
        isFirstChange: () => false,
      },
    } as any);
    expect(component['componentRef']?.instance.testInput).toBe('newValue');
  });
});
