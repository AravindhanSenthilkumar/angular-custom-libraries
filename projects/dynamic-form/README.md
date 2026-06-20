# Dynamic Form

A powerful Angular Material-based Dynamic Form Library that generates reactive forms from JSON configuration. Instead of manually creating form controls and templates, you can define your entire form structure using a JSON object and the library will automatically render the corresponding Angular Material components.

## Wizard Forms

The Dynamic Form library supports multi-step wizard forms. Each wizard step can contain its own form configuration and validation rules.

### DynamicFormDetails

The library supports two rendering modes:

1. **Single Form**
2. **Multi-Step Wizard Form**

```typescript
export interface DynamicForm {
  formComponent?: Form;
  wizardComponent?: Wizards;
}
```

## Features

* 🚀 JSON-driven form generation
* 🎨 Built with Angular Material Design
* ✅ Reactive Forms support
* ✅ Built-in validators
* ✅ Dynamic visibility control
* ✅ Custom placeholders, hints, tooltips, prefixes, and suffixes
* ✅ Single and multi-select dropdowns
* ✅ Form Groups and Form Arrays support
* ✅ Responsive grid layout using configurable columns
* ✅ Submit, Cancel, and Reset buttons
* ✅ Auto-complete dropdown support

---

## Supported Field Types

The library supports the following field types:

```typescript
export enum FieldType {
  text = 'text',
  password = 'password',
  color = 'color',
  range = 'range',
  number = 'number',
  url = 'url',
  email = 'email',
  tel = 'tel',
  textArea = 'text-area',
  date = 'date',
  time = 'time',
  dropdown = 'drop-down',
  slideToggle = 'slide-toggle',
  file = 'file',
  checkbox = 'checkbox',
  radio = 'radio',
  array = 'array',
  group = 'group'
}
```

---

## Installation

```bash
npm install devlab-one-dynamic-form
```

---

## Usage

Import the module into your application:

```typescript
import { DynamicForm } from 'devlab-one-dynamic-form';

@Component({
  imports: [DynamicForm]
})
export class AppComponent {}
```

---

## Basic Example

Create a JSON configuration and pass it to the Dynamic Form component.

```typescript
formConfig = {
  controls: [
    {
      name: 'Name',
      type: FieldType.text,
      label: 'Name',
      placeholder: 'Enter your name',
      visible: true,
      numberOfColumns: 6,
      validators: {
        required: true,
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'email',
      type: FieldType.email,
      label: 'Email',
      placeholder: 'Enter your email',
      visible: true,
      numberOfColumns: 6,
      validators: {
        required: true
      }
    }
  ]
};
```

HTML:

```html
   <lib-dynamic-form
      [dynamicFormDetails]="dynamicFormDetails"
      (onSubmitForm)="submitForm($event)"
      (onCancelForm)="cancelForm()">
   </lib-dynamic-form>
```

---

## Complete Form Configuration Example

The following example demonstrates multiple supported field types including:

* Textbox
* Number
* Dropdown
* Radio Button
* Multi Select Dropdown
* Validators
* Form Buttons

```typescript
{
  "controls": [
    {
      "name": "Name",
      "type": FieldType.text,
      "label": "Name",
      "placeholder": "Enter your name",
      "numberOfColumns": 2,
      "visible": true,
      "validators": {
        "required": true,
        "minLength": 2,
        "maxLength": 6
      }
    },
    {
      "name": "age",
      "type": FieldType.number,
      "label": "Age",
      "placeholder": "Enter your age",
      "numberOfColumns": 10,
      "visible": true,
      "validators": {
        "required": true
      }
    },
    {
      "name": "mobileNumber",
      "type": FieldType.number,
      "label": "Mobile Number",
      "placeholder": "Enter your mobile number",
      "numberOfColumns": 12,
      "visible": true,
      "validators": {
        "required": true
      }
    },
    {
      "name": "country",
      "type": FieldType.dropdown,
      "label": "Country",
      "placeholder": "Choose country",
      "multipleSelect": false,
      "autoComplete": true,
      "options": [
        {
          "key": "IND",
          "label": "India"
        },
        {
          "key": "AUS",
          "label": "Australia"
        },
        {
          "key": "ENG",
          "label": "England"
        }
      ],
      "validators": {
        "required": true
      }
    },
    {
      "name": "MaritalStatus",
      "type": FieldType.radio,
      "label": "Marital Status",
      "options": [
        {
          "key": "Married",
          "label": "Married"
        },
        {
          "key": "Single",
          "label": "Single"
        }
      ],
      "validators": {
        "required": true
      }
    },
    {
      "name": "Gender",
      "type": FieldType.radio,
      "label": "Gender",
      "options": [
        {
          "key": "Male",
          "label": "Male"
        },
        {
          "key": "Female",
          "label": "Female"
        },
        {
          "key": "Others",
          "label": "Others"
        }
      ],
      "validators": {
        "required": true
      }
    },
    {
      "name": "PreferedLocation",
      "type": FieldType.dropdown,
      "label": "Preferred Location",
      "placeholder": "Choose Location",
      "multipleSelect": true,
      "autoComplete": true,
      "options": [
        {
          "key": "IND",
          "label": "India"
        },
        {
          "key": "AUS",
          "label": "Australia"
        },
        {
          "key": "ENG",
          "label": "England"
        }
      ],
      "validators": {
        "required": true
      }
    }
  ],
  "buttons": {
    "submit": {
      "visible": true,
      "name": "Submit"
    },
    "cancel": {
      "visible": true,
      "name": "Cancel"
    },
    "reset": {
      "visible": true,
      "name": "Reset"
    }
  }
}
```

