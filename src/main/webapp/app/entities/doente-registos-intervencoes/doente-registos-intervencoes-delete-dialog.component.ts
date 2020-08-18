import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';
import { DoenteRegistosIntervencoesService } from './doente-registos-intervencoes.service';

@Component({
  templateUrl: './doente-registos-intervencoes-delete-dialog.component.html'
})
export class DoenteRegistosIntervencoesDeleteDialogComponent {
  doenteRegistosIntervencoes?: IDoenteRegistosIntervencoes;

  constructor(
    protected doenteRegistosIntervencoesService: DoenteRegistosIntervencoesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doenteRegistosIntervencoesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doenteRegistosIntervencoesListModification');
      this.activeModal.close();
    });
  }
}
