
import { IConfig } from '../interfaces/iconfig';
import { Form } from './dynamic-form.model';


export interface TableButtonAction {
  name: string;
  value?: any;
}


export interface TableColumn extends BasicColumn {
  isComplex: boolean;
  sortRequired: boolean;
  innerColumns: Array<BasicColumn> | null;
}


export enum SearchOn {
  AllColumns = 1,
  MatchingColumns = 2,
}


export enum SearchAt {
  ClientSide = 1,
  ServerSide = 2,
}


export interface SearchModel {
  searchOn: SearchOn;
  formElements: Form;
  value: IConfig | null;
  searchAt: SearchAt;
}


export interface BasicColumn {
  columnDef: string;
  header: string;
  cell?: (value: any) => any;
}


import { ITheme } from '../utils/library-theme-engine';

export interface TableDetails {
  selectRequired: boolean;
  columns: Array<TableColumn>;
  tableButtons: TableButtons;
  paging: Paging;
  theme?: ITheme;
}


export interface DataSet {
  data: any[];
  totalRecords: number;
}


export interface Paging {
  enabled: boolean;
  pageSizeOptions: Array<number>;
  pageNumber: number;
  pageSize: number;
}


export interface TableButtons {
  add: boolean;
  edit: boolean;
  delete: boolean;
  view: boolean;
  export: boolean;
}


export interface FullTableInfo {
  pagination?: SearchRequest;
  search?: SearchModel;
  tableDetails?: TableDetails;
}


export interface PagechangeEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

export interface PageCount {
  total: number;
  limit: number;
  exceed: boolean;
}

export interface SearchRequest {
  offset: number;
  limit: number;
  order?: string;
  sort?: OrderBy;
  searchQuery?: any;
}


export enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

export const defaultPageSize = 5;