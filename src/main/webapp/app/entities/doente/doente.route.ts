import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoente, Doente } from 'app/shared/model/doente.model';
import { DoenteService } from './doente.service';
import { DoenteComponent } from './doente.component';
import { DoenteDetailComponent } from './doente-detail.component';
import { DoenteUpdateComponent } from './doente-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteResolve implements Resolve<IDoente> {
  constructor(private service: DoenteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doente: HttpResponse<Doente>) => {
          if (doente.body) {
            return of(doente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Doente());
  }
}

export const doenteRoute: Routes = [
  {
    path: '',
    component: DoenteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Doentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteDetailComponent,
    resolve: {
      doente: DoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Doentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteUpdateComponent,
    resolve: {
      doente: DoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Doentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteUpdateComponent,
    resolve: {
      doente: DoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Doentes'
    },
    canActivate: [UserRouteAccessService]
  }
];
