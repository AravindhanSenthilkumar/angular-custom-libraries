import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicSnackbar } from './dynamic-snackbar';

describe('DynamicToast', () => {
  let component: DynamicSnackbar;
  let fixture: ComponentFixture<DynamicSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSnackbar],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSnackbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
