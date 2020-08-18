import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDoenteIdentidade, DoenteIdentidade } from 'app/shared/model/doente-identidade.model';
import { DoenteIdentidadeService } from './doente-identidade.service';
import { DoenteIdentidadeComponent } from './doente-identidade.component';
import { DoenteIdentidadeDetailComponent } from './doente-identidade-detail.component';
import { DoenteIdentidadeUpdateComponent } from './doente-identidade-update.component';

@Injectable({ providedIn: 'root' })
export class DoenteIdentidadeResolve implements Resolve<IDoenteIdentidade> {
  constructor(private service: DoenteIdentidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDoenteIdentidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((doenteIdentidade: HttpResponse<DoenteIdentidade>) => {
          if (doenteIdentidade.body) {
            return of(doenteIdentidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DoenteIdentidade());
  }
}

export const doenteIdentidadeRoute: Routes = [
  {
    path: '',
    component: DoenteIdentidadeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteIdentidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DoenteIdentidadeDetailComponent,
    resolve: {
      doenteIdentidade: DoenteIdentidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteIdentidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DoenteIdentidadeUpdateComponent,
    resolve: {
      doenteIdentidade: DoenteIdentidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteIdentidades'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DoenteIdentidadeUpdateComponent,
    resolve: {
      doenteIdentidade: DoenteIdentidadeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DoenteIdentidades'
    },
    canActivate: [UserRouteAccessService]
  }
];
