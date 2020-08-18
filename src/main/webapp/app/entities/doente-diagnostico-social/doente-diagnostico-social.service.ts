import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDoenteDiagnosticoSocial } from 'app/shared/model/doente-diagnostico-social.model';

type EntityResponseType = HttpResponse<IDoenteDiagnosticoSocial>;
type EntityArrayResponseType = HttpResponse<IDoenteDiagnosticoSocial[]>;

@Injectable({ providedIn: 'root' })
export class DoenteDiagnosticoSocialService {
  public resourceUrl = SERVER_API_URL + 'api/doente-diagnostico-socials';
  public resourceUrl2 = SERVER_API_URL + 'api/doente-diagnostico-social';
  public resourceUrl3 = SERVER_API_URL + 'api/doente-diagnostico-socialhist';

  constructor(protected http: HttpClient) {}

  create(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenteDiagnosticoSocial);
    return this.http
      .post<IDoenteDiagnosticoSocial>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doenteDiagnosticoSocial);
    return this.http
      .put<IDoenteDiagnosticoSocial>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  search(id: number): Observable<EntityResponseType> {
    return this.http.get<IDoenteDiagnosticoSocial>(this.resourceUrl2 + '/?doente=' + id, { observe: 'response' });
  }

  searchhist(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IDoenteDiagnosticoSocial[]>(this.resourceUrl3 + '/?doente=' + id, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoenteDiagnosticoSocial>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoenteDiagnosticoSocial[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(doenteDiagnosticoSocial: IDoenteDiagnosticoSocial): IDoenteDiagnosticoSocial {
    const copy: IDoenteDiagnosticoSocial = Object.assign({}, doenteDiagnosticoSocial, {
      data:
        doenteDiagnosticoSocial.data && doenteDiagnosticoSocial.data.isValid()
          ? doenteDiagnosticoSocial.data.format(DATE_FORMAT)
          : undefined
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
      res.body.forEach((doenteDiagnosticoSocial: IDoenteDiagnosticoSocial) => {
        doenteDiagnosticoSocial.data = doenteDiagnosticoSocial.data ? moment(doenteDiagnosticoSocial.data) : undefined;
      });
    }
    return res;
  }
}
