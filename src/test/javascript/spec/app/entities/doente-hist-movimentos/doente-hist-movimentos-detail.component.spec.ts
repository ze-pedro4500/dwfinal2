import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { DoenteHistMovimentosDetailComponent } from 'app/entities/doente-hist-movimentos/doente-hist-movimentos-detail.component';
import { DoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';

describe('Component Tests', () => {
  describe('DoenteHistMovimentos Management Detail Component', () => {
    let comp: DoenteHistMovimentosDetailComponent;
    let fixture: ComponentFixture<DoenteHistMovimentosDetailComponent>;
    const route = ({ data: of({ doenteHistMovimentos: new DoenteHistMovimentos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [DoenteHistMovimentosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoenteHistMovimentosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoenteHistMovimentosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load doenteHistMovimentos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doenteHistMovimentos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
