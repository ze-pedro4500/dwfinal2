import { IDoenteIdentidade } from 'app/shared/model/doente-identidade.model';

export interface IAces {
  id?: number;
  nome?: string;
  doenteIdentidades?: IDoenteIdentidade[];
}

export class Aces implements IAces {
  constructor(public id?: number, public nome?: string, public doenteIdentidades?: IDoenteIdentidade[]) {}
}
