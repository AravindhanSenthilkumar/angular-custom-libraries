import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[dropZone]'
})
export class DropzoneDirective {
  @Output() hovered = new EventEmitter<boolean>();
  @Output() dropped = new EventEmitter<FileList>();

  @HostBinding('class.hovering') isHovering = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovering = true;
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.isHovering = false;
    this.hovered.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
    this.hovered.emit(false);
    if (event.dataTransfer?.files) {
      this.dropped.emit(event.dataTransfer.files);
    }
  }
}
