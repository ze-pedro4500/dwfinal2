import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDoente, Doente } from 'app/shared/model/doente.model';
import { DoenteService } from './doente.service';
import { ITurnos } from 'app/shared/model/turnos.model';
import { TurnosService } from 'app/entities/turnos/turnos.service';

@Component({
  selector: 'jhi-doente-update',
  templateUrl: './doente-update.component.html'
})
export class DoenteUpdateComponent implements OnInit {
  isSaving = false;
  turnos: ITurnos[] = [];

  editForm = this.fb.group({
    id: [],
    situacao: [],
    turnos: []
  });

  constructor(
    protected doenteService: DoenteService,
    protected turnosService: TurnosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ doente }) => {
      this.updateForm(doente);

      this.turnosService.query().subscribe((res: HttpResponse<ITurnos[]>) => (this.turnos = res.body || []));
    });
  }

  updateForm(doente: IDoente): void {
    this.editForm.patchValue({
      id: doente.id,
      situacao: doente.situacao,
      turnos: doente.turnos
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const doente = this.createFromForm();
    if (doente.id !== undefined) {
      this.subscribeToSaveResponse(this.doenteService.update(doente));
    } else {
      this.subscribeToSaveResponse(this.doenteService.create(doente));
    }
  }

  private createFromForm(): IDoente {
    return {
      ...new Doente(),
      id: this.editForm.get(['id'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
      turnos: this.editForm.get(['turnos'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDoente>>): void {
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

  trackById(index: number, item: ITurnos): any {
    return item.id;
  }
}
