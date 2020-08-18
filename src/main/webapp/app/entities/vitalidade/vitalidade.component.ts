import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVitalidade } from 'app/shared/model/vitalidade.model';
import { VitalidadeService } from './vitalidade.service';
import { VitalidadeDeleteDialogComponent } from './vitalidade-delete-dialog.component';

@Component({
  selector: 'jhi-vitalidade',
  templateUrl: './vitalidade.component.html'
})
export class VitalidadeComponent implements OnInit, OnDestroy {
  vitalidades?: IVitalidade[];
  eventSubscriber?: Subscription;

  constructor(protected vitalidadeService: VitalidadeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.vitalidadeService.query().subscribe((res: HttpResponse<IVitalidade[]>) => (this.vitalidades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVitalidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVitalidade): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVitalidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('vitalidadeListModification', () => this.loadAll());
  }

  delete(vitalidade: IVitalidade): void {
    const modalRef = this.modalService.open(VitalidadeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vitalidade = vitalidade;
  }
}
