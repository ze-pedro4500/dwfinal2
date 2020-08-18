import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICentroSaude, CentroSaude } from 'app/shared/model/centro-saude.model';
import { CentroSaudeService } from './centro-saude.service';
import { CentroSaudeComponent } from './centro-saude.component';
import { CentroSaudeDetailComponent } from './centro-saude-detail.component';
import { CentroSaudeUpdateComponent } from './centro-saude-update.component';

@Injectable({ providedIn: 'root' })
export class CentroSaudeResolve implements Resolve<ICentroSaude> {
  constructor(private service: CentroSaudeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICentroSaude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((centroSaude: HttpResponse<CentroSaude>) => {
          if (centroSaude.body) {
            return of(centroSaude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CentroSaude());
  }
}

export const centroSaudeRoute: Routes = [
  {
    path: '',
    component: CentroSaudeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CentroSaudes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CentroSaudeDetailComponent,
    resolve: {
      centroSaude: CentroSaudeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CentroSaudes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CentroSaudeUpdateComponent,
    resolve: {
      centroSaude: CentroSaudeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CentroSaudes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CentroSaudeUpdateComponent,
    resolve: {
      centroSaude: CentroSaudeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'CentroSaudes'
    },
    canActivate: [UserRouteAccessService]
  }
];
