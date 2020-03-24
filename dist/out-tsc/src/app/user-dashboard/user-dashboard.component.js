import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
let UserDashboardComponent = class UserDashboardComponent {
    constructor(csvParserService) {
        this.csvParserService = csvParserService;
        this.userRecords = [];
        this.filterBy = new FormControl('');
        this.filterValue = new FormControl('');
        this.sortOrder = new FormControl('');
        this.sortBy = new FormControl('issueCount');
        this.productComparator = (a, b) => {
            const param = this.sortBy.value;
            return this.compare(a[param], b[param]);
        };
    }
    ngOnInit() {
        this.errorMsg = this.csvParserService.errorMsg;
        this.showErrorMessage = this.csvParserService.showErrorMsg;
    }
    changeListener($event) {
        let text = [];
        let files = $event.srcElement.files;
        if (this.csvParserService.isCSVFile(files[0])) {
            let input = $event.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);
            reader.onload = () => {
                let csvData = reader.result;
                let csvRecordsArray = csvData.split(/\r\n|\n/);
                if (csvRecordsArray.length <= 1) {
                    this.errorMsg = "Added CSV File is Empty";
                    this.showErrorMessage = true;
                    setTimeout(() => {
                        this.showErrorMessage = false;
                    }, 3000);
                    return;
                }
                let headersRow = this.csvParserService.getHeaderArray(csvRecordsArray);
                if (!this.csvParserService.isValidCSVFile(headersRow)) {
                    this.fileReset();
                    this.errorMsg = this.csvParserService.errorMsg;
                    this.showErrorMessage = this.csvParserService.showErrorMsg;
                    setTimeout(() => {
                        this.showErrorMessage = false;
                    }, 3000);
                    return;
                }
                this.userRecords = this.csvParserService.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                // this.errorMsg=this.csvParserService.errorMsg;
                this.initializeSort();
                this.ngOnInit();
            };
        }
        else {
            alert("Please import valid .csv file.");
            this.fileReset();
        }
    }
    fileReset() {
        this.csvReader.nativeElement.value = "";
        this.userRecords = [];
    }
    isCSV() {
        return this.csvParserService.isValidCSV;
    }
    initializeSort() {
        this.sortOrder.valueChanges.subscribe((value) => {
            this.sort(value);
        });
        this.sortBy.valueChanges.subscribe(() => {
            this.sort(this.sortOrder.value);
        });
    }
    sort(order) {
        this.filteredUsers = this.userRecords;
        this.filteredUsers = this.filteredUsers.sort(this.productComparator);
        if (order === 'dsc') {
            this.filteredUsers = this.filteredUsers.reverse();
        }
    }
    compare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
};
__decorate([
    ViewChild('csvReader')
], UserDashboardComponent.prototype, "csvReader", void 0);
UserDashboardComponent = __decorate([
    Component({
        selector: 'app-user-dashboard',
        templateUrl: './user-dashboard.component.html',
        styleUrls: ['./user-dashboard.component.scss']
    })
], UserDashboardComponent);
export { UserDashboardComponent };
//# sourceMappingURL=user-dashboard.component.js.map