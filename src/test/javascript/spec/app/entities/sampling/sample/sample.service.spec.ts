import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SampleService } from 'app/entities/sampling/sample/sample.service';
import { ISample, Sample } from 'app/shared/model/sampling/sample.model';

describe('Service Tests', () => {
  describe('Sample Service', () => {
    let injector: TestBed;
    let service: SampleService;
    let httpMock: HttpTestingController;
    let elemDefault: ISample;
    let expectedResult: ISample | ISample[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SampleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Sample(0, 0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Sample', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            timestamp: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate
          },
          returnedFromService
        );

        service.create(new Sample()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Sample', () => {
        const returnedFromService = Object.assign(
          {
            task: 1,
            participant: 1,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            language: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Sample', () => {
        const returnedFromService = Object.assign(
          {
            task: 1,
            participant: 1,
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            language: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            timestamp: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Sample', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
