import { Injectable, inject, signal } from '@angular/core';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundStateService {
  private themeService = inject(ThemeService);

  public readonly jsonData = signal<any>(null);
  
  private updatedJsonValue: any = null;
  private masterData: any = null;
  private onGenerateCallback: ((data: any) => void) | null = null;

  public setComponentData(initialData: any, onGenerate?: (data: any) => void) {
    const clone = structuredClone(initialData);
    this.masterData = structuredClone(initialData);
    this.updatedJsonValue = clone;
    this.jsonData.set(clone);
    this.onGenerateCallback = onGenerate ?? null;

    if (clone?.theme) {
      this.themeService.applyTheme(clone.theme);
    }
  }

  /** Updates only the JSON viewer display + internal editor value, without resetting masterData or the callback. */
  public updateJsonViewer(data: any) {
    const clone = structuredClone(data);
    this.updatedJsonValue = clone;
    this.jsonData.set(clone);

    if (clone?.theme) {
      this.themeService.applyTheme(clone.theme);
    }
  }

  public updateFromEditor(event: any) {
    if (event !== null && event !== undefined) {
      // Ignore standard DOM Event objects emitted by change events
      if (event instanceof Event || (typeof event === 'object' && 'target' in event && 'type' in event)) {
        return;
      }
      const clone = structuredClone(event);
      this.updatedJsonValue = clone;

      if (clone?.theme) {
        this.themeService.applyTheme(clone.theme);
      }

      if (this.onGenerateCallback) {
        this.onGenerateCallback(clone);
      }
    }
  }

  public resetData() {
    if (this.masterData !== null) {
      const resetValue = structuredClone(this.masterData);
      this.updatedJsonValue = structuredClone(resetValue);
      this.jsonData.set(resetValue);

      if (resetValue?.theme) {
        this.themeService.applyTheme(resetValue.theme);
      }

      if (this.onGenerateCallback) {
        this.onGenerateCallback(resetValue);
      }
    }
  }

  public generateComponent() {
    if (this.updatedJsonValue !== null) {
      const generatedValue = structuredClone(this.updatedJsonValue);
      this.jsonData.set(generatedValue);

      if (generatedValue?.theme) {
        this.themeService.applyTheme(generatedValue.theme);
      }

      if (this.onGenerateCallback) {
        this.onGenerateCallback(generatedValue);
      }
    }
  }
}
