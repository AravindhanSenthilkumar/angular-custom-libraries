import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropzoneDirective } from './dragZone.directive';

@Component({
  template: '<div dropZone></div>',
  standalone: true,
  imports: [DropzoneDirective],
})
class TestHostComponent {}

describe('DropzoneDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: DropzoneDirective;
  let hostElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, DropzoneDirective],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    hostElement = fixture.nativeElement.querySelector('div') as HTMLElement;
    directive = fixture.debugElement.children[0].injector.get(DropzoneDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit hovered state during drag over and leave', () => {
    let hoveredValue: boolean | undefined;
    directive.hovered.subscribe((value) => (hoveredValue = value));

    hostElement.dispatchEvent(new Event('dragover'));
    expect(directive.isHovering).toBe(true);
    expect(hoveredValue).toBe(true);

    hostElement.dispatchEvent(new Event('dragleave'));
    expect(directive.isHovering).toBe(false);
    expect(hoveredValue).toBe(false);
  });

  it('should emit dropped files when a file is dropped', () => {
    let droppedFiles: FileList | undefined;
    directive.dropped.subscribe((files) => (droppedFiles = files));

    const fileList = {
      0: new File(['content'], 'sample.txt'),
      length: 1,
      item: (index: number) => (index === 0 ? (fileList as unknown as FileList)[0] : null),
    } as unknown as FileList;

    const event = new Event('drop') as Event & { dataTransfer: { files: FileList } };
    Object.defineProperty(event, 'dataTransfer', {
      value: { files: fileList },
    });

    hostElement.dispatchEvent(event);

    expect(droppedFiles).toBe(fileList);
    expect(directive.isHovering).toBe(false);
  });
});
