import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubSisGrupo } from 'app/shared/model/sub-sis-grupo.model';
import { SubSisGrupoService } from './sub-sis-grupo.service';
import { SubSisGrupoDeleteDialogComponent } from './sub-sis-grupo-delete-dialog.component';

@Component({
  selector: 'jhi-sub-sis-grupo',
  templateUrl: './sub-sis-grupo.component.html'
})
export class SubSisGrupoComponent implements OnInit, OnDestroy {
  subSisGrupos?: ISubSisGrupo[];
  eventSubscriber?: Subscription;

  constructor(
    protected subSisGrupoService: SubSisGrupoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subSisGrupoService.query().subscribe((res: HttpResponse<ISubSisGrupo[]>) => (this.subSisGrupos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubSisGrupos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubSisGrupo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubSisGrupos(): void {
    this.eventSubscriber = this.eventManager.subscribe('subSisGrupoListModification', () => this.loadAll());
  }

  delete(subSisGrupo: ISubSisGrupo): void {
    const modalRef = this.modalService.open(SubSisGrupoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subSisGrupo = subSisGrupo;
  }
}
