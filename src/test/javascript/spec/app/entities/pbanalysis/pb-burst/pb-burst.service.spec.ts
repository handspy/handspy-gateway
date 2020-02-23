import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PBBurstService } from 'app/entities/pbanalysis/pb-burst/pb-burst.service';
import { IPBBurst, PBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

describe('Service Tests', () => {
  describe('PBBurst Service', () => {
    let injector: TestBed;
    let service: PBBurstService;
    let httpMock: HttpTestingController;
    let elemDefault: IPBBurst;
    let expectedResult: IPBBurst | IPBBurst[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PBBurstService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PBBurst(0, 0, 0, 0, 0, 0, 0, 0, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PBBurst', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new PBBurst()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PBBurst', () => {
        const returnedFromService = Object.assign(
          {
            duration: 'BBBBBB',
            pauseDuration: 'BBBBBB',
            startX: 1,
            startY: 1,
            endX: 1,
            endY: 1,
            distance: 1,
            avgSpeed: 1,
            text: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PBBurst', () => {
        const returnedFromService = Object.assign(
          {
            duration: 'BBBBBB',
            pauseDuration: 'BBBBBB',
            startX: 1,
            startY: 1,
            endX: 1,
            endY: 1,
            distance: 1,
            avgSpeed: 1,
            text: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PBBurst', () => {
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
