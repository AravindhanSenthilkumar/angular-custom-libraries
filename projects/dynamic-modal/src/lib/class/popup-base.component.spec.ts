import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupBaseComponent } from './popup-base.component';

describe('PopupBaseComponent', () => {
  let component: PopupBaseComponent;
  let fixture: ComponentFixture<PopupBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose popup context and emitters', () => {
    component.popupContext = { title: 'Test' };
    component.onPopupClose.emit(true);
    component.onPopupSubmit.emit(true);

    expect(component.popupContext.title).toBe('Test');
  });
});
