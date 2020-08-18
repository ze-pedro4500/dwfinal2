import { IDoenteIdentidade } from 'app/shared/model/doente-identidade.model';

export interface ICountry {
  id?: number;
  nome?: string;
  sigla?: string;
  doenteIdentidades?: IDoenteIdentidade[];
}

export class Country implements ICountry {
  constructor(public id?: number, public nome?: string, public sigla?: string, public doenteIdentidades?: IDoenteIdentidade[]) {}
}
