import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Demografia2TestModule } from '../../../test.module';
import { AcesComponent } from 'app/entities/aces/aces.component';
import { AcesService } from 'app/entities/aces/aces.service';
import { Aces } from 'app/shared/model/aces.model';

describe('Component Tests', () => {
  describe('Aces Management Component', () => {
    let comp: AcesComponent;
    let fixture: ComponentFixture<AcesComponent>;
    let service: AcesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [AcesComponent]
      })
        .overrideTemplate(AcesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Aces(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aces && comp.aces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
