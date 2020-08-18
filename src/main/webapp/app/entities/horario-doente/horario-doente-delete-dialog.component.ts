import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHorarioDoente } from 'app/shared/model/horario-doente.model';
import { HorarioDoenteService } from './horario-doente.service';

@Component({
  templateUrl: './horario-doente-delete-dialog.component.html'
})
export class HorarioDoenteDeleteDialogComponent {
  horarioDoente?: IHorarioDoente;

  constructor(
    protected horarioDoenteService: HorarioDoenteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horarioDoenteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('horarioDoenteListModification');
      this.activeModal.close();
    });
  }
}
