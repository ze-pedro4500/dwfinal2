import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { DoenteDetailComponent } from 'app/entities/doente/doente-detail.component';
import { Doente } from 'app/shared/model/doente.model';

describe('Component Tests', () => {
  describe('Doente Management Detail Component', () => {
    let comp: DoenteDetailComponent;
    let fixture: ComponentFixture<DoenteDetailComponent>;
    const route = ({ data: of({ doente: new Doente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [DoenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
