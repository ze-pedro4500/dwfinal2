import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { AcesDetailComponent } from 'app/entities/aces/aces-detail.component';
import { Aces } from 'app/shared/model/aces.model';

describe('Component Tests', () => {
  describe('Aces Management Detail Component', () => {
    let comp: AcesDetailComponent;
    let fixture: ComponentFixture<AcesDetailComponent>;
    const route = ({ data: of({ aces: new Aces(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [AcesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AcesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AcesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load aces on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aces).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
