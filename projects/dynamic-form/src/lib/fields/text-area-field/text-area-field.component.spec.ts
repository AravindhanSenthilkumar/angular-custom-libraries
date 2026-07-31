import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextAreaFieldComponent } from './text-area-field.component';

describe('TextAreaFieldComponent', () => {
  let component: TextAreaFieldComponent;
  let fixture: ComponentFixture<TextAreaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaFieldComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaFieldComponent);
    component = fixture.componentInstance;
    component.field = { name: 'textAreaField', type: 'text-area' } as any;
    component.form = new FormGroup({ textAreaField: new FormControl('') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
