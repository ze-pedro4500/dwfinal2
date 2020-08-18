import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HorarioDoenteService } from 'app/entities/horario-doente/horario-doente.service';
import { IHorarioDoente, HorarioDoente } from 'app/shared/model/horario-doente.model';

describe('Service Tests', () => {
  describe('HorarioDoente Service', () => {
    let injector: TestBed;
    let service: HorarioDoenteService;
    let httpMock: HttpTestingController;
    let elemDefault: IHorarioDoente;
    let expectedResult: IHorarioDoente | IHorarioDoente[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(HorarioDoenteService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new HorarioDoente(0, 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a HorarioDoente', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new HorarioDoente()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a HorarioDoente', () => {
        const returnedFromService = Object.assign(
          {
            dia: 'BBBBBB',
            turno: 'BBBBBB',
            sala: 1,
            posto: 'BBBBBB',
            duracao: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of HorarioDoente', () => {
        const returnedFromService = Object.assign(
          {
            dia: 'BBBBBB',
            turno: 'BBBBBB',
            sala: 1,
            posto: 'BBBBBB',
            duracao: 1
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

      it('should delete a HorarioDoente', () => {
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
