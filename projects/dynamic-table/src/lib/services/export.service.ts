/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { AppLiteralConsts } from '../constant/consts';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  /**
   * Desc : Export data in excel/csv format
   * @param exportType : type of file which we are going to export
   * @param sourceData : target data to export
   * @param fileName : indicates the file name to be exported
   */
  public exportData(exportType: string, sourceData: any, fileName: string): void {
    const dataSheets: any = this.prepareDataForExport(sourceData, fileName);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    let worSheet: XLSX.WorkSheet;
    for (const key in dataSheets) {
      worSheet = XLSX.utils.json_to_sheet(dataSheets[key]);
      XLSX.utils.book_append_sheet(workBook, worSheet, key);
    }
    XLSX.writeFile(workBook, `${fileName}.${exportType}`);
  }
  /**
   * Desc : prepare data for exports
   * @param sourceData : target data to export
   * @param fileName : indicates the file name to be exported
   */
  public prepareDataForExport(sourceData: any, fileName: string): any {
    // eslint-disable-next-line prefer-const
    let numberOfSheets: any = {};
    for (const source of sourceData) {
      for (const [key, value] of Object.entries(source)) {
        if (typeof value == AppLiteralConsts.dataTypes.object && value != null) {
          if (Array.isArray(value)) {
            source[key] = JSON.stringify(value);
          } else {
            for (const [secondaryKey, secondaryValue] of Object.entries(value)) {
              source[secondaryKey] = secondaryValue;
            }
          }
        }
      }
      numberOfSheets[fileName] = sourceData;
    }
    return numberOfSheets;
  }
  /**
   * dec : export in pdf format
   */
  public exportPdf(values:any){
  }
  public exportArrayToExcel(arr: Array<any>, name: string) {
    const values = arr.map((item) => Object.values(item));
  }
}
