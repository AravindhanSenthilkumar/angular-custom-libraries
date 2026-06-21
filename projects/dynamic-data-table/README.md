# Dynamic Data Table

A complete CRUD-ready Angular Material Data Management Library built on top of:

* **devlab-one-dynamic-form**
* **devlab-one-dynamic-table**
* **devlab-one-dynamic-modal**

The library automatically combines dynamic forms, dynamic tables, search forms, popup modals, pagination, sorting, and CRUD operations into a single reusable component.

Instead of manually wiring forms, dialogs, tables, search filters, and actions together, simply provide a JSON configuration and the component handles everything automatically.


# Feedback / Suggestion / Report issue
[https://github.com/AravindhanSenthilkumar/Feedback/issues/1](https://github.com/AravindhanSenthilkumar/Feedback/issues/1)



## Features

* 🚀 Zero Boilerplate CRUD UI
* 📋 Dynamic Table Generation
* 📝 Dynamic Add/Edit Forms
* 🔍 Dynamic Search Forms
* 🪟 Automatic Popup Integration
* ➕ Create Records
* ✏️ Edit Records
* 🗑️ Delete Records
* 👁️ View Records
* 📄 Pagination
* ↕️ Sorting
* 📤 Export Data
* 🎨 Angular Material Design
* ⚡ Client-side & Server-side Support


## Dependencies

This library internally uses:

```bash
devlab-one-dynamic-form
devlab-one-dynamic-table
devlab-one-dynamic-modal
```

No manual integration is required.


## Installation

```bash
npm install devlab-one-dynamic-data-table
```


## Component Usage

```html
<lib-dynamic-data-table
  [dataTableDetails]="jsonData"
  (action)="onTableAction($event)"
></lib-dynamic-data-table>
```


## DataTable Structure

The component accepts a single JSON configuration object.

```typescript
public jsonData: DataTable = {
  tableDataFields: {},
  tableSearch: {},
  tableData: {},
  tableConfig: {},
  serverSidePagination: {},
  popupDetails: {}
};
```


## Architecture

```text
┌─────────────────────────────┐
│ Dynamic Data Table          │
└─────────────┬───────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
Dynamic   Dynamic   Dynamic
Form      Table     Modal

(Add/Edit) (Grid)  (Popup)
```


## Form Configuration

Forms are automatically generated using Dynamic Form.

```typescript
tableDataFields: {
  formComponent: {
    controls: [
      {
        type: FieldType.text,
        name: 'name',
        label: 'Name'
      },
      {
        type: FieldType.email,
        name: 'email',
        label: 'Email'
      }
    ]
  }
}
```

The same form is used automatically for:

* Add Record
* Edit Record
* View Record


## Search Configuration

Dynamic search forms are supported.

```typescript
tableSearch: {
  formElements: {
    controls: [
      {
        type: FieldType.text,
        name: 'name',
        label: 'Name'
      },
      {
        type: FieldType.dropdown,
        name: 'department',
        label: 'Department'
      }
    ]
  },
  value: {},
  searchOn: SearchOn.MatchingColumns,
  searchAt: SearchAt.ClientSide
}
```


## Table Data

```typescript
tableData: {
  data: employeeData,
  totalRecords: employeeData.length
}
```


## Table Configuration

```typescript
tableConfig: {
  paging: {
    enabled: true,
    pageSizeOptions: [5,10,25,50,100],
    pageNumber: 0,
    pageSize: 5
  },

  selectRequired: true,

  tableButtons: {
    add: true,
    edit: true,
    delete: true,
    view: true,
    export: true
  },

  columns: [
    {
      columnDef: 'name',
      header: 'Name',
      sortRequired: true
    }
  ]
}
```


## Popup Configuration

Dynamic Modal integration is automatic.

```typescript
popupDetails: {
  addForm: {
    title: 'Add Employee',
    width: 800,
    justify: Justify.center
  },

  editForm: {
    title: 'Edit Employee',
    width: 800,
    justify: Justify.center
  }
}
```

When users click:

* Add
* Edit
* View

A popup is opened automatically using Dynamic Modal.


## Supported Actions

All actions are emitted through a single output.

```html
<lib-dynamic-data-table
  (action)="onTableAction($event)"
></lib-dynamic-data-table>
```


## Action Handler

```typescript
public onTableAction(event: any) {

  switch (event.name) {

    case 'create':
      break;

    case 'edit':
      break;

    case 'delete':
      break;

    case 'view':
      break;

    case 'search':
      break;

    case 'pageChange':
      break;

    case 'sortChange':
      break;
  }
}
```


## Create Record Example

```typescript
case 'create':

  event.value['id'] =
    Math.floor(Math.random() * 1000000);

  this.jsonData.tableData.data.push(
    event.value
  );

  this.jsonData = {
    ...this.jsonData,
    tableData: {
      ...this.jsonData.tableData,
      data: this.jsonData.tableData.data,
      totalRecords:
        this.jsonData.tableData.data.length
    }
  };

  this.snackBarService.success(
    'Added Successfully'
  );

break;
```


## Edit Record Example

```typescript
case 'edit':

  const updatedData =
    this.jsonData.tableData.data.map(
      data =>
        data.id === event.value.id
          ? { ...data, ...event.value }
          : data
    );

  this.jsonData = {
    ...this.jsonData,
    tableData: {
      ...this.jsonData.tableData,
      data: updatedData,
      totalRecords: updatedData.length
    }
  };

  this.snackBarService.success(
    'Edited Successfully'
  );

break;
```


## Delete Record Example

```typescript
case 'delete':

  this.alertService.confirmationModel(
    `Are you sure to delete Employee "${event.value.name}"`,

    () => {

      const remainingData =
        this.jsonData.tableData.data.filter(
          data => data.id !== event.value.id
        );

      this.jsonData = {
        ...this.jsonData,
        tableData: {
          ...this.jsonData.tableData,
          data: remainingData,
          totalRecords:
            remainingData.length
        }
      };

      this.snackBarService.success(
        'Deleted Successfully'
      );
    }
  );

break;
```


## Event Payloads

### Create

```typescript
{
  name: 'create',
  value: Employee
}
```

### Edit

```typescript
{
  name: 'edit',
  value: Employee
}
```

### Delete

```typescript
{
  name: 'delete',
  value: Employee
}
```

### View

```typescript
{
  name: 'view',
  value: Employee
}
```

### Search

```typescript
{
  name: 'search',
  value: SearchObject
}
```

### Pagination

```typescript
{
  name: 'pageChange',
  pageIndex: 0,
  pageSize: 10
}
```

### Sorting

```typescript
{
  name: 'sortChange',
  active: 'name',
  direction: 'asc'
}
```


## Server Side Support

The component supports server-side operations.

```typescript
serverSidePagination: {
  offset: 0,
  limit: 10
}
```

Use:

```typescript
searchAt: SearchAt.ServerSide
```

to enable server-side searching.


## Lifecycle

```text
User Clicks Add/Edit/View
            │
            ▼
 Dynamic Modal Opens
            │
            ▼
 Dynamic Form Rendered
            │
            ▼
 User Submits Form
            │
            ▼
 Action Event Emitted
            │
            ▼
 Parent Updates Dataset
            │
            ▼
 Dynamic Table Refreshes
```


## Why Dynamic Data Table?

Without this library developers typically need to create:

* Table Component
* Search Form
* Add Form
* Edit Form
* View Form
* Popup Dialog
* Pagination Logic
* Sorting Logic
* CRUD Wiring

With Dynamic Data Table:

```html
<lib-dynamic-data-table
  [dataTableDetails]="jsonData"
  (action)="onTableAction($event)"
></lib-dynamic-data-table>
```

Everything is configured through JSON.


## Built With

* Angular 21+
* Angular Material
* devlab-one-dynamic-form
* devlab-one-dynamic-table
* devlab-one-dynamic-modal
* RxJS
* TypeScript


## License

MIT License
