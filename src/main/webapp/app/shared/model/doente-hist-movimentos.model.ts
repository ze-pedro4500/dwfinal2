import { Moment } from 'moment';
import { IDoente } from 'app/shared/model/doente.model';
import { Situacao } from 'app/shared/model/enumerations/situacao.model';

export interface IDoenteHistMovimentos {
  id?: number;
  data?: Moment;
  situacao?: Situacao;
  statusprevio?: Situacao;
  causaMorte?: string;
  obs?: string;
  doente?: IDoente;
}

export class DoenteHistMovimentos implements IDoenteHistMovimentos {
  constructor(
    public id?: number,
    public data?: Moment,
    public situacao?: Situacao,
    public statusprevio?: Situacao,
    public causaMorte?: string,
    public obs?: string,
    public doente?: IDoente
  ) {}
}
