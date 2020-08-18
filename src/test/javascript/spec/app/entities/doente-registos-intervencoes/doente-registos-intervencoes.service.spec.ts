import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoenteRegistosIntervencoesService } from 'app/entities/doente-registos-intervencoes/doente-registos-intervencoes.service';
import { IDoenteRegistosIntervencoes, DoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';

describe('Service Tests', () => {
  describe('DoenteRegistosIntervencoes Service', () => {
    let injector: TestBed;
    let service: DoenteRegistosIntervencoesService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoenteRegistosIntervencoes;
    let expectedResult: IDoenteRegistosIntervencoes | IDoenteRegistosIntervencoes[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DoenteRegistosIntervencoesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DoenteRegistosIntervencoes(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DoenteRegistosIntervencoes', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DoenteRegistosIntervencoes()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DoenteRegistosIntervencoes', () => {
        const returnedFromService = Object.assign(
          {
            descr: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DoenteRegistosIntervencoes', () => {
        const returnedFromService = Object.assign(
          {
            descr: 'BBBBBB'
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

      it('should delete a DoenteRegistosIntervencoes', () => {
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
