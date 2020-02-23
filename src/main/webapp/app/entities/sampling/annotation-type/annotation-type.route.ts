import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnnotationType, AnnotationType } from 'app/shared/model/sampling/annotation-type.model';
import { AnnotationTypeService } from './annotation-type.service';
import { AnnotationTypeComponent } from './annotation-type.component';
import { AnnotationTypeDetailComponent } from './annotation-type-detail.component';
import { AnnotationTypeUpdateComponent } from './annotation-type-update.component';

@Injectable({ providedIn: 'root' })
export class AnnotationTypeResolve implements Resolve<IAnnotationType> {
  constructor(private service: AnnotationTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnnotationType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((annotationType: HttpResponse<AnnotationType>) => {
          if (annotationType.body) {
            return of(annotationType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AnnotationType());
  }
}

export const annotationTypeRoute: Routes = [
  {
    path: '',
    component: AnnotationTypeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.samplingAnnotationType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnnotationTypeDetailComponent,
    resolve: {
      annotationType: AnnotationTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotationType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnnotationTypeUpdateComponent,
    resolve: {
      annotationType: AnnotationTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotationType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnnotationTypeUpdateComponent,
    resolve: {
      annotationType: AnnotationTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotationType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
