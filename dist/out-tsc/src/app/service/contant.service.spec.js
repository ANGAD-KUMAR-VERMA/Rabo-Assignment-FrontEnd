import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConstantService } from './constant.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
describe('CSVParserService', () => {
    let service;
    let httpMock;
    let subject = new Subject();
    beforeEach(() => TestBed.configureTestingModule({}));
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [HttpClient, ConstantService]
        });
        service = TestBed.get(ConstantService);
        httpMock = TestBed.get(HttpTestingController);
    });
    it('should be created', () => {
        const service = TestBed.get(ConstantService);
        expect(service).toBeTruthy();
    });
    // it('when isCSVFile method is invoked it should return true if the filename is ending with .csv',()=>{
    //     let file="issues.csv";
    //     service.isCSVFile(file);
    //     expect().toBeTruthy();
    // })
});
//# sourceMappingURL=contant.service.spec.js.map