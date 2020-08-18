import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICentroSaude, CentroSaude } from 'app/shared/model/centro-saude.model';
import { CentroSaudeService } from './centro-saude.service';

@Component({
  selector: 'jhi-centro-saude-update',
  templateUrl: './centro-saude-update.component.html'
})
export class CentroSaudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: []
  });

  constructor(protected centroSaudeService: CentroSaudeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ centroSaude }) => {
      this.updateForm(centroSaude);
    });
  }

  updateForm(centroSaude: ICentroSaude): void {
    this.editForm.patchValue({
      id: centroSaude.id,
      nome: centroSaude.nome
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const centroSaude = this.createFromForm();
    if (centroSaude.id !== undefined) {
      this.subscribeToSaveResponse(this.centroSaudeService.update(centroSaude));
    } else {
      this.subscribeToSaveResponse(this.centroSaudeService.create(centroSaude));
    }
  }

  private createFromForm(): ICentroSaude {
    return {
      ...new CentroSaude(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICentroSaude>>): void {
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
}
