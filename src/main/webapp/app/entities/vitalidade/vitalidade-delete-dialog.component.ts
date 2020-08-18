import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVitalidade } from 'app/shared/model/vitalidade.model';
import { VitalidadeService } from './vitalidade.service';

@Component({
  templateUrl: './vitalidade-delete-dialog.component.html'
})
export class VitalidadeDeleteDialogComponent {
  vitalidade?: IVitalidade;

  constructor(
    protected vitalidadeService: VitalidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vitalidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vitalidadeListModification');
      this.activeModal.close();
    });
  }
}
