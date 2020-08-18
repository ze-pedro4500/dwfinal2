import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteRegistosIntervencoes, DoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';
import { DoenteRegistosIntervencoesService } from './doente-registos-intervencoes.service';
import { DoenteRegistosIntervencoesComponent } from './doente-registos-intervencoes.component';
import { DoenteRegistosIntervencoesDetailComponent } from './doente-registos-intervencoes-detail.component';
import { DoenteRegistosIntervencoesUpdateComponent } from './doente-registos-intervencoes-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteRegistosIntervencoesResolve implements Resolve<IDoenteRegistosIntervencoes> {
  constructor(private service: DoenteRegistosIntervencoesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteRegistosIntervencoes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteRegistosIntervencoes: HttpResponse<DoenteRegistosIntervencoes>) => {
          if (doenteRegistosIntervencoes.body) {
            return of(doenteRegistosIntervencoes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteRegistosIntervencoes());
  }
}

export const doenteRegistosIntervencoesRoute: Routes = [
  {
    path: '',
    component: DoenteRegistosIntervencoesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteRegistosIntervencoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteRegistosIntervencoesDetailComponent,
    resolve: {
      doenteRegistosIntervencoes: DoenteRegistosIntervencoesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteRegistosIntervencoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteRegistosIntervencoesUpdateComponent,
    resolve: {
      doenteRegistosIntervencoes: DoenteRegistosIntervencoesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteRegistosIntervencoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteRegistosIntervencoesUpdateComponent,
    resolve: {
      doenteRegistosIntervencoes: DoenteRegistosIntervencoesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteRegistosIntervencoes'
    },
    canActivate: [UserRouteAccessService]
  }
];
