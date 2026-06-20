# Dynamic Table

A powerful Angular Material-based Dynamic Table Library that provides configurable data tables with built-in support for:

* Sorting
* Pagination
* Search
* CRUD Actions
* Export
* Row Selection
* Dynamic Columns
* Client-side and Server-side operations
* Angular Reactive Search Forms

---

## Features

* 🚀 Dynamic column generation
* 🔍 Built-in search support
* 📄 Pagination
* ↕️ Column sorting
* ✏️ Edit records
* 👁️ View records
* ➕ Create records
* 🗑️ Delete records
* 📤 Export table data
* ✅ Row selection support
* 🎨 Angular Material Design
* ⚡ Client-side and Server-side operations

---

## Installation

```bash
npm install devlab-one/dynamic-table
```

---

## Component Usage

```html
<lib-dynamic-table
  [dataset]="data"
  [tableDetails]="tableDetail"
  [search]="search"
  (action)="onTableAction($event)"
></lib-dynamic-table>
```

---

## Dataset Structure

```typescript
public data = {
  data: employeeData,
  totalRecords: employeeData.length
};
```

| Property     | Description             |
| ------------ | ----------------------- |
| data         | Array of records        |
| totalRecords | Total available records |

---

## Search Configuration

The table supports dynamic search forms generated using the Dynamic Form library.

```typescript
public search: SearchModel = {
  formElements: this.searchForm,
  value: {},
  searchOn: SearchOn.MatchingColumns,
  searchAt: SearchAt.ClientSide
};
```

### Search Modes

```typescript
SearchOn.MatchingColumns
SearchOn.AllColumns
```

### Search Locations

```typescript
SearchAt.ClientSide
SearchAt.ServerSide
```

---

## Table Configuration

```typescript
public tableDetail: TableDetails = {
  paging: {
    enabled: true,
    pageSizeOptions: [5, 10, 25, 50, 100],
    pageNumber: 0,
    pageSize: 10
  },
  selectRequired: true,
  tableButtons: {
    add: true,
    edit: true,
    delete: true,
    view: true,
    export: true
  },
  columns: this.columnDetails()
};
```

---

## Column Configuration

```typescript
public columnDetails() {
  return [
    {
      columnDef: 'name',
      header: 'Name',
      sortRequired: true
    },
    {
      columnDef: 'department',
      header: 'Department',
      sortRequired: true
    },
    {
      columnDef: 'email',
      header: 'Email',
      sortRequired: true
    }
  ];
}
```

### Column Properties

| Property     | Description                |
| ------------ | -------------------------- |
| columnDef    | Property name from dataset |
| header       | Display header             |
| sortRequired | Enable sorting             |
| isComplex    | Nested object support      |
| innerColumns | Child columns              |
| cell         | Custom value renderer      |

---

## Custom Cell Rendering

```typescript
{
  columnDef: 'projects',
  header: 'Projects',
  sortRequired: true,
  cell: (record) => {
    return record.projects;
  }
}
```

---

## Pagination Configuration

```typescript
paging: {
  enabled: true,
  pageSizeOptions: [5,10,25,50,100],
  pageNumber: 0,
  pageSize: 10
}
```

---

## Table Buttons

```typescript
tableButtons: {
  add: true,
  edit: true,
  delete: true,
  view: true,
  export: true
}
```

| Button | Description            |
| ------ | ---------------------- |
| add    | Create new record      |
| edit   | Edit selected record   |
| delete | Delete selected record |
| view   | View selected record   |
| export | Export table data      |

---

## Events

All table interactions emit through a single action output.

```html
<lib-dynamic-table
  (action)="onTableAction($event)"
></lib-dynamic-table>
```

### Event Handler

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

    default:
      break;
  }
}
```

---

## Available Events

### Create

```typescript
{
  name: 'create'
}
```

### Edit

```typescript
{
  name: 'edit',
  data: selectedRow
}
```

### Delete

```typescript
{
  name: 'delete',
  data: selectedRow
}
```

### View

```typescript
{
  name: 'view',
  data: selectedRow
}
```

### Search

```typescript
{
  name: 'search',
  data: searchValues
}
```

### Pagination Change

```typescript
{
  name: 'pageChange',
  pageIndex: 0,
  pageSize: 10
}
```

### Sort Change

```typescript
{
  name: 'sortChange',
  active: 'name',
  direction: 'asc'
}
```

---

## Server-Side Pagination Example

---

## Search Form Example

```typescript
public searchForm: Form = {
  controls: [
    {
      type: FieldType.text,
      name: 'name',
      label: 'Name'
    },
    {
      type: FieldType.dropdown,
      name: 'department',
      label: 'Department',
      options: [
        {
          key: 'Engineering',
          label: 'Engineering'
        },
        {
          key: 'Marketing',
          label: 'Marketing'
        }
      ]
    }
  ]
};
```

---

## Built With

* Angular 21+
* Angular Material
* Reactive Forms
* TypeScript

---

## License

MIT License
