import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { HorarioDoenteDetailComponent } from 'app/entities/horario-doente/horario-doente-detail.component';
import { HorarioDoente } from 'app/shared/model/horario-doente.model';

describe('Component Tests', () => {
  describe('HorarioDoente Management Detail Component', () => {
    let comp: HorarioDoenteDetailComponent;
    let fixture: ComponentFixture<HorarioDoenteDetailComponent>;
    const route = ({ data: of({ horarioDoente: new HorarioDoente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [HorarioDoenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HorarioDoenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HorarioDoenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load horarioDoente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.horarioDoente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
