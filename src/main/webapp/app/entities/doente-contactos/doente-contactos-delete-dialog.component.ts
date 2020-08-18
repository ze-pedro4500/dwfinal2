import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoenteContactos } from 'app/shared/model/doente-contactos.model';
import { DoenteContactosService } from './doente-contactos.service';

@Component({
  templateUrl: './doente-contactos-delete-dialog.component.html'
})
export class DoenteContactosDeleteDialogComponent {
  doenteContactos?: IDoenteContactos;

  constructor(
    protected doenteContactosService: DoenteContactosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.doenteContactosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('doenteContactosListModification');
      this.activeModal.close();
    });
  }
}
