import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { UserDetails } from '../model/user-details.model';
import { ConstantService } from '../service/constant.service';
import { CSVParserService } from '../service/csv-parser.service';
import { UserDashboardComponent } from './user-dashboard.component';


describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      providers: [
        {
          provide: CSVParserService,
          useValue: {
            isValidCSV: true,
            showErrorMessage: true,
            getDataRecordsArrayFromCSVFile: () => {

              let headerArray = ["First name", "Sur name", "Issue Count", "Date Of Birth"];
              return headerArray;
            },
            getHeaderArray: () => {
              let headerArray: string[] = ["First name", "LastName", "Issue Count", "Date Of Birth"];
            },
            isValidCSVFile: () => {

            }
          }
        },
        {
          provide: ConstantService,
          useValue: {
            noOfRows: 4,
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when compare(a,b) method is invoked it should return the largest among the two', () => {
    let a = 10;
    let b = 5;
    component.compare(a, b);
    expect(component.compare(a, b)).toEqual(1);
  })

  it('when productcomparator() method is invoked it should return the lar', () => {
    let user1: UserDetails = { firstName: "Vinodh", surName: "RamaMoorthy", issueCount: 1, dateOfBirth: "1981-12-12" };
    let user2: UserDetails = { firstName: "Darel", surName: "Jones", issueCount: 3, dateOfBirth: "1997-12-12" };
    let sortBy: FormControl = new FormControl('issueCount');
    component.productComparator(user1, user2);
    expect(component.productComparator(user1, user2)).toEqual(-1);
  })

  it('when sort() method is invoked with order=asc it should arange the records in ascending order', () => {
    component.userRecords = [
      { firstName: "Vinodh", surName: "Ramamoorthy", issueCount: 3, dateOfBirth: "1981-12-12" },
      { firstName: "Darel", surName: "Jones", issueCount: 2, dateOfBirth: "1997-12-12" },
    ]
    let resultantUsers: UserDetails[] = [
      { firstName: "Darel", surName: "Jones", issueCount: 2, dateOfBirth: "1997-12-12" },
      { firstName: "Vinodh", surName: "Ramamoorthy", issueCount: 3, dateOfBirth: "1981-12-12" },
    ]
    component.sort("asc");
    expect(component.filteredUsers).toEqual(resultantUsers);

  })

  it('when sort() method is invoked with order=dsc it should arange the records in descending order', () => {
    component.userRecords = [
      { firstName: "Vinodh", surName: "Ramamoorthy", issueCount: 3, dateOfBirth: "1981-12-12" },
      { firstName: "Darel", surName: "Jones", issueCount: 2, dateOfBirth: "1997-12-12" },
    ]
    let resultantUsers: UserDetails[] = [
      { firstName: "Vinodh", surName: "Ramamoorthy", issueCount: 3, dateOfBirth: "1981-12-12" },
      { firstName: "Darel", surName: "Jones", issueCount: 2, dateOfBirth: "1997-12-12" },
    ]
    component.sort("dsc");
    expect(component.filteredUsers).toEqual(resultantUsers);
  })


  it('when fileReset() method is invoked it should reset the values to empty', () => {
    component.userRecords = [
      { firstName: "Vinodh", surName: "Ramamoorthy", issueCount: 3, dateOfBirth: "1981-12-12" },
      { firstName: "Darel", surName: "Jones", issueCount: 2, dateOfBirth: "1997-12-12" },
    ];
    component.fileReset();
    expect(component.userRecords).toEqual([]);
  })

  it('when validateCsvFile() is invoked it should call initializesort method ', inject([CSVParserService], (csvParserService: CSVParserService) => {
    spyOn(component, "fileReset")
    let csvData: string = "";
    component.validateCsvFile(csvData);
    expect(component.fileReset).toHaveBeenCalled();
  }))

});
