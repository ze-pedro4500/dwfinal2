import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITurnos } from 'app/shared/model/turnos.model';
import { TurnosService } from './turnos.service';
import { TurnosDeleteDialogComponent } from './turnos-delete-dialog.component';

@Component({
  selector: 'jhi-turnos',
  templateUrl: './turnos.component.html'
})
export class TurnosComponent implements OnInit, OnDestroy {
  turnos?: ITurnos[];
  eventSubscriber?: Subscription;

  constructor(protected turnosService: TurnosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.turnosService.query().subscribe((res: HttpResponse<ITurnos[]>) => (this.turnos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTurnos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITurnos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTurnos(): void {
    this.eventSubscriber = this.eventManager.subscribe('turnosListModification', () => this.loadAll());
  }

  delete(turnos: ITurnos): void {
    const modalRef = this.modalService.open(TurnosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.turnos = turnos;
  }
}
