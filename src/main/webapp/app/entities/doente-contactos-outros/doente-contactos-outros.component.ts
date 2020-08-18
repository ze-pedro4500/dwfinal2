import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteContactosOutros } from 'app/shared/model/doente-contactos-outros.model';
import { DoenteContactosOutrosService } from './doente-contactos-outros.service';
import { DoenteContactosOutrosDeleteDialogComponent } from './doente-contactos-outros-delete-dialog.component';

@Component({
  selector: 'jhi-doente-contactos-outros',
  templateUrl: './doente-contactos-outros.component.html'
})
export class DoenteContactosOutrosComponent implements OnInit, OnDestroy {
  doenteContactosOutros?: IDoenteContactosOutros[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteContactosOutrosService: DoenteContactosOutrosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteContactosOutrosService
      .query()
      .subscribe((res: HttpResponse<IDoenteContactosOutros[]>) => (this.doenteContactosOutros = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteContactosOutros();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteContactosOutros): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteContactosOutros(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteContactosOutrosListModification', () => this.loadAll());
  }

  delete(doenteContactosOutros: IDoenteContactosOutros): void {
    const modalRef = this.modalService.open(DoenteContactosOutrosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteContactosOutros = doenteContactosOutros;
  }
}
