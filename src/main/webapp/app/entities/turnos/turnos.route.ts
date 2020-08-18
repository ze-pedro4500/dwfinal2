import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITurnos, Turnos } from 'app/shared/model/turnos.model';
import { TurnosService } from './turnos.service';
import { TurnosComponent } from './turnos.component';
import { TurnosDetailComponent } from './turnos-detail.component';
import { TurnosUpdateComponent } from './turnos-update.component';

@Injectable({ providedIn: 'root' })
export class TurnosResolve implements Resolve<ITurnos> {
  constructor(private service: TurnosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITurnos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((turnos: HttpResponse<Turnos>) => {
          if (turnos.body) {
            return of(turnos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Turnos());
  }
}

export const turnosRoute: Routes = [
  {
    path: '',
    component: TurnosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Turnos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TurnosDetailComponent,
    resolve: {
      turnos: TurnosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Turnos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TurnosUpdateComponent,
    resolve: {
      turnos: TurnosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Turnos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TurnosUpdateComponent,
    resolve: {
      turnos: TurnosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Turnos'
    },
    canActivate: [UserRouteAccessService]
  }
];
