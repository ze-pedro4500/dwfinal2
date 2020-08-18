import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { SitProfDetailComponent } from 'app/entities/sit-prof/sit-prof-detail.component';
import { SitProf } from 'app/shared/model/sit-prof.model';

describe('Component Tests', () => {
  describe('SitProf Management Detail Component', () => {
    let comp: SitProfDetailComponent;
    let fixture: ComponentFixture<SitProfDetailComponent>;
    const route = ({ data: of({ sitProf: new SitProf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [SitProfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SitProfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SitProfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sitProf on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sitProf).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
