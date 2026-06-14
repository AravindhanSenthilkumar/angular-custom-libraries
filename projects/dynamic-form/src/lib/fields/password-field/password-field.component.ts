import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule, 
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ]
})
export class PasswordFieldComponent {
  /**
   * desc : condition to show / hide password
   */
  hide = signal(true);
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
   * Desc : click on eye icon to show/ hide password
   */
  public clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
