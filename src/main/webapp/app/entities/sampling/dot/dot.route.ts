import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDot, Dot } from 'app/shared/model/sampling/dot.model';
import { DotService } from './dot.service';
import { DotComponent } from './dot.component';
import { DotDetailComponent } from './dot-detail.component';
import { DotUpdateComponent } from './dot-update.component';

@Injectable({ providedIn: 'root' })
export class DotResolve implements Resolve<IDot> {
  constructor(private service: DotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((dot: HttpResponse<Dot>) => {
          if (dot.body) {
            return of(dot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Dot());
  }
}

export const dotRoute: Routes = [
  {
    path: '',
    component: DotComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingDot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DotDetailComponent,
    resolve: {
      dot: DotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingDot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DotUpdateComponent,
    resolve: {
      dot: DotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingDot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DotUpdateComponent,
    resolve: {
      dot: DotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingDot.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
