import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDoenteIdentidade, DoenteIdentidade } from 'app/shared/model/doente-identidade.model';
import { DoenteIdentidadeService } from './doente-identidade.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';
import { ISubSistemas } from 'app/shared/model/sub-sistemas.model';
import { SubSistemasService } from 'app/entities/sub-sistemas/sub-sistemas.service';
import { IAces } from 'app/shared/model/aces.model';
import { AcesService } from 'app/entities/aces/aces.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';
import { ICentroSaude } from 'app/shared/model/centro-saude.model';
import { CentroSaudeService } from 'app/entities/centro-saude/centro-saude.service';
import { IHospRef } from 'app/shared/model/hosp-ref.model';
import { HospRefService } from 'app/entities/hosp-ref/hosp-ref.service';

type SelectableEntity = IDoente | ISubSistemas | IAces | ICountry | ICentroSaude | IHospRef;

@Component({
  selector: 'jhi-doente-identidade-update',
  templateUrl: './doente-identidade-update.component.html'
})
export class DoenteIdentidadeUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];
  subsistemas: ISubSistemas[] = [];
  aces: IAces[] = [];
  countries: ICountry[] = [];
  centrosaudes: ICentroSaude[] = [];
  hosprefs: IHospRef[] = [];
  dataNascDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [],
    dataNasc: [],
    altura: [],
    morada: [],
    codPost: [],
    freguesia: [],
    nif: [],
    medFam: [],
    sexo: [],
    telef: [],
    telef2: [],
    docId: [],
    nBenef: [],
    nUtente: [],
    numProcHosp: [],
    doente: [],
    subsistemas: [],
    aces: [],
    country: [],
    centroSaude: [],
    hospRef: []
  });

  constructor(
    protected doenteIdentidadeService: DoenteIdentidadeService,
    protected doenteService: DoenteService,
    protected subSistemasService: SubSistemasService,
    protected acesService: AcesService,
    protected countryService: CountryService,
    protected centroSaudeService: CentroSaudeService,
    protected hospRefService: HospRefService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteIdentidade }) => {
      this.updateForm(doenteIdentidade);

      this.doenteService
        .query({ filter: 'doenteidentidade-is-null' })
        .pipe(
          map((res: HttpResponse<IDoente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDoente[]) => {
          if (!doenteIdentidade.doente || !doenteIdentidade.doente.id) {
            this.doentes = resBody;
          } else {
            this.doenteService
              .find(doenteIdentidade.doente.id)
              .pipe(
                map((subRes: HttpResponse<IDoente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDoente[]) => (this.doentes = concatRes));
          }
        });

      this.subSistemasService.query().subscribe((res: HttpResponse<ISubSistemas[]>) => (this.subsistemas = res.body || []));

      this.acesService.query().subscribe((res: HttpResponse<IAces[]>) => (this.aces = res.body || []));

      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));

      this.centroSaudeService.query().subscribe((res: HttpResponse<ICentroSaude[]>) => (this.centrosaudes = res.body || []));

      this.hospRefService.query().subscribe((res: HttpResponse<IHospRef[]>) => (this.hosprefs = res.body || []));
    });
  }

  updateForm(doenteIdentidade: IDoenteIdentidade): void {
    this.editForm.patchValue({
      id: doenteIdentidade.id,
      nome: doenteIdentidade.nome,
      dataNasc: doenteIdentidade.dataNasc,
      altura: doenteIdentidade.altura,
      morada: doenteIdentidade.morada,
      codPost: doenteIdentidade.codPost,
      freguesia: doenteIdentidade.freguesia,
      nif: doenteIdentidade.nif,
      medFam: doenteIdentidade.medFam,
      sexo: doenteIdentidade.sexo,
      telef: doenteIdentidade.telef,
      telef2: doenteIdentidade.telef2,
      docId: doenteIdentidade.docId,
      nBenef: doenteIdentidade.nBenef,
      nUtente: doenteIdentidade.nUtente,
      numProcHosp: doenteIdentidade.numProcHosp,
      doente: doenteIdentidade.doente,
      subsistemas: doenteIdentidade.subsistemas,
      aces: doenteIdentidade.aces,
      country: doenteIdentidade.country,
      centroSaude: doenteIdentidade.centroSaude,
      hospRef: doenteIdentidade.hospRef
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteIdentidade = this.createFromForm();
    if (doenteIdentidade.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteIdentidadeService.update(doenteIdentidade));
    } else {
      this.subscribeToSaveResponse(this.doenteIdentidadeService.create(doenteIdentidade));
    }
  }

  private createFromForm(): IDoenteIdentidade {
    return {
      ...new DoenteIdentidade(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      dataNasc: this.editForm.get(['dataNasc'])!.value,
      altura: this.editForm.get(['altura'])!.value,
      morada: this.editForm.get(['morada'])!.value,
      codPost: this.editForm.get(['codPost'])!.value,
      freguesia: this.editForm.get(['freguesia'])!.value,
      nif: this.editForm.get(['nif'])!.value,
      medFam: this.editForm.get(['medFam'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      telef: this.editForm.get(['telef'])!.value,
      telef2: this.editForm.get(['telef2'])!.value,
      docId: this.editForm.get(['docId'])!.value,
      nBenef: this.editForm.get(['nBenef'])!.value,
      nUtente: this.editForm.get(['nUtente'])!.value,
      numProcHosp: this.editForm.get(['numProcHosp'])!.value,
      doente: this.editForm.get(['doente'])!.value,
      subsistemas: this.editForm.get(['subsistemas'])!.value,
      aces: this.editForm.get(['aces'])!.value,
      country: this.editForm.get(['country'])!.value,
      centroSaude: this.editForm.get(['centroSaude'])!.value,
      hospRef: this.editForm.get(['hospRef'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteIdentidade>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
