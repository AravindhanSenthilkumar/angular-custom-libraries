# Dynamic Popup Modal

A powerful Angular Material-based Dynamic Popup Library that allows you to open any Angular component as a modal popup with automatic input/output binding, customizable headers, responsive sizing, and lifecycle callbacks.

The library eliminates the need to manually create dialog components, pass data, subscribe to outputs, or manage dialog closing behavior.

---

## Features

* 🚀 Open any Angular component as a popup
* 🎨 Angular Material Dialog integration
* 📥 Pass inputs dynamically
* 📤 Automatically receive component outputs
* 🔄 Auto-close support
* 📏 Configurable width and height
* 📝 Dynamic header configuration
* ❌ Close callback support
* ✅ Submit callback support
* 🔌 Fully reusable and configurable
* ⚡ Minimal setup

---

## Installation

```bash
npm install devlab-one-dynamic-popup
```

---

## Inject Modal Service

```typescript
import { ModalService } from 'devlab-one-dynamic-popup';

constructor(
  private modalService: ModalService
) {}
```

---

## Open Component as Popup

```typescript
const modal: IPopupDetails = {
  width: 800,

  component: AnyComponent,

  header: {
    title: 'Form Test Page',
    justification: Justify.left
  },

  contextData: {
    employeeId: 1001,
    employeeName: 'John'
  },

  autoClose: true,

  onClose: () => {
    console.log('Popup Closed');
  },

  onSubmit: (data) => {
    console.log(data);
  }
};

this.modalService.openComponentAsPopup(modal);
```

---

## Basic Component Example

### Popup Component

```typescript
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {

  @Input() employeeId!: number;

  @Input() employeeName!: string;

  @Output() submitForm = new EventEmitter<any>();

  save() {
    this.submitForm.emit({
      employeeId: this.employeeId,
      employeeName: this.employeeName
    });
  }
}
```

---

## Passing Inputs

All properties inside `contextData` are automatically mapped to matching `@Input()` properties of the component.

```typescript
contextData: {
  employeeId: 1001,
  employeeName: 'John Doe'
}
```

```typescript
@Input() employeeId!: number;

@Input() employeeName!: string;
```

No manual data injection is required.

---

## Receiving Outputs

Any component output configured as a submit event is automatically captured by the modal service.

```typescript
@Output()
submitForm = new EventEmitter<any>();
```

```typescript
onSubmit: (data) => {
  console.log(data);
}
```

Result:

```typescript
{
  employeeId: 1001,
  employeeName: 'John Doe'
}
```

---

## Auto Close Popup

Enable automatic closing when submit is triggered.

```typescript
autoClose: true
```

```typescript
const modal: IPopupDetails = {
  component: UserFormComponent,
  autoClose: true
};
```

When the component emits a submit event:

```typescript
this.submitForm.emit(data);
```

The popup closes automatically.

---

## Keep Popup Open After Submit

```typescript
autoClose: false
```

```typescript
const modal: IPopupDetails = {
  component: UserFormComponent,
  autoClose: false
};
```

Useful for:

* Multi-step forms
* Validation workflows
* Save and continue scenarios

---

## Header Configuration

```typescript
header: {
  title: 'Employee Details',
  justification: Justify.center
}
```

### Available Justifications

```typescript
export enum Justify {
  left = 'left',
  center = 'center',
  right = 'right'
}
```

---

## Width Configuration

```typescript
width: 400
```

```typescript
width: 600
```

```typescript
width: 1000
```

The popup width is automatically converted to pixels.

---

## Full Example

```typescript
const modal: IPopupDetails = {
  width: 800,

  component: EmployeeFormComponent,

  header: {
    title: 'Employee Information',
    justification: Justify.left
  },

  contextData: {
    employeeId: 1001,
    mode: 'edit'
  },

  autoClose: true,

  onClose: () => {
    console.log('Dialog Closed');
  },

  onSubmit: (response) => {
    console.log('Submitted Data');
    console.log(response);
  }
};

this.modalService.openComponentAsPopup(modal);
```

---

## IPopupDetails

```typescript
export interface IPopupDetails {
  width?: number;

  component: Type<any>;

  header?: {
    title: string;
    justification: Justify;
  };

  contextData?: any;

  autoClose?: boolean;

  onClose?: () => void;

  onSubmit?: (data: any) => void;
}
```

---

## Properties

| Property    | Description                           |
| ----------- | ------------------------------------- |
| width       | Popup width in pixels                 |
| component   | Angular component to render           |
| header      | Popup header configuration            |
| contextData | Input values passed to component      |
| autoClose   | Close popup after submit              |
| onClose     | Triggered when popup closes           |
| onSubmit    | Triggered when component emits submit |

---

## Supported Use Cases

* Dynamic Forms
* Create/Edit Screens
* Confirmation Dialogs
* User Profile Forms
* Settings Pages
* Wizard Forms
* Custom Angular Components
* CRUD Operations

---

## Lifecycle Flow

```text
Open Popup
      │
      ▼
Create Component
      │
      ▼
Inject Inputs
      │
      ▼
User Interaction
      │
      ▼
Component Emits Output
      │
      ▼
onSubmit Callback
      │
      ▼
Auto Close (Optional)
      │
      ▼
onClose Callback
```

---

## Built With

* Angular 21+
* Angular Material Dialog
* TypeScript
* RxJS

---

## License

MIT License
