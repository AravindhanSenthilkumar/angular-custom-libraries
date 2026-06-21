# Dynamic Snackbar

A lightweight Angular Material-based Snackbar Library that provides beautiful, customizable, and consistent toast notifications throughout your application.

The library offers predefined notification types such as Success, Error, Warning, and Information while also allowing fully customizable snackbars through a configuration object.


# Feedback / Suggestion / Report issue
[https://github.com/AravindhanSenthilkumar/Feedback/issues/1](https://github.com/AravindhanSenthilkumar/Feedback/issues/1)



## Features

* 🚀 Simple API
* 🎨 Angular Material Snackbar
* ✅ Success Notifications
* ❌ Error Notifications
* ⚠️ Warning Notifications
* ℹ️ Information Notifications
* 🎯 Fully Customizable
* ⏱ Configurable Duration
* 📍 Configurable Position
* 🎨 Custom Styling Support
* ⚡ Lightweight and Fast


## Installation

```bash id="u5s9qx"
npm install devlab-one-dynamic-snackbar
```


## Inject Snackbar Service

```typescript id="7wqz6u"
import { SnackbarService } from 'devlab-one-dynamic-snackbar';

constructor(
  private snackbar: SnackbarService
) {}
```


## Available Methods

```typescript id="8zlg24"
show(config: SnackbarConfig): void;

success(
  message: string,
  title?: string
): void;

error(
  message: string,
  title?: string
): void;

warning(
  message: string,
  title?: string
): void;

info(
  message: string,
  title?: string
): void;
```


## Success Snackbar

Display success notifications after successful operations.

```typescript id="xy7l4o"
this.snackbar.success(
  'Employee created successfully'
);
```

### With Title

```typescript id="k5u1sv"
this.snackbar.success(
  'Employee created successfully',
  'Success'
);
```


## Error Snackbar

Display application or API error messages.

```typescript id="nd6kz4"
this.snackbar.error(
  'Unable to create employee'
);
```

### With Title

```typescript id="g4i9ef"
this.snackbar.error(
  'Unable to create employee',
  'Error'
);
```


## Warning Snackbar

Display warning messages.

```typescript id="j2m7ph"
this.snackbar.warning(
  'You have unsaved changes'
);
```

### With Title

```typescript id="9o2wrl"
this.snackbar.warning(
  'You have unsaved changes',
  'Warning'
);
```


## Information Snackbar

Display informational messages.

```typescript id="w4a6ng"
this.snackbar.info(
  'New update available'
);
```

### With Title

```typescript id="q9x5lm"
this.snackbar.info(
  'New update available',
  'Information'
);
```


## Custom Snackbar

For complete control over the snackbar appearance and behavior, use the `show()` method.

```typescript id="u0a8yv"
this.snackbar.show({
  title: 'Success',
  message: 'Employee created successfully',
  type: 'success'
});
```


## Snackbar Configuration

```typescript id="5zprxv"
export interface SnackbarConfig {
  title?: string;
  message: string;
  type?: SnackbarType;
  duration?: number;
  horizontalPosition?: HorizontalPosition;
  verticalPosition?: VerticalPosition;
}
```


## Snackbar Types

```typescript id="f58rqm"
export enum SnackbarType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}
```


## Duration Configuration

Default snackbar duration can be overridden.

```typescript id="x7t0v9"
this.snackbar.show({
  title: 'Success',
  message: 'Employee created successfully',
  duration: 5000
});
```

Duration is specified in milliseconds.

| Value | Description |
| ----- | ----------- |
| 3000  | 3 seconds   |
| 5000  | 5 seconds   |
| 10000 | 10 seconds  |


## Position Configuration

### Horizontal Position

```typescript id="3kfd2x"
horizontalPosition: 'start'
horizontalPosition: 'center'
horizontalPosition: 'end'
horizontalPosition: 'left'
horizontalPosition: 'right'
```

### Vertical Position

```typescript id="n1c2ez"
verticalPosition: 'top'
verticalPosition: 'bottom'
```

### Example

```typescript id="k4r7hd"
this.snackbar.show({
  title: 'Success',
  message: 'Employee created successfully',
  horizontalPosition: 'right',
  verticalPosition: 'top'
});
```


## Complete Example

```typescript id="6xq4rf"
this.snackbar.show({
  title: 'Employee Created',
  message: 'Employee record saved successfully',
  type: SnackbarType.Success,
  duration: 5000,
  horizontalPosition: 'right',
  verticalPosition: 'top'
});
```


## API Success Example

```typescript id="h8k3ql"
this.employeeService.create(employee)
  .subscribe({
    next: () => {
      this.snackbar.success(
        'Employee created successfully'
      );
    }
  });
```


## API Error Example

```typescript id="s6y4mn"
this.employeeService.create(employee)
  .subscribe({
    error: () => {
      this.snackbar.error(
        'Unable to create employee'
      );
    }
  });
```


## UI Examples

### Success

```text id="v5a0re"
┌──────────────────────────────┐
│ ✓ Success                    │
│ Employee created successfully│
└──────────────────────────────┘
```

### Error

```text id="8e7kpt"
┌──────────────────────────────┐
│ ✕ Error                      │
│ Unable to create employee    │
└──────────────────────────────┘
```

### Warning

```text id="n0m8dx"
┌──────────────────────────────┐
│ ⚠ Warning                    │
│ Unsaved changes detected     │
└──────────────────────────────┘
```

### Information

```text id="c7v4up"
┌──────────────────────────────┐
│ ℹ Information                │
│ New update available         │
└──────────────────────────────┘
```


## Typical Usage Scenarios

### Form Save

```typescript id="5y2mkr"
this.snackbar.success(
  'Form submitted successfully'
);
```

### API Error

```typescript id="p4x1wo"
this.snackbar.error(
  'Unable to connect to server'
);
```

### Warning Notification

```typescript id="r6t8yl"
this.snackbar.warning(
  'Session will expire in 2 minutes'
);
```

### Application Update

```typescript id="q3v5sa"
this.snackbar.info(
  'Version 2.0 is now available'
);
```


## Built With

* Angular 21+
* Angular Material Snackbar
* TypeScript
* RxJS


## Why Dynamic Snackbar?

Instead of repeatedly configuring Angular Material snackbars throughout your application:

```typescript id="j8u1dx"
this.snackBar.open(
  message,
  'Close',
  {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }
);
```

Simply use:

```typescript id="v5m2zr"
this.snackbar.success(
  'Employee created successfully'
);
```

and let the library handle styling, icons, duration, positioning, and consistency automatically.


## License

MIT License
