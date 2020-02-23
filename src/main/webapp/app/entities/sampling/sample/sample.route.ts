import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISample, Sample } from 'app/shared/model/sampling/sample.model';
import { SampleService } from './sample.service';
import { SampleComponent } from './sample.component';
import { SampleDetailComponent } from './sample-detail.component';
import { SampleUpdateComponent } from './sample-update.component';

@Injectable({ providedIn: 'root' })
export class SampleResolve implements Resolve<ISample> {
  constructor(private service: SampleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISample> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sample: HttpResponse<Sample>) => {
          if (sample.body) {
            return of(sample.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sample());
  }
}

export const sampleRoute: Routes = [
  {
    path: '',
    component: SampleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingSample.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SampleDetailComponent,
    resolve: {
      sample: SampleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingSample.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SampleUpdateComponent,
    resolve: {
      sample: SampleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingSample.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SampleUpdateComponent,
    resolve: {
      sample: SampleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingSample.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
