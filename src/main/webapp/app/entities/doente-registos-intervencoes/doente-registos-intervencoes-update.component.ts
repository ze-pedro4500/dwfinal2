import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDoenteRegistosIntervencoes, DoenteRegistosIntervencoes } from 'app/shared/model/doente-registos-intervencoes.model';
import { DoenteRegistosIntervencoesService } from './doente-registos-intervencoes.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';

@Component({
  selector: 'jhi-doente-registos-intervencoes-update',
  templateUrl: './doente-registos-intervencoes-update.component.html'
})
export class DoenteRegistosIntervencoesUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];

  editForm = this.fb.group({
    id: [],
    descr: [],
    doente: []
  });

  constructor(
    protected doenteRegistosIntervencoesService: DoenteRegistosIntervencoesService,
    protected doenteService: DoenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteRegistosIntervencoes }) => {
      this.updateForm(doenteRegistosIntervencoes);

      this.doenteService.query().subscribe((res: HttpResponse<IDoente[]>) => (this.doentes = res.body || []));
    });
  }

  updateForm(doenteRegistosIntervencoes: IDoenteRegistosIntervencoes): void {
    this.editForm.patchValue({
      id: doenteRegistosIntervencoes.id,
      descr: doenteRegistosIntervencoes.descr,
      doente: doenteRegistosIntervencoes.doente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteRegistosIntervencoes = this.createFromForm();
    if (doenteRegistosIntervencoes.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteRegistosIntervencoesService.update(doenteRegistosIntervencoes));
    } else {
      this.subscribeToSaveResponse(this.doenteRegistosIntervencoesService.create(doenteRegistosIntervencoes));
    }
  }

  private createFromForm(): IDoenteRegistosIntervencoes {
    return {
      ...new DoenteRegistosIntervencoes(),
      id: this.editForm.get(['id'])!.value,
      descr: this.editForm.get(['descr'])!.value,
      doente: this.editForm.get(['doente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteRegistosIntervencoes>>): void {
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

  trackById(index: number, item: IDoente): any {
    return item.id;
  }
}
