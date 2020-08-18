import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { HospRefDetailComponent } from 'app/entities/hosp-ref/hosp-ref-detail.component';
import { HospRef } from 'app/shared/model/hosp-ref.model';

describe('Component Tests', () => {
  describe('HospRef Management Detail Component', () => {
    let comp: HospRefDetailComponent;
    let fixture: ComponentFixture<HospRefDetailComponent>;
    const route = ({ data: of({ hospRef: new HospRef(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [HospRefDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HospRefDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HospRefDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load hospRef on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.hospRef).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
