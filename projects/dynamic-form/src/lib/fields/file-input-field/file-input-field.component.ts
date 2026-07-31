import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';

/********************************************************************** 
  Page : file input page (used by field index component)
  Desc : contains functionalities of file input page
**********************************************************************/

@Component({
  selector: 'app-file-input-field',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
    MatTooltipModule,
    ReactiveFormsModule, 
    FormsModule,
    DragDropModule
  ],
  templateUrl: './file-input-field.component.html',
  styleUrl: './file-input-field.component.scss'
})

export class FileInputFieldComponent {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() field: any = {};
  /**
   * Desc : declaring form input to receive data from parent component
   */
  @Input() form!: FormGroup;
  /**
   * Desc : selected file name display
   */
  public selectedFileName: string = '';
  /**
   * Desc : check whether the form is valid or not
   */
  get isValid() {
    return this.form?.controls[this.field.name].valid;
  }
  /**
   * Desc : check whether the form is dirty or not
   */
  get isDirty() {
    return this.form?.controls[this.field.name].dirty;
  }
  /**
   * Desc : hovering on the file input
   */
  public isHovering = false;
  /**
   * Desc : executes while hovering on the file input
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public toggleHover(val: any) {}

  /**
   * Desc: handles file selection change
   */
  public onFileChange(event: any): void {
    const files = event.target?.files;
    if (files && files.length > 0) {
      this.selectedFileName = Array.from(files).map((f: any) => f.name).join(', ');
    }
    if (this.field?.onUpload) {
      this.field.onUpload(files);
    }
  }

  /**
   * Desc: checks if the value is an image source
   */
  public isImage(val: string): boolean {
    if (!val || typeof val !== 'string') return false;
    return val.startsWith('data:image') || /\.(jpg|jpeg|png|gif|svg|webp|avif)$/i.test(val);
  }
}
