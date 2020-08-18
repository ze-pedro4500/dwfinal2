import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHorarioDoente } from 'app/shared/model/horario-doente.model';
import { HorarioDoenteService } from './horario-doente.service';
import { HorarioDoenteDeleteDialogComponent } from './horario-doente-delete-dialog.component';

@Component({
  selector: 'jhi-horario-doente',
  templateUrl: './horario-doente.component.html'
})
export class HorarioDoenteComponent implements OnInit, OnDestroy {
  horarioDoentes?: IHorarioDoente[];
  eventSubscriber?: Subscription;

  constructor(
    protected horarioDoenteService: HorarioDoenteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.horarioDoenteService.query().subscribe((res: HttpResponse<IHorarioDoente[]>) => (this.horarioDoentes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHorarioDoentes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHorarioDoente): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHorarioDoentes(): void {
    this.eventSubscriber = this.eventManager.subscribe('horarioDoenteListModification', () => this.loadAll());
  }

  delete(horarioDoente: IHorarioDoente): void {
    const modalRef = this.modalService.open(HorarioDoenteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.horarioDoente = horarioDoente;
  }
}
