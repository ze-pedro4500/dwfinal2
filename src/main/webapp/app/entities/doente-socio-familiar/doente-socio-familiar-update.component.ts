import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IDoenteSocioFamiliar, DoenteSocioFamiliar } from 'app/shared/model/doente-socio-familiar.model';
import { DoenteSocioFamiliarService } from './doente-socio-familiar.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';
import { IVitalidade } from 'app/shared/model/vitalidade.model';
import { VitalidadeService } from 'app/entities/vitalidade/vitalidade.service';
import { IHabit } from 'app/shared/model/habit.model';
import { HabitService } from 'app/entities/habit/habit.service';
import { IGrauConf } from 'app/shared/model/grau-conf.model';
import { GrauConfService } from 'app/entities/grau-conf/grau-conf.service';
import { IProfissao } from 'app/shared/model/profissao.model';
import { ProfissaoService } from 'app/entities/profissao/profissao.service';
import { ISitProf } from 'app/shared/model/sit-prof.model';
import { SitProfService } from 'app/entities/sit-prof/sit-prof.service';

type SelectableEntity = IDoente | IVitalidade | IHabit | IGrauConf | IProfissao | ISitProf;

@Component({
  selector: 'jhi-doente-socio-familiar-update',
  templateUrl: './doente-socio-familiar-update.component.html'
})
export class DoenteSocioFamiliarUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];
  vitalidades: IVitalidade[] = [];
  habits: IHabit[] = [];
  grauconfs: IGrauConf[] = [];
  profissaos: IProfissao[] = [];
  sitprofs: ISitProf[] = [];

  editForm = this.fb.group({
    id: [],
    habilitacoes: [],
    estCivil: [],
    conjugeNome: [],
    conjugeProf: [],
    activTempLiv: [],
    habitacaoObs: [],
    grauConfortoObs: [],
    respostaSocial: [],
    doente: [],
    vitalidade: [],
    habit: [],
    grauConf: [],
    profissao: [],
    sitProf: []
  });

  constructor(
    protected doenteSocioFamiliarService: DoenteSocioFamiliarService,
    protected doenteService: DoenteService,
    protected vitalidadeService: VitalidadeService,
    protected habitService: HabitService,
    protected grauConfService: GrauConfService,
    protected profissaoService: ProfissaoService,
    protected sitProfService: SitProfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteSocioFamiliar }) => {
      this.updateForm(doenteSocioFamiliar);

      this.doenteService
        .query({ filter: 'doentesociofamiliar-is-null' })
        .pipe(
          map((res: HttpResponse<IDoente[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDoente[]) => {
          if (!doenteSocioFamiliar.doente || !doenteSocioFamiliar.doente.id) {
            this.doentes = resBody;
          } else {
            this.doenteService
              .find(doenteSocioFamiliar.doente.id)
              .pipe(
                map((subRes: HttpResponse<IDoente>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDoente[]) => (this.doentes = concatRes));
          }
        });

      this.vitalidadeService.query().subscribe((res: HttpResponse<IVitalidade[]>) => (this.vitalidades = res.body || []));

      this.habitService.query().subscribe((res: HttpResponse<IHabit[]>) => (this.habits = res.body || []));

      this.grauConfService.query().subscribe((res: HttpResponse<IGrauConf[]>) => (this.grauconfs = res.body || []));

      this.profissaoService.query().subscribe((res: HttpResponse<IProfissao[]>) => (this.profissaos = res.body || []));

      this.sitProfService.query().subscribe((res: HttpResponse<ISitProf[]>) => (this.sitprofs = res.body || []));
    });
  }

  updateForm(doenteSocioFamiliar: IDoenteSocioFamiliar): void {
    this.editForm.patchValue({
      id: doenteSocioFamiliar.id,
      habilitacoes: doenteSocioFamiliar.habilitacoes,
      estCivil: doenteSocioFamiliar.estCivil,
      conjugeNome: doenteSocioFamiliar.conjugeNome,
      conjugeProf: doenteSocioFamiliar.conjugeProf,
      activTempLiv: doenteSocioFamiliar.activTempLiv,
      habitacaoObs: doenteSocioFamiliar.habitacaoObs,
      grauConfortoObs: doenteSocioFamiliar.grauConfortoObs,
      respostaSocial: doenteSocioFamiliar.respostaSocial,
      doente: doenteSocioFamiliar.doente,
      vitalidade: doenteSocioFamiliar.vitalidade,
      habit: doenteSocioFamiliar.habit,
      grauConf: doenteSocioFamiliar.grauConf,
      profissao: doenteSocioFamiliar.profissao,
      sitProf: doenteSocioFamiliar.sitProf
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteSocioFamiliar = this.createFromForm();
    if (doenteSocioFamiliar.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteSocioFamiliarService.update(doenteSocioFamiliar));
    } else {
      this.subscribeToSaveResponse(this.doenteSocioFamiliarService.create(doenteSocioFamiliar));
    }
  }

  private createFromForm(): IDoenteSocioFamiliar {
    return {
      ...new DoenteSocioFamiliar(),
      id: this.editForm.get(['id'])!.value,
      habilitacoes: this.editForm.get(['habilitacoes'])!.value,
      estCivil: this.editForm.get(['estCivil'])!.value,
      conjugeNome: this.editForm.get(['conjugeNome'])!.value,
      conjugeProf: this.editForm.get(['conjugeProf'])!.value,
      activTempLiv: this.editForm.get(['activTempLiv'])!.value,
      habitacaoObs: this.editForm.get(['habitacaoObs'])!.value,
      grauConfortoObs: this.editForm.get(['grauConfortoObs'])!.value,
      respostaSocial: this.editForm.get(['respostaSocial'])!.value,
      doente: this.editForm.get(['doente'])!.value,
      vitalidade: this.editForm.get(['vitalidade'])!.value,
      habit: this.editForm.get(['habit'])!.value,
      grauConf: this.editForm.get(['grauConf'])!.value,
      profissao: this.editForm.get(['profissao'])!.value,
      sitProf: this.editForm.get(['sitProf'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteSocioFamiliar>>): void {
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
