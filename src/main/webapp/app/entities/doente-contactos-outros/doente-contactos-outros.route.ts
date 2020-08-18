import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteContactosOutros, DoenteContactosOutros } from 'app/shared/model/doente-contactos-outros.model';
import { DoenteContactosOutrosService } from './doente-contactos-outros.service';
import { DoenteContactosOutrosComponent } from './doente-contactos-outros.component';
import { DoenteContactosOutrosDetailComponent } from './doente-contactos-outros-detail.component';
import { DoenteContactosOutrosUpdateComponent } from './doente-contactos-outros-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteContactosOutrosResolve implements Resolve<IDoenteContactosOutros> {
  constructor(private service: DoenteContactosOutrosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteContactosOutros> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteContactosOutros: HttpResponse<DoenteContactosOutros>) => {
          if (doenteContactosOutros.body) {
            return of(doenteContactosOutros.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteContactosOutros());
  }
}

export const doenteContactosOutrosRoute: Routes = [
  {
    path: '',
    component: DoenteContactosOutrosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactosOutros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteContactosOutrosDetailComponent,
    resolve: {
      doenteContactosOutros: DoenteContactosOutrosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactosOutros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteContactosOutrosUpdateComponent,
    resolve: {
      doenteContactosOutros: DoenteContactosOutrosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactosOutros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteContactosOutrosUpdateComponent,
    resolve: {
      doenteContactosOutros: DoenteContactosOutrosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactosOutros'
    },
    canActivate: [UserRouteAccessService]
  }
];
