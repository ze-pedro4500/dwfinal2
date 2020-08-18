import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { DoenteHistMovimentosService } from './doente-hist-movimentos.service';

@Component({
  templateUrl: './doente-hist-movimentos-delete-dialog.component.html'
})
export class DoenteHistMovimentosDeleteDialogComponent {
  doenteHistMovimentos?: IDoenteHistMovimentos;

  constructor(
    protected doenteHistMovimentosService: DoenteHistMovimentosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doenteHistMovimentosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doenteHistMovimentosListModification');
      this.activeModal.close();
    });
  }
}
