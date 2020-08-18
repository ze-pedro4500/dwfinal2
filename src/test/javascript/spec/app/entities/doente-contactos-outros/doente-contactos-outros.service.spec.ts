import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoenteContactosOutrosService } from 'app/entities/doente-contactos-outros/doente-contactos-outros.service';
import { IDoenteContactosOutros, DoenteContactosOutros } from 'app/shared/model/doente-contactos-outros.model';

describe('Service Tests', () => {
  describe('DoenteContactosOutros Service', () => {
    let injector: TestBed;
    let service: DoenteContactosOutrosService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoenteContactosOutros;
    let expectedResult: IDoenteContactosOutros | IDoenteContactosOutros[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DoenteContactosOutrosService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DoenteContactosOutros(0, 'AAAAAAA', 'AAAAAAA', false, 0, 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DoenteContactosOutros', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DoenteContactosOutros()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DoenteContactosOutros', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            parentesco: 'BBBBBB',
            coabita: true,
            telef: 1,
            ocupacao: 'BBBBBB',
            obs: 'BBBBBB',
            preferencial: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DoenteContactosOutros', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            parentesco: 'BBBBBB',
            coabita: true,
            telef: 1,
            ocupacao: 'BBBBBB',
            obs: 'BBBBBB',
            preferencial: true
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

      it('should delete a DoenteContactosOutros', () => {
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
