import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';

type EntityResponseType = HttpResponse<IDoenteHistMovimentos>;
type EntityArrayResponseType = HttpResponse<IDoenteHistMovimentos[]>;

@Injectable({ providedIn: 'root' })
export class DoenteHistMovimentosService {
  public resourceUrl = SERVER_API_URL + 'api/doente-hist-movimentos';

  constructor(protected http: HttpClient) {}

  create(doenteHistMovimentos: IDoenteHistMovimentos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenteHistMovimentos);
    return this.http
      .post<IDoenteHistMovimentos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doenteHistMovimentos: IDoenteHistMovimentos): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenteHistMovimentos);
    return this.http
      .put<IDoenteHistMovimentos>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  search(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IDoenteHistMovimentos[]>(this.resourceUrl + '/?doente=' + id, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoenteHistMovimentos>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoenteHistMovimentos[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(doenteHistMovimentos: IDoenteHistMovimentos): IDoenteHistMovimentos {
    const copy: IDoenteHistMovimentos = Object.assign({}, doenteHistMovimentos, {
      data: doenteHistMovimentos.data && doenteHistMovimentos.data.isValid() ? doenteHistMovimentos.data.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((doenteHistMovimentos: IDoenteHistMovimentos) => {
        doenteHistMovimentos.data = doenteHistMovimentos.data ? moment(doenteHistMovimentos.data) : undefined;
      });
    }
    return res;
  }
}
