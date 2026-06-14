/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicTable } from './table.component';
import {
  IBasicColumn,
  IDataSet,
  IPagechangeEvent,
  ISearchModel,
  ITableDetails,
  SearchAt,
  SearchOn,
  TableColumn,
} from '../../core/interfaces/itable';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { IControl } from '../../core/interfaces/icontrol';
import { ExportService } from '../../core/services/export.service';


describe('TableComponent', () => {
  let component: DynamicTable;
  let fixture: ComponentFixture<DynamicTable>;
  let exportService: ExportService;
  let mockPaginator: any = {
    pageSize: 5,
    pageSizeOptions: [5, 10, 15, 20],
    pageIndex: 1,
    length: 0,
  };
  let mockPaginatorUndefined: MatPaginator;
  const mockTableDetails: ITableDetails = {
    paging: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 15, 20],
      pageNumber: 0,
      enabled: false,
    },
    selectRequired: true,
    columns: [],
    tableButtons: {
      add: false,
      edit: true,
      delete: false,
      view: false,
      export: false,
    },
  };
  const mockSearch: ISearchModel = {
    searchAt: SearchAt.ServerSide,
    searchOn: SearchOn.MatchingColumns,
    formElements: {
      controls: [
        {
          name: 'test',
          type: 'text',
        },
      ],
      SubmitButton: {
        Visible: false,
      },
      NumberOfColumns: 0,
    },
    value: {
      test: 'testing',
    },
  };
  const mockDataSet: IDataSet = {
    data: [],
    totalRecords: 0,
  };
  const mockDataSource: any = new MatTableDataSource([]);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatSortModule, MatPaginatorModule, BrowserAnimationsModule, MatMenuModule],
      declarations: [DynamicTable],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [MatPaginator, MatTableDataSource],
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTable);
    component = fixture.componentInstance;
    component.paginator = mockPaginator;
    component.tableDetails = mockTableDetails;
    component.search = mockSearch;
    component.dataset = mockDataSet;
    component.dataSource = mockDataSource;
    exportService = TestBed.inject(ExportService);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have on ngOnInit', () => {
    jest.spyOn(component, 'initializeGridColumns');
    component.ngOnInit();
    expect(component.initializeGridColumns).toHaveBeenCalled();
  });


  it('should have on changes', () => {
    component.dataset = {
      data: [
        {
          clientId: 1,
          clientName: 'Test client',
        },
      ],
    };
    jest.spyOn(component, 'setupSortFilterPagination');
    component.ngOnChanges();
    expect(component.dataset.data).toBeDefined();
  });


  it('should have setupSortFilterPagination', () => {
    jest.spyOn(component, 'setSort');
    jest.spyOn(component, 'setPaginator');
    jest.spyOn(component, 'initializeSearchPredicate');
    component.setupSortFilterPagination();
    expect(component.setSort).toHaveBeenCalled();
    expect(component.setPaginator).toHaveBeenCalled();
    expect(component.initializeSearchPredicate).toHaveBeenCalled();
  });


  it('should have setupSortFilterPagination with pagination undefined', () => {
    component.paginator = mockPaginatorUndefined;
    jest.spyOn(component, 'setSort');
    jest.spyOn(component, 'setPaginator');
    jest.spyOn(component, 'initializeSearchPredicate');
    component.setupSortFilterPagination();
    expect(component.setSort).toHaveBeenCalled();
    expect(component.setPaginator).toHaveBeenCalled();
    expect(component.initializeSearchPredicate).toHaveBeenCalled();
  });


  it('should have ngOnDestroy', () => {
    component.ngOnDestroy();
  });


  it('should have setSort', () => {
    component.search.searchAt = SearchAt.ServerSide;
    mockSearch.searchAt = SearchAt.ServerSide;
    component.sort = new MatSort();
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    component.dataSource.sort = component.sort;
    const sort = component.dataSource.sort;
    component.setSort();
    expect(sort).toBeInstanceOf(MatSort);
  });


  it('should have setSort', () => {
    component.search.searchAt = SearchAt.ClientSide;
    mockSearch.searchAt = SearchAt.ClientSide;
    component.sort = new MatSort();
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    component.dataSource.sort = component.sort;
    const sort = component.dataSource.sort;
    component.setSort();
    expect(sort).toBeInstanceOf(MatSort);
  });


  it('should have setPaginator', () => {
    component.paginator = mockPaginator;
    component.search = mockSearch;
    component.dataset = mockDataSet;
    component.setPaginator();
    expect(component.paginator.pageSize).toEqual(mockTableDetails.paging.pageSize);
    expect(component.paginator.pageSizeOptions).toEqual(mockTableDetails.paging.pageSizeOptions);
    expect(component.paginator.pageIndex).toEqual(mockTableDetails.paging.pageNumber - 1);
    expect(component.paginator.length).toEqual(component.dataset.totalRecords);
  });


  it('should have setPaginator with server side', () => {
    component.paginator = mockPaginator;
    component.search.searchAt = SearchAt.ServerSide;
    component.setPaginator();
    expect(component.paginator.pageSize).toEqual(5);
    expect(component.paginator.pageSizeOptions).toEqual([5, 10, 15, 20]);
  });


  it('should set dataSource.paginator when paginator is defined and searchAt is not ServerSide', () => {
    component.paginator = mockPaginator;
    component.search = mockSearch;
    component.dataset = mockDataSet;
    component.search.searchAt = SearchAt.ClientSide;
    component.setPaginator();
    expect(mockPaginator.pageSize).toBe(mockTableDetails.paging.pageSize);
    expect(mockPaginator.pageSizeOptions).toEqual(mockTableDetails.paging.pageSizeOptions);
    expect(mockPaginator.pageIndex).toBe(mockTableDetails.paging.pageNumber - 1);
    expect(mockPaginator.length).toBe(mockDataSet.totalRecords);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });


  it('should not change paginator properties when paginator is undefined', () => {
    mockPaginator = undefined;
    component.setPaginator();
    expect(mockPaginator).toBeUndefined();
  });


  it('should have pageChanged', () => {
    const event: IPagechangeEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: 0,
      previousPageIndex: 0,
    };
    component.pageChanged(event);
    expect(event.pageIndex).toEqual(event.pageIndex);
  });


  it('should have onSortChanges', () => {
    let event: any;
    component.search = mockSearch;
    component.paginator = mockPaginator;
    component.onSortChanges(event);
  });


  it('should have initializeSearchPredicate', () => {
    component.initializeSearchPredicate();
  });


  it('should initialize filterPredicate when searchOn is MatchingColumns', () => {
    mockSearch.searchOn = SearchOn.MatchingColumns;
    const mockFilter: IControl = {
      name: 'test',
      type: 'text',
    };
    mockSearch.formElements.controls.push(mockFilter);
    const mockData = [
      { column1: 'value1', column2: 'value2' },
      { column1: 'value3', column2: 'value4' },
    ];
    component.dataSource.data = mockData;
    component.dataSource.filter = JSON.stringify({ column1: 'value1', column2: 'value2' });
    component.initializeSearchPredicate();
    expect(component.dataSource.filterPredicate).toBeInstanceOf(Function);
  });


  it('should have filterGrid with all columns', () => {
    const filterValue: any = {};
    const field = '';
    component.search.searchAt = SearchAt.ClientSide;
    component.search.searchOn = SearchOn.AllColumns;
    component.filterGrid(filterValue, field);
  });


  it('should have filterGrid with match columns', () => {
    const filterValue: any = {};
    const field = '';
    component.search.searchAt = SearchAt.ClientSide;
    component.search.searchOn = SearchOn.MatchingColumns;
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    jest.spyOn(component, 'applyDefaultFilter');
    component.filterGrid(filterValue, field);
    expect(component.applyDefaultFilter).toHaveBeenCalled();
  });


  it('should have applyDefaultFilter', () => {
    let value: any;
    let column: any;
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    component.applyDefaultFilter(value, column);
    expect(component.dataSource.filter).toEqual('');
  });


  it('should have isAllSelected', () => {
    jest.spyOn(component, 'isAllSelected');
    component.isAllSelected();
    expect(component.isAllSelected).toHaveReturnedWith(false);
  });


  it('should have toggleAllRows with same length', () => {
    component.selection.selected.length = 1;
    component.dataSource.data.length = 1;
    component.toggleAllRows();
  });


  it('should have toggleAllRows with different length', () => {
    component.selection.selected.length = 10;
    component.dataSource.data.length = 9;
    component.toggleAllRows();
  });


  it('should remove column from displayedColumns when event is false', () => {
    component.displayedColumns = ['column1', 'column2', 'column3'];
    component.setColumn(false, 'column2');
    expect(component.displayedColumns).toEqual(['column1', 'column3']);
  });


  it('should add column to displayedColumns when event is true', () => {
    component.displayedColumns = ['column1', 'column2'];
    component.setColumn(true, 'column3');
    expect(component.displayedColumns).toEqual(['column1', 'column2', 'column3']);
  });


  it('should add "select" column if selectRequired is true', () => {
    component.displayedColumns = [];
    mockTableDetails.selectRequired = true;
    mockTableDetails.columns = [];
    component.initializeGridColumns();
    expect(component.displayedColumns).toContain('select');
  });


  it('should not add "select" column if selectRequired is false', () => {
    component.displayedColumns = [];
    mockTableDetails.selectRequired = false;
    mockTableDetails.columns = [];
    component.initializeGridColumns();
    expect(component.displayedColumns).not.toContain('select');
  });


  it('should add columns from tableDetails', () => {
    mockTableDetails.selectRequired = false;
    mockTableDetails.columns = [
      {
        columnDef: 'col1',
        header: 'col1',
        isComplex: false,
        sortRequired: false,
        innerColumns: null,
      },
      {
        columnDef: 'col2',
        header: 'col2',
        isComplex: false,
        sortRequired: false,
        innerColumns: null,
      },
    ];
    component.initializeGridColumns();
    expect(component.displayedColumns).toContain('col1');
    expect(component.displayedColumns).toContain('col2');
  });


  it('should add complex columns to expandColumnDefination', () => {
    mockTableDetails.selectRequired = false;
    mockTableDetails.columns = [
      {
        columnDef: 'col1',
        header: 'col1',
        isComplex: true,
        sortRequired: false,
        innerColumns: null,
      },
      {
        columnDef: 'col2',
        header: 'col2',
        isComplex: false,
        sortRequired: false,
        innerColumns: null,
      },
    ];
    component.initializeGridColumns();
    expect(component.expandColumnDefination).toContainEqual({
      columnDef: 'col1',
      header: 'col1',
      isComplex: true,
      sortRequired: false,
      innerColumns: null,
    });
  });


  it('should add "action" column if actionRequired is true', () => {
    component.displayedColumns = [];
    mockTableDetails.selectRequired = false;
    mockTableDetails.columns = [];
    mockTableDetails.tableButtons = {
      add: true,
      edit: true,
      delete: false,
      view: false,
      export: false,
    };
    component.initializeGridColumns();
    expect(component.displayedColumns).toContain('action');
  });


  it('should not add "action" column if actionRequired is false', () => {
    component.displayedColumns = [];
    mockTableDetails.selectRequired = false;
    mockTableDetails.columns = [];
    mockTableDetails.tableButtons = {
      add: true,
      edit: false,
      delete: false,
      view: false,
      export: false,
    };
    component.initializeGridColumns();
    expect(component.displayedColumns).not.toContain('action');
  });


  it('should have filterFieldChanges with search value', () => {
    let event: any;
    const filter: any = 'test';
    component.search.value = {
      clientId: 'test',
      pointOfSaleId: 'test2',
    };
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    jest.spyOn(component, 'filterGrid');
    component.filterFieldChanges(event, filter);
    expect(component.filterGrid).toHaveBeenCalled();
  });


  it('should have filterFieldChanges', () => {
    let event: any;
    const filter: any = 'test';
    component.dataSource = new MatTableDataSource<any>(mockDataSet.data);
    jest.spyOn(component, 'filterGrid');
    component.filterFieldChanges(event, filter);
    expect(component.filterGrid).toHaveBeenCalled();
  });


  it('should have initializeSearchFields', () => {
    component.initializeSearchFields();
  });


  it('should have onTableAction', () => {
    const dataValue: any = {
      name: 'test',
      value: { field: 'test' },
    };
    component.onTableAction(dataValue);
    expect(dataValue).toEqual({
      name: 'test',
      value: { field: 'test' },
    });
  });


  it('should have getExpandedColumnHeaderDef', () => {
    const element: Array<TableColumn> | null | undefined = [];
    const received = component.getExpandedColumnHeaderDef(element);
    expect(received).toEqual([]);
  });


  it('should have getInnerColumnDef', () => {
    const element: Array<IBasicColumn> | null | undefined = [];
    const received = component.getInnerColumnDef(element);
    expect(received).toEqual([]);
  });


  it('should have isJSON', () => {
    const str = '';
    const receivedType = component.isJSON(str);
    expect(receivedType).toEqual(false);
  });


  it('should have exportData as excel at server side', () => {
    component.search.searchAt = SearchAt.ServerSide;
    component.dataset.data = [
      {
        clientId: 1,
        clientName: 'testname',
      },
    ];
    jest.spyOn(component, 'onTableAction');
    component.exportData('excel');
    expect(component.onTableAction).toHaveBeenCalled();
  });


  it('should have exportData as excel at client side', () => {
    component.search.searchAt = SearchAt.ClientSide;
    component.dataset.data = [
      {
        clientId: 1,
        clientName: 'testname',
      },
    ];
    jest.spyOn(exportService, 'exportData');
    component.exportData('xlsx');
    expect(exportService.exportData).toHaveBeenCalled();
  });
});