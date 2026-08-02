import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { PlaygroundStateService } from './services/playground-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatButtonModule,
    JsonEditorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild(JsonEditorComponent, { static: false })
  editor!: JsonEditorComponent;

  public editorOptions: JsonEditorOptions;

  constructor(
    private _cd: ChangeDetectorRef,
    public playgroundState: PlaygroundStateService
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code'];
  }

  public changeLog(event: any) {
    this.playgroundState.updateFromEditor(event);
  }

  public resetJsonData() {
    this.playgroundState.resetData();
    this._cd.detectChanges();
  }

  public generateComponent() {
    this.playgroundState.generateComponent();
    this._cd.detectChanges();
  }
}
