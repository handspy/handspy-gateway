import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DotService } from 'app/entities/sampling/dot/dot.service';
import { IDot, Dot } from 'app/shared/model/sampling/dot.model';
import { DotType } from 'app/shared/model/enumerations/dot-type.model';

describe('Service Tests', () => {
  describe('Dot Service', () => {
    let injector: TestBed;
    let service: DotService;
    let httpMock: HttpTestingController;
    let elemDefault: IDot;
    let expectedResult: IDot | IDot[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DotService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Dot(0, currentDate, 0, 0, DotType.DOWN, 0, 0, 0, 0);
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

      it('should create a Dot', () => {
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

        service.create(new Dot()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Dot', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            x: 1,
            y: 1,
            type: 'BBBBBB',
            tiltX: 1,
            tiltY: 1,
            twist: 1,
            pressure: 1
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

      it('should return a list of Dot', () => {
        const returnedFromService = Object.assign(
          {
            timestamp: currentDate.format(DATE_TIME_FORMAT),
            x: 1,
            y: 1,
            type: 'BBBBBB',
            tiltX: 1,
            tiltY: 1,
            twist: 1,
            pressure: 1
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

      it('should delete a Dot', () => {
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
