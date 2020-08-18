import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { DoenteContactosDetailComponent } from 'app/entities/doente-contactos/doente-contactos-detail.component';
import { DoenteContactos } from 'app/shared/model/doente-contactos.model';

describe('Component Tests', () => {
  describe('DoenteContactos Management Detail Component', () => {
    let comp: DoenteContactosDetailComponent;
    let fixture: ComponentFixture<DoenteContactosDetailComponent>;
    const route = ({ data: of({ doenteContactos: new DoenteContactos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [DoenteContactosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoenteContactosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoenteContactosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doenteContactos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doenteContactos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
