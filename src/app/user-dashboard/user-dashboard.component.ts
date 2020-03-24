import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetails } from '../model/user-details.model';
import { FormControl } from '@angular/forms';
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

  constructor(private csvParserService:CSVParserService ){
  } 

  errorMsg:string;
  showErrorMessage:boolean;
  
  ngOnInit(){
    this.errorMsg=this.csvParserService.errorMsg;
    this.showErrorMessage=this.csvParserService.showErrorMsg;
  }
  
  changeListener($event:any):void{
     
    console.log($event);
    
    let text = [];    
    let files = $event.srcElement.files;  
    
  
    if (this.csvParserService.isCSVFile(files[0])) {  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        if(csvRecordsArray.length <= 1){
          this.errorMsg="Added CSV File is Empty";
          this.showErrorMessage=true; 
          setTimeout(()=>{
            this.showErrorMessage=false;
          },3000);
          return;
        }
  
        let headersRow = this.csvParserService.getHeaderArray(csvRecordsArray); 
        if(!this.csvParserService.isValidCSVFile(headersRow))
        {
          this.fileReset();
          this.errorMsg=this.csvParserService.errorMsg;
          this.showErrorMessage=this.csvParserService.showErrorMsg;
          setTimeout(()=>{
            this.showErrorMessage=false;
          },3000);
          return;
        }
        this.userRecords = this.csvParserService.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
      
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
isCSV(){
  return this.csvParserService.isValidCSV;
}


  initializeSort() {
    
    this.sortOrder.valueChanges.subscribe((value: string) => {
      console.log(value);
      
      this.sort(value);
    });
    this.sortBy.valueChanges.subscribe(() => {
      this.sort(this.sortOrder.value);
    });
   
  }
  sort(order: string) {
     this.filteredUsers=this.userRecords;
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
