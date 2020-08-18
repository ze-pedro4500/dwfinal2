import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteHistMovimentos, DoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { DoenteHistMovimentosService } from './doente-hist-movimentos.service';
import { DoenteHistMovimentosComponent } from './doente-hist-movimentos.component';
import { DoenteHistMovimentosDetailComponent } from './doente-hist-movimentos-detail.component';
import { DoenteHistMovimentosUpdateComponent } from './doente-hist-movimentos-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteHistMovimentosResolve implements Resolve<IDoenteHistMovimentos> {
  constructor(private service: DoenteHistMovimentosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteHistMovimentos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteHistMovimentos: HttpResponse<DoenteHistMovimentos>) => {
          if (doenteHistMovimentos.body) {
            return of(doenteHistMovimentos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteHistMovimentos());
  }
}

export const doenteHistMovimentosRoute: Routes = [
  {
    path: '',
    component: DoenteHistMovimentosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteHistMovimentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteHistMovimentosDetailComponent,
    resolve: {
      doenteHistMovimentos: DoenteHistMovimentosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteHistMovimentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteHistMovimentosUpdateComponent,
    resolve: {
      doenteHistMovimentos: DoenteHistMovimentosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteHistMovimentos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteHistMovimentosUpdateComponent,
    resolve: {
      doenteHistMovimentos: DoenteHistMovimentosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteHistMovimentos'
    },
    canActivate: [UserRouteAccessService]
  }
];
