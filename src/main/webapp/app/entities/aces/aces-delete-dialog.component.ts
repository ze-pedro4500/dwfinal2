import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAces } from 'app/shared/model/aces.model';
import { AcesService } from './aces.service';

@Component({
  templateUrl: './aces-delete-dialog.component.html'
})
export class AcesDeleteDialogComponent {
  aces?: IAces;

  constructor(protected acesService: AcesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.acesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('acesListModification');
      this.activeModal.close();
    });
  }
}
