import { Moment } from 'moment';
import { IDoente } from 'app/shared/model/doente.model';
import { ISubSistemas } from 'app/shared/model/sub-sistemas.model';
import { IAces } from 'app/shared/model/aces.model';
import { ICountry } from 'app/shared/model/country.model';
import { ICentroSaude } from 'app/shared/model/centro-saude.model';
import { IHospRef } from 'app/shared/model/hosp-ref.model';
import { Sexo } from 'app/shared/model/enumerations/sexo.model';

export interface IDoenteIdentidade {
  id?: number;
  nome?: string;
  dataNasc?: Moment;
  altura?: number;
  morada?: string;
  codPost?: string;
  freguesia?: string;
  nif?: number;
  medFam?: string;
  sexo?: Sexo;
  telef?: number;
  telef2?: number;
  docId?: number;
  nBenef?: number;
  nUtente?: number;
  numProcHosp?: number;
  doente?: IDoente;
  subsistemas?: ISubSistemas;
  aces?: IAces;
  country?: ICountry;
  centroSaude?: ICentroSaude;
  hospRef?: IHospRef;
}

export class DoenteIdentidade implements IDoenteIdentidade {
  constructor(
    public id?: number,
    public nome?: string,
    public dataNasc?: Moment,
    public altura?: number,
    public morada?: string,
    public codPost?: string,
    public freguesia?: string,
    public nif?: number,
    public medFam?: string,
    public sexo?: Sexo,
    public telef?: number,
    public telef2?: number,
    public docId?: number,
    public nBenef?: number,
    public nUtente?: number,
    public numProcHosp?: number,
    public doente?: IDoente,
    public subsistemas?: ISubSistemas,
    public aces?: IAces,
    public country?: ICountry,
    public centroSaude?: ICentroSaude,
    public hospRef?: IHospRef
  ) {}
}
