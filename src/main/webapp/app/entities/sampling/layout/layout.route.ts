import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILayout, Layout } from 'app/shared/model/sampling/layout.model';
import { LayoutService } from './layout.service';
import { LayoutComponent } from './layout.component';
import { LayoutDetailComponent } from './layout-detail.component';
import { LayoutUpdateComponent } from './layout-update.component';

@Injectable({ providedIn: 'root' })
export class LayoutResolve implements Resolve<ILayout> {
  constructor(private service: LayoutService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILayout> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((layout: HttpResponse<Layout>) => {
          if (layout.body) {
            return of(layout.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Layout());
  }
}

export const layoutRoute: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.samplingLayout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LayoutDetailComponent,
    resolve: {
      layout: LayoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingLayout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LayoutUpdateComponent,
    resolve: {
      layout: LayoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingLayout.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LayoutUpdateComponent,
    resolve: {
      layout: LayoutResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingLayout.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
