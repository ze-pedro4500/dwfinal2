import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGrauConf } from 'app/shared/model/grau-conf.model';
import { GrauConfService } from './grau-conf.service';
import { GrauConfDeleteDialogComponent } from './grau-conf-delete-dialog.component';

@Component({
  selector: 'jhi-grau-conf',
  templateUrl: './grau-conf.component.html'
})
export class GrauConfComponent implements OnInit, OnDestroy {
  grauConfs?: IGrauConf[];
  eventSubscriber?: Subscription;

  constructor(protected grauConfService: GrauConfService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.grauConfService.query().subscribe((res: HttpResponse<IGrauConf[]>) => (this.grauConfs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGrauConfs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGrauConf): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGrauConfs(): void {
    this.eventSubscriber = this.eventManager.subscribe('grauConfListModification', () => this.loadAll());
  }

  delete(grauConf: IGrauConf): void {
    const modalRef = this.modalService.open(GrauConfDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.grauConf = grauConf;
  }
}
