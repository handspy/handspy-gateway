import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnnotation, Annotation } from 'app/shared/model/sampling/annotation.model';
import { AnnotationService } from './annotation.service';
import { AnnotationComponent } from './annotation.component';
import { AnnotationDetailComponent } from './annotation-detail.component';
import { AnnotationUpdateComponent } from './annotation-update.component';

@Injectable({ providedIn: 'root' })
export class AnnotationResolve implements Resolve<IAnnotation> {
  constructor(private service: AnnotationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnnotation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((annotation: HttpResponse<Annotation>) => {
          if (annotation.body) {
            return of(annotation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Annotation());
  }
}

export const annotationRoute: Routes = [
  {
    path: '',
    component: AnnotationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AnnotationDetailComponent,
    resolve: {
      annotation: AnnotationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AnnotationUpdateComponent,
    resolve: {
      annotation: AnnotationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AnnotationUpdateComponent,
    resolve: {
      annotation: AnnotationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingAnnotation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
