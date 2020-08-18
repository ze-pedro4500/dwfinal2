import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteSocioFamiliar } from 'app/shared/model/doente-socio-familiar.model';
import { DoenteSocioFamiliarService } from './doente-socio-familiar.service';
import { DoenteSocioFamiliarDeleteDialogComponent } from './doente-socio-familiar-delete-dialog.component';

@Component({
  selector: 'jhi-doente-socio-familiar',
  templateUrl: './doente-socio-familiar.component.html'
})
export class DoenteSocioFamiliarComponent implements OnInit, OnDestroy {
  doenteSocioFamiliars?: IDoenteSocioFamiliar[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteSocioFamiliarService: DoenteSocioFamiliarService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteSocioFamiliarService
      .query()
      .subscribe((res: HttpResponse<IDoenteSocioFamiliar[]>) => (this.doenteSocioFamiliars = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteSocioFamiliars();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteSocioFamiliar): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteSocioFamiliars(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteSocioFamiliarListModification', () => this.loadAll());
  }

  delete(doenteSocioFamiliar: IDoenteSocioFamiliar): void {
    const modalRef = this.modalService.open(DoenteSocioFamiliarDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteSocioFamiliar = doenteSocioFamiliar;
  }
}
