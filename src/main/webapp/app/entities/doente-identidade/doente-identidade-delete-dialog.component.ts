import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoenteIdentidade } from 'app/shared/model/doente-identidade.model';
import { DoenteIdentidadeService } from './doente-identidade.service';

@Component({
  templateUrl: './doente-identidade-delete-dialog.component.html'
})
export class DoenteIdentidadeDeleteDialogComponent {
  doenteIdentidade?: IDoenteIdentidade;

  constructor(
    protected doenteIdentidadeService: DoenteIdentidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doenteIdentidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doenteIdentidadeListModification');
      this.activeModal.close();
    });
  }
}
