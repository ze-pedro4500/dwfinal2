import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHabit } from 'app/shared/model/habit.model';
import { HabitService } from './habit.service';
import { HabitDeleteDialogComponent } from './habit-delete-dialog.component';

@Component({
  selector: 'jhi-habit',
  templateUrl: './habit.component.html'
})
export class HabitComponent implements OnInit, OnDestroy {
  habits?: IHabit[];
  eventSubscriber?: Subscription;

  constructor(protected habitService: HabitService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.habitService.query().subscribe((res: HttpResponse<IHabit[]>) => (this.habits = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHabits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHabit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHabits(): void {
    this.eventSubscriber = this.eventManager.subscribe('habitListModification', () => this.loadAll());
  }

  delete(habit: IHabit): void {
    const modalRef = this.modalService.open(HabitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.habit = habit;
  }
}
