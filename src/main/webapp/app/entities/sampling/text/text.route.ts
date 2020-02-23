import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IText, Text } from 'app/shared/model/sampling/text.model';
import { TextService } from './text.service';
import { TextComponent } from './text.component';
import { TextDetailComponent } from './text-detail.component';
import { TextUpdateComponent } from './text-update.component';

@Injectable({ providedIn: 'root' })
export class TextResolve implements Resolve<IText> {
  constructor(private service: TextService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IText> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((text: HttpResponse<Text>) => {
          if (text.body) {
            return of(text.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Text());
  }
}

export const textRoute: Routes = [
  {
    path: '',
    component: TextComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingText.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TextDetailComponent,
    resolve: {
      text: TextResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingText.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TextUpdateComponent,
    resolve: {
      text: TextResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingText.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TextUpdateComponent,
    resolve: {
      text: TextResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.samplingText.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
