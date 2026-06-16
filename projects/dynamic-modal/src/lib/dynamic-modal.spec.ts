import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynamicModal } from './dynamic-modal';
import { Justify } from './interfaces/idialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupBaseComponent } from './class/popup-base.component';

const dialogMock = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  close: () => {},
};

describe('DynamicModal', () => {
  let component: DynamicModal;
  let fixture: ComponentFixture<DynamicModal>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [DynamicModal],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DynamicModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    component.inputData = {
      component: PopupBaseComponent,
      autoClose: true,
      header: {
        title: 'test',
        justification: Justify.left,
      },
      onClose: Function,
      onSubmit: Function,
    };
    expect(component).toBeTruthy();
  });
  it('should have onSubmit', () => {
    const eventValue = true;
    component.inputData = {
      component: PopupBaseComponent,
      autoClose: true,
      header: {
        title: '',
        justification: Justify.left,
      },
      onClose: Function,
      onSubmit: Function,
    };
    component.onSubmit(eventValue);
  });
  it('should have onClose', () => {
    const eventValue = true;
    component.inputData = {
      component: PopupBaseComponent,
      autoClose: true,
      header: {
        title: '',
        justification: Justify.left,
      },
      onClose: Function,
      onSubmit: Function,
    };
    component.onClose(eventValue);
  });
});