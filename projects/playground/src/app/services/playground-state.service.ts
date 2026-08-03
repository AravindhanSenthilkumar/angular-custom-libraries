import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundStateService {
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
  }

  /** Updates only the JSON viewer display + internal editor value, without resetting masterData or the callback. */
  public updateJsonViewer(data: any) {
    const clone = structuredClone(data);
    this.updatedJsonValue = clone;
    this.jsonData.set(clone);
  }

  public updateFromEditor(event: any) {
    if (event && !event.type) {
      this.updatedJsonValue = event;
    }
  }

  public resetData() {
    if (this.masterData !== null) {
      const resetValue = structuredClone(this.masterData);
      this.updatedJsonValue = structuredClone(resetValue);
      this.jsonData.set(resetValue);
      if (this.onGenerateCallback) {
        this.onGenerateCallback(resetValue);
      }
    }
  }

  public generateComponent() {
    if (this.updatedJsonValue !== null) {
      const generatedValue = structuredClone(this.updatedJsonValue);
      this.jsonData.set(generatedValue);
      if (this.onGenerateCallback) {
        this.onGenerateCallback(generatedValue);
      }
    }
  }
}
