import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteSocioFamiliar, DoenteSocioFamiliar } from 'app/shared/model/doente-socio-familiar.model';
import { DoenteSocioFamiliarService } from './doente-socio-familiar.service';
import { DoenteSocioFamiliarComponent } from './doente-socio-familiar.component';
import { DoenteSocioFamiliarDetailComponent } from './doente-socio-familiar-detail.component';
import { DoenteSocioFamiliarUpdateComponent } from './doente-socio-familiar-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteSocioFamiliarResolve implements Resolve<IDoenteSocioFamiliar> {
  constructor(private service: DoenteSocioFamiliarService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteSocioFamiliar> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteSocioFamiliar: HttpResponse<DoenteSocioFamiliar>) => {
          if (doenteSocioFamiliar.body) {
            return of(doenteSocioFamiliar.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteSocioFamiliar());
  }
}

export const doenteSocioFamiliarRoute: Routes = [
  {
    path: '',
    component: DoenteSocioFamiliarComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteSocioFamiliars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteSocioFamiliarDetailComponent,
    resolve: {
      doenteSocioFamiliar: DoenteSocioFamiliarResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteSocioFamiliars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteSocioFamiliarUpdateComponent,
    resolve: {
      doenteSocioFamiliar: DoenteSocioFamiliarResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteSocioFamiliars'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteSocioFamiliarUpdateComponent,
    resolve: {
      doenteSocioFamiliar: DoenteSocioFamiliarResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteSocioFamiliars'
    },
    canActivate: [UserRouteAccessService]
  }
];
