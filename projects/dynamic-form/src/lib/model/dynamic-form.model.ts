import { FloatLabel } from '../enum/float-label.enum';
import { FieldType } from '../enum/field-type.enum';

export interface FieldValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
  jsonValidator?: boolean;
  duplicateValidator?: boolean;
}

export interface Form {
  controls: Array<Field>;
  buttons?: IFormButton;
  outline: boolean;
}

export interface IFormButton {
  submit?: IButton;
  reset?: IButton;
  cancel?: IButton;
}

export interface IButton{
  name: string;
  visible: boolean;
}

export interface Field {
  name: string;
  type: FieldType;
  outline?: boolean;
  label?: string;
  displayLabel?: boolean;
  markerInLabel?: boolean;
  floatLabel?: FloatLabel;
  value?: any;
  placeholder?: string;
  readonly?: boolean;
  tooltip?: string;
  hint?: string;
  prefixIcon?: string;
  prefixText?: string;
  suffixText?: string;
  suffixIcon?: string;
  numberOfColumns?: number;
  visible?: boolean;
  OnChange?: Function;
  options?: Array<IOption>;
  multipleSelect?: boolean;
  autoComplete?: boolean;
  onUpload?: Function;
  rangeMinimum?: number;
  rangeMaximum?: number;
  rangeStepper?: number;
  linkOnly?: boolean;
  validators?: FieldValidators;
  children?: Array<Field>;
  countryCodes?: Array<ICountryCode | IOption | string>;
  defaultCountryCode?: string;
  timeZones?: Array<ITimeZone | IOption | string>;
  defaultTimeZone?: string;
  timeOptions?: Array<IOption | string>;
  showSeconds?: boolean;
}

export interface ICountryCode {
  code: string;
  country?: string;
  label?: string;
}

export interface ITimeZone {
  code: string;
  label?: string;
  offset?: string;
}

export interface IOption {
  key: string | number;
  label: string;
}

export interface WizardForm {
  form: Form;
  wizardName: string;
}

export interface Wizards {
  wizards?: Array<WizardForm>;
  outline?: boolean;
}

export interface DynamicFormDetails {
  formComponent?: Form;
  wizardComponent?: Wizards;
}
