import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FieldIndexComponent } from '../../fields/field-index.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    FormsModule, 
    FieldIndexComponent
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  /**
   * Desc : declaring field input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public field: any;
  /**
   * Desc : declaring form input to receive data from parent component
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() public form: any;
  /**
   * Desc : get the form group details
   * @param field : target field
   * @returns : form group details
   */
  public getFormGroup(field: string): FormGroup {
    return this.form?.get(field) as FormGroup;
  }
}
