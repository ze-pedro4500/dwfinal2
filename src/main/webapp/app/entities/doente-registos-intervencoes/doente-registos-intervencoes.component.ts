import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';
import { DoenteRegistosIntervencoesService } from './doente-registos-intervencoes.service';
import { DoenteRegistosIntervencoesDeleteDialogComponent } from './doente-registos-intervencoes-delete-dialog.component';

@Component({
  selector: 'jhi-doente-registos-intervencoes',
  templateUrl: './doente-registos-intervencoes.component.html'
})
export class DoenteRegistosIntervencoesComponent implements OnInit, OnDestroy {
  doenteRegistosIntervencoes?: IDoenteRegistosIntervencoes[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteRegistosIntervencoesService: DoenteRegistosIntervencoesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteRegistosIntervencoesService
      .query()
      .subscribe((res: HttpResponse<IDoenteRegistosIntervencoes[]>) => (this.doenteRegistosIntervencoes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteRegistosIntervencoes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteRegistosIntervencoes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteRegistosIntervencoes(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteRegistosIntervencoesListModification', () => this.loadAll());
  }

  delete(doenteRegistosIntervencoes: IDoenteRegistosIntervencoes): void {
    const modalRef = this.modalService.open(DoenteRegistosIntervencoesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteRegistosIntervencoes = doenteRegistosIntervencoes;
  }
}
