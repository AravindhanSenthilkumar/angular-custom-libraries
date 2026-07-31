import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

/***********************************************************************
  Page : file input page (used by field index component)
  Desc : contains functionalities of file input page — supports
         multi-file selection, thumbnail preview and per-file removal.
***********************************************************************/

export interface SelectedFileEntry {
  /** Original File object from the browser */
  file: File;
  /** Object URL for image/video preview (or null for other types) */
  previewUrl: string | null;
  /** Whether the file is an image */
  isImage: boolean;
  /** Whether the file is a video */
  isVideo: boolean;
  /** Local path: uses webkitRelativePath when available, else file.name */
  localPath: string;
}

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
  ],
  templateUrl: './file-input-field.component.html',
  styleUrl: './file-input-field.component.scss'
})
export class FileInputFieldComponent implements OnInit {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any = {};
  /**
   * Desc : declaring form input to receive data from parent component
   */
  @Input() public form!: FormGroup;

  /**
   * Desc : list of selected file entries with preview metadata
   */
  public selectedFiles: SelectedFileEntry[] = [];

  /**
   * Desc : display label for the trigger input (shows count or placeholder)
   */
  public get displayLabel(): string {
    if (this.selectedFiles.length === 0) {
      return this.field?.placeholder ?? 'Choose file(s)...';
    }
    return this.selectedFiles.length === 1
      ? this.selectedFiles[0].file.name
      : `${this.selectedFiles.length} files selected`;
  }

  /**
   * Desc : check whether the form is valid or not
   */
  get isValid() {
    return this.form?.controls[this.field.name]?.valid;
  }
  /**
   * Desc : check whether the form is dirty or not
   */
  get isDirty() {
    return this.form?.controls[this.field.name]?.dirty;
  }

  ngOnInit(): void {
    // pre-populate from field.value if it's already an array of paths/File entries
    // (no-op in most startup scenarios; kept for extensibility)
  }

  /**
   * Desc: handles file selection from the native input
   */
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const entry = this.buildEntry(file);
      this.selectedFiles.push(entry);
    });

    // Reset native input so the same file can be re-added if needed
    input.value = '';

    this.syncFormValue();

    if (this.field?.onUpload) {
      this.field.onUpload(this.selectedFiles.map((e) => e.file));
    }
  }

  /**
   * Desc: removes a file entry by index and revokes its object URL
   */
  public removeFile(index: number): void {
    const entry = this.selectedFiles[index];
    if (entry?.previewUrl) {
      URL.revokeObjectURL(entry.previewUrl);
    }
    this.selectedFiles.splice(index, 1);
    this.syncFormValue();
  }

  /**
   * Desc: builds a SelectedFileEntry from a File object
   */
  private buildEntry(file: File): SelectedFileEntry {
    const isImage = /^image\//i.test(file.type);
    const isVideo = /^video\//i.test(file.type);
    const needsPreview = isImage || isVideo;
    const previewUrl = needsPreview ? URL.createObjectURL(file) : null;
    const localPath = this.resolveLocalPath(file);

    return { file, previewUrl, isImage, isVideo, localPath };
  }

  /**
   * Desc: resolves the best available local path for a File object.
   *
   * Priority chain:
   *  1. (file as any).path  — available in Electron renderer process;
   *     gives the full OS absolute path e.g. /Users/john/Desktop/photo.jpg
   *  2. file.webkitRelativePath — set when the user picks a whole directory
   *     via <input webkitdirectory>; gives a relative path from the root dir.
   *  3. file.name — plain filename only (browser security restriction:
   *     full paths are intentionally blocked in all modern browsers).
   *
   * NOTE: In a standard browser context, option 1 and 2 will be empty strings
   * and only the filename is available. Full path resolution requires either
   * Electron or a Node.js/native bridge.
   */
  private resolveLocalPath(file: File): string {
    // Electron exposes a non-standard `path` property on File objects
    const electronPath = (file as any).path as string | undefined;
    if (electronPath && electronPath.length > 0 && !electronPath.includes('fakepath')) {
      return electronPath;
    }

    // Directory picker sets webkitRelativePath (e.g. "MyFolder/sub/file.txt")
    const relativePath = (file as any).webkitRelativePath as string | undefined;
    if (relativePath && relativePath.length > 0) {
      return relativePath;
    }

    // Browser-only fallback: just the filename
    return file.name;
  }

  /**
   * Desc: updates the reactive form control value with an array of local paths
   */
  private syncFormValue(): void {
    const ctrl = this.form?.get(this.field.name);
    if (!ctrl) return;
    const paths = this.selectedFiles.map((e) => e.localPath);
    ctrl.setValue(paths.length === 0 ? null : paths);
    ctrl.markAsDirty();
  }

  /**
   * Desc: converts a byte count to a human-readable size string
   */
  public formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
