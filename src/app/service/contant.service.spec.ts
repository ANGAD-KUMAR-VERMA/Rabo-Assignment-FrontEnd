import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConstantService } from './constant.service';



describe('CSVParserService', () => {
  let service: ConstantService;
  let httpMock: HttpTestingController;


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
    const service: ConstantService = TestBed.get(ConstantService);
    expect(service).toBeTruthy();
  });
});