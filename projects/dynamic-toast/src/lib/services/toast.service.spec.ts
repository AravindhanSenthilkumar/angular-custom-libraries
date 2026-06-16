import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './toast.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
describe('ToastService', () => {
  let service: ToastService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatSnackBarModule, NoopAnimationsModule, ToastrModule.forRoot()],
    });
    service = TestBed.inject(ToastService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have duration', () => {
    expect(service.duration).toBe(4000);
  });
  it('should have autoclose', () => {
    expect(service.disableTimeOut).toBe(false);
  });
  it('should have success', () => {
    service.success('success test');
  });
  it('should have warning', () => {
    service.warning('warning test');
  });
  it('should have error', () => {
    service.error('error test');
  });
});