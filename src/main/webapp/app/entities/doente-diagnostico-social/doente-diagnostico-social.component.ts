import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';
import { DoenteDiagnosticoSocialService } from './doente-diagnostico-social.service';
import { DoenteDiagnosticoSocialDeleteDialogComponent } from './doente-diagnostico-social-delete-dialog.component';

@Component({
  selector: 'jhi-doente-diagnostico-social',
  templateUrl: './doente-diagnostico-social.component.html'
})
export class DoenteDiagnosticoSocialComponent implements OnInit, OnDestroy {
  doenteDiagnosticoSocials?: IDoenteDiagnosticoSocial[];
  eventSubscriber?: Subscription;

  constructor(
    protected doenteDiagnosticoSocialService: DoenteDiagnosticoSocialService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.doenteDiagnosticoSocialService
      .query()
      .subscribe((res: HttpResponse<IDoenteDiagnosticoSocial[]>) => (this.doenteDiagnosticoSocials = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDoenteDiagnosticoSocials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDoenteDiagnosticoSocial): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDoenteDiagnosticoSocials(): void {
    this.eventSubscriber = this.eventManager.subscribe('doenteDiagnosticoSocialListModification', () => this.loadAll());
  }

  delete(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial): void {
    const modalRef = this.modalService.open(DoenteDiagnosticoSocialDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.doenteDiagnosticoSocial = doenteDiagnosticoSocial;
  }
}
