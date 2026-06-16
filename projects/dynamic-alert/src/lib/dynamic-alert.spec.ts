import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynamicAlert } from './dynamic-alert';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

const dialogMock = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => {},
};

describe('DynamicAlert', () => {
  let component: DynamicAlert;
  let fixture: ComponentFixture<DynamicAlert>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatDialogModule, RouterTestingModule],
      declarations: [DynamicAlert],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have onYesClick', () => {
    component.onYesClick();
  });
  it('should have onNoClick', () => {
    component.onNoClick();
  });
});