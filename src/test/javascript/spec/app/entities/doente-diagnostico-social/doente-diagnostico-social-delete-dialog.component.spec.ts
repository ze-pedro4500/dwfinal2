import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Demografia2TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { DoenteDiagnosticoSocialDeleteDialogComponent } from 'app/entities/doente-diagnostico-social/doente-diagnostico-social-delete-dialog.component';
import { DoenteDiagnosticoSocialService } from 'app/entities/doente-diagnostico-social/doente-diagnostico-social.service';

describe('Component Tests', () => {
  describe('DoenteDiagnosticoSocial Management Delete Component', () => {
    let comp: DoenteDiagnosticoSocialDeleteDialogComponent;
    let fixture: ComponentFixture<DoenteDiagnosticoSocialDeleteDialogComponent>;
    let service: DoenteDiagnosticoSocialService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Demografia2TestModule],
        declarations: [DoenteDiagnosticoSocialDeleteDialogComponent]
      })
        .overrideTemplate(DoenteDiagnosticoSocialDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoenteDiagnosticoSocialDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoenteDiagnosticoSocialService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
