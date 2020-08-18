import { Moment } from 'moment';
import { IDoente } from 'app/shared/model/doente.model';

export interface IDoenteDiagnosticoSocial {
  id?: number;
  descr?: string;
  data?: Moment;
  doente?: IDoente;
}

export class DoenteDiagnosticoSocial implements IDoenteDiagnosticoSocial {
  constructor(public id?: number, public descr?: string, public data?: Moment, public doente?: IDoente) {}
}
