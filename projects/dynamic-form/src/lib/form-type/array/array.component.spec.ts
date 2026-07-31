import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArrayComponent } from './array.component';

describe('ArrayComponent', () => {
  let component: ArrayComponent;
  let fixture: ComponentFixture<ArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrayComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrayComponent);
    component = fixture.componentInstance;
    component.field = { name: 'arrayField', type: 'array', children: [] } as any;
    component.form = new FormGroup({ arrayField: new FormArray([]) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
