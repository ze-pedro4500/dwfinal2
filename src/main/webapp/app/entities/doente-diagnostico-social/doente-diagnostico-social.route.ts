import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteDiagnosticoSocial, DoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';
import { DoenteDiagnosticoSocialService } from './doente-diagnostico-social.service';
import { DoenteDiagnosticoSocialComponent } from './doente-diagnostico-social.component';
import { DoenteDiagnosticoSocialDetailComponent } from './doente-diagnostico-social-detail.component';
import { DoenteDiagnosticoSocialUpdateComponent } from './doente-diagnostico-social-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteDiagnosticoSocialResolve implements Resolve<IDoenteDiagnosticoSocial> {
  constructor(private service: DoenteDiagnosticoSocialService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteDiagnosticoSocial> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteDiagnosticoSocial: HttpResponse<DoenteDiagnosticoSocial>) => {
          if (doenteDiagnosticoSocial.body) {
            return of(doenteDiagnosticoSocial.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteDiagnosticoSocial());
  }
}

export const doenteDiagnosticoSocialRoute: Routes = [
  {
    path: '',
    component: DoenteDiagnosticoSocialComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteDiagnosticoSocials'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteDiagnosticoSocialDetailComponent,
    resolve: {
      doenteDiagnosticoSocial: DoenteDiagnosticoSocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteDiagnosticoSocials'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteDiagnosticoSocialUpdateComponent,
    resolve: {
      doenteDiagnosticoSocial: DoenteDiagnosticoSocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteDiagnosticoSocials'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteDiagnosticoSocialUpdateComponent,
    resolve: {
      doenteDiagnosticoSocial: DoenteDiagnosticoSocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteDiagnosticoSocials'
    },
    canActivate: [UserRouteAccessService]
  }
];
