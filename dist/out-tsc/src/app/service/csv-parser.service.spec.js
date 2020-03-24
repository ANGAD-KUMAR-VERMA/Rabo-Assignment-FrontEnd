import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CSVParserService } from './csv-parser.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConstantService } from './constant.service';
import { UserDetails } from '../model/user-details.model';
describe('CSVParserService', () => {
    let service;
    let httpMock;
    let subject = new Subject();
    beforeEach(() => TestBed.configureTestingModule({}));
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [HttpClient,
                {
                    provide: ConstantService,
                    useValue: {
                        noOfRows: 4,
                        requiredHeaderArray: ["First name", "Sur Name", "Issue Count", "Date Of Birth"],
                    }
                },
                CSVParserService,
                DatePipe,
            ]
        });
        service = TestBed.get(CSVParserService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service = TestBed.get(CSVParserService);
        expect(service).toBeTruthy();
    });
    // it('when isCSVFile method is invoked it should return true if the filename is ending with .csv',()=>{
    //     let file="issues.csv";
    //     service.isCSVFile(file);
    //     expect(service.isCSVFile(file)).toBeTruthy();
    // })
    it('when isValidCSVFile method is invoked with matching headers it should set the showError msg to false', inject([ConstantService], (constantService) => {
        let headerArray = ["First name", "Sur Name", "Issue Count", "Date Of Birth"];
        let matchingCount = 0;
        service.isValidCSVFile(headerArray);
        constantService.requiredHeaderArray.forEach((element1) => {
            headerArray.forEach((element2) => {
                if (element2.toLowerCase() === element1.toLowerCase()) {
                    matchingCount += 1;
                }
            });
        });
        expect(service.showErrorMsg).toBeFalsy();
    }));
    it('when isValidCSVFile method is invoked with non-matching headers it should set the showErrorMsg to true', inject([ConstantService], (constantService) => {
        let headerArray = ["First name", "LastName", "Issue Count", "Date Of Birth"];
        let matchingCount = 0;
        service.isValidCSVFile(headerArray);
        constantService.requiredHeaderArray.forEach((element1) => {
            headerArray.forEach((element2) => {
                if (element2.toLowerCase() === element1.toLowerCase()) {
                    matchingCount += 1;
                }
            });
        });
        expect(service.showErrorMsg).toBeTruthy();
    }));
    it('when isValidCSVFile method is invoked with different no of headers than expected then it should set the isValidCSv to false', inject([ConstantService], (constantService) => {
        let headerArray = ["First name", "LastName", "Issue Count", "Date Of Birth", "Address"];
        service.isValidCSVFile(headerArray);
        expect(service.isValidCSV).toBeFalsy();
        // setTimeout(()=>{
        // },3000)
        // expect(service.isValidCSV).toBeTruthy();
    }));
    it('when getHedaerArray() method is invoked it should return the the first row values', () => {
        // let csvRecordsArr:string[]=["First name","Sur Name","Issue Count","Date Of Birth"];
        // let recordsArr:Array<UserDetails>=[
        //   {firstName:"Vinodh",surName:"Ramamoorthy",issueCount:3,dateOfBirth:"1981-12-12"},
        //   {firstName:"Darel",surName:"Jones",issueCount:2,dateOfBirth:"1997-12-12"},
        // ]
        let headerArray = ["First name", "Sur name", "Issue Count", "Date Of Birth"];
        let csvData = "First name,Sur name,Issue Count,Date Of Birth\nvinodh,ramamoorhty,1,1981-12-12\ndarel,jones,2,1997-11-12";
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        service.getHeaderArray(csvRecordsArray);
        expect(service.getHeaderArray(csvRecordsArray)).toEqual(headerArray);
    });
    it('when getDataRecordsArrayFromCSVFile()  method is invoked', () => {
        let csvData = "First name,Sur name,Issue Count,Date Of Birth\nvinodh,ramamoorhty,1,1981-12-12\ndarel,jones,2,1997-11-12";
        let headerLength = 4;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let csvRecord = new UserDetails();
        service.getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength);
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let currentRecord = csvRecordsArray[i].split(',');
            csvRecord.firstName = currentRecord[0].trim().replace(/['"]+/g, '');
        }
        expect(csvRecord.firstName).toEqual("darel");
    });
    it('when getDataRecordsArrayFromCSVFile()  method is invoked with alphabets in IssueCount column it should throw error message', () => {
        let csvData = "First name,Sur name,Issue Count,Date Of Birth\nvinodh,ramamoorhty,dsfdsf,1981-12-12\ndarel,jones,2,1997-11-12";
        let headerLength = 4;
        let csvRecordsArray = csvData.split(/\r\n|\n/);
        let csvRecord = new UserDetails();
        service.getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength);
        for (let i = 1; i < csvRecordsArray.length; i++) {
            let currentRecord = csvRecordsArray[i].split(',');
            let countIssueColumnValue = currentRecord[2].trim();
            expect(service.showErrorMsg).toBeTruthy();
        }
    });
});
//# sourceMappingURL=csv-parser.service.spec.js.map