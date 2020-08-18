import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISitProf } from 'app/shared/model/sit-prof.model';
import { SitProfService } from './sit-prof.service';

@Component({
  templateUrl: './sit-prof-delete-dialog.component.html'
})
export class SitProfDeleteDialogComponent {
  sitProf?: ISitProf;

  constructor(protected sitProfService: SitProfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sitProfService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sitProfListModification');
      this.activeModal.close();
    });
  }
}
