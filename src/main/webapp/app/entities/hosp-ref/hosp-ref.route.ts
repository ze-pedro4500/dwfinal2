import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHospRef, HospRef } from 'app/shared/model/hosp-ref.model';
import { HospRefService } from './hosp-ref.service';
import { HospRefComponent } from './hosp-ref.component';
import { HospRefDetailComponent } from './hosp-ref-detail.component';
import { HospRefUpdateComponent } from './hosp-ref-update.component';

@Injectable({ providedIn: 'root' })
export class HospRefResolve implements Resolve<IHospRef> {
  constructor(private service: HospRefService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHospRef> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((hospRef: HttpResponse<HospRef>) => {
          if (hospRef.body) {
            return of(hospRef.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HospRef());
  }
}

export const hospRefRoute: Routes = [
  {
    path: '',
    component: HospRefComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HospRefs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HospRefDetailComponent,
    resolve: {
      hospRef: HospRefResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HospRefs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HospRefUpdateComponent,
    resolve: {
      hospRef: HospRefResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HospRefs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HospRefUpdateComponent,
    resolve: {
      hospRef: HospRefResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HospRefs'
    },
    canActivate: [UserRouteAccessService]
  }
];
