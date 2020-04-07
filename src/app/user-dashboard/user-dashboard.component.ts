import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDetails } from '../model/user-details.model';
import { ConstantService } from '../service/constant.service';
import { CSVParserService } from '../service/csv-parser.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  @ViewChild('csvReader') csvReader: any;
  public userRecords: UserDetails[] = [];
  filteredUsers: UserDetails[];
  filterBy: FormControl = new FormControl('');
  filterValue: FormControl = new FormControl('');
  sortOrder: FormControl = new FormControl('');
  sortBy: FormControl = new FormControl('issueCount');

  constructor(private csvParserService: CSVParserService, private constantservice: ConstantService) {
  }
  validCsvFile: boolean = true;
  errorMsg: string;
  showErrorMessage: boolean;
  headerLength: number;

  ngOnInit() {
    this.headerLength = this.constantservice.noOfRows;
  }

  changeListener($event: any): void {
    this.showErrorMessage = false;
    this.validCsvFile = true;
    let text = [];
    let files = $event.srcElement.files;


    if (this.csvParserService.isCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        this.validateCsvFile(csvData);

      };
    }
    else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  validateCsvFile(csvData: any) {
    let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    if (csvRecordsArray.length <= 1) {
      this.errorMsg = "Added CSV File is Empty";
      this.showErrorMessage = true;
    }

    let headersRow = this.csvParserService.getHeaderArray(csvRecordsArray);
    if (!this.csvParserService.isValidCSVFile(headersRow)) {
      this.errorMsg = "Headers Doesn't Match";
      this.showErrorMessage = true;
      this.fileReset();

    }

    this.userRecords = this.csvParserService.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headerLength);
    if (this.userRecords.length != csvRecordsArray.length - 1) {
      this.validCsvFile = false;
      this.fileReset();
    }
    this.initializeSort();
    this.ngOnInit();
  }


  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.userRecords = [];
  }


  initializeSort() {
    this.sortOrder.valueChanges.subscribe((value: string) => {
      this.sort(value);
    });
    this.sortBy.valueChanges.subscribe(() => {
      this.sort(this.sortOrder.value);
    });

  }
  sort(order: string) {
    this.filteredUsers = this.userRecords;
    this.filteredUsers = this.filteredUsers.sort(this.productComparator)
    if (order === 'dsc') {
      this.filteredUsers = this.filteredUsers.reverse();
    }
  }
  compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  productComparator = (a: UserDetails, b: UserDetails) => {
    const param = this.sortBy.value;
    return this.compare(a[param], b[param]);
  }


}



