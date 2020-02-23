import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPBMetadata } from 'app/shared/model/pbanalysis/pb-metadata.model';

type EntityResponseType = HttpResponse<IPBMetadata>;
type EntityArrayResponseType = HttpResponse<IPBMetadata[]>;

@Injectable({ providedIn: 'root' })
export class PBMetadataService {
  public resourceUrl = SERVER_API_URL + 'services/pbanalysis/api/pb-metadata';

  constructor(protected http: HttpClient) {}

  create(pBMetadata: IPBMetadata): Observable<EntityResponseType> {
    return this.http.post<IPBMetadata>(this.resourceUrl, pBMetadata, { observe: 'response' });
  }

  update(pBMetadata: IPBMetadata): Observable<EntityResponseType> {
    return this.http.put<IPBMetadata>(this.resourceUrl, pBMetadata, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPBMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPBMetadata[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
