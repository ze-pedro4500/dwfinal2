import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DoenteSocioFamiliarService } from 'app/entities/doente-socio-familiar/doente-socio-familiar.service';
import { IDoenteSocioFamiliar, DoenteSocioFamiliar } from 'app/shared/model/doente-socio-familiar.model';
import { Habilitacoes } from 'app/shared/model/enumerations/habilitacoes.model';
import { EstCivil } from 'app/shared/model/enumerations/est-civil.model';

describe('Service Tests', () => {
  describe('DoenteSocioFamiliar Service', () => {
    let injector: TestBed;
    let service: DoenteSocioFamiliarService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoenteSocioFamiliar;
    let expectedResult: IDoenteSocioFamiliar | IDoenteSocioFamiliar[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DoenteSocioFamiliarService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new DoenteSocioFamiliar(
        0,
        Habilitacoes.Iletrado,
        EstCivil.Solteiro,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DoenteSocioFamiliar', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new DoenteSocioFamiliar()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DoenteSocioFamiliar', () => {
        const returnedFromService = Object.assign(
          {
            habilitacoes: 'BBBBBB',
            estCivil: 'BBBBBB',
            conjugeNome: 'BBBBBB',
            conjugeProf: 'BBBBBB',
            activTempLiv: 'BBBBBB',
            habitacaoObs: 'BBBBBB',
            grauConfortoObs: 'BBBBBB',
            respostaSocial: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DoenteSocioFamiliar', () => {
        const returnedFromService = Object.assign(
          {
            habilitacoes: 'BBBBBB',
            estCivil: 'BBBBBB',
            conjugeNome: 'BBBBBB',
            conjugeProf: 'BBBBBB',
            activTempLiv: 'BBBBBB',
            habitacaoObs: 'BBBBBB',
            grauConfortoObs: 'BBBBBB',
            respostaSocial: 'BBBBBB'
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

      it('should delete a DoenteSocioFamiliar', () => {
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
