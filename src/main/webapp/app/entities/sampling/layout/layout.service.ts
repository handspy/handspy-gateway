import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILayout } from 'app/shared/model/sampling/layout.model';

type EntityResponseType = HttpResponse<ILayout>;
type EntityArrayResponseType = HttpResponse<ILayout[]>;

@Injectable({ providedIn: 'root' })
export class LayoutService {
  public resourceUrl = SERVER_API_URL + 'services/sampling/api/layouts';

  constructor(protected http: HttpClient) {}

  create(layout: ILayout): Observable<EntityResponseType> {
    return this.http.post<ILayout>(this.resourceUrl, layout, { observe: 'response' });
  }

  update(layout: ILayout): Observable<EntityResponseType> {
    return this.http.put<ILayout>(this.resourceUrl, layout, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILayout>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILayout[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