---

## Supported Validators

```typescript
validators: {
  required: true,
  minLength: 2,
  maxLength: 50,
  min: 1,
  max: 100,
  pattern: '^[A-Za-z]+$'
}
```

---

## Field Properties

| Property        | Description                    |
| --------------- | ------------------------------ |
| name            | Unique form control name       |
| type            | Field type from FieldType enum |
| label           | Display label                  |
| placeholder     | Placeholder text               |
| value           | Default value                  |
| readonly        | Disable editing                |
| visible         | Show or hide field             |
| tooltip         | Tooltip text                   |
| hint            | Hint text                      |
| prefixIcon      | Material prefix icon           |
| suffixIcon      | Material suffix icon           |
| prefixText      | Prefix text                    |
| suffixText      | Suffix text                    |
| validators      | Validation configuration       |
| numberOfColumns | Responsive grid width          |
| options         | Dropdown/Radio options         |
| multipleSelect  | Enable multi-select dropdown   |
| autoComplete    | Enable autocomplete search     |

---


## Wizard Form Example

```typescript
dynamicFormDetails: DynamicFormDetails = {
  wizardComponent: {
    wizards: [
      {
        title: 'Personal Information',
        controls: [
          {
            name: 'name',
            type: FieldType.text,
            label: 'Name',
            placeholder: 'Enter your name',
            validators: {
              required: true
            }
          },
          {
            name: 'age',
            type: FieldType.number,
            label: 'Age',
            validators: {
              required: true
            }
          }
        ]
      },
      {
        title: 'Contact Information',
        controls: [
          {
            name: 'email',
            type: FieldType.email,
            label: 'Email',
            validators: {
              required: true
            }
          },
          {
            name: 'mobileNumber',
            type: FieldType.tel,
            label: 'Mobile Number',
            validators: {
              required: true
            }
          }
        ]
      },
      {
        title: 'Preferences',
        controls: [
          {
            name: 'country',
            type: FieldType.dropdown,
            label: 'Country',
            options: [
              {
                key: 'IND',
                label: 'India'
              },
              {
                key: 'AUS',
                label: 'Australia'
              }
            ],
            validators: {
              required: true
            }
          }
        ]
      }
    ]
  }
};
```

---

## Component Usage

```html
   <lib-dynamic-form
      [dynamicFormDetails]="dynamicFormDetails"
      (onSubmitForm)="submitForm($event)"
      (onCancelForm)="cancelForm()">
   </lib-dynamic-form>
```

---

## Wizard Features

* Multi-step form navigation
* Previous and Next buttons
* Step-level validation
* Angular Material Stepper integration
* Dynamic step creation using JSON
* Responsive layouts
* Submit on final step
* Supports all field types
* Supports nested Form Groups
* Supports Form Arrays

---

## Wizard Navigation

## Events

### Submit Event

```typescript
onSubmit(formData: any) {
  console.log(formData);
}
```

### Cancel Event

```typescript
onCancel() {
  console.log('Cancelled');
}
```

### Reset Event

```typescript
onReset() {
  console.log('Reset');
}
```

---

## Responsive Layout

Each field supports:

```typescript
numberOfColumns: 12
```

Based on a 12-column grid system:

| Value | Width      |
| ----- | ---------- |
| 12    | Full Width |
| 6     | Half Width |
| 4     | One Third  |
| 3     | One Fourth |

---

## Built With

* Angular 21+
* Angular Material
* Reactive Forms
* TypeScript

--------------------------------------------------------------


| Action   | Description                             |
| -------- | --------------------------------------- |
| Next     | Moves to the next step after validation |
| Previous | Returns to the previous step            |
| Submit   | Available on the final step             |
| Cancel   | Closes or resets the wizard             |

---

### Submit Wizard

```typescript
(onSubmitForm)="onSubmit($event)"
```

```typescript
onSubmit(formData: any) {
  console.log(formData);
}
```

The submitted payload contains data from all wizard steps merged into a single form object.


## License

MIT License
