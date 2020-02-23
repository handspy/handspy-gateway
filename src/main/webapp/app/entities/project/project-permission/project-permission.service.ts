import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProjectPermission } from 'app/shared/model/project/project-permission.model';

type EntityResponseType = HttpResponse<IProjectPermission>;
type EntityArrayResponseType = HttpResponse<IProjectPermission[]>;

@Injectable({ providedIn: 'root' })
export class ProjectPermissionService {
  public resourceUrl = SERVER_API_URL + 'services/project/api/project-permissions';

  constructor(protected http: HttpClient) {}

  create(projectPermission: IProjectPermission): Observable<EntityResponseType> {
    return this.http.post<IProjectPermission>(this.resourceUrl, projectPermission, { observe: 'response' });
  }

  update(projectPermission: IProjectPermission): Observable<EntityResponseType> {
    return this.http.put<IProjectPermission>(this.resourceUrl, projectPermission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProjectPermission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProjectPermission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
