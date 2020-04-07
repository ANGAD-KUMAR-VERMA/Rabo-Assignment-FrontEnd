import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ConstantService } from './constant.service';

class GenericUserDetailsModel<T> {
  firstName: T;
  surName: T;
  dateOfBirth: T;
  issueCount: T;
}


@Injectable({
  providedIn: 'root'
})
export class CSVParserService {
  constructor(private cons: ConstantService, private datePipe: DatePipe) {
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    var letters = /^[0-9]+$/;
    let dateObj: string;
    csvRecordsArray.forEach((element) => {
      let curruntRecord = (<string>element).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: GenericUserDetailsModel<string> = new GenericUserDetailsModel();
        csvRecord.firstName = curruntRecord[0].trim().replace(/['"]+/g, '');
        csvRecord.surName = curruntRecord[1].trim().replace(/['"]+/g, '');
        let countIssueColumnValue = curruntRecord[2].trim();
        if (this.isValidIssueCountValue(countIssueColumnValue)) {
          csvRecord.issueCount = countIssueColumnValue;
        }
        else {
          return;
        }
        dateObj = curruntRecord[3].trim().replace(/['"]+/g, '');
        csvRecord.dateOfBirth = this.datePipe.transform(new Date(curruntRecord[3].trim().replace(/['"]+/g, '')), "MMM dd, yyyy");
        csvArr.push(csvRecord);
      }
    })

    return csvArr;
  }

  isValidIssueCountValue(issuecount: any) {
    var letters = /^[0-9]+$/;
    if (issuecount.match(letters)) {
      return true;
    }
    else {

      return false;
    }
  }

  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  isValidCSVFile(headerArray: any) {
    let matchingCount: number = 0;
    if (headerArray.length === this.cons.noOfRows) {
      this.cons.requiredHeaderArray.forEach((element1) => {
        headerArray.forEach((element2) => {
          if (element2.toLowerCase().replace(/['"]+/g, '') === element1.toLowerCase()) {
            matchingCount += 1;
          }
        })
      })
      if (matchingCount != this.cons.noOfRows) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    headers.forEach((element) => {
      headerArray.push(element);
    })
    return headerArray;
  }

}