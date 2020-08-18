import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Demografia2TestModule } from '../../../test.module';
import { AcesUpdateComponent } from 'app/entities/aces/aces-update.component';
import { AcesService } from 'app/entities/aces/aces.service';
import { Aces } from 'app/shared/model/aces.model';

describe('Component Tests', () => {
  describe('Aces Management Update Component', () => {
    let comp: AcesUpdateComponent;
    let fixture: ComponentFixture<AcesUpdateComponent>;
    let service: AcesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [AcesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AcesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aces(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aces();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
