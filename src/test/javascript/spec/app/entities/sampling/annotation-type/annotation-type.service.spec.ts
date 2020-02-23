import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnnotationTypeService } from 'app/entities/sampling/annotation-type/annotation-type.service';
import { IAnnotationType, AnnotationType } from 'app/shared/model/sampling/annotation-type.model';

describe('Service Tests', () => {
  describe('AnnotationType Service', () => {
    let injector: TestBed;
    let service: AnnotationTypeService;
    let httpMock: HttpTestingController;
    let elemDefault: IAnnotationType;
    let expectedResult: IAnnotationType | IAnnotationType[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AnnotationTypeService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AnnotationType(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AnnotationType', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AnnotationType()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AnnotationType', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            label: 'BBBBBB',
            description: 'BBBBBB',
            emotional: true,
            weight: 1,
            color: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AnnotationType', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            label: 'BBBBBB',
            description: 'BBBBBB',
            emotional: true,
            weight: 1,
            color: 'BBBBBB'
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

      it('should delete a AnnotationType', () => {
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
