import { TestBed } from '@angular/core/testing';
import { ModalService } from './alert.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertType, MessageType } from '../interfaces/idialog';
describe('ModalService', () => {
  let service: ModalService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
    }).compileComponents();
    service = TestBed.inject(ModalService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have model width', () => {
    expect(service.widthModel).toBe('400px');
  });
  it('should have success alert', () => {
    const message = 'Test success';
    service.success(message);
  });
  it('should have error alert', () => {
    const message = 'Test error';
    service.error(message);
  });
  it('should have info alert', () => {
    const message = 'Test info';
    service.info(message);
  });
  it('should have waring alert', () => {
    const message = 'Test waring';
    service.warning(message);
  });
  it('should have waring alert', () => {
    const message = 'Test Confirmation';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    service.confirmationModel(message, () => {});
  });
  it('should have open dialog', () => {
    const disableClose = false;
    const width = service.widthModel;
    const messageContent = 'Test Dialog';
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    service.openDialog(disableClose, width, messageContent, MessageType.info, AlertType.confirmation, () => {});
  });
});
