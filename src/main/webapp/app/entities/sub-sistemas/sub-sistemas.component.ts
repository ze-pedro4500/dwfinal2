import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubSistemas } from 'app/shared/model/sub-sistemas.model';
import { SubSistemasService } from './sub-sistemas.service';
import { SubSistemasDeleteDialogComponent } from './sub-sistemas-delete-dialog.component';

@Component({
  selector: 'jhi-sub-sistemas',
  templateUrl: './sub-sistemas.component.html'
})
export class SubSistemasComponent implements OnInit, OnDestroy {
  subSistemas?: ISubSistemas[];
  eventSubscriber?: Subscription;

  constructor(
    protected subSistemasService: SubSistemasService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subSistemasService.query().subscribe((res: HttpResponse<ISubSistemas[]>) => (this.subSistemas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubSistemas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubSistemas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubSistemas(): void {
    this.eventSubscriber = this.eventManager.subscribe('subSistemasListModification', () => this.loadAll());
  }

  delete(subSistemas: ISubSistemas): void {
    const modalRef = this.modalService.open(SubSistemasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subSistemas = subSistemas;
  }
}
