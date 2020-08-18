import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteContactos } from 'app/shared/model/doente-contactos.model';
import { DoenteContactosService } from './doente-contactos.service';
import { DoenteContactosDeleteDialogComponent } from './doente-contactos-delete-dialog.component';

@Component({
  selector: 'jhi-doente-contactos',
  templateUrl: './doente-contactos.component.html'
})
export class DoenteContactosComponent implements OnInit, OnDestroy {
  doenteContactos?: IDoenteContactos[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteContactosService: DoenteContactosService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteContactosService.query().subscribe((res: HttpResponse<IDoenteContactos[]>) => (this.doenteContactos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteContactos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteContactos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteContactos(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteContactosListModification', () => this.loadAll());
  }

  delete(doenteContactos: IDoenteContactos): void {
    const modalRef = this.modalService.open(DoenteContactosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteContactos = doenteContactos;
  }
}
