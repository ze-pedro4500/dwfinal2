import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICentroSaude } from 'app/shared/model/centro-saude.model';
import { CentroSaudeService } from './centro-saude.service';

@Component({
  templateUrl: './centro-saude-delete-dialog.component.html'
})
export class CentroSaudeDeleteDialogComponent {
  centroSaude?: ICentroSaude;

  constructor(
    protected centroSaudeService: CentroSaudeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.centroSaudeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('centroSaudeListModification');
      this.activeModal.close();
    });
  }
}
