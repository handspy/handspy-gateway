import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPBAnalysis } from 'app/shared/model/pbanalysis/pb-analysis.model';

type EntityResponseType = HttpResponse<IPBAnalysis>;
type EntityArrayResponseType = HttpResponse<IPBAnalysis[]>;

@Injectable({ providedIn: 'root' })
export class PBAnalysisService {
  public resourceUrl = SERVER_API_URL + 'services/pbanalysis/api/pb-analyses';

  constructor(protected http: HttpClient) {}

  create(pBAnalysis: IPBAnalysis): Observable<EntityResponseType> {
    return this.http.post<IPBAnalysis>(this.resourceUrl, pBAnalysis, { observe: 'response' });
  }

  update(pBAnalysis: IPBAnalysis): Observable<EntityResponseType> {
    return this.http.put<IPBAnalysis>(this.resourceUrl, pBAnalysis, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPBAnalysis>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPBAnalysis[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
