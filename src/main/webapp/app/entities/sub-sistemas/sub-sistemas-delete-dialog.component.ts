import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubSistemas } from 'app/shared/model/sub-sistemas.model';
import { SubSistemasService } from './sub-sistemas.service';

@Component({
  templateUrl: './sub-sistemas-delete-dialog.component.html'
})
export class SubSistemasDeleteDialogComponent {
  subSistemas?: ISubSistemas;

  constructor(
    protected subSistemasService: SubSistemasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subSistemasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subSistemasListModification');
      this.activeModal.close();
    });
  }
}
