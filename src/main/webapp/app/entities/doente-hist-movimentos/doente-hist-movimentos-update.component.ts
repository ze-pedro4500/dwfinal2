import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDoenteHistMovimentos, DoenteHistMovimentos } from 'app/shared/model/doente-hist-movimentos.model';
import { DoenteHistMovimentosService } from './doente-hist-movimentos.service';
import { IDoente } from 'app/shared/model/doente.model';
import { DoenteService } from 'app/entities/doente/doente.service';

@Component({
  selector: 'jhi-doente-hist-movimentos-update',
  templateUrl: './doente-hist-movimentos-update.component.html'
})
export class DoenteHistMovimentosUpdateComponent implements OnInit {
  isSaving = false;
  doentes: IDoente[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    data: [],
    situacao: [],
    statusprevio: [],
    causaMorte: [],
    obs: [],
    doente: []
  });

  constructor(
    protected doenteHistMovimentosService: DoenteHistMovimentosService,
    protected doenteService: DoenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doenteHistMovimentos }) => {
      this.updateForm(doenteHistMovimentos);

      this.doenteService.query().subscribe((res: HttpResponse<IDoente[]>) => (this.doentes = res.body || []));
    });
  }

  updateForm(doenteHistMovimentos: IDoenteHistMovimentos): void {
    this.editForm.patchValue({
      id: doenteHistMovimentos.id,
      data: doenteHistMovimentos.data,
      situacao: doenteHistMovimentos.situacao,
      statusprevio: doenteHistMovimentos.statusprevio,
      causaMorte: doenteHistMovimentos.causaMorte,
      obs: doenteHistMovimentos.obs,
      doente: doenteHistMovimentos.doente
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doenteHistMovimentos = this.createFromForm();
    if (doenteHistMovimentos.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteHistMovimentosService.update(doenteHistMovimentos));
    } else {
      this.subscribeToSaveResponse(this.doenteHistMovimentosService.create(doenteHistMovimentos));
    }
  }

  private createFromForm(): IDoenteHistMovimentos {
    return {
      ...new DoenteHistMovimentos(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
      statusprevio: this.editForm.get(['statusprevio'])!.value,
      causaMorte: this.editForm.get(['causaMorte'])!.value,
      obs: this.editForm.get(['obs'])!.value,
      doente: this.editForm.get(['doente'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoenteHistMovimentos>>): void {
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
