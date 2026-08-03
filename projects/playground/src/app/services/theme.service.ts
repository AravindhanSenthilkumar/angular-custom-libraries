import { Injectable, inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export type ThemeName = 'material' | 'tailwind' | 'bootstrap';
export type ThemeType = 'dark' | 'light';

export interface ThemeConfig {
  name?: ThemeName | string;
  type?: ThemeType | string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private overlayContainer = inject(OverlayContainer);

  private currentThemeName: ThemeName = 'material';
  private currentThemeType: ThemeType = 'light';

  /**
   * Applies theme settings strictly to dynamic component containers (.playground-drawer-content)
   * and CDK overlay containers. Does NOT affect header, sidebar, or JSON viewer.
   */
  public applyTheme(themeConfig?: ThemeConfig | null): void {
    const name = (themeConfig?.name?.toLowerCase() as ThemeName) || 'material';
    const type = (themeConfig?.type?.toLowerCase() as ThemeType) || 'light';

    const validName: ThemeName = ['material', 'tailwind', 'bootstrap'].includes(name) ? name : 'material';
    const validType: ThemeType = ['dark', 'light'].includes(type) ? type : 'light';

    this.currentThemeName = validName;
    this.currentThemeType = validType;

    // Target dynamic component content area only
    const drawerContentElement = document.querySelector('.playground-drawer-content');
    const overlayContainerElement = this.overlayContainer.getContainerElement();

    // Clean up any old body data attributes so body/header/sidebar stay default
    document.body.removeAttribute('data-theme-name');
    document.body.removeAttribute('data-theme-type');
    document.body.classList.remove('dark-theme');

    if (drawerContentElement) {
      drawerContentElement.setAttribute('data-theme-name', validName);
      drawerContentElement.setAttribute('data-theme-type', validType);

      if (validType === 'dark') {
        drawerContentElement.classList.add('dark-theme');
      } else {
        drawerContentElement.classList.remove('dark-theme');
      }
    }

    if (overlayContainerElement) {
      overlayContainerElement.setAttribute('data-theme-name', validName);
      overlayContainerElement.setAttribute('data-theme-type', validType);

      if (validType === 'dark') {
        overlayContainerElement.classList.add('dark-theme');
      } else {
        overlayContainerElement.classList.remove('dark-theme');
      }
    }
  }

  public getCurrentTheme() {
    return {
      name: this.currentThemeName,
      type: this.currentThemeType
    };
  }
}
