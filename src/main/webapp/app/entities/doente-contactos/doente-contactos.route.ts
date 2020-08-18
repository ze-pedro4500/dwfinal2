import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteContactos, DoenteContactos } from 'app/shared/model/doente-contactos.model';
import { DoenteContactosService } from './doente-contactos.service';
import { DoenteContactosComponent } from './doente-contactos.component';
import { DoenteContactosDetailComponent } from './doente-contactos-detail.component';
import { DoenteContactosUpdateComponent } from './doente-contactos-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteContactosResolve implements Resolve<IDoenteContactos> {
  constructor(private service: DoenteContactosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteContactos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteContactos: HttpResponse<DoenteContactos>) => {
          if (doenteContactos.body) {
            return of(doenteContactos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteContactos());
  }
}

export const doenteContactosRoute: Routes = [
  {
    path: '',
    component: DoenteContactosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteContactosDetailComponent,
    resolve: {
      doenteContactos: DoenteContactosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteContactosUpdateComponent,
    resolve: {
      doenteContactos: DoenteContactosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteContactosUpdateComponent,
    resolve: {
      doenteContactos: DoenteContactosResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteContactos'
    },
    canActivate: [UserRouteAccessService]
  }
];
