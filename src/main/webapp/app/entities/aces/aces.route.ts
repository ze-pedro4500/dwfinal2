import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAces, Aces } from 'app/shared/model/aces.model';
import { AcesService } from './aces.service';
import { AcesComponent } from './aces.component';
import { AcesDetailComponent } from './aces-detail.component';
import { AcesUpdateComponent } from './aces-update.component';

@Injectable({ providedIn: 'root' })
export class AcesResolve implements Resolve<IAces> {
  constructor(private service: AcesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAces> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((aces: HttpResponse<Aces>) => {
          if (aces.body) {
            return of(aces.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Aces());
  }
}

export const acesRoute: Routes = [
  {
    path: '',
    component: AcesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Aces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AcesDetailComponent,
    resolve: {
      aces: AcesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Aces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AcesUpdateComponent,
    resolve: {
      aces: AcesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Aces'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AcesUpdateComponent,
    resolve: {
      aces: AcesResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Aces'
    },
    canActivate: [UserRouteAccessService]
  }
];
