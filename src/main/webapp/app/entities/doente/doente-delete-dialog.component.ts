import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from './doente.service';

@Component({
  templateUrl: './doente-delete-dialog.component.html'
})
export class DoenteDeleteDialogComponent {
  doente?: IDoente;

  constructor(protected doenteService: DoenteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doenteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doenteListModification');
      this.activeModal.close();
    });
  }
}
