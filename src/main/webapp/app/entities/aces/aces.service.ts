import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAces } from 'app/shared/model/aces.model';

type EntityResponseType = HttpResponse<IAces>;
type EntityArrayResponseType = HttpResponse<IAces[]>;

@Injectable({ providedIn: 'root' })
export class AcesService {
  public resourceUrl = SERVER_API_URL + 'api/aces';

  constructor(protected http: HttpClient) {}

  create(aces: IAces): Observable<EntityResponseType> {
    return this.http.post<IAces>(this.resourceUrl, aces, { observe: 'response' });
  }

  update(aces: IAces): Observable<EntityResponseType> {
    return this.http.put<IAces>(this.resourceUrl, aces, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAces>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAces[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
