import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHorarioDoente, HorarioDoente } from 'app/shared/model/horario-doente.model';
import { HorarioDoenteService } from './horario-doente.service';
import { HorarioDoenteComponent } from './horario-doente.component';
import { HorarioDoenteDetailComponent } from './horario-doente-detail.component';
import { HorarioDoenteUpdateComponent } from './horario-doente-update.component';

@Injectable({ providedIn: 'root' })
export class HorarioDoenteResolve implements Resolve<IHorarioDoente> {
  constructor(private service: HorarioDoenteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHorarioDoente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((horarioDoente: HttpResponse<HorarioDoente>) => {
          if (horarioDoente.body) {
            return of(horarioDoente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HorarioDoente());
  }
}

export const horarioDoenteRoute: Routes = [
  {
    path: '',
    component: HorarioDoenteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HorarioDoentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HorarioDoenteDetailComponent,
    resolve: {
      horarioDoente: HorarioDoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HorarioDoentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HorarioDoenteUpdateComponent,
    resolve: {
      horarioDoente: HorarioDoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HorarioDoentes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HorarioDoenteUpdateComponent,
    resolve: {
      horarioDoente: HorarioDoenteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HorarioDoentes'
    },
    canActivate: [UserRouteAccessService]
  }
];
