import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPBBurst } from 'app/shared/model/pbanalysis/pb-burst.model';

type EntityResponseType = HttpResponse<IPBBurst>;
type EntityArrayResponseType = HttpResponse<IPBBurst[]>;

@Injectable({ providedIn: 'root' })
export class PBBurstService {
  public resourceUrl = SERVER_API_URL + 'services/pbanalysis/api/pb-bursts';

  constructor(protected http: HttpClient) {}

  create(pBBurst: IPBBurst): Observable<EntityResponseType> {
    return this.http.post<IPBBurst>(this.resourceUrl, pBBurst, { observe: 'response' });
  }

  update(pBBurst: IPBBurst): Observable<EntityResponseType> {
    return this.http.put<IPBBurst>(this.resourceUrl, pBBurst, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPBBurst>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPBBurst[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
