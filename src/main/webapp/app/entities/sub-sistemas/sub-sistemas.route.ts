import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubSistemas, SubSistemas } from 'app/shared/model/sub-sistemas.model';
import { SubSistemasService } from './sub-sistemas.service';
import { SubSistemasComponent } from './sub-sistemas.component';
import { SubSistemasDetailComponent } from './sub-sistemas-detail.component';
import { SubSistemasUpdateComponent } from './sub-sistemas-update.component';

@Injectable({ providedIn: 'root' })
export class SubSistemasResolve implements Resolve<ISubSistemas> {
  constructor(private service: SubSistemasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubSistemas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subSistemas: HttpResponse<SubSistemas>) => {
          if (subSistemas.body) {
            return of(subSistemas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubSistemas());
  }
}

export const subSistemasRoute: Routes = [
  {
    path: '',
    component: SubSistemasComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubSistemas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubSistemasDetailComponent,
    resolve: {
      subSistemas: SubSistemasResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubSistemas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubSistemasUpdateComponent,
    resolve: {
      subSistemas: SubSistemasResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubSistemas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubSistemasUpdateComponent,
    resolve: {
      subSistemas: SubSistemasResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SubSistemas'
    },
    canActivate: [UserRouteAccessService]
  }
];
