import { async, TestBed } from '@angular/core/testing';
import { UserDashboardComponent } from './user-dashboard.component';
import { CSVParserService } from '../service/csv-parser.service';
import { FormControl } from '@angular/forms';
describe('UserDashboardComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserDashboardComponent],
            providers: [
                {
                    provide: CSVParserService,
                    useValue: {}
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
    });
    it('when initializeSort() method is invoked it should sort the values in given oredr', () => {
        let sortOrder = new FormControl('asc');
    });
    it('when productcomparator() method is invoked it should return the lar', () => {
        let user1 = { firstName: "Vinodh", surName: "RamaMoorthy", issueCount: 1, dateOfBirth: "1981-12-12" };
        let user2 = { firstName: "Darel", surName: "Jones", issueCount: 3, dateOfBirth: "1997-12-12" };
        let sortBy = new FormControl('issueCount');
        component.productComparator(user1, user2);
        expect(component.productComparator(user1, user2)).to;
    });
});
//# sourceMappingURL=user-dashboard.component.spec.js.map