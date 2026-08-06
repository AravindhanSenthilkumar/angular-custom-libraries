import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import loader from '@monaco-editor/loader';

@Component({
  selector: 'app-monaco-json-editor',
  standalone: true,
  template: `
    <div class="monaco-editor-container" #editorContainer></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }
    .monaco-editor-container {
      width: 100%;
      height: 100%;
      min-height: 300px;
    }
    .fallback-textarea {
      width: 100%;
      height: 100%;
      background: #1e293b;
      color: #f8fafc;
      font-family: monospace;
      font-size: 13px;
      padding: 12px;
      border: none;
      resize: none;
      outline: none;
      box-sizing: border-box;
    }
  `]
})
export class MonacoJsonEditorComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef<HTMLDivElement>;

  @Input() data: any = null;
  @Output() jsonChange = new EventEmitter<any>();

  private editor: any = null;
  private isInternalChange = false;

  async ngOnInit() {
    await this.initMonaco();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].firstChange) {
      if (this.isInternalChange) {
        this.isInternalChange = false;
        return;
      }
      this.updateEditorValue(this.data);
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) return;

    try {
      const monaco = await loader.init();
      const initialValue = this.formatJson(this.data);

      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: initialValue,
        language: 'json',
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 13,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
      });

      setTimeout(() => {
        if (this.editor) {
          this.editor.layout();
        }
      }, 100);

      this.editor.onDidChangeModelContent(() => {
        const val = this.editor.getValue();
        try {
          const parsed = JSON.parse(val);
          this.isInternalChange = true;
          this.jsonChange.emit(parsed);
        } catch {
          // Ignore mid-typing syntax errors
        }
      });
    } catch (e) {
      console.warn('Monaco CDN load failed, using fallback textarea', e);
      const container = this.editorContainer.nativeElement;
      container.innerHTML = '';

      const textarea = document.createElement('textarea');
      textarea.className = 'fallback-textarea';
      textarea.value = this.formatJson(this.data);

      textarea.addEventListener('input', () => {
        try {
          const parsed = JSON.parse(textarea.value);
          this.isInternalChange = true;
          this.jsonChange.emit(parsed);
        } catch {}
      });

      container.appendChild(textarea);
    }
  }

  private updateEditorValue(data: any) {
    const formatted = this.formatJson(data);
    if (this.editor) {
      const currentVal = this.editor.getValue();
      if (currentVal !== formatted) {
        this.editor.setValue(formatted);
      }
    } else {
      const textarea = this.editorContainer.nativeElement.querySelector('textarea');
      if (textarea && textarea.value !== formatted) {
        textarea.value = formatted;
      }
    }
  }

  private formatJson(data: any): string {
    if (data === null || data === undefined) return '';
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return '';
    }
  }

  ngOnDestroy() {
    if (this.editor) {
      try {
        this.editor.dispose();
      } catch {}
    }
  }
}
