import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAces } from 'app/shared/model/aces.model';
import { AcesService } from './aces.service';
import { AcesDeleteDialogComponent } from './aces-delete-dialog.component';

@Component({
  selector: 'jhi-aces',
  templateUrl: './aces.component.html'
})
export class AcesComponent implements OnInit, OnDestroy {
  aces?: IAces[];
  eventSubscriber?: Subscription;

  constructor(protected acesService: AcesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.acesService.query().subscribe((res: HttpResponse<IAces[]>) => (this.aces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAces): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAces(): void {
    this.eventSubscriber = this.eventManager.subscribe('acesListModification', () => this.loadAll());
  }

  delete(aces: IAces): void {
    const modalRef = this.modalService.open(AcesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aces = aces;
  }
}
