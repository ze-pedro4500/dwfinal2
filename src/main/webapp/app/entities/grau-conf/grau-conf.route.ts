import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGrauConf, GrauConf } from 'app/shared/model/grau-conf.model';
import { GrauConfService } from './grau-conf.service';
import { GrauConfComponent } from './grau-conf.component';
import { GrauConfDetailComponent } from './grau-conf-detail.component';
import { GrauConfUpdateComponent } from './grau-conf-update.component';

@Injectable({ providedIn: 'root' })
export class GrauConfResolve implements Resolve<IGrauConf> {
  constructor(private service: GrauConfService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGrauConf> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((grauConf: HttpResponse<GrauConf>) => {
          if (grauConf.body) {
            return of(grauConf.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GrauConf());
  }
}

export const grauConfRoute: Routes = [
  {
    path: '',
    component: GrauConfComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GrauConfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GrauConfDetailComponent,
    resolve: {
      grauConf: GrauConfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GrauConfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GrauConfUpdateComponent,
    resolve: {
      grauConf: GrauConfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GrauConfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GrauConfUpdateComponent,
    resolve: {
      grauConf: GrauConfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GrauConfs'
    },
    canActivate: [UserRouteAccessService]
  }
];
