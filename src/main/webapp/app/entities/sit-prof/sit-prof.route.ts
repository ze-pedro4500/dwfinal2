import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISitProf, SitProf } from 'app/shared/model/sit-prof.model';
import { SitProfService } from './sit-prof.service';
import { SitProfComponent } from './sit-prof.component';
import { SitProfDetailComponent } from './sit-prof-detail.component';
import { SitProfUpdateComponent } from './sit-prof-update.component';

@Injectable({ providedIn: 'root' })
export class SitProfResolve implements Resolve<ISitProf> {
  constructor(private service: SitProfService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISitProf> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sitProf: HttpResponse<SitProf>) => {
          if (sitProf.body) {
            return of(sitProf.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SitProf());
  }
}

export const sitProfRoute: Routes = [
  {
    path: '',
    component: SitProfComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SitProfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SitProfDetailComponent,
    resolve: {
      sitProf: SitProfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SitProfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SitProfUpdateComponent,
    resolve: {
      sitProf: SitProfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SitProfs'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SitProfUpdateComponent,
    resolve: {
      sitProf: SitProfResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'SitProfs'
    },
    canActivate: [UserRouteAccessService]
  }
];
