# Dynamic Alert

A lightweight Angular Material-based Alert Library that provides beautiful and consistent alert dialogs for common application scenarios such as:

* Success Messages
* Error Messages
* Information Messages
* Warning Messages
* Confirmation Dialogs

The library eliminates the need to manually create dialog components for simple notifications and confirmation popups.

---

## Features

* 🚀 Simple API
* 🎨 Angular Material Design
* ✅ Success Alerts
* ❌ Error Alerts
* ℹ️ Information Alerts
* ⚠️ Warning Alerts
* 🤔 Confirmation Dialogs
* 🔄 Callback Support
* 📝 Supports String Messages
* 📋 Supports Structured Error Messages
* ⚡ Zero Configuration

---

## Installation

```bash
npm install devlab-one-dynamic-alert
```

---

## Inject Alert Service

```typescript
import { AlertService } from 'devlab-one-dynamic-alert';

constructor(
  private alertService: AlertService
) {}
```

---

## Available Methods

```typescript
success(
  message: string | IErrorMessage,
  okCallback?: () => void
): void;

error(
  message: string | IErrorMessage,
  okCallback?: () => void
): void;

info(
  message: string | IErrorMessage,
  okCallback?: () => void
): void;

warning(
  message: string | IErrorMessage,
  okCallback?: () => void
): void;

confirmationModel(
  message: string | IErrorMessage,
  okCallback?: () => void,
  cancelCallback?: () => void
): void;
```

---

## Success Alert

Display a success message after a successful operation.

```typescript
this.alertService.success(
  'Employee created successfully'
);
```

### With Callback

```typescript
this.alertService.success(
  'Employee created successfully',
  () => {
    this.loadEmployees();
  }
);
```

---

## Error Alert

Display application or API error messages.

```typescript
this.alertService.error(
  'Unable to save employee details'
);
```

### With Callback

```typescript
this.alertService.error(
  'Unable to save employee details',
  () => {
    console.log('Error acknowledged');
  }
);
```

---

## Information Alert

Display informational messages to the user.

```typescript
this.alertService.info(
  'New application update is available'
);
```

### With Callback

```typescript
this.alertService.info(
  'New application update is available',
  () => {
    console.log('Information viewed');
  }
);
```

---

## Warning Alert

Display warning messages before a critical action.

```typescript
this.alertService.warning(
  'You have unsaved changes'
);
```

### With Callback

```typescript
this.alertService.warning(
  'You have unsaved changes',
  () => {
    console.log('Warning acknowledged');
  }
);
```

---

## Confirmation Dialog

Display a confirmation popup before performing an action.

```typescript
this.alertService.confirmationModel(
  'Are you sure you want to delete this employee?'
);
```

### With Confirm Callback

```typescript
this.alertService.confirmationModel(
  'Are you sure you want to delete this employee?',
  () => {
    this.deleteEmployee();
  }
);
```

### With Confirm and Cancel Callback

```typescript
this.alertService.confirmationModel(
  'Are you sure you want to delete this employee?',
  () => {
    console.log('Confirmed');
  },
  () => {
    console.log('Cancelled');
  }
);
```

---

## Using Structured Error Messages

The library supports both string messages and structured error objects.

```typescript
export interface IErrorMessage {
  title?: string;
  message: string;
  errors?: string[];
}
```

### Example

```typescript
const error: IErrorMessage = {
  title: 'Validation Error',
  message: 'Unable to submit the form',
  errors: [
    'Name is required',
    'Email is invalid'
  ]
};

this.alertService.error(error);
```

---

## Alert Types

| Method              | Description              |
| ------------------- | ------------------------ |
| success()           | Success notification     |
| error()             | Error notification       |
| info()              | Information notification |
| warning()           | Warning notification     |
| confirmationModel() | Confirmation dialog      |

---

## Callback Flow

### Success

```typescript
this.alertService.success(
  'Saved Successfully',
  () => {
    console.log('OK Clicked');
  }
);
```

### Confirmation

```typescript
this.alertService.confirmationModel(
  'Delete Employee?',
  () => {
    console.log('Confirmed');
  },
  () => {
    console.log('Cancelled');
  }
);
```

---

## UI Examples

### Success Alert

```text
✓ Success

Employee saved successfully

          [ OK ]
```

### Error Alert

```text
✕ Error

Unable to save employee

          [ OK ]
```

### Information Alert

```text
ℹ Information

New update available

          [ OK ]
```

### Warning Alert

```text
⚠ Warning

Unsaved changes detected

          [ OK ]
```

### Confirmation Dialog

```text
? Confirmation

Are you sure you want to delete this record?

    [ Cancel ] [ Confirm ]
```

---

## Typical Usage Scenarios

### API Success

```typescript
this.employeeService.create(employee)
  .subscribe({
    next: () => {
      this.alertService.success(
        'Employee created successfully'
      );
    }
  });
```

### API Error

```typescript
this.employeeService.create(employee)
  .subscribe({
    error: () => {
      this.alertService.error(
        'Unable to create employee'
      );
    }
  });
```

### Delete Confirmation

```typescript
this.alertService.confirmationModel(
  'Delete selected employee?',
  () => {
    this.deleteEmployee();
  }
);
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
