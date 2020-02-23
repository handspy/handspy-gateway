import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ParticipantService } from 'app/entities/project/participant/participant.service';
import { IParticipant, Participant } from 'app/shared/model/project/participant.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { HandwritingMeans } from 'app/shared/model/enumerations/handwriting-means.model';

describe('Service Tests', () => {
  describe('Participant Service', () => {
    let injector: TestBed;
    let service: ParticipantService;
    let httpMock: HttpTestingController;
    let elemDefault: IParticipant;
    let expectedResult: IParticipant | IParticipant[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ParticipantService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Participant(0, 'AAAAAAA', Gender.MALE, currentDate, HandwritingMeans.LEFT_HAND, 'AAAAAAA', 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            birthdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Participant', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthdate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        );

        service.create(new Participant()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Participant', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            gender: 'BBBBBB',
            birthdate: currentDate.format(DATE_FORMAT),
            handedness: 'BBBBBB',
            additionalInfo: 'BBBBBB',
            image: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Participant', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            gender: 'BBBBBB',
            birthdate: currentDate.format(DATE_FORMAT),
            handedness: 'BBBBBB',
            additionalInfo: 'BBBBBB',
            image: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Participant', () => {
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
