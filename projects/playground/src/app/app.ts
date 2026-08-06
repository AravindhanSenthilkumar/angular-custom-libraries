import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MonacoJsonEditorComponent } from './components/monaco-json-editor.component';
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
    MonacoJsonEditorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(
    private _cd: ChangeDetectorRef,
    public playgroundState: PlaygroundStateService
  ) {}

  public changeLog(updatedJson: any) {
    if (updatedJson) {
      this.playgroundState.updateFromEditor(updatedJson);
    }
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
