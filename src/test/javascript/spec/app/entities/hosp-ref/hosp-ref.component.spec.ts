import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Demografia2TestModule } from '../../../test.module';
import { HospRefComponent } from 'app/entities/hosp-ref/hosp-ref.component';
import { HospRefService } from 'app/entities/hosp-ref/hosp-ref.service';
import { HospRef } from 'app/shared/model/hosp-ref.model';

describe('Component Tests', () => {
  describe('HospRef Management Component', () => {
    let comp: HospRefComponent;
    let fixture: ComponentFixture<HospRefComponent>;
    let service: HospRefService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [HospRefComponent]
      })
        .overrideTemplate(HospRefComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HospRefComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HospRefService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HospRef(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.hospRefs && comp.hospRefs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
