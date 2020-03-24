import { __decorate } from "tslib";
import { UserDetails } from '../model/user-details.model';
import { Injectable } from '@angular/core';
let CSVParserService = class CSVParserService {
    constructor(cons, datePipe) {
        this.cons = cons;
        this.datePipe = datePipe;
        this.isValidCSV = true;
        this.showErrorMsg = false;
    }
    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength) {
        let csvArr = [];
        var letters = /^[0-9]+$/;
        let dateObj;
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let curruntRecord = csvRecordsArray[i].split(',');
            if (curruntRecord.length == headerLength) {
                let csvRecord = new UserDetails();
                csvRecord.firstName = curruntRecord[0].trim().replace(/['"]+/g, '');
                csvRecord.surName = curruntRecord[1].trim().replace(/['"]+/g, '');
                let countIssueColumnValue = curruntRecord[2].trim();
                if (!countIssueColumnValue.match(letters)) {
                    this.errorMsg = " Issue Count Field Can Not Contain Alphabets and Special Characters ";
                    this.showErrorMsg = true;
                    setTimeout(() => {
                        this.showErrorMsg = false;
                    }, 3000);
                    return;
                }
                else {
                    csvRecord.issueCount = parseInt(countIssueColumnValue);
                }
                dateObj = curruntRecord[3].trim().replace(/['"]+/g, '');
                //  if(new Date(dateObj)){
                //      this.errorMsg="CSV File Contains Invalid Dates"
                //      this.showErrorMsg=true;
                //      setTimeout(()=>{
                //        this.showErrorMsg=false;
                //      },3000);
                //  }
                // this.checkForValidDates(dateObj);
                csvRecord.dateOfBirth = this.datePipe.transform(new Date(curruntRecord[3].trim().replace(/['"]+/g, '')), "MMM dd, yyyy");
                csvArr.push(csvRecord);
            }
        }
        return csvArr;
    }
    isCSVFile(file) {
        return file.name.endsWith(".csv");
    }
    isValidCSVFile(headerArray) {
        let matchingCount = 0;
        if (headerArray.length === this.cons.noOfRows) {
            this.cons.requiredHeaderArray.forEach((element1) => {
                headerArray.forEach((element2) => {
                    console.log(element1.toLowerCase() + " and " + element2.toLowerCase().replace(/['"]+/g, ''));
                    if (element2.toLowerCase().replace(/['"]+/g, '') === element1.toLowerCase()) {
                        matchingCount += 1;
                    }
                });
            });
            if (matchingCount != this.cons.noOfRows) {
                this.errorMsg = "Headers Does Not Match";
                this.showErrorMsg = true;
            }
            //this.isValidCSV=!this.showErrorMsg;
            return !this.showErrorMsg;
        }
        else {
            this.isValidCSV = false;
            setTimeout(() => {
                this.isValidCSV = true;
            }, 3000);
        }
    }
    getHeaderArray(csvRecordsArr) {
        let headers = csvRecordsArr[0].split(',');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }
};
CSVParserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CSVParserService);
export { CSVParserService };
//# sourceMappingURL=csv-parser.service.js.map