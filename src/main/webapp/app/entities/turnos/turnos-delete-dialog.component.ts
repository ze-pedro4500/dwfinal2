import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITurnos } from 'app/shared/model/turnos.model';
import { TurnosService } from './turnos.service';

@Component({
  templateUrl: './turnos-delete-dialog.component.html'
})
export class TurnosDeleteDialogComponent {
  turnos?: ITurnos;

  constructor(protected turnosService: TurnosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.turnosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('turnosListModification');
      this.activeModal.close();
    });
  }
}
