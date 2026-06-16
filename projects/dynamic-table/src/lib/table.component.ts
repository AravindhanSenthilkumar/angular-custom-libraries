import { Component, OnInit, OnDestroy, ViewChild, Input, OnChanges, Output, EventEmitter, AfterViewInit,Renderer2, ElementRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {
  DataSet,
  TableDetails,
  SearchModel,
  TableColumn,
  TableButtonAction,
  BasicColumn,
  SearchOn,
  SearchAt,
} from './model/table.model';
import { AppLiteralConsts } from './constant/consts';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { ExportType } from './interfaces/Iexport';
import { ExportService } from './services/export.service';
import { CommonModule } from '@angular/common';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DynamicForm, DynamicFormDetails } from 'dynamic-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderBy, SearchRequest } from './model/table.model';

/********************************************************************** 
  Page : Table component
  Desc : Displaying the table data dynamically
**********************************************************************/


@Component({
  selector: 'lib-dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DynamicForm,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DynamicTable implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  /**
   * Desc : declaring dataset variable for storing the bin data
   */
  public data: DataSet = {
    data: [],
    totalRecords: 0
  };
  /**
   * Desc : declaring defaultPageSize variable for showing initail page size
   */
  public defaultOffsetSize:number = 1;
  /**
   * Desc : declaring defaultPageSize variable for showing initail page size
   */
  public defaultPageSize: number = 5;
  /**
   * Desc : declaring search variable for customizing the table data search
   */
  public pagination: SearchRequest = {
    offset: this.defaultOffsetSize,
    limit: this.defaultPageSize,
    searchQuery: {},
    order: AppLiteralConsts.actionButton.sortBy,
    sort: OrderBy.asc,
  };
  /**
   * Desc : declaring tableDetails variable for customzing the table appearance
   */
  @Input() public tableDetails: TableDetails = {
    selectRequired: false,
    columns: [],
    tableButtons: {
      add: false,
      edit: false,
      delete: false,
      view: false,
      export: false,
    },
    paging: {
      enabled: false,
      pageSizeOptions: [],
      pageNumber: 0,
      pageSize: 0
    },
  };
  /**
   * Desc : filter visibility
   */
  public filterVisibility: boolean = true;
  /**
   * Desc : declaring formgroup variable for filter
   */
  public filter: FormGroup = new FormGroup({});
  /**
   * Desc : declaring variable for column names
   */
  public displayedColumns: string[] = [];
  /**
   * Desc : declaring variable for master column names
   */
  public masterDisplayedColumns: string[] = [];
  /**
   * Desc : declaring variable for table data
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  /**
   * Desc : declaring variable for selecting the row data
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public selection = new SelectionModel<any>(true, []);
  /**
   * Desc : consuming view child feature for export option menu
   */
  @ViewChild('exportOptionMenu', { static: false }) exportOptionMenu!: MatMenu;
  /**
   * Desc : consuming view child feature for paginator
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * Desc : consuming view child feature for table data sorting
   */
  @ViewChild(MatSort) sort!: MatSort;
  /**
   * Desc : receiving the dataset input from parent component
   */
  @Input() dataset: DataSet = {
    data: [],
    totalRecords : 0
  };
    /**
   * Desc : receiving the search input from parent component
   */
  @Input() search: SearchModel = {
    searchOn: SearchOn.AllColumns,
    formElements: {
      controls: [],
      outline: false
    },
    value: {},
    searchAt: SearchAt.ClientSide
  };
  /**
   * Desc : send search element to form component
   */
  public dynamicFormDetails: DynamicFormDetails = {
    formComponent: this.search.formElements
  }  
  /**
   * Desc : emitting the action output to parent component
   */
  @Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>();
  /**
   * Desc : declaring variable for expand column info
   */
  public expandColumnDefination: Array<TableColumn> = [];
  /**
   * Desc : declaring variable for expanded column info
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public expandedElement: any | null;
  /**
   * Desc : declaring variable for expanded column prefix info
   */
  public expandedPrefix = 'expanded_';
  /**
   * Desc : declaring the variable for storing table row counts
   */
  public tableRowCount: number | undefined = 0;
  /**
   * Desc : expand group
   */
  public isExpandedGroupRow: number | undefined = undefined;
  /**
   * Desc : constructor initialization
   */
  constructor(private exportService: ExportService,private renderer: Renderer2,private el: ElementRef) {}
  /**
   * Desc : execute when component is initalized
   */
  public ngOnInit(): void {
    this.selection.changed.subscribe((change) => {
      this.addActionForSelectedRows();
    });
  }
  /**
   * Desc : execute when component has any changes
   */
  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.dataset.data);
    this.initializeSearchPredicate();
    this.initializeGridColumns();
    if (this.search) {
      this.initializeSearchFields();
    }
  }
  /**
   * desc : after view is rendered
   */
  public ngAfterViewInit(){
   this.renderTableDetails();
  }
  /**
   * config paginator and sorting options
   */
  public renderTableDetails(){
      switch(this.search.searchAt){
        case SearchAt.ClientSide:
          if(this.paginator){
            this.paginator.pageSize = this.tableDetails.paging.pageSize;
            this.paginator.pageSizeOptions = this.tableDetails.paging.pageSizeOptions;
            this.paginator.pageIndex = this.tableDetails.paging.pageNumber - 1;
            this.dataSource.paginator = this.paginator;
          }
          if(this.sort && this.paginator){
            this.dataSource.sort = this.sort;
          }
          break;
        case SearchAt.ServerSide:
          if(this.paginator){
            this.paginator.pageSize = this.tableDetails.paging.pageSize;
            this.paginator.pageSizeOptions = this.tableDetails.paging.pageSizeOptions;
            this.paginator.pageIndex = this.tableDetails.paging.pageNumber - 1;
            this.paginator.length = this.dataset.totalRecords;
          }
          break;
        default:
          break;
      }
  }
  /**
   * Desc : execute when moved to another component
   */
  public ngOnDestroy(): void {
    this.action.unsubscribe();
  }
  /**
   * Desc : organizing the search filter fields
   */
  public initializeSearchPredicate(): void {
    if (this.search?.searchOn == SearchOn.MatchingColumns) {
      this.dataSource.filterPredicate = (data, filter) => {
        const searchFilterValues = this.isJSON(filter) ? JSON.parse(filter) : this.filter.value;
        const allemptyFilters = Object.keys(searchFilterValues).every(
          (filterData) => searchFilterValues[filterData] == '' || searchFilterValues[filterData] == null,
        );
        if (allemptyFilters) {
          return true;
        }
        let found = false;
        for (let index = 0; index < this.search.formElements.controls.length; index++) {
          const field: any = this.search.formElements.controls.at(index) ?? '';
          if (data[field] && searchFilterValues[field]) {
            found = data[field].toLowerCase().indexOf(searchFilterValues[field].toLowerCase()) != -1;
            if (found) {
              return true;
            }
          }
        }
        return found;
      };
    }
  }
  /**
   * Desc : Filter the table data
   */
  public filterGrid(filterValue: any, field?: string) {
    if (this.search?.searchAt == SearchAt.ClientSide) {
      if (this.search?.searchOn == SearchOn.AllColumns) {
        this.dataSource.filter = (filterValue[Object.keys(filterValue).at(0) ?? ''] ?? '').trim().toLowerCase();
      } else {
        this.applyDefaultFilter(filterValue[field!], field);
      }
    }
    this.action.emit({ name: AppLiteralConsts.actionButton.search, value: filterValue });
    this.addActionForSelectedRows();
  }
  /**
   * Desc : execute default search method
   */
  public applyDefaultFilter(value: any, column: any) {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let matchFound = false;
      if (column in data) {
        if (data[column]) {
          matchFound =
            matchFound || data[column].toString().trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1;
        }
      }
      return matchFound;
    };
    this.dataSource.filter = value ? value.trim().toLowerCase() : '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator?.firstPage();
    }
  }
  /**
   * Desc : validating if all the checkbox are checked or not
   */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /**
   * Desc : Enable select and deselect all rows
   */
  public toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }


    this.selection.select(...this.dataSource.data);
  }
  /**
   * Desc : Column visibility
   */
  public setColumn(event: boolean, column: string) {
    if (!event) {
      this.displayedColumns.filter((col, index) => {
        if (col == column) {
          this.displayedColumns.splice(index, 1);
        }
      });
    } else {
      this.displayedColumns.push(column);
    }
  }
  /**
   * Desc : Initalize columns and expanded columns
   */
  public initializeGridColumns() {
    if (this.tableDetails?.selectRequired) {
      this.displayedColumns.push('select');
    }
    this.tableDetails?.columns?.forEach((cols: TableColumn) => {
      this.displayedColumns.push(cols.columnDef);
      this.masterDisplayedColumns.push(cols.columnDef);
      if (cols.isComplex) {
        this.expandColumnDefination.push(cols);
      }
    });
    if (this.actionRequired()) {
      this.displayedColumns.push('action');
    }
  }
  /**
   * Desc : Initialize search fields
   */
  public initializeSearchFields(): void {
    this.search?.formElements?.controls?.map((control:any) => {
      control.OnChange = this.filterFieldChanges.bind(this);
    });
  }
  /**
   * Desc : detect changes in filter field on keyup
   */
  public filterFieldChanges(event: any, field: string): void {
    if (this.search?.value) {
      this.search.value[field] = event;
    }
    const formControlIndex = this.search?.formElements?.controls?.findIndex((element:any) => element.name == field);
    if (this.search?.formElements && formControlIndex != undefined) {
      this.search.formElements.controls[formControlIndex].value = event;
    }
    this.filterGrid(this.search?.value, field);
  }
  /**
   * Desc : validating input features in table
   */
  public actionRequired(buttonType?: string) {
    if (buttonType == AppLiteralConsts.actionButton.add) {
      return this.tableDetails.tableButtons.add;
    } else if (buttonType == AppLiteralConsts.actionButton.export) {
      return this.tableDetails.tableButtons.export;
    } else {
      return (
        this.tableDetails.tableButtons.delete ||
        this.tableDetails.tableButtons.edit ||
        this.tableDetails.tableButtons.view
      );
    }
  }
  /**
   * Desc : Export table data
   */
  public exportData(exportType: string): void {
    if (this.search?.searchAt == SearchAt.ServerSide) {
      this.onTableAction(AppLiteralConsts.actionButton.export, exportType);
    } else {
      if(exportType == 'pdf'){
        if(this.selection.isEmpty()){
          this.exportService.exportPdf(this.dataSource.data);
        }else{
          this.exportService.exportPdf(this.selection.selected);
        }
      }else{
        this.exportService.exportData(
          exportType == AppLiteralConsts.sheet.excel ? ExportType.excel : ExportType.csv,
          this.dataset?.data,
          exportType,
        );
      }
    }
  }
  /**
   * Desc : emitting the data to parent component
   */
  public onTableAction(type: string, value?: any): void {
    const dataValue = {
      name: type,
      value: value,
    };
    this.action.emit(dataValue);
  }
  /**
   * Desc : return expanded column data
   */
  public getExpandedColumnHeaderDef(ele: Array<TableColumn> | null | undefined) {
    return ele?.map((x) => `${this.expandedPrefix}${x.columnDef}`) ?? [];
  }
  /**
   * Desc : return inner column data
   */
  public getInnerColumnDef(ele: Array<BasicColumn> | null | undefined) {
    return ele?.map((x) => x.columnDef) ?? [];
  }
  /**
   * Desc : validate json
   */
  public isJSON(str: string) {
    try {
      return JSON.parse(str) && !!str;
    } catch (e) {
      return false;
    }
  }
  /**
   * Desc : event triggers while chaning the page
   */
  public pageChanged(event: any): void {
    event.pageIndex = event.pageIndex + 1;
    this.action.emit({ name: AppLiteralConsts.actionButton.pageChange, value: event });
    this.addActionForSelectedRows();
  }
  /**
   * Desc: Event triggers while sorting the column
   */
  public onSortChanges(event: any): void {
    if (this.search?.searchAt == SearchAt.ServerSide && this.paginator != undefined) {
      this.paginator.pageIndex = 0;
    }
    this.action.emit({ name: AppLiteralConsts.actionButton.sortChange, value: event });
    this.addActionForSelectedRows();
  }
  /**
   * Desc : array exist
   */
  public isArray(inputValue: any): boolean {
    return Array.isArray(inputValue);
  }
  /**
   * Desc : expanding the array data list
   * @param index : row index
   */
  public expandList(index: number) {
    if (this.isExpandedGroupRow == index) {
      this.isExpandedGroupRow = undefined;
    } else {
      this.isExpandedGroupRow = index;
    }
  }
  /** 
  * desc: label for the checkbox on the passed row 
  */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  /**
   * Desc : toggle filter 
   */
  public toggleFilter():void{
    this.filterVisibility = !this.filterVisibility;
  }
  /**
   * Desc : column visibility
   */
  public columnVisibility(column:string){
    if(this.displayedColumns.includes(column)){
      this.displayedColumns = this.displayedColumns.filter(item => item !== column);
      this.search.formElements.controls.forEach((item) => { if(item.name == column){ item.visible = false } });
    }else{
      const newIndex = this.masterDisplayedColumns.indexOf(column);
      const targetIndex = this.displayedColumns.findIndex(item => this.masterDisplayedColumns.indexOf(item) > newIndex);
      if (targetIndex === -1) {
        this.displayedColumns.push(column);
      } else {
        this.displayedColumns.splice(targetIndex, 0, column);
      }
      this.search.formElements.controls.forEach((item) => { if(item.name == column){ item.visible = true } });
    }
    this.addActionForSelectedRows();
  }
  /**
   * Desc : toggle row select
   */
  toggleRowSelect(row: any, event: MouseEvent) {
    const target = event.target as HTMLElement;
    let lastColumnIndex = this.displayedColumns.length - 1;
    const headingLength = document.querySelector('table thead tr')?.children.length as number;
    const headingLastColumn = document.querySelector('table thead tr')?.children[headingLength - 1];
    if(headingLastColumn?.textContent == 'Action'){
      lastColumnIndex =  headingLength - 1;
    }
    const cell = target.closest('td');
    if (cell) {
      const cellIndex = Array.from(cell.parentNode!.children).indexOf(cell);
      if (cellIndex === lastColumnIndex) {
        return;
      }else{
        
      }
    }
    this.expandedElement = this.expandedElement === row ? null : row;
    this.selection.toggle(row);
  }
  /**
   * Desc : create single cell td and append to last column
   */
  public createElementForSelelctedRows(){
    this.addHeaderCell();
    this.addActionCell();
  }
  /**
   * Desc : create DOM element for action column specifically for selected row
   */
  public addActionForSelectedRows(){
    if(!this.selection.isEmpty()){
      const index = this.displayedColumns.indexOf('action');
      if (index !== -1) {
        this.displayedColumns.splice(index, 1);
        setTimeout(()=>{ this.createElementForSelelctedRows();},100);
      }else{
       this.resetAndCreateActionElement();
      }
    }else{
      if(!this.displayedColumns.includes('action')){
        this.displayedColumns.push('action');
      }
    }
  }
  /**
   * desc : delete DOM element for action column
   */
  public resetActionColumn(){
    const tableHeaderRow = this.el.nativeElement.querySelector('table thead tr');
    if (tableHeaderRow) {
      const lastChild = tableHeaderRow.lastChild;
      if (lastChild) {
        this.renderer.removeChild(tableHeaderRow, lastChild);
      }
    }
    let renderSingletdCell = false;
      const tableCellRows = this.el.nativeElement.querySelectorAll('table tbody tr');
      tableCellRows.forEach((row: HTMLElement) => {
        if (row.children.length > 0 && !renderSingletdCell) {
          renderSingletdCell = true;
          const lastChild = row.lastChild;
          if (lastChild) {
            this.renderer.removeChild(row, lastChild);
          }
        }
      });
  }
  /**
   * desc : add header cell using renderer library
   */
  private addHeaderCell() {
    const tableHeaderRow = this.el.nativeElement.querySelector('table thead tr');
    if (tableHeaderRow) {
      const newTh = this.renderer.createElement('th');
      this.renderer.addClass(newTh, 'mat-mdc-header-cell');
      this.renderer.addClass(newTh, 'mdc-data-table__header-cell');
      this.renderer.addClass(newTh, 'cdk-header-cell');
      this.renderer.addClass(newTh, 'header-align-right');
      this.renderer.addClass(newTh, 'cdk-column-action');
      this.renderer.addClass(newTh, 'mat-column-action');
      this.renderer.addClass(newTh, 'ng-tns-c1115897789-0');
      this.renderer.addClass(newTh, 'ng-star-inserted');
      this.renderer.addClass(newTh, 'mat-mdc-table-sticky');
      this.renderer.addClass(newTh, 'mat-mdc-table-sticky-border-elem-top');
      this.renderer.addClass(newTh, 'mat-mdc-table-sticky-border-elem-right');

      this.renderer.setStyle(newTh, 'position', 'sticky');
      this.renderer.setStyle(newTh, 'top', '0px');
      this.renderer.setStyle(newTh, 'zIndex', '101');
      this.renderer.setStyle(newTh, 'right', '0px');
      this.renderer.setStyle(newTh, 'color', '#000000');
      this.renderer.setStyle(newTh, 'fontSize', '15px');
      this.renderer.setStyle(newTh, 'textTransform', 'uppercase');
      this.renderer.setStyle(newTh, 'backgroundColor', '#ffffff');
      this.renderer.setStyle(newTh, 'minWidth', '250px');
      this.renderer.setStyle(newTh, 'textAlign', 'center');

      this.renderer.setAttribute(newTh, '_ngcontent-ng-c1115897789', '');
      this.renderer.setAttribute(newTh, 'role', 'columnheader');
      this.renderer.setAttribute(newTh, 'mat-header-cell', '');
      this.renderer.appendChild(newTh, this.renderer.createText('Action'));
      this.renderer.appendChild(tableHeaderRow, newTh);
    }
  }
  /**
   * desc: add action cell using renderer
   */
  private addActionCell() {
    let renderSingletdCell = false;
    const tableCellRows = this.el.nativeElement.querySelectorAll('table tbody tr');
    tableCellRows.forEach((row: HTMLElement, index: number) => {
      if (row.children.length > 0 && !renderSingletdCell) {
        renderSingletdCell = true;

        const newTd = this.renderer.createElement('td');
        this.renderer.addClass(newTd, 'mat-mdc-cell');
        this.renderer.addClass(newTd, 'mdc-data-table__cell');
        this.renderer.addClass(newTd, 'cdk-cell');
        this.renderer.addClass(newTd, 'header-align-right');
        this.renderer.addClass(newTd, 'cdk-column-action');
        this.renderer.addClass(newTd, 'mat-column-action');
        this.renderer.addClass(newTd, 'ng-tns-c1115897789-0');
        this.renderer.addClass(newTd, 'ng-star-inserted');
        this.renderer.addClass(newTd, 'mat-mdc-table-sticky');
        this.renderer.addClass(newTd, 'mat-mdc-table-sticky-border-elem-right');

        this.renderer.setStyle(newTd, 'zIndex', '1');
        this.renderer.setStyle(newTd, 'right', '0px');
        this.renderer.setStyle(newTd, 'textAlign', 'center');
        this.renderer.setStyle(newTd, 'borderLeft', '1px solid #cccccc');

        this.renderer.setAttribute(newTd, '_ngcontent-ng-c1115897789', '');
        this.renderer.setAttribute(newTd, 'mat-cell', '');
        this.renderer.setAttribute(newTd, 'rowspan', '100');

        const delButton = this.renderer.createElement('button') as HTMLButtonElement;
        delButton.className = 'action-icon action-delete';
        this.renderer.setAttribute(delButton, 'mat-menu-item', '');
        this.renderer.setStyle(delButton, 'display', 'inline-block');
        this.renderer.setStyle(delButton, 'cursor', 'pointer');
        this.renderer.setStyle(delButton, 'backgroundColor', 'unset');
        this.renderer.setStyle(delButton, 'border', 'unset');
        this.renderer.setStyle(delButton, 'borderRadius', '2px');
        this.renderer.setStyle(delButton, 'padding', '5px');
        this.renderer.setStyle(delButton, 'marginRight', '25px');
        this.renderer.setStyle(delButton, 'border', '1px solid #ccc');

        const delMatIcon = this.renderer.createElement('mat-icon');
        this.renderer.setAttribute(delMatIcon, 'role', 'img');
        this.renderer.addClass(delMatIcon, 'mat-icon');
        this.renderer.addClass(delMatIcon, 'notranslate');
        this.renderer.addClass(delMatIcon, 'material-icons');
        this.renderer.addClass(delMatIcon, 'mat-ligature-font');
        this.renderer.addClass(delMatIcon, 'mat-icon-no-color');
        this.renderer.setAttribute(delMatIcon, 'aria-hidden', 'true');
        this.renderer.setAttribute(delMatIcon, 'data-mat-icon-type', 'font');
        this.renderer.appendChild(delMatIcon, this.renderer.createText('delete'));
        this.renderer.listen(delButton, 'click', () => this.onTableAction('delete',this.selection.selected));
        this.renderer.appendChild(delButton, delMatIcon);
        this.renderer.appendChild(newTd, delButton);
        this.renderer.appendChild(row, newTd);
      }
    });
  }
  /**
   * 
   */
  public resetAndCreateActionElement(){
    const headingLength = document.querySelector('table thead tr')?.children.length as number;
      const headingLastColumn = document.querySelector('table thead tr')?.children[headingLength - 1];
      if(headingLastColumn?.textContent == 'Action'){
        this.resetActionColumn();
        setTimeout(()=>{ this.createElementForSelelctedRows();},100);
      }
  }

    /**
   * Desc : empty bin list
   */
  public emptyList(): void {
    this.data = { data: [], totalRecords: 0 };
    this.tableDetails.paging.enabled = false;
  }
}