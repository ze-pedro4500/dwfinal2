import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHabit, Habit } from 'app/shared/model/habit.model';
import { HabitService } from './habit.service';
import { HabitComponent } from './habit.component';
import { HabitDetailComponent } from './habit-detail.component';
import { HabitUpdateComponent } from './habit-update.component';

@Injectable({ providedIn: 'root' })
export class HabitResolve implements Resolve<IHabit> {
  constructor(private service: HabitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHabit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((habit: HttpResponse<Habit>) => {
          if (habit.body) {
            return of(habit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Habit());
  }
}

export const habitRoute: Routes = [
  {
    path: '',
    component: HabitComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Habits'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HabitDetailComponent,
    resolve: {
      habit: HabitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Habits'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HabitUpdateComponent,
    resolve: {
      habit: HabitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Habits'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HabitUpdateComponent,
    resolve: {
      habit: HabitResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Habits'
    },
    canActivate: [UserRouteAccessService]
  }
];
