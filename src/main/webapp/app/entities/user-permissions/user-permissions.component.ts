import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserPermissions } from 'app/shared/model/user-permissions.model';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsDeleteDialogComponent } from './user-permissions-delete-dialog.component';

@Component({
  selector: 'jhi-user-permissions',
  templateUrl: './user-permissions.component.html'
})
export class UserPermissionsComponent implements OnInit, OnDestroy {
  userPermissions?: IUserPermissions[];
  eventSubscriber?: Subscription;

  constructor(
    protected userPermissionsService: UserPermissionsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.userPermissionsService.query().subscribe((res: HttpResponse<IUserPermissions[]>) => (this.userPermissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUserPermissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUserPermissions): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUserPermissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('userPermissionsListModification', () => this.loadAll());
  }

  delete(userPermissions: IUserPermissions): void {
    const modalRef = this.modalService.open(UserPermissionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userPermissions = userPermissions;
  }
}
