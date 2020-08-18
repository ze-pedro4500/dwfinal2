import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVitalidade, Vitalidade } from 'app/shared/model/vitalidade.model';
import { VitalidadeService } from './vitalidade.service';
import { VitalidadeComponent } from './vitalidade.component';
import { VitalidadeDetailComponent } from './vitalidade-detail.component';
import { VitalidadeUpdateComponent } from './vitalidade-update.component';

@Injectable({ providedIn: 'root' })
export class VitalidadeResolve implements Resolve<IVitalidade> {
  constructor(private service: VitalidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVitalidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((vitalidade: HttpResponse<Vitalidade>) => {
          if (vitalidade.body) {
            return of(vitalidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Vitalidade());
  }
}

export const vitalidadeRoute: Routes = [
  {
    path: '',
    component: VitalidadeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Vitalidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VitalidadeDetailComponent,
    resolve: {
      vitalidade: VitalidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Vitalidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VitalidadeUpdateComponent,
    resolve: {
      vitalidade: VitalidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Vitalidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VitalidadeUpdateComponent,
    resolve: {
      vitalidade: VitalidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Vitalidades'
    },
    canActivate: [UserRouteAccessService]
  }
];
