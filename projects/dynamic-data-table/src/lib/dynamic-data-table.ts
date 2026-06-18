import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DynamicForm, Form, DynamicFormDetails } from 'dynamic-form';
import { DataSet, DynamicTable, SearchAt, SearchModel, SearchOn, SearchRequest, TableDetails } from 'dynamic-table';
import { IPopupDetails, ModalService } from 'dynamic-modal';

export enum Justify {
  left = "left",
  right = "right",
  center = "center"
}

export interface PopupConfig{
    title: string;
    width: number;
    justify: Justify;
}

export interface PopupDetails{
  addForm: PopupConfig;
  editForm: PopupConfig;
}

export interface DataTable {
  tableDataFields : DynamicFormDetails;
  tableSearch: SearchModel;
  tableData: DataSet;
  tableConfig: TableDetails;
  serverSidePagination: SearchRequest;
  popupDetails: PopupDetails
}

@Component({
  selector: 'lib-dynamic-data-table',
  imports: [DynamicTable],
  templateUrl: './dynamic-data-table.html',
  styleUrl: './dynamic-data-table.scss',
  standalone: true,
})
export class DynamicDataTable implements OnChanges {

  @Input() dataTableDetails :DataTable = {
    tableDataFields: {
      formComponent:{
        controls: [],
        outline: false
      },
      wizardComponent:{}
    },
    tableSearch: {
      searchOn: SearchOn.AllColumns,
      formElements: {
        controls: [],
        outline: false
      },
      value: null,
      searchAt: SearchAt.ClientSide
    },
    tableData: {
      data: [],
      totalRecords: 0
    },
    tableConfig: {
      selectRequired: false,
      columns: [],
      tableButtons: {
        add: false,
        edit: false,
        delete: false,
        view: false,
        export: false
      },
      paging: {
        enabled: false,
        pageSizeOptions: [],
        pageNumber: 0,
        pageSize: 0
      }
    },
    serverSidePagination:{
      offset: 0,
      limit: 0
    },
    popupDetails:{
      addForm: {
        title: '',
        width: 0,
        justify: Justify.left
      },
      editForm: {
        title: '',
        width: 0,
        justify: Justify.left
      }
    }
  };

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modelService: ModalService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataTableDetails']){
      this.dataTableDetails = {
        ...this.dataTableDetails,
        tableDataFields : changes['dataTableDetails'].currentValue.tableDataFields,
        tableSearch : changes['dataTableDetails'].currentValue.tableSearch,
        tableData: changes['dataTableDetails'].currentValue.tableData,
        tableConfig: changes['dataTableDetails'].currentValue.tableConfig,
        serverSidePagination: changes['dataTableDetails'].currentValue.serverSidePagination,
        popupDetails: changes['dataTableDetails'].currentValue.popupDetails,
      }
    }
  }
  

  public onTableAction(event: any) {
    switch (event.name) {
      case 'create':
          const addFormControls = this.dataTableDetails.tableDataFields.formComponent?.controls?.map(control => ({
              ...control,
              value: ""
            })) ?? [];

          if (this.dataTableDetails.tableDataFields.formComponent) {
            this.dataTableDetails.tableDataFields.formComponent.controls = addFormControls;
          }
        const model: IPopupDetails = {
          width: this.dataTableDetails.popupDetails.addForm.width,
          component: DynamicForm,
          header: {
            title: this.dataTableDetails.popupDetails.addForm.title,
            justification: this.dataTableDetails.popupDetails.addForm.justify
          },
          ContextData: { dynamicFormDetails: this.dataTableDetails.tableDataFields },
          autoClose: true,
          onClose: () => { },
          onSubmit: (createEvent: any) => {
              this.action.emit({
                name : event.name,
                value: createEvent
              });
          }
        }
        this.modelService.openComponentAsPopup(model);
        break;
      case 'edit':
          const updatedControls = this.dataTableDetails.tableDataFields.formComponent?.controls?.map(control => ({
              ...control,
              value: event.value[control.name] ?? control.value
            })) ?? [];

          if (this.dataTableDetails.tableDataFields.formComponent) {
            this.dataTableDetails.tableDataFields.formComponent.controls = updatedControls;
          }
        const editmodel: IPopupDetails = {
          width: this.dataTableDetails.popupDetails.editForm.width,
          component: DynamicForm,
          header: {
            title: this.dataTableDetails.popupDetails.editForm.title,
            justification: this.dataTableDetails.popupDetails.editForm.justify
          },
          ContextData: {
            dynamicFormDetails: this.dataTableDetails.tableDataFields
           },
          autoClose: true,
          onClose: () => { },
          onSubmit: (editEvent: any) => {
              this.action.emit({
                name : event.name,
                value: editEvent
              });
          }
        }
        this.modelService.openComponentAsPopup(editmodel);
        break;
      case 'delete':
        this.action.emit({
          name : event.name,
          value: event.value
        });
        break;
      case 'view':
        this.action.emit({
          name : event.name,
          value: event.value
        });
        break;
      case 'serach':
          this.action.emit({
            name : event.name,
            value: event.value
          });
        break;
      case 'pageChange':
        this.action.emit({
          name : event.name,
          value: event.value
        });
        break;
      case 'sortChange':
        this.action.emit({
          name : event.name,
          value: event.value
        });
        break;
      default:
        break;
    }
  }
}
