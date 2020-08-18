import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHabit } from 'app/shared/model/habit.model';
import { HabitService } from './habit.service';

@Component({
  templateUrl: './habit-delete-dialog.component.html'
})
export class HabitDeleteDialogComponent {
  habit?: IHabit;

  constructor(protected habitService: HabitService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.habitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('habitListModification');
      this.activeModal.close();
    });
  }
}
