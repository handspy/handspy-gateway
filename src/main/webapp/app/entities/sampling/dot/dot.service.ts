import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDot } from 'app/shared/model/sampling/dot.model';

type EntityResponseType = HttpResponse<IDot>;
type EntityArrayResponseType = HttpResponse<IDot[]>;

@Injectable({ providedIn: 'root' })
export class DotService {
  public resourceUrl = SERVER_API_URL + 'services/sampling/api/dots';

  constructor(protected http: HttpClient) {}

  create(dot: IDot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dot);
    return this.http
      .post<IDot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(dot: IDot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(dot);
    return this.http
      .put<IDot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDot>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDot[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(dot: IDot): IDot {
    const copy: IDot = Object.assign({}, dot, {
      timestamp: dot.timestamp && dot.timestamp.isValid() ? dot.timestamp.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.timestamp = res.body.timestamp ? moment(res.body.timestamp) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((dot: IDot) => {
        dot.timestamp = dot.timestamp ? moment(dot.timestamp) : undefined;
      });
    }
    return res;
  }
}
