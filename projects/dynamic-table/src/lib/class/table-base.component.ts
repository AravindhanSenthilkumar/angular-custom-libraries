import { AppLiteralConsts } from '../consts/consts';
import { IDataSet, ISearchModel, ITableDetails } from '../interfaces/itable';
import { OrderBy, SearchRequest } from '../interfaces/itable';

export class TableBaseComponent {
  /**
   * Desc : declaring search variable for customizing the table data search
   */
  public search!: ISearchModel;
  /**
   * Desc : declaring dataset variable for storing the bin data
   */
  public data: IDataSet = {
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
  public tableDetails: ITableDetails = {
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
   * Desc : empty bin list
   */
  public emptyList(): void {
    this.data = { data: [], totalRecords: 0 };
    this.tableDetails.paging.enabled = false;
  }
}
