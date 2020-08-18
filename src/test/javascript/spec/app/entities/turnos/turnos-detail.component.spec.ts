import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { TurnosDetailComponent } from 'app/entities/turnos/turnos-detail.component';
import { Turnos } from 'app/shared/model/turnos.model';

describe('Component Tests', () => {
  describe('Turnos Management Detail Component', () => {
    let comp: TurnosDetailComponent;
    let fixture: ComponentFixture<TurnosDetailComponent>;
    const route = ({ data: of({ turnos: new Turnos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [TurnosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TurnosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TurnosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load turnos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.turnos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
