import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPBMetadata, PBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';
import { PBMetadataService } from './pb-metadata.service';
import { PBMetadataComponent } from './pb-metadata.component';
import { PBMetadataDetailComponent } from './pb-metadata-detail.component';
import { PBMetadataUpdateComponent } from './pb-metadata-update.component';

@Injectable({ providedIn: 'root' })
export class PBMetadataResolve implements Resolve<IPBMetadata> {
  constructor(private service: PBMetadataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPBMetadata> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pBMetadata: HttpResponse<PBMetadata>) => {
          if (pBMetadata.body) {
            return of(pBMetadata.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PBMetadata());
  }
}

export const pBMetadataRoute: Routes = [
  {
    path: '',
    component: PBMetadataComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBMetadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PBMetadataDetailComponent,
    resolve: {
      pBMetadata: PBMetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBMetadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PBMetadataUpdateComponent,
    resolve: {
      pBMetadata: PBMetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBMetadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PBMetadataUpdateComponent,
    resolve: {
      pBMetadata: PBMetadataResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.pbanalysisPBMetadata.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
