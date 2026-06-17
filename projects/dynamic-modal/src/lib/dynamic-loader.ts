import {
  Component,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Type,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'lib-dynamic-loader',
  standalone: true,
  template: `
    <ng-container #container></ng-container>
  `
})
export class DynamicLoaderComponent implements OnChanges {

  @Input() component!: Type<any>;

  @Input() inputs: Record<string, any> = {};

  @Input() outputs: Record<string, Function> = {};

  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  })
  container!: ViewContainerRef;

  private componentRef?: ComponentRef<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['component']) {
      this.createComponent();
    } else if (this.componentRef) {
      this.updateInputs();
    }
  }

  private createComponent(): void {

    if (!this.component) {
      return;
    }

    this.container.clear();

    this.componentRef =
      this.container.createComponent(this.component);

    this.updateInputs();
    this.bindOutputs();
  }

  private updateInputs(): void {

    if (!this.componentRef) {
      return;
    }

    Object.entries(this.inputs).forEach(([key, value]) => {
      this.componentRef!.setInput(key, value);
    });
  }

  private bindOutputs(): void {

    if (!this.componentRef) {
      return;
    }

    Object.entries(this.outputs).forEach(([key, callback]) => {

      const output = this.componentRef!.instance[key];

      if (
        output &&
        typeof output.subscribe === 'function'
      ) {
        output.subscribe((event: any) => {
          callback(event);
        });
      }
    });
  }
}