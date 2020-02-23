import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProjectPermission, ProjectPermission } from 'app/shared/model/project/project-permission.model';
import { ProjectPermissionService } from './project-permission.service';
import { ProjectPermissionComponent } from './project-permission.component';
import { ProjectPermissionDetailComponent } from './project-permission-detail.component';
import { ProjectPermissionUpdateComponent } from './project-permission-update.component';

@Injectable({ providedIn: 'root' })
export class ProjectPermissionResolve implements Resolve<IProjectPermission> {
  constructor(private service: ProjectPermissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProjectPermission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((projectPermission: HttpResponse<ProjectPermission>) => {
          if (projectPermission.body) {
            return of(projectPermission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProjectPermission());
  }
}

export const projectPermissionRoute: Routes = [
  {
    path: '',
    component: ProjectPermissionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.projectProjectPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProjectPermissionDetailComponent,
    resolve: {
      projectPermission: ProjectPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.projectProjectPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProjectPermissionUpdateComponent,
    resolve: {
      projectPermission: ProjectPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.projectProjectPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProjectPermissionUpdateComponent,
    resolve: {
      projectPermission: ProjectPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.projectProjectPermission.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
