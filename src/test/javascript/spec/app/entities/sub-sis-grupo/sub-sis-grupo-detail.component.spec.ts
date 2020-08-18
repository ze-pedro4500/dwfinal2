import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { SubSisGrupoDetailComponent } from 'app/entities/sub-sis-grupo/sub-sis-grupo-detail.component';
import { SubSisGrupo } from 'app/shared/model/sub-sis-grupo.model';

describe('Component Tests', () => {
  describe('SubSisGrupo Management Detail Component', () => {
    let comp: SubSisGrupoDetailComponent;
    let fixture: ComponentFixture<SubSisGrupoDetailComponent>;
    const route = ({ data: of({ subSisGrupo: new SubSisGrupo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [SubSisGrupoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubSisGrupoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubSisGrupoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subSisGrupo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subSisGrupo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
