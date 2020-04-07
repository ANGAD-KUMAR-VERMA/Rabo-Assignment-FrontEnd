import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UserDetails } from '../model/user-details.model';
import { ConstantService } from './constant.service';
import { CSVParserService } from './csv-parser.service';



describe('CSVParserService', () => {
  let service: CSVParserService;
  let httpMock: HttpTestingController;


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
    const service: CSVParserService = TestBed.get(CSVParserService);
    expect(service).toBeTruthy();
  });

  it('when isValidCSVFile method is invoked with matching headers it should return true value', inject([ConstantService], (constantService: ConstantService) => {
    let headerArray: string[] = ["First name", "Sur Name", "Issue Count", "Date Of Birth"];
    service.isValidCSVFile(headerArray);
    expect(service.isValidCSVFile(headerArray)).toBeTruthy();

  }));
  it('when isValidCSVFile method is invoked with non-matching headers it should return false value', inject([ConstantService], (constantService: ConstantService) => {
    let headerArray: string[] = ["First name", "LastName", "Issue Count", "Date Of Birth"];
    service.isValidCSVFile(headerArray);
    expect(service.isValidCSVFile(headerArray)).toBeFalsy();;

  }));

  it('when isValidCSVFile method is invoked with different no of headers than expected then it should return false value', inject([ConstantService], (constantService: ConstantService) => {
    let headerArray: string[] = ["First name", "LastName", "Issue Count", "Date Of Birth", "Address"];
    service.isValidCSVFile(headerArray);
    expect(service.isValidCSVFile(headerArray)).toBeFalsy();
  }));

  it('when getHedaerArray() method is invoked it should return the the first row values', () => {
    let headerArray = ["First name", "Sur name", "Issue Count", "Date Of Birth"];
    let csvData: string = "First name,Sur name,Issue Count,Date Of Birth\nvinodh,ramamoorhty,1,1981-12-12\ndarel,jones,2,1997-11-12";
    let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    service.getHeaderArray(csvRecordsArray);
    expect(service.getHeaderArray(csvRecordsArray)).toEqual(headerArray);

  })

  it('when getDataRecordsArrayFromCSVFile()  method is invoked it should take the data froom csvRecords Array', () => {
    let csvData: string = "First name,Sur name,Issue Count,Date Of Birth\nvinodh,ramamoorhty,1,1981-12-12\ndarel,jones,2,1997-11-12";
    let headerLength = 4;
    let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    let csvRecord: UserDetails = new UserDetails();
    service.getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength);
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (<string>csvRecordsArray[i]).split(',');
      csvRecord.firstName = currentRecord[0].trim().replace(/['"]+/g, '');
    }
    expect(csvRecord.firstName).toEqual("darel");
  })

}); 