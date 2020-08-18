import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { DoenteContactosOutrosDetailComponent } from 'app/entities/doente-contactos-outros/doente-contactos-outros-detail.component';
import { DoenteContactosOutros } from 'app/shared/model/doente-contactos-outros.model';

describe('Component Tests', () => {
  describe('DoenteContactosOutros Management Detail Component', () => {
    let comp: DoenteContactosOutrosDetailComponent;
    let fixture: ComponentFixture<DoenteContactosOutrosDetailComponent>;
    const route = ({ data: of({ doenteContactosOutros: new DoenteContactosOutros(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [DoenteContactosOutrosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoenteContactosOutrosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoenteContactosOutrosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doenteContactosOutros on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doenteContactosOutros).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
