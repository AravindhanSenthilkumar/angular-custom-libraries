export interface ITheme {
  name?: 'material' | 'tailwind' | 'bootstrap' | string;
  type?: 'dark' | 'light' | string;
}

const THEME_STYLE_ID = 'devlab-one-theme-engine-styles';

const THEME_CSS = `
[data-theme-name="material"][data-theme-type="light"],
[data-theme-name="material"]:not([data-theme-type="dark"]) {
  --comp-bg: #ffffff;
  --comp-card-bg: #ffffff;
  --comp-border: #e0e0e0;
  --comp-text: #212121;
  --comp-muted: #757575;
  --comp-primary: #1976d2;
  --comp-font: Roboto, "Helvetica Neue", sans-serif;
  --comp-radius: 4px;
}
[data-theme-name="material"][data-theme-type="dark"] {
  --comp-bg: #121212;
  --comp-card-bg: #1e1e1e;
  --comp-border: #333333;
  --comp-text: #e0e0e0;
  --comp-muted: #a0a0a0;
  --comp-primary: #90caf9;
  --comp-font: Roboto, "Helvetica Neue", sans-serif;
  --comp-radius: 4px;
}
[data-theme-name="tailwind"][data-theme-type="light"] {
  --comp-bg: #f8fafc;
  --comp-card-bg: #ffffff;
  --comp-border: #e2e8f0;
  --comp-text: #0f172a;
  --comp-muted: #64748b;
  --comp-primary: #2563eb;
  --comp-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --comp-radius: 12px;
}
[data-theme-name="tailwind"][data-theme-type="dark"] {
  --comp-bg: #0f172a;
  --comp-card-bg: #1e293b;
  --comp-border: #334155;
  --comp-text: #f8fafc;
  --comp-muted: #94a3b8;
  --comp-primary: #38bdf8;
  --comp-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --comp-radius: 12px;
}
[data-theme-name="bootstrap"][data-theme-type="light"] {
  --comp-bg: #f8f9fa;
  --comp-card-bg: #ffffff;
  --comp-border: #dee2e6;
  --comp-text: #212529;
  --comp-muted: #6c757d;
  --comp-primary: #0d6efd;
  --comp-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --comp-radius: 6px;
}
[data-theme-name="bootstrap"][data-theme-type="dark"] {
  --comp-bg: #212529;
  --comp-card-bg: #2c3034;
  --comp-border: #495057;
  --comp-text: #f8f9fa;
  --comp-muted: #adb5bd;
  --comp-primary: #0d6efd;
  --comp-font: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --comp-radius: 6px;
}
.playground-drawer-content.dark-theme,
.cdk-overlay-container.dark-theme,
[data-theme-type="dark"] .playground-drawer-content,
[data-theme-type="dark"].cdk-overlay-container {
  .mat-mdc-form-field .mdc-text-field__input,
  .mat-mdc-form-field .mat-mdc-select-value-text,
  .mat-mdc-form-field .mat-mdc-select-arrow { color: #f8fafc !important; }
  .mat-mdc-form-field .mdc-floating-label { color: #94a3b8 !important; }
  .mat-mdc-card, .mat-card, .mat-dialog-container, .mat-mdc-dialog-container .mdc-dialog__surface, .alert-modal-container, .popup-container, .modal-container { background-color: var(--comp-card-bg, #1e1e1e) !important; color: var(--comp-text, #e0e0e0) !important; border-color: var(--comp-border, #333333) !important; }
  .mat-mdc-table, .mat-table { background-color: var(--comp-card-bg, #1e1e1e) !important; color: var(--comp-text, #e0e0e0) !important; }
  .mat-mdc-table .mat-mdc-header-cell, .mat-table .mat-header-cell { background-color: rgba(255,255,255,0.03) !important; color: var(--comp-text, #e0e0e0) !important; border-bottom-color: var(--comp-border, #333333) !important; }
  .mat-mdc-table .mat-mdc-cell, .mat-table .mat-cell, .mat-mdc-table .mat-mdc-row, .mat-table .mat-row { color: var(--comp-text, #e0e0e0) !important; border-bottom-color: var(--comp-border, #333333) !important; }
  .mat-mdc-paginator, .mat-paginator { background-color: var(--comp-card-bg, #1e1e1e) !important; color: var(--comp-text, #e0e0e0) !important; }
  .mat-dialog-title, .mat-mdc-dialog-title, .alert-content-text, .alert-heading-text { color: var(--comp-text, #e0e0e0) !important; }
}
[data-theme-name="tailwind"] .playground-drawer-content .mat-mdc-button,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-button,
[data-theme-name="tailwind"] .playground-drawer-content .mat-mdc-raised-button,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-raised-button,
[data-theme-name="tailwind"] .playground-drawer-content .mat-mdc-flat-button,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-flat-button,
[data-theme-name="tailwind"] .playground-drawer-content .mat-mdc-outlined-button,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-outlined-button { border-radius: 8px !important; }
[data-theme-name="tailwind"] .playground-drawer-content .mat-mdc-card,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-card,
[data-theme-name="tailwind"].cdk-overlay-container .mat-mdc-dialog-container .mdc-dialog__surface { border-radius: 16px !important; }
[data-theme-name="bootstrap"] .playground-drawer-content .mat-mdc-button,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-button,
[data-theme-name="bootstrap"] .playground-drawer-content .mat-mdc-raised-button,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-raised-button,
[data-theme-name="bootstrap"] .playground-drawer-content .mat-mdc-flat-button,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-flat-button,
[data-theme-name="bootstrap"] .playground-drawer-content .mat-mdc-outlined-button,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-outlined-button { border-radius: 6px !important; }
[data-theme-name="bootstrap"] .playground-drawer-content .mat-mdc-card,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-card,
[data-theme-name="bootstrap"].cdk-overlay-container .mat-mdc-dialog-container .mdc-dialog__surface { border-radius: 6px !important; border: 1px solid var(--comp-border, #dee2e6) !important; }
`;

export function applyLibraryTheme(theme?: ITheme | null, targetDoc?: Document): void {
  const doc = targetDoc || (typeof document !== 'undefined' ? document : null);
  if (!doc) return;

  let styleEl = doc.getElementById(THEME_STYLE_ID);
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.id = THEME_STYLE_ID;
    styleEl.textContent = THEME_CSS;
    doc.head.appendChild(styleEl);
  }

  const name = (theme?.name?.toLowerCase() as string) || 'material';
  const type = (theme?.type?.toLowerCase() as string) || 'light';

  const validName = ['material', 'tailwind', 'bootstrap'].includes(name) ? name : 'material';
  const validType = ['dark', 'light'].includes(type) ? type : 'light';

  const drawerContentEl = doc.querySelector('.playground-drawer-content');
  const overlayContainerEl = doc.querySelector('.cdk-overlay-container');

  if (drawerContentEl) {
    drawerContentEl.setAttribute('data-theme-name', validName);
    drawerContentEl.setAttribute('data-theme-type', validType);
    if (validType === 'dark') {
      drawerContentEl.classList.add('dark-theme');
    } else {
      drawerContentEl.classList.remove('dark-theme');
    }
  }

  if (overlayContainerEl) {
    overlayContainerEl.setAttribute('data-theme-name', validName);
    overlayContainerEl.setAttribute('data-theme-type', validType);
    if (validType === 'dark') {
      overlayContainerEl.classList.add('dark-theme');
    } else {
      overlayContainerEl.classList.remove('dark-theme');
    }
  }
}
