import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { DoenteHistMovimentosService } from './doente-hist-movimentos.service';
import { DoenteHistMovimentosDeleteDialogComponent } from './doente-hist-movimentos-delete-dialog.component';

@Component({
  selector: 'jhi-doente-hist-movimentos',
  templateUrl: './doente-hist-movimentos.component.html'
})
export class DoenteHistMovimentosComponent implements OnInit, OnDestroy {
  doenteHistMovimentos?: IDoenteHistMovimentos[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteHistMovimentosService: DoenteHistMovimentosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteHistMovimentosService
      .query()
      .subscribe((res: HttpResponse<IDoenteHistMovimentos[]>) => (this.doenteHistMovimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteHistMovimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteHistMovimentos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteHistMovimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteHistMovimentosListModification', () => this.loadAll());
  }

  delete(doenteHistMovimentos: IDoenteHistMovimentos): void {
    const modalRef = this.modalService.open(DoenteHistMovimentosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteHistMovimentos = doenteHistMovimentos;
  }
}
