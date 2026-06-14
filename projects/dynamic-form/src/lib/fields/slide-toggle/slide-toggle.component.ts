import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss'
})
export class SlideToggleComponent {
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
   * Desc : declaring color variable and provide type as ThemePalette
   */
  public color: ThemePalette = 'primary';
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
   * Desc : get the form value
   */
  get value() {
    const val = this.form ? this.form.get(this.field.name)?.value : null;
    return val;
  }
  /**
   * Desc : check box event initiated
   * @param checkEvent : check box value
   * @param key : check box label name
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public toggle(checkEvent: Event | any, key: string) {
    if (this.field.options && this.field.options.length > 0) {
      const oldvalue = this.form?.get(this.field.name)?.value || null;
      if (!oldvalue) {
        this.form?.get(this.field.name)?.setValue(checkEvent ? '' + key : null);
        return;
      } else {
        this.setOptionAndValue(checkEvent, oldvalue, key);
      }
    } else {
      this.form?.get(this.field.name)?.setValue(checkEvent.checked);
    }
  }
  /**
   * Desc : set new value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setOptionAndValue(checkEvent: Event | any, oldvalue: string, key: string) {
    const value = checkEvent.checked
      ? this.field.options.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fieldOptions: { key: any }) => oldvalue.indexOf(fieldOptions.key) >= 0 || fieldOptions.key == key,
        )
      : this.field.options.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (fieldOptions: { key: any }) => oldvalue.indexOf(fieldOptions.key) >= 0 && fieldOptions.key != key,
        );
    const ctrl = this.form.get(this.field.name);
    if (ctrl) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctrl.setValue(value.length > 0 ? value.map((x: { key: any }) => x.key).join(',') : null);
    }
  }
}
