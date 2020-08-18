import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHospRef } from 'app/shared/model/hosp-ref.model';
import { HospRefService } from './hosp-ref.service';

@Component({
  templateUrl: './hosp-ref-delete-dialog.component.html'
})
export class HospRefDeleteDialogComponent {
  hospRef?: IHospRef;

  constructor(protected hospRefService: HospRefService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hospRefService.delete(id).subscribe(() => {
      this.eventManager.broadcast('hospRefListModification');
      this.activeModal.close();
    });
  }
}
