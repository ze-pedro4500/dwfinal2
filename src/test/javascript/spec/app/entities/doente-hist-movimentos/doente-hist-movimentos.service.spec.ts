import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DoenteHistMovimentosService } from 'app/entities/doente-hist-movimentos/doente-hist-movimentos.service';
import { IDoenteHistMovimentos, DoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { Situacao } from 'app/shared/model/enumerations/situacao.model';

describe('Service Tests', () => {
  describe('DoenteHistMovimentos Service', () => {
    let injector: TestBed;
    let service: DoenteHistMovimentosService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoenteHistMovimentos;
    let expectedResult: IDoenteHistMovimentos | IDoenteHistMovimentos[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DoenteHistMovimentosService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DoenteHistMovimentos(0, currentDate, Situacao.StatusPRHD, Situacao.StatusPRHD, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DoenteHistMovimentos', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            data: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );

        service.create(new DoenteHistMovimentos()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DoenteHistMovimentos', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_FORMAT),
            situacao: 'BBBBBB',
            statusprevio: 'BBBBBB',
            causaMorte: 'BBBBBB',
            obs: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DoenteHistMovimentos', () => {
        const returnedFromService = Object.assign(
          {
            data: currentDate.format(DATE_FORMAT),
            situacao: 'BBBBBB',
            statusprevio: 'BBBBBB',
            causaMorte: 'BBBBBB',
            obs: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DoenteHistMovimentos', () => {
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
