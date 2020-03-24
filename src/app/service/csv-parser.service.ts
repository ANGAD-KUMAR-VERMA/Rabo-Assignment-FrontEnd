import { UserDetails } from '../model/user-details.model';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { ConstantService } from './constant.service';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CSVParserService{
    
    isValidCSV:boolean=true;
    errorMsg: string ;
    showErrorMsg:boolean=false;

    constructor(private cons:ConstantService,private datePipe:DatePipe){

    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
        let csvArr = [];  
        var letters = /^[0-9]+$/;
        let dateObj:string;

        for (let i = 1; i < csvRecordsArray.length; i++) {  
          let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
          if (curruntRecord.length == headerLength) {  
            let csvRecord: UserDetails = new UserDetails();  
            csvRecord.firstName = curruntRecord[0].trim().replace(/['"]+/g, '');  
            csvRecord.surName = curruntRecord[1].trim().replace(/['"]+/g, ''); 
            let countIssueColumnValue=curruntRecord[2].trim();
             if(!countIssueColumnValue.match(letters)){
                  this.errorMsg= " Issue Count Field Can Not Contain Alphabets and Special Characters ";
                  this.showErrorMsg=true;
                  setTimeout(()=>{
                     this.showErrorMsg=false;
                  },3000);
                  return;
                  
             }
             else{
                 csvRecord.issueCount = parseInt(countIssueColumnValue);
             }
             dateObj=curruntRecord[3].trim().replace(/['"]+/g, '');
            csvRecord.dateOfBirth = this.datePipe.transform(new Date(curruntRecord[3].trim().replace(/['"]+/g, '')),"MMM dd, yyyy");  
            csvArr.push(csvRecord);  
          }  
        }  
        return csvArr;  
      }  
      
      isCSVFile(file: any) {  
        return file.name.endsWith(".csv");  
      }  
    
      isValidCSVFile(headerArray:any){
        let matchingCount:number=0;
         if(headerArray.length === this.cons.noOfRows) 
         {

           this.cons.requiredHeaderArray.forEach((element1)=>{
            headerArray.forEach((element2)=>{
              if(element2.toLowerCase().replace(/['"]+/g, '') === element1.toLowerCase()){
                matchingCount+=1;
              }
            })
          })
          if(matchingCount != this.cons.noOfRows){
            this.errorMsg="Headers Does Not Match";
            this.showErrorMsg=true;
            
          }
            return !this.showErrorMsg;
         }
         else{
           this.isValidCSV=false;
          setTimeout(()=>{    
            this.isValidCSV=true;
       }, 3000);
         }

      
      }
      
      getHeaderArray(csvRecordsArr: any) {  
        let headers = (<string>csvRecordsArr[0]).split(',');  
        let headerArray = [];  
        for (let j = 0; j < headers.length; j++) {  
          headerArray.push(headers[j]);  
        }  
        return headerArray;  
      } 

      // checkForValidDates(dateObj:any){
         
      // }
      
}