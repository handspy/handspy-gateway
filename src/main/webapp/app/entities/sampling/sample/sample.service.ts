import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISample } from 'app/shared/model/sampling/sample.model';

type EntityResponseType = HttpResponse<ISample>;
type EntityArrayResponseType = HttpResponse<ISample[]>;

@Injectable({ providedIn: 'root' })
export class SampleService {
  public resourceUrl = SERVER_API_URL + 'services/sampling/api/samples';

  constructor(protected http: HttpClient) {}

  create(sample: ISample): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sample);
    return this.http
      .post<ISample>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sample: ISample): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sample);
    return this.http
      .put<ISample>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISample>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISample[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sample: ISample): ISample {
    const copy: ISample = Object.assign({}, sample, {
      timestamp: sample.timestamp && sample.timestamp.isValid() ? sample.timestamp.toJSON() : undefined
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
      res.body.forEach((sample: ISample) => {
        sample.timestamp = sample.timestamp ? moment(sample.timestamp) : undefined;
      });
    }
    return res;
  }
}
