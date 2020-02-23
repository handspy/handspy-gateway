import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPBBurst, PBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';
import { PBBurstService } from './pb-burst.service';
import { PBBurstComponent } from './pb-burst.component';
import { PBBurstDetailComponent } from './pb-burst-detail.component';
import { PBBurstUpdateComponent } from './pb-burst-update.component';

@Injectable({ providedIn: 'root' })
export class PBBurstResolve implements Resolve<IPBBurst> {
  constructor(private service: PBBurstService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPBBurst> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pBBurst: HttpResponse<PBBurst>) => {
          if (pBBurst.body) {
            return of(pBBurst.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PBBurst());
  }
}

export const pBBurstRoute: Routes = [
  {
    path: '',
    component: PBBurstComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBBurst.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PBBurstDetailComponent,
    resolve: {
      pBBurst: PBBurstResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBBurst.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PBBurstUpdateComponent,
    resolve: {
      pBBurst: PBBurstResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBBurst.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PBBurstUpdateComponent,
    resolve: {
      pBBurst: PBBurstResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBBurst.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
