import { TestBed } from '@angular/core/testing';
import { ExportService } from './export.service';
import * as XLSX from 'xlsx';
import { of } from 'rxjs';


jest.mock('xlsx', () => ({
  utils: {
    book_new: jest.fn(),
    json_to_sheet: jest.fn(),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));


describe('ExportService', () => {
  let service: ExportService;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockFunction: any;
  beforeEach(() => {
    mockFunction = {
      exportData: jest.fn(),
      prepareDataForExport: jest.fn(),
    };
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should export data as XLSX when exportType is "excel"', () => {
    const dataSheets = [
      { testName: 'Client', testId: 30 },
      { testName: 'Client-1', testId: 35 },
    ];
    service.exportData('xlsx', dataSheets, 'test');
    jest.spyOn(mockFunction, 'prepareDataForExport').mockReturnValue(
      of({
        numberOfSheets: {
          test: dataSheets,
        },
      }),
    );
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.writeFile).toHaveBeenCalledWith(XLSX.utils.book_new(), 'test.xlsx');
  });


  it('should export data as XLSX when exportType is "csv"', () => {
    const dataSheets = [
      { testName: 'Client', testId: 30 },
      { testName: 'Client-1', testId: 35 },
    ];
    service.exportData('csv', dataSheets, 'test');
    jest.spyOn(mockFunction, 'prepareDataForExport').mockReturnValue(
      of({
        numberOfSheets: {
          test: dataSheets,
        },
      }),
    );
    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledTimes(dataSheets.length);
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledTimes(dataSheets.length);
    expect(XLSX.writeFile).toHaveBeenCalledWith(XLSX.utils.book_new(), 'test.csv');
  });


  it('should have prepareDataForExport', () => {
    const dataSheets = [
      { testName: 'Client', testId: 30 },
      { testName: 'Client-1', testId: 35 },
      { testName: 'Client-1', testId: 35 },
    ];
    const sourceName = 'test';
    const preparedDataSheet = service.prepareDataForExport(dataSheets, sourceName);
    jest.spyOn(mockFunction, 'prepareDataForExport').mockReturnValue(
      of({
        numberOfSheets: {
          test: dataSheets,
        },
      }),
    );
    expect(preparedDataSheet).toHaveProperty(sourceName);
    expect(preparedDataSheet[sourceName]).toHaveLength(dataSheets.length);
  });


  it('should have prepareDataForExport', () => {
    const dataSheets = [
      {
        testName: { testName: 'Client', testId: 30 },
        testId: { testName: 'Client', testId: 30 },
      },
      { testName: 'Client-1', testId: 35 },
      { testName: 'Client-1', testId: 35 },
    ];
    jest.spyOn(mockFunction, 'prepareDataForExport').mockReturnValue(
      of({
        numberOfSheets: {
          test: dataSheets,
        },
      }),
    );
  });
  it('should have prepareDataForExport', () => {
    const dataSheets = [
      {
        testName: [
          { testName: 'Client', testId: 30 },
          { testName: 'Client', testId: 30 },
        ],
        testId: [
          { testName: 'Client', testId: 30 },
          { testName: 'Client', testId: 30 },
        ],
      },
      { testName: 'Client-1', testId: 35 },
      { testName: 'Client-1', testId: 35 },
    ];
    const sourceName = 'test';
    const preparedDataSheet = service.prepareDataForExport(dataSheets, sourceName);
    jest.spyOn(mockFunction, 'prepareDataForExport').mockReturnValue(
      of({
        numberOfSheets: {
          test: dataSheets,
        },
      }),
    );
    expect(preparedDataSheet).toHaveProperty(sourceName);
    expect(preparedDataSheet[sourceName]).toHaveLength(dataSheets.length);
  });
});